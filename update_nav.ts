import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, writeBatch } from 'firebase/firestore';
import { readFileSync } from 'fs';

const config = JSON.parse(readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function updateNav() {
  const navSnap = await getDocs(collection(db, 'navigation'));
  const batch = writeBatch(db);
  
  navSnap.forEach(docSnap => {
    const data = docSnap.data();
    if (data.label === 'Case Studies') {
      batch.update(docSnap.ref, {
        type: 'link',
        href: '/case-studies',
        links: null // or deleteField() if needed, but null is fine
      });
    }
  });
  
  await batch.commit();
  console.log('Navigation updated');
  process.exit(0);
}

updateNav().catch(console.error);
