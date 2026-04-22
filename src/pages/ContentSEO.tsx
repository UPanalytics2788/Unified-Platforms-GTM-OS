import SEO from '../components/SEO';
import AdvancedLeadForm from '../components/ui/AdvancedLeadForm';
import SchemaMarkup from '../components/ui/SchemaMarkup';
import * as Icons from 'lucide-react';
import { Target, BarChart3, Search, FileText, Settings, CheckCircle, Link, Globe, ShieldCheck, ArrowRight, MessageSquare, Zap, Users, PieChart, PenTool, Layers, Loader2 } from 'lucide-react';
import { useCMSDocument } from '../hooks/useCMSDocument';

export default function ContentSEO() {
  const { data: pageData, loading } = useCMSDocument('services', 'content-seo');

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
      question: "What is Content SEO?", 
      answer: "Content SEO is the practice of creating and optimizing content to rank high in search engines and attract targeted organic traffic. It involves keyword research, intent optimization, and structural planning." 
    },
    { 
      question: "How is this different from regular copywriting?", 
      answer: "Regular copywriting focuses primarily on persuasion and brand voice. Content SEO combines that with data-driven search engine requirements, ensuring the content actually gets found by your target audience." 
    },
    { 
      question: "How long does it take to see results from content?", 
      answer: "While a single piece of content can rank in weeks, building topical authority and seeing significant traffic growth typically takes 3-6 months of consistent, strategic publishing." 
    },
    { 
      question: "Do you use AI to write content?", 
      answer: "We use AI for research, outlining, and data analysis, but all final content is written, edited, and fact-checked by human experts to ensure quality, nuance, and E-E-A-T compliance." 
    }
  ];

  const FALLBACK_PROCESS = [
    { 
      icon: 'Search', 
      title: "Audience & Intent Research", 
      desc: "Understanding your buyers and mapping their search journey to identify high-value opportunities." 
    },
    { 
      icon: 'Layers', 
      title: "Topical Map Creation", 
      desc: "Structuring content clusters to build comprehensive domain authority and signal expertise." 
    },
    { 
      icon: 'Settings', 
      title: "Content Brief Engineering", 
      desc: "Creating data-backed outlines that guarantee search engine relevance and structural perfection." 
    },
    { 
      icon: 'PenTool', 
      title: "Expert Content Creation", 
      desc: "Writing high-quality, engaging content that satisfies user intent and drives conversions." 
    },
    { 
      icon: 'BarChart3', 
      title: "Performance Optimization", 
      desc: "Iterative updates based on real-world ranking and engagement data to maintain top positions." 
    }
  ];

  const FALLBACK_FEATURES = [
    {
      title: "Topical Authority Mapping",
      desc: "We build comprehensive content clusters that signal deep expertise to search engines, lifting your entire domain.",
      icon: 'Layers'
    },
    {
      title: "Search Intent Optimization",
      desc: "Every piece is engineered to match exactly what the user and Google are looking for, maximizing engagement.",
      icon: 'Target'
    },
    {
      title: "E-E-A-T Alignment",
      desc: "We ensure your content demonstrates Experience, Expertise, Authoritativeness, and Trustworthiness.",
      icon: 'ShieldCheck'
    }
  ];

  const features = pageData?.features || pageData?.service_grid || FALLBACK_FEATURES;
  const processSteps = pageData?.process_steps || FALLBACK_PROCESS;

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={pageData?.meta_title || "Content SEO Services | Unified Platforms"}
        description={pageData?.meta_description || "Drive organic growth with data-driven Content SEO. Unified Platforms creates high-ranking, engaging content that builds topical authority and converts."}
      />
      <SchemaMarkup type="Service" data={{
        title: pageData?.title || "Content SEO Services",
        description: pageData?.description || "Drive organic growth with data-driven Content SEO. Unified Platforms creates high-ranking, engaging content that builds topical authority and converts."
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
              Content SEO Engineering
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              {pageData?.h1 || "Content SEO That Builds Topical Authority and Drives Revenue"}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {pageData?.description || "We don't just write articles; we engineer content ecosystems. Our data-driven approach ensures every piece of content ranks, engages, and converts."}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#audit" className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2">
                Get Content Audit <ArrowRight size={20} />
              </a>
              <a href="#process" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                Our Strategy
              </a>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img 
              src="https://picsum.photos/seed/content-seo-hero/800/600" 
              alt="Content SEO Strategy" 
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
              <div className="text-3xl font-bold text-brand-dark mb-1">300%</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Avg. Traffic Growth</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">100%</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Original Content</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">4.5x</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Lead Generation</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">Top 3</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Target Rankings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-brand-dark mb-6">Strategic Content Engineering</h2>
              <p className="text-lg text-brand-gray leading-relaxed mb-6">
                Creating content in a vacuum is a waste of resources. To win in search, your content must be structurally sound, topically relevant, and better than the competition.
              </p>
              <p className="text-lg text-brand-gray leading-relaxed">
                At Unified Platforms, we treat content as a compounding asset. We build topical maps that cover entire subjects comprehensively, signaling to search engines that your brand is the ultimate authority in your space.
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
                A Systematic Approach to <span className="text-brand-primary">Content SEO</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                We remove the guesswork from content creation. Our process is rooted in data, intent analysis, and structural optimization.
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
                  src="https://picsum.photos/seed/content-process/600/800" 
                  alt="Our Content Process" 
                  className="rounded-2xl w-full h-auto shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-brand-primary p-6 rounded-2xl shadow-xl hidden md:block">
                  <div className="text-3xl font-bold mb-1">Data-Driven</div>
                  <div className="text-xs uppercase tracking-widest font-bold opacity-80">Content Engineering</div>
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
              <h2 className="text-4xl font-bold text-brand-dark">Get Your Content SEO Audit</h2>
              <p className="text-lg text-brand-gray leading-relaxed">
                Identify content gaps, keyword opportunities, and structural issues holding your organic growth back.
              </p>
              <ul className="space-y-4">
                {[
                  "Content gap analysis",
                  "Keyword cannibalization check",
                  "Topical authority assessment",
                  "Content quality & E-E-A-T review",
                  "Actionable growth roadmap"
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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="https://picsum.photos/seed/content-case1/400/500" alt="Case 1" className="rounded-2xl w-full h-64 object-cover" referrerPolicy="no-referrer" />
                  <img src="https://picsum.photos/seed/content-case2/400/300" alt="Case 2" className="rounded-2xl w-full h-48 object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4 pt-8">
                  <img src="https://picsum.photos/seed/content-case3/400/300" alt="Case 3" className="rounded-2xl w-full h-48 object-cover" referrerPolicy="no-referrer" />
                  <img src="https://picsum.photos/seed/content-case4/400/500" alt="Case 4" className="rounded-2xl w-full h-64 object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-4xl font-bold text-brand-dark">Tailored Content Strategies</h2>
              <p className="text-lg text-brand-gray leading-relaxed">
                We build content engines that match your business model and industry requirements.
              </p>
              <ul className="space-y-4">
                {[
                  "B2B SaaS: Comprehensive guides, whitepapers, and feature comparisons",
                  "E-commerce: Category optimization, buying guides, and product content",
                  "Professional Services: Thought leadership, case studies, and industry insights",
                  "Local Business: Location-specific content and service pages",
                  "Publishers: News optimization, evergreen content, and topical clusters"
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
            <h2 className="text-3xl font-bold text-brand-dark">Tools We Use for Content SEO</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Ahrefs', 'Surfer SEO', 'Clearscope', 'MarketMuse', 'Google Search Console', 'Semrush'].map((tool) => (
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
                  <MessageSquare className="text-brand-primary mr-3 flex-shrink-0" size={20} />
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
            src="https://picsum.photos/seed/cta-bg-content/1920/1080?blur=10" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-primary/40 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">Ready to dominate your industry's search results?</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Stop guessing what content will work. Build a data-driven content engine that drives predictable organic growth.
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
