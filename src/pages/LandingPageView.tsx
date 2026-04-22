import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LandingPageView() {
  const { slug } = useParams();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;
      try {
        const q = query(
          collection(db, 'landing_pages'), 
          where('slug', '==', slug),
          where('status', '==', 'published'),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setPage(querySnapshot.docs[0].data());
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchPage();
  }, [slug]);

  if (loading) return <div className="flex items-center justify-center h-screen"><Loader2 className="animate-spin text-brand-primary" /></div>;
  if (!page) return <div className="flex items-center justify-center h-screen text-brand-gray">Page not found or not published.</div>;

  return (
    <div className="bg-brand-white">
      <Helmet>
        <title>{page.seo?.metaTitle || page.title}</title>
        <meta name="description" content={page.seo?.metaDescription} />
      </Helmet>

      {page.sections.map((section: any) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}

function SectionRenderer({ section }: { section: any }) {
  const { type, content } = section;
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % (content.items?.length || 1));
  const prev = () => setCurrentIndex((prev) => (prev - 1 + (content.items?.length || 1)) % (content.items?.length || 1));

  switch (type) {
    case 'hero':
      return (
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-5xl lg:text-7xl font-bold text-brand-dark mb-6 leading-tight">
                  {content.title}
                </h1>
                <p className="text-xl text-brand-gray mb-10 leading-relaxed max-w-2xl">
                  {content.subtitle}
                </p>
                <button className="px-8 py-4 bg-brand-primary text-brand-white rounded-xl font-bold text-lg hover:bg-brand-primary/90 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-primary/20">
                  {content.ctaText}
                </button>
              </div>
              {content.imageUrl && (
                <div className="lg:w-1/2">
                  <img 
                    src={content.imageUrl} 
                    alt={content.title} 
                    className="rounded-3xl shadow-2xl" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      );

    case 'features':
      return (
        <section className="py-20 bg-brand-dark/5">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-brand-dark mb-16">{content.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {content.items?.map((item: any, idx: number) => (
                <div key={idx} className="bg-brand-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mb-6">
                    <CheckCircle size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-4">{item.title}</h3>
                  <p className="text-brand-gray leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'testimonials':
      return (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-brand-dark mb-16">{content.title}</h2>
            <div className="relative max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-brand-dark text-brand-white p-10 rounded-3xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <CheckCircle size={120} />
                  </div>
                  <p className="text-xl italic mb-8 relative z-10 leading-relaxed">"{content.items[currentIndex].text}"</p>
                  <div className="relative z-10">
                    <p className="font-bold text-lg">{content.items[currentIndex].name}</p>
                    <p className="text-brand-gray">{content.items[currentIndex].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <button onClick={prev} className="absolute top-1/2 -left-12 -translate-y-1/2 p-2 bg-brand-white text-brand-dark rounded-full shadow-lg hover:bg-brand-primary hover:text-brand-white transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button onClick={next} className="absolute top-1/2 -right-12 -translate-y-1/2 p-2 bg-brand-white text-brand-dark rounded-full shadow-lg hover:bg-brand-primary hover:text-brand-white transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </section>
      );

    case 'cta':
      return (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="bg-brand-primary p-12 lg:p-20 rounded-[3rem] text-center text-brand-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-6xl font-bold mb-6">{content.title}</h2>
                <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">{content.subtitle}</p>
                <button className="px-10 py-4 bg-brand-white text-brand-primary rounded-xl font-bold text-lg hover:bg-brand-white/90 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto shadow-lg shadow-brand-white/10">
                  {content.buttonText} <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>
      );

    case 'faq':
      return (
        <section className="py-20 bg-brand-dark/5">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-brand-dark mb-16">{content.title}</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {content.items?.map((item: any, idx: number) => (
                <div key={idx} className="bg-brand-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-bold text-brand-dark mb-4">{item.question}</h3>
                  <p className="text-brand-gray leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'pricing':
      return (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-brand-dark mb-16">{content.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.plans?.map((plan: any, idx: number) => (
                <div key={idx} className="bg-brand-white p-8 rounded-3xl border border-brand-dark/10 hover:border-brand-primary transition-all duration-300 shadow-sm hover:shadow-xl">
                  <h3 className="text-2xl font-bold text-brand-dark mb-2">{plan.name}</h3>
                  <p className="text-4xl font-bold text-brand-primary mb-8">{plan.price}</p>
                  <ul className="space-y-4 mb-8">
                    {plan.features?.map((feature: string, fIdx: number) => (
                      <li key={fIdx} className="flex items-center gap-3 text-brand-gray">
                        <CheckCircle size={18} className="text-brand-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 bg-brand-dark text-brand-white rounded-xl font-bold hover:bg-brand-primary transition-colors">
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'contact':
      return (
        <section className="py-20 bg-brand-dark text-brand-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-bold mb-6">{content.title}</h2>
                <p className="text-brand-gray text-lg mb-8">{content.subtitle}</p>
              </div>
              <div className="lg:w-1/2 w-full">
                <form className="space-y-4">
                  <input type="text" placeholder="Name" className="w-full px-4 py-3 bg-brand-white/5 border border-brand-white/10 rounded-xl focus:border-brand-primary outline-none" />
                  <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-brand-white/5 border border-brand-white/10 rounded-xl focus:border-brand-primary outline-none" />
                  <textarea placeholder="Message" rows={4} className="w-full px-4 py-3 bg-brand-white/5 border border-brand-white/10 rounded-xl focus:border-brand-primary outline-none" />
                  <button className="w-full py-4 bg-brand-primary text-brand-white rounded-xl font-bold hover:bg-brand-primary/90 transition-all">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      );

    case 'talent-solutions':
      return <TalentSolutionsSection content={content} />;

    default:
      return null;
  }
}

function TalentSolutionsSection({ content }: { content: any }) {
  const [activeTab, setActiveTab] = useState(content.tabs?.[0]?.name || '');
  const currentTab = content.tabs?.find((t: any) => t.name === activeTab) || content.tabs?.[0];

  if (!currentTab) return null;

  return (
    <section className="py-24 bg-brand-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-dark mb-4">{content.title}</h2>
          <p className="text-brand-gray max-w-2xl mx-auto">{content.subtitle}</p>
        </div>

        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="inline-flex p-1 bg-brand-dark/5 rounded-2xl whitespace-nowrap">
            {content.tabs?.map((tab: any) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.name 
                    ? 'bg-brand-white text-brand-primary shadow-sm' 
                    : 'text-brand-gray hover:text-brand-dark'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-brand-dark/5 rounded-[3rem] p-8 lg:p-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col lg:flex-row items-center gap-12"
            >
              <div className="lg:w-1/2">
                <span className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider rounded-full mb-4">
                  {activeTab}
                </span>
                <h3 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-6">{currentTab.title}</h3>
                <div className="space-y-6 mb-8">
                  {currentTab.points?.map((item: any, i: number) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-brand-primary text-brand-white rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-dark mb-1">{item.title}</h4>
                        <p className="text-sm text-brand-gray">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="px-8 py-3 bg-brand-dark text-brand-white font-bold rounded-xl hover:bg-brand-dark/90 transition-colors">
                  Get Started
                </button>
              </div>
              <div className="lg:w-1/2">
                {currentTab.image && (
                  <img 
                    src={currentTab.image} 
                    alt={activeTab} 
                    className="rounded-3xl shadow-xl w-full h-[400px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
