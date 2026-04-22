import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import PageTemplate from '../components/PageTemplate';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'pages', 'home');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        }
      } catch (error) {
        // Rely on defaultData if fetch fails (e.g. offline/placeholder config)
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-primary" size={40} />
      </div>
    );
  }

  // Default content if CMS data is missing or incomplete
  const defaultData = {
    slug: 'home',
    title: 'Home',
    sections: [
      {
        type: 'hero',
        title: 'Revenue-Focused Marketing & Growth Partner',
        subtitle: 'We help brands scale through SEO, performance marketing, content, web development, and hiring.',
        cta_primary: { label: 'Book Consultation', link: '/contact?type=consultation' },
        cta_secondary: { label: 'View Case Studies', link: '/case-studies' }
      },
      {
        type: 'trust_bar'
      },
      {
        type: 'advantage',
        badge: 'The Unified Advantage',
        title: 'Data-Driven Growth with Proprietary Insights',
        description: "We don't just execute campaigns; we engineer growth. Our unique approach combines cross-channel expertise with advanced AI analytics to uncover hidden opportunities and maximize your ROI.",
        items: [
          "AI-Powered Competitor Intelligence",
          "Cross-Channel Attribution Modeling",
          "Proprietary SEO & Content Frameworks",
          "Dedicated Growth Strategists"
        ],
        image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
        stats: { value: '300%', label: 'Avg. ROI Increase' }
      }
    ]
  };

  // Use default data if fetched data has no sections
  const pageData = (data && data.sections && data.sections.length > 0) ? data : defaultData;

  return <PageTemplate data={pageData} />;
}
