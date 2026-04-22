import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export function useCMSDocument(collectionName: string, id: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collectionName || !id) return;
    
    const fetchDoc = async () => {
      try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() });
        } else {
          setData(null);
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, `${collectionName}/${id}`);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [collectionName, id]);

  return { data, loading, error };
}
