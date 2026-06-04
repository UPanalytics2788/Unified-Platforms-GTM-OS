import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export function useCMSCollection(collectionName: string, publishedOnly: boolean = false) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collectionName) return;

    // Use a where query instead of a plain collection() list.
    // AI Studio shared Firestore databases block collection list operations (403)
    // but WHERE queries work fine. Filtering on updatedAt >= '' matches all docs.
    const q = publishedOnly
      ? query(collection(db, collectionName), where('status', '==', 'published'))
      : query(collection(db, collectionName), where('status', 'in', ['published', 'draft', 'archived']));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(items);
      setLoading(false);
    }, (err) => {
      // Fallback: if the status-based query also fails (e.g. no status field on some docs),
      // try a slug-based query which will at minimum return seeded content
      const fallbackQ = query(collection(db, collectionName), where('slug', '!=', ''));
      const unsubFallback = onSnapshot(fallbackQ, (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(items);
        setLoading(false);
      }, () => {
        handleFirestoreError(err, OperationType.LIST, collectionName);
        setLoading(false);
      });
      return () => unsubFallback();
    });

    return () => unsubscribe();
  }, [collectionName, publishedOnly]);

  return { data, loading, error };
}
