import { useState, useEffect, useMemo } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Deep-merges CMS data over the code fallback so a partially filled
// document never blanks out a section (arrays are replaced, not merged).
export function mergeWithFallback(fallback: any, data: any): any {
  if (data === undefined || data === null) return fallback;
  if (Array.isArray(data) || typeof data !== 'object' || typeof fallback !== 'object' || Array.isArray(fallback)) {
    return data;
  }
  const out: any = { ...fallback };
  for (const key of Object.keys(data)) {
    out[key] = mergeWithFallback(fallback?.[key], data[key]);
  }
  return out;
}

/**
 * Realtime subscription to a Firestore document with a code-level fallback.
 * Edits made in the Admin CMS appear on the public page instantly (onSnapshot),
 * and the fallback keeps the page rendering if the CMS is empty or unreachable.
 */
export function useFirestoreDoc(collectionName: string, id: string, fallback: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, collectionName, id),
      (snapshot) => {
        setData(snapshot.exists() ? snapshot.data() : null);
        setLoading(false);
      },
      () => {
        // Offline / permission issues: fall back to code defaults silently
        setData(null);
        setLoading(false);
      }
    );
    return () => unsub();
  }, [collectionName, id]);

  const merged = useMemo(() => mergeWithFallback(fallback, data), [data, fallback]);
  return { data: merged, loading, isFromCMS: data !== null };
}

/** Realtime site page (pages/{slug}) with fallback defaults from src/data/sitePages.ts */
export function useSitePage(slug: string, fallback: any) {
  return useFirestoreDoc('pages', slug, fallback);
}
