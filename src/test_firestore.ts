import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function test() {
  const q = query(collection(db, 'services'), where('slug', '==', 'content-strategy'));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    console.log(JSON.stringify(snapshot.docs[0].data(), null, 2));
  } else {
    console.log("Not found in Firestore");
  }
}
test();
