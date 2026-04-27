import ServiceLayout from '../components/layout/ServiceLayout';
import AdvancedLeadForm from '../components/ui/AdvancedLeadForm';
import { Target, BarChart3, Search, FileText, Settings, ShieldCheck, CheckCircle, Zap, ArrowRight, MessageSquare, TrendingUp, Loader2 } from 'lucide-react';
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
      desc: "Comprehensive review of your current campaign structure and wasted spend opportunities." 
    },
    { 
      icon: 'Settings', 
      title: "Campaign Architecture", 
      desc: "Building a scalable account structure with intent-mapped keyword clusters." 
    },
    { 
      icon: 'FileText', 
      title: "Ad Copy Engineering", 
      desc: "Writing high-converting ad copy that addresses user pain points and unique value propositions." 
    },
    { 
      icon: 'Zap', 
      title: "Bidding Strategy", 
      desc: "Implementing advanced automated and manual bidding strategies to maximize conversion volume." 
    }
  ];

  const faqs = [
    { 
      question: "How much should I spend on Google Ads?", 
      answer: "The right budget depends on your industry, target keywords, and revenue goals. We recommend enough budget to generate at least 30-50 conversions per month at the campaign level." 
    },
    { 
      question: "How long does it take to see results from paid search?", 
      answer: "Initial traffic and conversion data starts coming in from day one. Most campaigns reach a stable, well-optimized state within 60 to 90 days." 
    },
    { 
      question: "We have tried Google Ads before and it did not work. Why would it be different now?", 
      answer: "Most Google Ads campaigns fail because of structural problems like overly broad keyword targeting, weak ad copy, or landing pages that do not match intent." 
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
      title="Performance Paid Search"
      metaTitle={pageData?.meta_title || "Sales Velocity Paid Search | ROI-Focused PPC | GTM OS"}
      metaDescription={pageData?.meta_description || "Maximize your ROAS with expert Paid Search management. From Google Ads to Bing, we build high-converting search campaigns that drive sales velocity."}
      heroTitle={pageData?.h1 || "Paid Search That Turns Ad Spend Into Revenue"}
      heroSubtitle={pageData?.description || "Stop wasting budget on clicks that don't convert. We build and manage high-performance Google Ads campaigns that capture intent and drive measurable business growth."}
      heroImage="https://picsum.photos/seed/paid-search/800/600"
      stats={[
        { label: "Focus", value: "ROI Driven" },
        { label: "Reporting", value: "Real-time" },
        { label: "Monitoring", value: "24/7" },
        { label: "Execution", value: "Expert Led" }
      ]}
      features={features}
      processSteps={processSteps}
      faqs={faqs}
      ctaTitle="Ready to turn your ad spend into revenue?"
      ctaSubtitle="Get a free paid search audit and discover how much budget you are currently leaving on the table."
    >
       {/* Comparison Section */}
       <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-brand-dark mb-6 tracking-tight">PPC Management That Actually Scales</h2>
              <p className="text-lg text-brand-gray leading-relaxed mb-6 font-light">
                Most businesses running Google Ads are leaving significant money on the table. They are bidding on broad keywords that attract the wrong audience and running ad copy that does not speak to buying intent.
              </p>
              <p className="text-lg text-brand-gray leading-relaxed font-light">
                At GTM OS, we apply a high-performance framework to your paid search—focusing on ROAS, Sales Velocity, and conversion funnels that convert cold traffic into revenue.
              </p>
            </div>
            <div className="bg-brand-dark p-10 rounded-3xl text-white shadow-2xl">
               <h3 className="text-2xl font-bold mb-6 tracking-tight">The Unified Advantage</h3>
               <div className="space-y-6">
                 {[
                   { label: "Waste Reduction", value: "Advanced negative keyword harvesting and match type filtering." },
                   { label: "Intent Mapping", value: "Aligning every ad group with a specific stage of the buyer journey." },
                   { label: "Attribution", value: "Going beyond the last click to understand the true impact of every search." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4">
                     <CheckCircle className="text-brand-primary flex-shrink-0 mt-1" size={20} />
                     <div>
                       <div className="font-bold text-brand-primary">{item.label}</div>
                       <div className="text-gray-400 text-sm leading-relaxed">{item.value}</div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-brand-dark mb-12 tracking-tight">Strategic Paid Search Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "B2B Lead Generation through Google Search Ads",
              "Ecommerce scaling with Shopping and Performance Max",
              "Remarketing lists for search ads (RLSA) for long sales cycles",
              "Microsoft Ads management for incremental reach",
              "Local service ads for high-intent geographic targeting",
              "Competitor conquesting to capture market share"
            ].map((item, i) => (
              <div key={i} className="flex items-start bg-gray-50 p-6 rounded-2xl group hover:bg-brand-primary hover:text-white transition-all">
                <CheckCircle className="text-brand-primary group-hover:text-white mr-4 flex-shrink-0 mt-1" size={20} />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
}
