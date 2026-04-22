import SEO from '../components/SEO';
import AdvancedLeadForm from '../components/ui/AdvancedLeadForm';
import SchemaMarkup from '../components/ui/SchemaMarkup';
import * as Icons from 'lucide-react';
import { Target, BarChart3, Search, FileText, Settings, Link as LinkIcon, PieChart, ShieldCheck, CheckCircle, Loader2, ArrowRight, MessageSquare, Zap, TrendingUp } from 'lucide-react';
import { useCMSDocument } from '../hooks/useCMSDocument';

export default function SEOStrategy() {
  const { data: pageData, loading } = useCMSDocument('services', 'seo-strategy');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <Loader2 className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  const faqs = pageData?.faqs || [
    { question: "How long does it take to see results from an SEO strategy?", answer: "For most websites, the first noticeable improvements in keyword rankings appear within 60 to 90 days of beginning execution. Meaningful organic traffic growth typically follows within four to six months." },
    { question: "What is the difference between an SEO strategy and just doing SEO?", answer: "Doing SEO without a strategy means executing individual tactics without a clear framework. An SEO strategy defines which keywords to target and why, how to structure your content, and what technical issues to prioritize." },
    { question: "Do you work with businesses in all industries?", answer: "Yes. We have developed SEO strategies across industries including professional services, ecommerce, SaaS, healthcare, and B2B." },
    { question: "How do you handle SEO strategy for a website that is planning a redesign?", answer: "We document your current organic equity before any redesign begins and work with your development team to ensure the new site architecture preserves and builds on that equity." },
    { question: "Can you take over an existing SEO strategy and improve it?", answer: "Absolutely. We start by auditing what has been done, what is working, and what is not, then build a revised strategy that builds on the existing foundation." }
  ];

  const FALLBACK_FEATURES = [
    {
      title: "Data-Driven Framework",
      desc: "We don't guess. We use deep data analysis to identify the highest-impact opportunities for your specific business.",
      icon: 'BarChart3'
    },
    {
      title: "Revenue-First Approach",
      desc: "Our strategies are built to drive leads and sales, not just vanity metrics like impressions or rankings.",
      icon: 'TrendingUp'
    },
    {
      title: "Competitive Advantage",
      desc: "We analyze your competitors' playbooks to find the gaps they've missed and the strengths we can neutralize.",
      icon: 'Target'
    }
  ];

  const FALLBACK_PROCESS = [
    { icon: 'Target', title: "Discovery & Alignment", desc: "Before we look at keywords or competitors, we spend time understanding your business. What are your revenue targets? Who is your ideal customer? What does your current customer acquisition funnel look like?" },
    { icon: 'BarChart3', title: "Full SEO Audit", desc: "Technical health, on-page optimization, and off-page analysis to identify immediate and long-term gains." },
    { icon: 'Search', title: "Competitive & Market Analysis", desc: "Map out who is winning in organic search in your space, analyze their strategies, and identify gaps." },
    { icon: 'FileText', title: "Keyword Research", desc: "Build a complete keyword universe mapped to topic clusters and the buyer journey." },
    { icon: 'Settings', title: "Architecture Planning", desc: "Define website architecture and content plans to pass authority efficiently." },
    { icon: 'PieChart', title: "Technical Roadmap", desc: "Prioritized list of technical improvements, ranked by impact." },
    { icon: 'LinkIcon', title: "Link Building", desc: "Sustainable approach to earning backlinks through digital PR and content assets." },
    { icon: 'ShieldCheck', title: "Measurement Framework", desc: "Set up tracking for organic sessions, keyword movements, and revenue attribution." }
  ];

  const features = pageData?.features || pageData?.service_grid || FALLBACK_FEATURES;
  const processSteps = pageData?.process_steps || FALLBACK_PROCESS;

  const renderIcon = (iconName: string, size = 24, className = "") => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComponent size={size} className={className} />;
  };

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={pageData?.meta_title || "SEO Strategy Services | Unified Platforms"}
        description={pageData?.meta_description || "Unified Platforms builds custom SEO strategies that drive organic growth, improve rankings, and generate qualified leads. Get a free audit today."}
      />
      <SchemaMarkup type="Service" data={{
        title: pageData?.title || "SEO Strategy Services",
        description: pageData?.description || "Unified Platforms builds custom SEO strategies that drive organic growth, improve rankings, and generate qualified leads."
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
              Enterprise SEO Strategy
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              {pageData?.h1 || "SEO Strategy That Drives Real Organic Growth"}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {pageData?.description || "Most businesses spend months publishing content without seeing results. We build the strategic framework that connects every action to your larger business objectives."}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2">
                Get Started <ArrowRight size={20} />
              </a>
              <a href="#process" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                Our Framework
              </a>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img 
              src={pageData?.imageUrl || "https://picsum.photos/seed/seo-hero/800/600"} 
              alt="SEO Strategy" 
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

      {/* Value Proposition */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-brand-dark mb-6">What Is an SEO Strategy and Why Does It Matter</h2>
              <p className="text-lg text-brand-gray leading-relaxed mb-6">
                An SEO strategy is a long-term plan that defines which keywords to target, how to structure your website, what content to create, and how to build authority in your niche.
              </p>
              <p className="text-lg text-brand-gray leading-relaxed">
                Without a strategy, SEO becomes reactive. You end up chasing algorithm updates and copying competitors without context. With a strategy, every action has a reason and every result is measurable.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, i) => (
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

      {/* Process */}
      <section id="process" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-6">Our SEO Strategy Process</h2>
            <p className="text-lg text-brand-gray">A systematic, data-driven framework designed to identify opportunities and scale your organic presence.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                  {renderIcon(step.icon, 28, "text-brand-primary group-hover:text-white")}
                </div>
                <h3 className="font-bold text-xl mb-3 text-brand-dark">{step.title || step.label}</h3>
                <p className="text-brand-gray leading-relaxed text-sm">{step.desc || step.detail || step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-brand-dark text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">Results You Can Expect</h2>
            <p className="text-xl text-gray-400">We set honest expectations based on your industry and domain authority.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { label: "90 Days", title: "Measurable Improvements", desc: "First noticeable improvements in keyword rankings and impressions." },
              { label: "6 Months", title: "Meaningful Growth", desc: "Organic traffic begins to scale as content and technical fixes compound." },
              { label: "2 Years", title: "Compounding Authority", desc: "Dominating high-volume head terms as domain authority reaches peak levels." }
            ].map((item, i) => (
              <div key={i} className="relative p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                <div className="text-4xl font-bold text-brand-primary mb-4">{item.label}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-4">Our Technology Stack</p>
            <h2 className="text-3xl font-bold text-brand-dark">Industry-Leading Tools We Use</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {['SEMrush', 'Ahrefs', 'Screaming Frog', 'Search Console', 'GA4', 'Hotjar'].map((tool) => (
              <div key={tool} className="text-xl font-bold text-brand-gray">{tool}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-brand-dark mb-12">Who Our SEO Strategy Service Is For</h2>
          <ul className="grid md:grid-cols-2 gap-6">
            {[
              "Startups and new websites that need to build organic presence efficiently without wasting budget on the wrong activities",
              "Established businesses whose organic traffic has plateaued or declined and need a clear diagnosis and path forward",
              "Companies entering new markets or launching new product lines that need targeted SEO plans for specific audience segments",
              "Businesses that have been running SEO activities in-house or through multiple vendors without a cohesive plan connecting all the work",
              "Brands preparing for website migrations or redesigns who need to protect and grow their existing SEO equity"
            ].map((item, i) => (
              <li key={i} className="flex items-start bg-gray-50 p-6 rounded-xl">
                <CheckCircle className="text-brand-primary mr-4 flex-shrink-0 mt-1" size={20} />
                <span className="text-brand-gray">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Highlight */}
      <section className="py-20 bg-brand-dark text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">What Separates a Strong SEO Strategy From a Weak One</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Most SEO strategies fail because they are too generic. They list standard best practices without accounting for the specific competitive environment, the website stage, the available resources, or the business model. A strong SEO strategy is specific. It tells you exactly which 20 keywords to target first and why. It explains which technical issues to fix in which order based on their actual impact on your specific site. It defines a content publishing cadence that matches your resources. And it connects every activity to a revenue or lead generation outcome. At Unified Platforms, we do not sell SEO strategy templates. Every strategy is built from scratch based on your data, your market, and your goals.
          </p>
        </div>
      </section>

      {/* Integration & Reporting */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-brand-dark mb-6">Integration With Other Services</h2>
            <p className="text-brand-gray leading-relaxed">
              SEO strategy does not exist in isolation. At Unified Platforms, our SEO strategy integrates directly with our Technical SEO, Content SEO, Authority Building, and Local SEO services. This means the strategy we build is one that our own teams can execute end to end, ensuring consistency between planning and implementation. For clients also running paid search campaigns, we align the SEO strategy with Google Ads targeting to reduce overlap and maximize total search visibility across both organic and paid channels.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-brand-dark mb-6">Reporting and Ongoing Strategy Refinement</h2>
            <p className="text-brand-gray leading-relaxed">
              SEO is not a one-time plan. Search behavior evolves, competitors adapt, and algorithm updates change what gets rewarded. We review and update your SEO strategy on a regular basis, incorporating new data, new keyword opportunities, and lessons from what is working. Monthly reporting covers keyword ranking movements, organic traffic trends, top-performing pages, backlink growth, and progress against your defined goals. Quarterly strategy reviews assess whether the overall direction needs to shift based on market changes or business priorities.
            </p>
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
      <section className="py-20 bg-brand-primary text-white text-center relative overflow-hidden">
        <img 
          src="https://picsum.photos/seed/cta-bg/1920/1080?blur=4" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to build an SEO strategy that drives real growth?</h2>
          <p className="text-xl mb-8">Contact Unified Platforms for a free audit and strategy consultation.</p>
          <a href="/contact" className="inline-block px-8 py-4 bg-white text-brand-primary font-bold rounded-xl hover:bg-gray-100 transition-all">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
