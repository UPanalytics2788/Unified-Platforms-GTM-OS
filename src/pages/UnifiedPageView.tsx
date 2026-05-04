import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import UnifiedServicePageTemplate from '../components/UnifiedServicePageTemplate';

export default function UnifiedPageView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const docRef = doc(db, 'unified_pages', slug);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          setError('Page not found');
        }
      } catch (err: any) {
        console.error("Error fetching Unified page:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, navigate]);

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
