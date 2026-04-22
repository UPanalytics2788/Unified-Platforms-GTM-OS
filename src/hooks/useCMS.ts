import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export function useCMSCollection(collectionName: string, publishedOnly: boolean = false) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collectionName) return;
    
    let q = query(collection(db, collectionName));
    
    if (publishedOnly) {
      q = query(collection(db, collectionName), where('status', '==', 'published'));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(items);
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, collectionName);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [collectionName, publishedOnly]);

  return { data, loading, error };
}
