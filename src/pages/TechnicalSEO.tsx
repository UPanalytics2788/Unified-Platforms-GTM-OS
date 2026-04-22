import SEO from '../components/SEO';
import AdvancedLeadForm from '../components/ui/AdvancedLeadForm';
import SchemaMarkup from '../components/ui/SchemaMarkup';
import * as Icons from 'lucide-react';
import { Target, BarChart3, Search, FileText, Settings, Link, PieChart, ShieldCheck, CheckCircle, Loader2, Globe, Server, Code, Zap, ArrowRight, MessageSquare } from 'lucide-react';
import { useCMSDocument } from '../hooks/useCMSDocument';

export default function TechnicalSEO() {
  const { data: pageData, loading } = useCMSDocument('services', 'technical-seo');

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
      question: "How do I know if my website has technical SEO problems?", 
      answer: "Common warning signs include declining organic traffic, pages not appearing in search results, poor Core Web Vitals scores in Search Console, or sudden drops in indexed pages." 
    },
    { 
      question: "How long does a technical SEO audit take?", 
      answer: "For most websites, a comprehensive audit takes one to two weeks. Enterprise sites with millions of URLs may take longer for a full log file and crawl analysis." 
    },
    { 
      question: "Do you only identify technical issues or do you fix them as well?", 
      answer: "We do both. We provide developer-ready specifications for your team, or our in-house engineering team can handle the implementation directly." 
    },
    { 
      question: "Will fixing technical SEO issues immediately improve my rankings?", 
      answer: "Some fixes, like robots.txt errors, can show results in days. Performance optimizations typically show gradual improvement over weeks as search engines recrawl and re-evaluate your site." 
    }
  ];

  const FALLBACK_PROCESS = [
    { 
      icon: 'Search', 
      title: "Crawl Analysis", 
      desc: "Comprehensive crawl to identify indexing issues, orphaned pages, and redirect chains using enterprise-grade tools." 
    },
    { 
      icon: 'FileText', 
      title: "Indexation Review", 
      desc: "Analyze robots.txt, canonicals, and sitemaps to ensure proper search engine visibility and crawl budget efficiency." 
    },
    { 
      icon: 'BarChart3', 
      title: "Core Web Vitals", 
      desc: "Deep-dive optimization of page speed, LCP, FID, and CLS metrics for better rankings and user experience." 
    },
    { 
      icon: 'Code', 
      title: "Structured Data", 
      desc: "Implementation of advanced schema markup to improve search listings and qualify for rich results." 
    },
    { 
      icon: 'Server', 
      title: "JavaScript SEO", 
      desc: "Testing and optimizing how search engines render your JavaScript-based content for full indexability." 
    }
  ];

  const FALLBACK_FEATURES = [
    {
      title: "Crawl Efficiency",
      desc: "We ensure search engines can find and index your most important pages without wasting crawl budget on low-value URLs.",
      icon: 'Globe'
    },
    {
      title: "Speed Optimization",
      desc: "Technical performance isn't just for users; it's a direct ranking factor. We optimize for lightning-fast delivery.",
      icon: 'Zap'
    },
    {
      title: "Schema Engineering",
      desc: "Advanced structured data implementation that helps search engines understand your content's context and relationships.",
      icon: 'Code'
    }
  ];

  const features = pageData?.features || pageData?.service_grid || FALLBACK_FEATURES;
  const processSteps = pageData?.process_steps || FALLBACK_PROCESS;

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={pageData?.meta_title || "Technical SEO Services | Unified Platforms"}
        description={pageData?.meta_description || "Fix the technical foundations holding your website back. Unified Platforms delivers comprehensive technical SEO audits and implementation for better rankings and crawlability."}
      />
      <SchemaMarkup type="Service" data={{
        title: pageData?.title || "Technical SEO Services",
        description: pageData?.description || "Fix the technical foundations holding your website back. Unified Platforms delivers comprehensive technical SEO audits and implementation for better rankings and crawlability."
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
              Technical SEO Engineering
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              {pageData?.h1 || "Technical SEO That Fixes What Search Engines Cannot Ignore"}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {pageData?.description || "Technical SEO is the infrastructure layer of your digital presence. We don't just find problems; we engineer solutions that create the perfect conditions for organic growth."}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#audit" className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2">
                Get Technical Audit <ArrowRight size={20} />
              </a>
              <a href="#process" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                Our Process
              </a>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img 
              src="https://picsum.photos/seed/technical-seo-hero/800/600" 
              alt="Technical SEO" 
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
              <div className="text-3xl font-bold text-brand-dark mb-1">98%</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Crawl Efficiency</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">&lt; 2s</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Avg. Load Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">100%</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Mobile Readiness</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">Rich</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Snippet Success</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-brand-dark mb-6">The Foundations of Search Success</h2>
              <p className="text-lg text-brand-gray leading-relaxed mb-6">
                Technical SEO addresses the infrastructure layer of your website. It is the work that creates the conditions for everything else in your SEO program to function properly.
              </p>
              <p className="text-lg text-brand-gray leading-relaxed">
                We don't just find problems; we engineer solutions that ensure search engines can find, crawl, and index your most important content without friction.
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
                Our Technical <span className="text-brand-primary">Audit Framework</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                We don't just run automated tools. We perform deep manual diagnostics to identify the root causes of performance and indexing issues.
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
                  src="https://picsum.photos/seed/technical-process/600/800" 
                  alt="Technical Audit Process" 
                  className="rounded-2xl w-full h-auto shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-brand-primary p-6 rounded-2xl shadow-xl hidden md:block">
                  <div className="text-3xl font-bold mb-1">100+</div>
                  <div className="text-xs uppercase tracking-widest font-bold opacity-80">Checkpoints Audited</div>
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
              <h2 className="text-4xl font-bold text-brand-dark">Get Your Free Technical SEO Audit</h2>
              <p className="text-lg text-brand-gray leading-relaxed">
                Identify the technical barriers holding your website back. Our audit provides a prioritized roadmap of fixes that will have the most immediate impact on your rankings.
              </p>
              <ul className="space-y-4">
                {[
                  "Crawl budget waste analysis",
                  "Core Web Vitals performance review",
                  "Indexation & robots.txt audit",
                  "Schema markup validation",
                  "Mobile-first indexing readiness check"
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

      {/* Common Issues */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-brand-dark mb-12">Common Technical SEO Issues We Fix</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Pages blocked from crawling or indexing by incorrect robots.txt rules",
              "Crawl budget waste caused by paginated URLs and filter parameters",
              "Redirect chains and loops that dilute link equity and slow page loading",
              "Missing or incorrect canonical tags that create duplicate content",
              "Core Web Vitals failures caused by unoptimized assets",
              "Schema markup errors that prevent rich results from appearing",
              "Hreflang configuration errors on multilingual sites",
              "Broken internal and external links harming user experience"
            ].map((item, i) => (
              <div key={i} className="flex items-start bg-gray-50 p-6 rounded-2xl group hover:bg-brand-primary/5 transition-colors duration-300">
                <CheckCircle className="text-brand-primary mr-4 flex-shrink-0 mt-1" size={20} />
                <span className="text-brand-gray font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-4">Our Technology Stack</h3>
            <h2 className="text-3xl font-bold text-brand-dark">Enterprise Tools for Precision Diagnostics</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Screaming Frog', 'Botify', 'DeepCrawl', 'PageSpeed Insights', 'Search Console', 'Logz.io'].map((tool) => (
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
            src="https://picsum.photos/seed/cta-bg-tech/1920/1080?blur=10" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-primary/40 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">Want to know what is holding your website back?</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Get a deep-dive technical SEO audit that identifies every barrier between your content and the top of search results.
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
