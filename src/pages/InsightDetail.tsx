import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ArrowLeft, Calendar, User, Share2, Bookmark, HelpCircle, Linkedin } from 'lucide-react';
import LeadForm from '../components/ui/LeadForm';
import { Helmet } from 'react-helmet-async';
import SchemaMarkup from '../components/ui/SchemaMarkup';

export default function InsightDetail() {
  const { slug } = useParams();
  const [insight, setInsight] = useState<any>(null);
  const [author, setAuthor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      if (!slug) return;
      
      try {
        // 1. Try fetching by slug
        const q = query(collection(db, 'insights'), where('slug', '==', slug), limit(1));
        const querySnapshot = await getDocs(q);
        
        let data: any = null;
        if (!querySnapshot.empty) {
          data = { id: querySnapshot.docs[0].id, ...(querySnapshot.docs[0].data() as any) };
        } else {
          // 2. Try fetching by ID (slug might be the doc ID)
          try {
            const docRef = doc(db, 'insights', slug);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              data = { id: docSnap.id, ...(docSnap.data() as any) };
            }
          } catch (e) {
            console.error("ID lookup failed:", e);
          }
        }

        if (data) {
          setInsight(data);
          
          // Fetch author if author_id exists
          if (data.author_id) {
            try {
              const authorRef = doc(db, 'authors', data.author_id);
              const authorSnap = await getDoc(authorRef);
              if (authorSnap.exists()) {
                setAuthor(authorSnap.data());
              }
            } catch (e) {
              console.error("Author fetch failed:", e);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching insight:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsight();
  }, [slug]);

  if (loading) return <div className="py-20 text-center text-brand-gray">Loading...</div>;
  if (!insight) return <div className="py-20 text-center text-brand-gray">Insight not found.</div>;

  return (
    <div className="bg-brand-white min-h-screen">
      <Helmet>
        <title>{insight.meta_title || `${insight.title} | Unified Platforms Insights`}</title>
        <meta name="description" content={insight.meta_description || insight.summary} />
        {insight.primary_keyword && <meta name="keywords" content={insight.primary_keyword} />}
      </Helmet>

      <SchemaMarkup type="Article" data={insight} />
      {insight.faqs && insight.faqs.length > 0 && <SchemaMarkup type="FAQPage" data={insight} />}

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link to="/insights" className="inline-flex items-center text-brand-gray hover:text-brand-dark mb-12 transition-colors">
          <ArrowLeft size={18} className="mr-2" /> Back to Insights
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full uppercase tracking-widest">
              {insight.type}
            </span>
            <span className="text-brand-gray/30">|</span>
            <div className="flex items-center text-brand-gray text-sm gap-1">
              <Calendar size={14} />
              <span>{new Date(insight.publish_date).toLocaleDateString()}</span>
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-brand-dark mb-8 leading-tight">
            {insight.title}
          </h1>
          <div className="flex items-center justify-between py-6 border-y border-brand-dark/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-dark/5 rounded-full flex items-center justify-center">
                <User size={20} className="text-brand-gray" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-dark">{insight.author || 'Unified Platforms Team'}</p>
                <p className="text-xs text-brand-gray">Growth Strategy</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-brand-gray hover:text-brand-dark transition-colors">
                <Share2 size={20} />
              </button>
              <button className="p-2 text-brand-gray hover:text-brand-dark transition-colors">
                <Bookmark size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <div className="prose prose-neutral prose-lg max-w-none">
              <p className="text-xl text-brand-gray leading-relaxed mb-8 font-medium italic">
                {insight.summary || "In this playbook, we explore the critical strategies for scaling revenue through integrated growth operations."}
              </p>
              <div className="text-brand-dark leading-relaxed space-y-6">
                {insight.content?.split('\n').map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <div className="mt-16 p-8 bg-brand-dark/5 rounded-3xl border border-brand-dark/10">
              <h3 className="text-xl font-bold text-brand-dark mb-4">Key Takeaways</h3>
              <ul className="space-y-3">
                {[
                  "Data-driven decision making is the core of modern growth strategy.",
                  "Alignment between sales and marketing is non-negotiable.",
                  "Technology should enable strategy, not define it."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold">{i + 1}</span>
                    </div>
                    <span className="text-brand-dark">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Author Section */}
            {author && (
              <div className="mt-16 p-8 bg-white border border-brand-dark/10 rounded-3xl shadow-sm">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                    <img 
                      src={author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=random`} 
                      alt={author.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold text-brand-dark">{author.name}</h4>
                      {author.linkedin && (
                        <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-gray hover:text-brand-primary transition-colors">
                          <Linkedin size={20} />
                        </a>
                      )}
                    </div>
                    <p className="text-brand-primary font-bold text-sm mb-4 uppercase tracking-wider">{author.title || 'Expert Contributor'}</p>
                    <p className="text-brand-gray leading-relaxed mb-4">{author.bio}</p>
                    {author.credentials && author.credentials.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {author.credentials.map((cred: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-brand-gray text-[10px] font-bold rounded uppercase tracking-widest">{cred}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* FAQ Section */}
            {insight.faqs && insight.faqs.length > 0 && (
              <div className="mt-16 space-y-8">
                <h2 className="text-2xl font-bold text-brand-dark">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {insight.faqs.map((faq: any, idx: number) => (
                    <div key={idx} className="p-6 bg-brand-white rounded-2xl border border-brand-dark/10">
                      <h3 className="text-lg font-bold text-brand-dark mb-3 flex items-start gap-3">
                        <HelpCircle className="text-brand-primary mt-1 flex-shrink-0" size={20} />
                        {faq.question}
                      </h3>
                      <p className="text-brand-gray leading-relaxed ml-8">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <LeadForm 
                title="Get the Full Guide" 
                source="insight_page" 
                campaign={insight.slug} 
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
