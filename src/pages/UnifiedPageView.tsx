import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import UnifiedServicePageTemplate from '../components/UnifiedServicePageTemplate';

export default function UnifiedPageView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Determine collection based on URL path
  const collectionName = location.pathname.startsWith('/solutions') ? 'solutions' : 'services';

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        // Query by slug instead of assuming doc ID is slug (some docs use auto IDs)
        const q = query(collection(db, collectionName), where('slug', '==', slug), limit(1));
        const querySnapshot = await getDocs(q);
        
        // Also check unified_pages doc as fallback for legacy direct links
        let pageData = null;
        if (!querySnapshot.empty) {
          pageData = querySnapshot.docs[0].data();
        } else {
          const fallbackRef = doc(db, 'unified_pages', slug);
          const fallbackSnap = await getDoc(fallbackRef);
          if (fallbackSnap.exists()) {
            pageData = fallbackSnap.data();
          }
        }
        
        if (pageData) {
          // ensure data schema matches what template expects
          // if it's a legacy basic service, adapt it to the unified schema
          if (!pageData.page_config) {
            pageData = {
              ...pageData,
              page_config: { layout_pattern: 'ARCHITECT', theme: 'LIGHT', url_slug: slug },
              seo: { title: pageData.meta_title || pageData.title || '', meta_description: pageData.meta_description || pageData.description || '', schema_type: 'Service' },
              hero: { h1: pageData.title || '', intro_text: pageData.description || '' },
              value_grid: pageData.features?.map((f: any) => ({ title: f.title, description: f.desc || f.description, icon: f.icon || 'Check' })) || [],
            };
          }
          setData(pageData);
        } else {
          setError('Page not found');
        }
      } catch (err: any) {
        console.error(`Error fetching ${collectionName} page:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, collectionName, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-brand-dark mb-4">{error || 'Page not found'}</h1>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-brand-primary text-white rounded-lg font-bold"
        >
          Return Home
        </button>
      </div>
    );
  }

  return <UnifiedServicePageTemplate data={data} />;
}
