import * as admin from 'firebase-admin';
import { onDocumentCreated, onDocumentWritten } from 'firebase-functions/v2/firestore';
import * as logger from 'firebase-functions/logger';

// Automatically initializes the Firebase SDK using the default credentials
// provided by the Cloud Functions runtime.
admin.initializeApp();

const db = admin.firestore();

/**
 * Triggered when a new lead is created in the 'leads' collection.
 * This function can be used to send an email notification to the
 * admin or integrate with a CRM like Salesforce or HubSpot.
 * 
 * NOTE: To send literal emails, you would configure an SMTP service
 * like SendGrid, Mailchimp, or use the Firebase 'Trigger Email' extension.
 */
export const onNewLeadNotification = onDocumentCreated('leads/{leadId}', async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    return;
  }

  const leadData = snapshot.data();

  // Log the event for cloud monitoring
  logger.info(`New Lead Created: ${leadData.email}`, { leadId: event.params.leadId });

  try {
    // Example of adding an activity log to Firestore that the Admin dashboard could listen to
    await db.collection('admin_notifications').add({
      type: 'new_lead',
      title: 'New Lead Submission',
      message: `${leadData.name} (${leadData.email}) submitted a request for ${leadData.subject || 'Consultation'}.`,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      read: false,
      leadId: event.params.leadId,
      metadata: leadData
    });

    // TODO: Add SendGrid / Nodemailer code here
    // const msg = {
    //   to: 'admin@unifiedplatforms.com',
    //   from: 'noreply@unifiedplatforms.com',
    //   subject: 'New Lead: ' + leadData.name,
    //   text: `A new lead has come in from ${leadData.email}.`
    // };
    // await sgMail.send(msg);

    return { success: true };
  } catch (error) {
    logger.error("Error processing new lead notification:", error);
    return { success: false, error };
  }
});

/**
 * Triggered on any writes to 'services', 'solutions', or 'insights' collections.
 * This can be used to automatically index content into a third-party search
 * service like Algolia or Typesense, although we have implemented an in-browser
 * Firebase queries approach for light loads.
 */
export const syncSearchIndex = onDocumentWritten('{collection}/{docId}', async (event) => {
  const collectionName = event.params.collection;
  
  // Only care about cms content
  if (!['services', 'solutions', 'insights'].includes(collectionName)) {
    return null;
  }

  const newData = event.data?.after?.exists ? event.data.after.data() : null;
  const oldData = event.data?.before?.exists ? event.data.before.data() : null;

  logger.info(`CMS Content changed in ${collectionName}`, { docId: event.params.docId });

  try {
    // If document was deleted
    if (!newData && oldData) {
      logger.info(`Deleting document ${event.params.docId} from Algolia index.`);
      // await algoliaIndex.deleteObject(event.params.docId);
      return { action: 'deleted' };
    }

    // If document was created or updated
    if (newData && newData.status === 'published') {
      logger.info(`Upserting document ${event.params.docId} to Algolia index.`);
      // await algoliaIndex.saveObject({ objectID: event.params.docId, ...newData });
      return { action: 'upserted', status: 'published' };
    } else if (newData && newData.status !== 'published' && oldData && oldData.status === 'published') {
      // Document was unpublished, remove from index
      logger.info(`Removing unpublished document ${event.params.docId} from Algolia index.`);
      // await algoliaIndex.deleteObject(event.params.docId);
      return { action: 'removed_unpublished' };
    }

    return { action: 'ignored' };
  } catch (error) {
    logger.error("Error syncing search index:", error);
    return { success: false, error };
  }
});
