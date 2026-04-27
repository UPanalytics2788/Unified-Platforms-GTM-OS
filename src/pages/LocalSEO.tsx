import SEO from '../components/SEO';
import AdvancedLeadForm from '../components/ui/AdvancedLeadForm';
import SchemaMarkup from '../components/ui/SchemaMarkup';
import * as Icons from 'lucide-react';
import { MapPin, Star, Search, Globe, CheckCircle, ArrowRight, MessageSquare, Zap, Users, Layout, Database, Share2, Loader2 } from 'lucide-react';
import { useCMSDocument } from '../hooks/useCMSDocument';

export default function LocalSEO() {
  const { data: pageData, loading } = useCMSDocument('services', 'local-seo');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <Loader2 className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  const renderIcon = (iconName: string, size = 24, className = "") => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComponent size={size} className={className} />;
  };
  
  const faqs = pageData?.faqs || [
    { 
      question: "How is local SEO different from regular SEO?", 
      answer: "Regular SEO focuses on national or global organic results. Local SEO specifically targets the Map Pack and location-based queries, using factors like GBP optimization, citations, and reviews." 
    },
    { 
      question: "How long does local SEO take to show results?", 
      answer: "Visible movement in Map Pack rankings can often be seen in 4-8 weeks, though highly competitive markets may take 3-6 months for full dominance." 
    },
    { 
      question: "Do you manage Google Business Profile on our behalf?", 
      answer: "Yes. We handle ongoing management including review responses, Google Posts, information updates, and monitoring for spam or duplicate listings." 
    },
    { 
      question: "What should we do about negative reviews?", 
      answer: "We help you develop professional response templates that build trust with potential customers and advise on flagging reviews that violate Google's policies." 
    }
  ];

  const FALLBACK_PROCESS = [
    { 
      icon: 'MapPin', 
      title: "GBP Optimization", 
      desc: "Auditing and optimizing every element of your Google Business Profile for maximum Map Pack visibility." 
    },
    { 
      icon: 'Search', 
      title: "Local Keyword Mapping", 
      desc: "Identifying high-intent terms your local customers are using, prioritized by volume and intent." 
    },
    { 
      icon: 'Database', 
      title: "Citation Management", 
      desc: "Building and cleaning up NAP (Name, Address, Phone) mentions across high-authority local directories." 
    },
    { 
      icon: 'Star', 
      title: "Review Strategy", 
      desc: "Implementing systematic processes to generate, monitor, and respond to customer reviews." 
    },
    { 
      icon: 'Share2', 
      title: "Local Link Building", 
      desc: "Earning geographic-specific backlinks from local news, organizations, and industry publications." 
    }
  ];

  const FALLBACK_FEATURES = [
    {
      title: "Map Pack Dominance",
      desc: "We focus on the signals that matter most for appearing in the top 3 local results on Google Maps.",
      icon: 'MapPin'
    },
    {
      title: "Intent-Driven Traffic",
      desc: "Capture customers at the exact moment they are searching for services in their immediate area.",
      icon: 'Zap'
    },
    {
      title: "Trust & Reputation",
      desc: "A strong local presence built on consistent information and positive customer feedback.",
      icon: 'Star'
    }
  ];

  const features = pageData?.features || pageData?.service_grid || FALLBACK_FEATURES;
  const processSteps = pageData?.process_steps || FALLBACK_PROCESS;

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={pageData?.meta_title || "Local SEO Services | Local Search & Map Pack Dominance | GTM OS"}
        description={pageData?.meta_description || "Dominate local search and Google Maps with GTM OS. We optimize your local presence to drive high-intent traffic and customers to your physical and service area locations."}
      />
      <SchemaMarkup type="Service" data={{
        title: pageData?.title || "Local SEO Services",
        description: pageData?.description || "Dominate local search results and Google Maps with GTM OS. We help businesses rank for high-intent local searches that bring customers through the door."
      }} />
      <SchemaMarkup type="FAQPage" data={{ faqs }} />
      
      {/* Hero Section */}
      <section className="bg-brand-dark py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-sm font-medium border border-brand-primary/30">
              Local Search Optimization
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              {pageData?.h1 || "Local SEO Services That Put Your Business at the Top of Local Search"}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {pageData?.description || "When someone searches for a service in their city or neighbourhood, the businesses that appear in the Google Map Pack capture the majority of clicks. We help you dominate local search to bring customers through your door."}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#audit" className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2">
                Get Local SEO Audit <ArrowRight size={20} />
              </a>
              <a href="#process" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                Our Framework
              </a>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img 
              src="https://picsum.photos/seed/local-seo-hero/800/600" 
              alt="Local SEO Strategy" 
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
              <div className="text-3xl font-bold text-brand-dark mb-1">3x</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Avg. Call Volume</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">Top 3</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Map Pack Position</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">100%</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">NAP Consistency</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">45%</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Higher Conversion</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-brand-dark mb-6">Dominate Your Local Market</h2>
              <p className="text-lg text-brand-gray leading-relaxed mb-6">
                Being a well-run business with a good website is not enough to get there. Local search has its own set of ranking factors, and businesses that understand and optimize for those factors dominate their markets while their competitors remain invisible.
              </p>
              <p className="text-lg text-brand-gray leading-relaxed">
                At GTM OS, our local SEO service is built specifically for businesses that need to capture customers in defined geographic areas. Whether you operate from a single location or manage dozens of sites across multiple regions, we provide the strategy and execution needed to win in local search.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {features.map((feature: any, i: number) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                    {renderIcon(feature.icon, 24, "text-brand-primary")}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-brand-dark">{feature.title}</h3>
                    <p className="text-brand-gray leading-relaxed">{feature.desc || feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-brand-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                A Systematic Approach to <span className="text-brand-primary">Local Growth</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                We don't just optimize your profile; we build a comprehensive local search engine that addresses every ranking factor from technical NAP consistency to review velocity.
              </p>
              
              <div className="space-y-6 pt-8">
                {processSteps.map((step: any, i: number) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-primary font-bold group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-brand-primary transition-colors">{step.title || step.label}</h3>
                      <p className="text-gray-400 leading-relaxed">{step.desc || step.detail || step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-brand-primary/20 rounded-full blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/local-process/600/800" 
                  alt="Our Local SEO Process" 
                  className="rounded-2xl w-full h-auto shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-brand-primary p-6 rounded-2xl shadow-xl hidden md:block">
                  <div className="text-3xl font-bold mb-1">#1</div>
                  <div className="text-xs uppercase tracking-widest font-bold opacity-80">Local Ranking Target</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="audit" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-brand-dark">Get Your Free Local SEO Audit</h2>
              <p className="text-lg text-brand-gray leading-relaxed">
                Want to know why your competitors are outranking you in the Map Pack? Our team will perform a deep-dive audit of your local presence and provide a prioritized roadmap.
              </p>
              <ul className="space-y-4">
                {[
                  "Google Business Profile health check",
                  "Local keyword gap analysis",
                  "NAP consistency & citation audit",
                  "Review profile & reputation assessment",
                  "Local competitor ranking analysis"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-brand-primary" size={20} />
                    <span className="text-brand-gray font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <AdvancedLeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Location Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="https://picsum.photos/seed/local-case1/400/500" alt="Local Case 1" className="rounded-2xl w-full h-64 object-cover" referrerPolicy="no-referrer" />
                  <img src="https://picsum.photos/seed/local-case2/400/300" alt="Local Case 2" className="rounded-2xl w-full h-48 object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4 pt-8">
                  <img src="https://picsum.photos/seed/local-case3/400/300" alt="Local Case 3" className="rounded-2xl w-full h-48 object-cover" referrerPolicy="no-referrer" />
                  <img src="https://picsum.photos/seed/local-case4/400/500" alt="Local Case 4" className="rounded-2xl w-full h-64 object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-4xl font-bold text-brand-dark">Scalable Multi-Location SEO</h2>
              <p className="text-lg text-brand-gray leading-relaxed">
                Managing local SEO for dozens or hundreds of locations requires a systematic approach. We build scalable systems that ensure consistency while allowing for individualized local optimization.
              </p>
              <ul className="space-y-4">
                {[
                  "Centralized Google Business Profile management",
                  "Bulk citation building and NAP cleanup",
                  "Location-specific landing page optimization",
                  "Aggregated local performance reporting",
                  "Multi-location review monitoring and response"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mt-1 mr-4 w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="text-brand-primary" size={14} />
                    </div>
                    <span className="text-brand-gray font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-4">Our Technology Stack</h3>
            <h2 className="text-3xl font-bold text-brand-dark">Tools We Use to Drive Local Performance</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['BrightLocal', 'Whitespark', 'Yext', 'Semrush Local', 'GSC', 'GA4'].map((tool) => (
              <div key={tool} className="px-8 py-4 bg-white rounded-xl border border-gray-200 font-bold text-brand-gray shadow-sm">
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-brand-dark text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-brand-primary/30 transition-colors">
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

      {/* Final CTA */}
      <section className="py-24 bg-brand-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/seed/cta-bg-local/1920/1080?blur=10" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-primary/40 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">Ready to dominate local search in your market?</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Stop being invisible to local customers. Get a comprehensive local SEO audit and start ranking where it matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="px-10 py-5 bg-white text-brand-primary font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl text-lg">
              Get Your Free Audit
            </a>
            <a href="/case-studies" className="px-10 py-5 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-dark/90 transition-all shadow-xl text-lg">
              View Case Studies
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
