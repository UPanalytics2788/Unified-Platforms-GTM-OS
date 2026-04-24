import { doc, updateDoc } from 'firebase/firestore';
import { db } from './src/lib/firebase';

async function updateLogo() {
  try {
    const brandRef = doc(db, 'settings', 'brand');
    await updateDoc(brandRef, {
      logoUrl: '/logo.png'
    });
    console.log('Logo URL updated to /logo.png successfully.');
  } catch (err) {
    console.error('Error updating logo:', err);
  }
}

updateLogo();
