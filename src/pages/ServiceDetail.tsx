import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ArrowLeft, CheckCircle, HelpCircle, Star, ShieldCheck, Zap, ArrowRight, MessageSquare } from 'lucide-react';
import LeadForm from '../components/ui/LeadForm';
import { Helmet } from 'react-helmet-async';
import SchemaMarkup from '../components/ui/SchemaMarkup';
import { SERVICES_CONTENT } from '../data/seedContent';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (!slug) return;
      try {
        const q = query(collection(db, 'services'), where('slug', '==', slug), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setService({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() });
        } else {
          // Fallback to local seed content if not in Firestore
          const localService = SERVICES_CONTENT.find(s => s.slug === slug);
          if (localService) {
            setService(localService);
          }
        }
      } catch (error) {
        console.error("Error fetching service from Firestore, falling back to local data:", error);
        const localService = SERVICES_CONTENT.find(s => s.slug === slug);
        if (localService) {
          setService(localService);
        }
      }
      setLoading(false);
    };
    fetchService();
  }, [slug]);

  if (loading) return <div className="py-20 text-center text-brand-gray">Loading...</div>;
  if (!service) return <div className="py-20 text-center text-brand-gray">Service not found.</div>;

  return (
    <div className="bg-brand-white min-h-screen">
      <Helmet>
        <title>{service.meta_title || `${service.title} | GTM OS`}</title>
        <meta name="description" content={service.meta_description || service.description} />
        {service.primary_keyword && <meta name="keywords" content={service.primary_keyword} />}
      </Helmet>

      <SchemaMarkup type="Service" data={service} />
      {service.faqs && service.faqs.length > 0 && <SchemaMarkup type="FAQPage" data={service} />}

      {/* Hero Section */}
      <section className="bg-brand-dark py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <Link to="/services" className="inline-flex items-center text-brand-gray hover:text-white mb-4 transition-colors">
              <ArrowLeft size={18} className="mr-2" /> Back to Services
            </Link>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-sm font-medium border border-brand-primary/30 block w-max">
              Enterprise {service.title}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              {service.title}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2">
                {service.primary_cta_text || 'Get Started'} <ArrowRight size={20} />
              </a>
              <a href="#contact" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                {service.secondary_cta_text || 'Get Free Audit'}
              </a>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img 
              src={`https://picsum.photos/seed/${service.slug || 'service'}/800/600`} 
              alt={service.title} 
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">100%</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Custom Strategy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">ROI</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Focused Approach</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">24/7</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Performance Tracking</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">Expert</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Led Execution</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      {service.use_cases && service.use_cases.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-brand-dark mb-12">Who Our {service.title} Service Is For</h2>
            <ul className="grid md:grid-cols-2 gap-6">
              {service.use_cases.map((useCase: string, idx: number) => (
                <li key={idx} className="flex items-start bg-gray-50 p-6 rounded-xl">
                  <CheckCircle className="text-brand-primary mr-4 flex-shrink-0 mt-1" size={20} />
                  <span className="text-brand-gray">{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Long Form Content Depth */}
      {(service.long_content || service.content) && (
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="prose prose-neutral prose-lg max-w-4xl mx-auto 
              prose-headings:text-brand-dark prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-4xl prose-h2:mb-10 prose-h2:mt-16 prose-h2:pb-4 prose-h2:border-b prose-h2:border-gray-100
              prose-h3:text-2xl prose-h3:mb-6 prose-h3:mt-12
              prose-h4:text-xl prose-h4:mb-4 prose-h4:mt-8
              prose-p:text-brand-gray prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg
              prose-li:text-brand-gray prose-li:mb-3 prose-li:text-lg
              prose-strong:text-brand-dark prose-strong:font-bold
              prose-ul:my-10 prose-ul:list-disc prose-ul:pl-6
              prose-img:rounded-3xl prose-img:shadow-2xl
            ">
              <div dangerouslySetInnerHTML={{ __html: service.long_content || service.content }} />
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-24 bg-brand-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-brand-dark text-center mb-16">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {service.faqs.map((faq: any, idx: number) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-brand-primary/30 transition-colors">
                  <h3 className="font-bold text-xl mb-4 text-brand-dark flex items-center">
                    <MessageSquare className="text-brand-primary mr-3" size={20} />
                    {faq.question}
                  </h3>
                  <p className="text-brand-gray leading-relaxed pl-8">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA / Lead Form */}
      <section id="contact" className="py-24 bg-brand-dark text-brand-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Ready to Elevate Your {service.title}?</h2>
              <p className="text-xl text-brand-gray mb-10">
                Schedule a consultation with our experts and discover how we can drive your growth.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center">
                    <CheckCircle className="text-brand-primary" size={24} />
                  </div>
                  <p className="text-lg">Customized strategy for your business</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center">
                    <CheckCircle className="text-brand-primary" size={24} />
                  </div>
                  <p className="text-lg">Actionable insights and roadmap</p>
                </div>
              </div>
            </div>
            <div className="bg-brand-white p-8 rounded-3xl text-brand-dark">
              <h3 className="text-2xl font-bold mb-6">Get a Free Audit</h3>
              <LeadForm source="service_contact_section" campaign={service.slug} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
