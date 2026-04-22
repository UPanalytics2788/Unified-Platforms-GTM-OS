import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from './firebase';

export async function logAdminAction(action: string, details: any) {
  if (!auth.currentUser) return;
  
  try {
    await addDoc(collection(db, 'audit_logs'), {
      userId: auth.currentUser.uid,
      userEmail: auth.currentUser.email,
      action,
      details,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error logging admin action:', err);
  }
}
