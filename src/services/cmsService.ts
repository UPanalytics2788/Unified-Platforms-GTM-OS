import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export async function fetchCMSData() {
  const insightsSnapshot = await getDocs(collection(db, 'insights'));
  const solutionsSnapshot = await getDocs(collection(db, 'solutions'));

  const insights = insightsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const solutions = solutionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return { insights, solutions };
}
