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
    seo: {
      title: 'Unified Platforms | Revenue-Focused Marketing & Growth Partner',
      description: 'Scale your brand with Unified Platforms. Specialized in SEO strategy, performance marketing, and technical development built for revenue growth.'
    },
    sections: [
      {
        type: 'hero',
        title: 'Revenue-Focused Marketing & Growth Partner',
        subtitle: 'We engineer measurable growth through data-driven performance and technical engineering—identifying and capturing your largest opportunities.',
        cta_primary: { label: 'Book Consultation', link: '/contact?type=consultation' },
        cta_secondary: { label: 'View Case Studies', link: '/case-studies' }
      },
      {
        type: 'trust_bar'
      },
      {
        type: 'advantage',
        badge: 'The Unified Advantage',
        title: 'Data-Driven Growth with Technical Precision',
        description: "We don't just run ads or build links. We build systems. Our unique approach combines deep technical engineering with performance marketing to create scalable revenue engines.",
        items: [
          "Cross-Channel Strategic Roadmap",
          "High-Performance Marketing Funnels",
          "Engineer-Led Technical SEO",
          "Proprietary Growth Frameworks"
        ],
        image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
        stats: { value: '3.5x', label: 'Avg. Sales Velocity' }
      }
    ]
  };

  // Use default data if fetched data has no sections
  const pageData = (data && data.sections && data.sections.length > 0) ? data : defaultData;

  return <PageTemplate data={pageData} />;
}
