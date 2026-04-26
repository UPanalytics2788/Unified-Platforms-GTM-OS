import ServiceLayout from '../components/layout/ServiceLayout';
import AdvancedLeadForm from '../components/ui/AdvancedLeadForm';
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
    { icon: 'Target', title: "Discovery & Alignment", desc: "Before we look at keywords or competitors, we spend time understanding your business targets and funnel." },
    { icon: 'BarChart3', title: "Full SEO Audit", desc: "Technical health, on-page optimization, and off-page analysis to identify gains." },
    { icon: 'Search', title: "Competitive Analysis", desc: "Map out who is winning in organic search in your space, analyze their strategies, and identify gaps." },
    { icon: 'FileText', title: "Keyword Research", desc: "Build a complete keyword universe mapped to topic clusters and the buyer journey." },
    { icon: 'Settings', title: "Architecture Planning", desc: "Define website architecture and content plans to pass authority efficiently." },
    { icon: 'PieChart', title: "Technical Roadmap", desc: "Prioritized list of technical improvements, ranked by impact." },
    { icon: 'LinkIcon', title: "Link Building", desc: "Sustainable approach to earning backlinks through digital PR and assets." },
    { icon: 'ShieldCheck', title: "Measurement Framework", desc: "Set up tracking for organic sessions, keyword movements, and attribution." }
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
      title="SEO Strategy"
      metaTitle={pageData?.meta_title || "Custom SEO Strategy | Growth Frameworks | Unified Platforms"}
      metaDescription={pageData?.meta_description || "Unified Platforms builds custom SEO strategies that drive measurable organic growth. Our revenue-first framework connects every SEO action to your business objectives."}
      heroTitle={pageData?.h1 || "SEO Strategy That Drives Real Organic Growth"}
      heroSubtitle={pageData?.description || "Most businesses spend months publishing content without seeing results. We build the strategic framework that connects every action to your larger business objectives."}
      heroImage={pageData?.imageUrl || "https://picsum.photos/seed/seo-strategy/800/600"}
      stats={[
        { label: "Strategy", value: "100% Custom" },
        { label: "Focus", value: "ROI Driven" },
        { label: "Monitoring", value: "24/7" },
        { label: "Execution", value: "Expert Led" }
      ]}
      features={features}
      processSteps={processSteps}
      faqs={faqs}
    >
      {/* Specific Content for SEO Strategy */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-brand-dark mb-6 tracking-tight">What Is an SEO Strategy and Why Does It Matter</h2>
              <p className="text-lg text-brand-gray leading-relaxed mb-6 font-light">
                An SEO strategy is a long-term plan that defines which keywords to target, how to structure your website, what content to create, and how to build authority in your niche.
              </p>
              <p className="text-lg text-brand-gray leading-relaxed font-light">
                Without a strategy, SEO becomes reactive. You end up chasing algorithm updates and copying competitors without context. With a strategy, every action has a reason and every result is measurable.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
               <h3 className="text-2xl font-bold text-brand-dark mb-6 tracking-tight">Comparison: The Unified approach</h3>
               <div className="space-y-4">
                 {[
                   { label: "Generic SEO", value: "Tactical keyword stuffing and backlink spam.", color: "text-red-500" },
                   { label: "Unified Strategy", value: "Strategic topic clustering mapped to search intent and revenue.", color: "text-brand-primary" }
                 ].map((item, i) => (
                   <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                     <div className={`font-bold min-w-[120px] ${item.color}`}>{item.label}:</div>
                     <div className="text-brand-gray text-sm">{item.value}</div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-brand-dark mb-12 tracking-tight">Who Our SEO Strategy Service Is For</h2>
          <ul className="grid md:grid-cols-2 gap-6">
            {[
              "Startups and new websites that need to build organic presence efficiently without wasting budget on the wrong activities",
              "Established businesses whose organic traffic has plateaued or declined and need a clear diagnosis and path forward",
              "Companies entering new markets or launching new product lines that need targeted SEO plans for specific audience segments",
              "Businesses that have been running SEO activities in-house or through multiple vendors without a cohesive plan connecting all the work",
              "Brands preparing for website migrations or redesigns who need to protect and grow their existing SEO equity"
            ].map((item, i) => (
              <li key={i} className="flex items-start bg-gray-50 p-6 rounded-2xl group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-brand-primary/10">
                <CheckCircle className="text-brand-primary mr-4 flex-shrink-0 mt-1" size={20} />
                <span className="text-brand-gray font-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="py-24 bg-brand-dark text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 tracking-tight">What Separates a Strong SEO Strategy From a Weak One</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-8 font-light">
            Most SEO strategies fail because they are too generic. A strong SEO strategy is specific. It tells you exactly which 20 keywords to target first and why. It defines a content publishing cadence that matches your resources. And it connects every activity to a revenue or lead generation outcome. At Unified Platforms, we do not sell SEO strategy templates. Every strategy is built from scratch based on your data, your market, and your goals.
          </p>
        </div>
      </section>
    </ServiceLayout>
  );
}
