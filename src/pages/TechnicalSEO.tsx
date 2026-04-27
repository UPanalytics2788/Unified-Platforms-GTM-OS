import ServiceLayout from '../components/layout/ServiceLayout';
import { Target, BarChart3, Search, FileText, Settings, ShieldCheck, CheckCircle, Zap, ArrowRight, MessageSquare, Code, Server, Globe, Loader2 } from 'lucide-react';
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

  const FALLBACK_PROCESS = [
    { 
      icon: 'Search', 
      title: "Crawl Analysis", 
      desc: "Comprehensive crawl to identify indexing issues and redirect chains using enterprise-grade tools." 
    },
    { 
      icon: 'FileText', 
      title: "Indexation Review", 
      desc: "Analyze robots.txt and sitemaps to ensure proper search engine visibility." 
    },
    { 
      icon: 'BarChart3', 
      title: "Core Web Vitals", 
      desc: "Deep-dive optimization of page speed, LCP, FID, and CLS metrics." 
    },
    { 
      icon: 'Code', 
      title: "Structured Data", 
      desc: "Implementation of advanced schema markup to qualify for rich results." 
    }
  ];

  const FALLBACK_FEATURES = [
    {
      title: "Crawl Efficiency",
      desc: "We ensure search engines can index your most important pages without wasting crawl budget.",
      icon: 'Globe'
    },
    {
      title: "Speed Optimization",
      desc: "Technical performance is a direct ranking factor. We optimize for lightning-fast delivery.",
      icon: 'Zap'
    },
    {
      title: "Schema Engineering",
      desc: "Advanced structured data implementation that helps search engines understand context.",
      icon: 'Code'
    }
  ];

  const faqs = [
    { 
      question: "How do I know if my website has technical SEO problems?", 
      answer: "Common signs include declining organic traffic, pages not appearing in search, or poor Core Web Vitals scores." 
    },
    { 
       question: "Do you only identify technical issues or do you fix them as well?", 
       answer: "We do both. We provide developer-ready specs or our team can handle the implementation directly." 
    },
    { 
      question: "Will fixing technical SEO issues immediately improve my rankings?", 
      answer: "Some fixes show results in days. Performance optimizations typically show gradual improvement over weeks." 
    }
  ];

  const features = (pageData?.features || pageData?.service_grid || FALLBACK_FEATURES).map((f: any) => ({
    title: f.title,
    desc: f.desc || f.description,
    icon: f.icon
  }));

  const processSteps = (pageData?.process_steps || FALLBACK_PROCESS).map((s: any) => ({
    icon: s.icon,
    title: s.title || s.label,
    desc: s.desc || s.detail || s.description
  }));

  return (
    <ServiceLayout
      title="Technical SEO Engineering"
      metaTitle={pageData?.meta_title || "Technical SEO Audits & Implementation | Unified Platforms"}
      metaDescription={pageData?.meta_description || "Fix the technical foundations holding your website back. Unified Platforms delivers enterprise-grade technical SEO audits, site speed optimization, and schema engineering."}
      heroTitle={pageData?.h1 || "Technical SEO That Fixes What Search Engines Cannot Ignore"}
      heroSubtitle={pageData?.description || "Technical SEO is the infrastructure layer of your digital presence. We don't just find problems; we engineer solutions that create the perfect conditions for organic growth."}
      heroImage="https://picsum.photos/seed/tech-seo/800/600"
      stats={[
        { label: "Efficiency", value: "98%" },
        { label: "Load Time", value: "< 2s" },
        { label: "Readiness", value: "Mobile First" },
        { label: "Rich Snippets", value: "Optimized" }
      ]}
      features={features}
      processSteps={processSteps}
      faqs={faqs}
      ctaTitle="Want to know what is holding your website back?"
      ctaSubtitle="Get a deep-dive technical SEO audit that identifies every barrier between your content and search results."
    >
       {/* Diagnostic Section */}
       <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-brand-dark mb-6 tracking-tight uppercase">Engineering-Led Approach</h2>
              <p className="text-lg text-brand-gray leading-relaxed mb-6 font-light">
                At Unified Platforms, we don't treat technical SEO as a checklist. We treat it as an engineering challenge. We analyze crawl budget, render-blocking resources, and data structure to build a foundation that search engines love.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Log Analysis', 'Crawl Budget', 'JS Rendering', 'Schema Logic'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-mono text-brand-primary">
                    <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
               <h3 className="text-2xl font-bold mb-6 tracking-tight">Our Enterprise Toolstack</h3>
               <div className="flex flex-wrap gap-3">
                 {['Screaming Frog', 'Botify', 'DeepCrawl', 'Lighthouse', 'Console', 'Logz.io'].map((tool) => (
                   <span key={tool} className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-xs font-bold text-brand-gray">
                     {tool}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Issues Grid */}
      <section className="py-24 border-t border-gray-100 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 tracking-tight uppercase">Common Barriers We Eliminate</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Incorrect robots.txt crawl blocking",
              "Pagination & filter crawl budget waste",
              "Redirect chains & equity dilution",
              "Duplicate content via missing canonicals",
              "Core Web Vitals unoptimized assets",
              "Rich result prevention via schema errors",
              "Hreflang configuration failures",
              "Broken internal link infrastructure"
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 group hover:bg-brand-primary transition-all">
                <ShieldCheck className="text-brand-primary group-hover:text-white flex-shrink-0" size={24} />
                <span className="font-light text-gray-300 group-hover:text-white leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
}
