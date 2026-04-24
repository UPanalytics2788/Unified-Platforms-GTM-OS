import SEO from '../components/SEO';
import AdvancedLeadForm from '../components/ui/AdvancedLeadForm';
import * as Icons from 'lucide-react';
import { Target, BarChart3, Search, FileText, Settings, Link, PieChart, ShieldCheck, CheckCircle, Zap, ArrowRight, MessageSquare, TrendingUp, MousePointerClick, Globe, Megaphone, Loader2 } from 'lucide-react';
import { useCMSDocument } from '../hooks/useCMSDocument';

export default function PaidSearch() {
  const { data: pageData, loading } = useCMSDocument('services', 'paid-search');

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
  
  const FALLBACK_FEATURES = [
    {
      title: "Intent-Based Targeting",
      desc: "We capture users at the exact moment they are searching for your solutions, ensuring every click has high conversion potential.",
      icon: 'Target'
    },
    {
      title: "ROAS Optimization",
      desc: "Our primary focus is your bottom line. We optimize for Return on Ad Spend (ROAS) and Cost Per Acquisition (CPA), not just clicks.",
      icon: 'TrendingUp'
    },
    {
      title: "Data-Driven Scaling",
      desc: "We use rigorous A/B testing and statistical analysis to identify winning patterns and scale your budget efficiently.",
      icon: 'BarChart3'
    }
  ];

  const FALLBACK_PROCESS = [
    { 
      icon: 'Search', 
      title: "Account Audit", 
      desc: "Comprehensive review of your current campaign structure, keyword strategy, and wasted spend opportunities." 
    },
    { 
      icon: 'Settings', 
      title: "Campaign Architecture", 
      desc: "Building a scalable account structure with tightly themed ad groups and intent-mapped keyword clusters." 
    },
    { 
      icon: 'FileText', 
      title: "Ad Copy Engineering", 
      desc: "Writing high-converting ad copy that addresses user pain points and highlights your unique value propositions." 
    },
    { 
      icon: 'Zap', 
      title: "Bidding Strategy", 
      desc: "Implementing advanced automated and manual bidding strategies to maximize conversion volume within your target CPA." 
    },
    { 
      icon: 'PieChart', 
      title: "Performance Analysis", 
      desc: "Continuous monitoring and optimization of search terms, audience segments, and landing page performance." 
    }
  ];

  const features = pageData?.features || pageData?.service_grid || FALLBACK_FEATURES;
  const processSteps = pageData?.process_steps || FALLBACK_PROCESS;

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={pageData?.meta_title || "Paid Search Management | ROI-Focused PPC | Unified Platforms"}
        description={pageData?.meta_description || "Maximize your ROAS with expert Paid Search management. From Google Ads to Bing, we build high-converting search campaigns that drive sales velocity."}
      />
      
      {/* Hero Section */}
      <section className="bg-brand-dark py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-sm font-medium border border-brand-primary/30">
              Performance Paid Search
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              {pageData?.h1 || "Paid Search That Turns Ad Spend Into Revenue"}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {pageData?.description || "Stop wasting budget on clicks that don't convert. We build and manage high-performance Google Ads campaigns that capture intent and drive measurable business growth."}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#audit" className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2">
                Get Free Audit <ArrowRight size={20} />
              </a>
              <a href="#process" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                Our Framework
              </a>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img 
              src="https://picsum.photos/seed/paid-search-hero/800/600" 
              alt="Paid Search Management" 
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
              <div className="text-3xl font-bold text-brand-dark mb-1">ROI</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Focused Strategy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">100%</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Data Transparency</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">24/7</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Active Optimization</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">Expert</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Led Execution</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-brand-dark mb-6">Paid Search Management That Scales</h2>
              <p className="text-lg text-brand-gray leading-relaxed mb-6">
                Most businesses running Google Ads are leaving significant money on the table. They are bidding on broad keywords that attract the wrong audience and running ad copy that does not speak to buying intent.
              </p>
              <p className="text-lg text-brand-gray leading-relaxed">
                We manage Google Ads and paid search campaigns that drive qualified leads and measurable revenue through rigorous data analysis and continuous optimization.
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
                Our Paid Search <span className="text-brand-primary">Process</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                A systematic, data-driven framework designed to maximize your return on ad spend and scale your performance.
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
                  src="https://picsum.photos/seed/paid-search-process/600/800" 
                  alt="Paid Search Process" 
                  className="rounded-2xl w-full h-auto shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-brand-primary p-6 rounded-2xl shadow-xl hidden md:block">
                  <div className="text-3xl font-bold mb-1">ROAS</div>
                  <div className="text-xs uppercase tracking-widest font-bold opacity-80">Focused Optimization</div>
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
              <h2 className="text-4xl font-bold text-brand-dark">Get Your Free Paid Search Audit</h2>
              <p className="text-lg text-brand-gray leading-relaxed">
                Stop wasting ad spend on clicks that don't convert. Our audit identifies immediate opportunities to reduce waste and improve your conversion volume.
              </p>
              <ul className="space-y-4">
                {[
                  "Wasted spend & negative keyword audit",
                  "Campaign structure & match type review",
                  "Ad copy & Quality Score analysis",
                  "Conversion tracking & attribution check",
                  "Landing page conversion optimization"
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

      {/* Use Cases */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-brand-dark mb-12">Paid Search Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "B2B Lead Generation through Google Search Ads",
              "Ecommerce scaling with Shopping and Performance Max",
              "Remarketing lists for search ads (RLSA) for long sales cycles",
              "Microsoft Ads management for incremental reach",
              "Local service ads for high-intent geographic targeting",
              "Competitor conquesting to capture market share"
            ].map((item, i) => (
              <div key={i} className="flex items-start bg-gray-50 p-6 rounded-2xl group hover:bg-brand-primary/5 transition-colors duration-300">
                <CheckCircle className="text-brand-primary mr-4 flex-shrink-0 mt-1" size={20} />
                <span className="text-brand-gray font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-brand-dark text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { 
                q: "How much should I spend on Google Ads?", 
                a: "The right budget depends on your industry, your target keywords, and your revenue goals. We recommend starting with enough budget to generate at least 30 to 50 conversions per month at the campaign level." 
              },
              { 
                q: "How long does it take to see results from paid search?", 
                a: "Initial traffic and conversion data starts coming in from day one. However, meaningful optimization takes time. Most campaigns reach a stable, well-optimized state within 60 to 90 days." 
              },
              { 
                q: "We have tried Google Ads before and it did not work. Why would it be different now?", 
                a: "In most cases, Google Ads campaigns fail because of structural problems like overly broad keyword targeting, weak ad copy, or landing pages that do not match intent." 
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-brand-primary/30 transition-colors">
                <h3 className="font-bold text-xl mb-4 text-brand-dark flex items-center">
                  <MessageSquare className="text-brand-primary mr-3" size={20} />
                  {faq.q}
                </h3>
                <p className="text-brand-gray leading-relaxed pl-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-brand-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/seed/cta-bg-paid/1920/1080?blur=10" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-primary/40 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">Ready to turn your ad spend into revenue?</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Get a free paid search audit and discover how much budget you are currently leaving on the table.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="px-10 py-5 bg-white text-brand-primary font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl text-lg">
              Get Your Free Audit
            </a>
            <a href="/services/seo-strategy" className="px-10 py-5 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-dark/90 transition-all shadow-xl text-lg">
              Our Strategy Framework
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
