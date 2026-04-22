import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Helmet } from 'react-helmet-async';

interface SEOContextType {
  globalSEO: {
    global_meta_title?: string;
    global_meta_description?: string;
  } | null;
}

const SEOContext = createContext<SEOContextType>({ globalSEO: null });

export function SEOProvider({ children }: { children: React.ReactNode }) {
  const [globalSEO, setGlobalSEO] = useState<any>(null);

  useEffect(() => {
    const fetchGlobalSEO = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'seo'));
        if (snap.exists()) {
          setGlobalSEO(snap.data());
        }
      } catch (err) {
        // Suppress errors if offline/placeholder for better developer experience
        console.warn('Global SEO fetch avoided or failed due to connection/config.');
      }
    };
    fetchGlobalSEO();
  }, []);

  return (
    <SEOContext.Provider value={{ globalSEO }}>
      {/* If current route has no specific Helmet details, this acts as the final fallback */}
      {globalSEO && (
        <Helmet>
          {globalSEO.global_meta_title && <title>{globalSEO.global_meta_title}</title>}
          {globalSEO.global_meta_description && <meta name="description" content={globalSEO.global_meta_description} />}
        </Helmet>
      )}
      {children}
    </SEOContext.Provider>
  );
}

export const useSEO = () => useContext(SEOContext);
