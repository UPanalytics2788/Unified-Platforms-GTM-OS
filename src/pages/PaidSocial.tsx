import SEO from '../components/SEO';
import AdvancedLeadForm from '../components/ui/AdvancedLeadForm';
import { Target, BarChart3, Search, FileText, Settings, CheckCircle, Zap, TrendingUp, Users, MessageSquare, ShieldCheck, ArrowRight, Facebook, Instagram, Linkedin, Youtube, Twitter, Share2, MousePointerClick, Megaphone, Layout, Layers, PieChart, Loader2 } from 'lucide-react';
import { useCMSDocument } from '../hooks/useCMSDocument';

export default function PaidSocial() {
  const { data: pageData, loading } = useCMSDocument('services', 'paid-social');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <Loader2 className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }
  
  const platforms = [
    {
      name: "Meta Ads",
      desc: "Facebook and Instagram remain the most powerful paid social platforms for B2C and increasingly B2B. We manage full-funnel campaigns from broad prospecting to dynamic retargeting.",
      icon: Facebook
    },
    {
      name: "LinkedIn Ads",
      desc: "The primary platform for B2B. We target by job title, seniority, company size, and industry to reach decision-makers with Sponsored Content and Lead Gen Forms.",
      icon: Linkedin
    },
    {
      name: "Instagram Ads",
      desc: "Dedicated creative and placement strategies that treat Instagram as a distinct channel with its own consumption patterns, rather than just another Meta placement.",
      icon: Instagram
    },
    {
      name: "YouTube Ads",
      desc: "Combining Google's targeting with the power of video. We manage skippable in-stream, bumper, and YouTube Select placements for brand awareness and conversion.",
      icon: Youtube
    },
    {
      name: "X (Twitter) & Pinterest",
      desc: "Strategic placement on platforms where audience relevance is high, from news-adjacent tech brands on X to visual product discovery on Pinterest.",
      icon: Share2
    }
  ];

  const processSteps = [
    { 
      icon: Users, 
      title: "Audience Strategy & Mapping", 
      desc: "Defining the audience architecture across awareness, consideration, and conversion stages using demographics, interests, and customer match lists." 
    },
    { 
      icon: Layout, 
      title: "Creative Strategy & Briefing", 
      desc: "Developing messaging angles and visual formats built specifically for social performance, with a testing framework to identify winning creative." 
    },
    { 
      icon: Layers, 
      title: "Campaign Build & Pixel Setup", 
      desc: "Clean account structure with audited tracking configuration (Meta Pixel, LinkedIn Insight Tag) to ensure platforms receive accurate optimization signals." 
    },
    { 
      icon: BarChart3, 
      title: "Budget & Bid Management", 
      desc: "Dynamic allocation based on performance data, shifting investment toward high-performing audiences while managing spend against monthly targets." 
    },
    { 
      icon: Zap, 
      title: "A/B Testing Framework", 
      desc: "Structured tests across audiences, creative, and landing pages to produce statistically meaningful results and compounding improvements." 
    },
    { 
      icon: PieChart, 
      title: "Reporting & Insights", 
      desc: "Translating platform metrics into business outcomes: CPL, CPA, ROAS, and qualitative insights on audience behavior and creative resonance." 
    }
  ];

  const benefits = [
    "Consistent pipeline of qualified leads at improving CPA",
    "Scalable top-of-funnel reach within precise target segments",
    "Retargeting programs that recover lost conversions",
    "Creative testing infrastructure that improves efficiency",
    "Clear attribution data linking social ads to revenue"
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={pageData?.meta_title || "Paid Social Advertising | Performance Media | GTM OS"}
        description={pageData?.meta_description || "Scale your brand with precision-targeted Paid Social campaigns. Expert management of Meta, LinkedIn, and TikTok ads designed for maximum conversion."}
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
              Performance Paid Social
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              {pageData?.h1 || "Paid Social That Reaches Your Audience and Drives Measurable Results"}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {pageData?.description || "We build paid social programs around the outcomes that matter to your business. Every campaign we run is engineered to move a business metric, from lead generation to direct sales."}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#audit" className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2">
                Get Campaign Proposal <ArrowRight size={20} />
              </a>
              <a href="#process" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                Our Process
              </a>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img 
              src="https://picsum.photos/seed/paid-social-hero/800/600" 
              alt="Paid Social Advertising" 
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
              <div className="text-3xl font-bold text-brand-dark mb-1">CPA</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Focused Strategy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">Multi</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Platform Expertise</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">Full</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Funnel Management</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">Real</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Business Outcomes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-brand-dark mb-6">Precision Targeting Meets Creative Excellence</h2>
              <p className="text-lg text-brand-gray leading-relaxed mb-6">
                Social media platforms offer the most sophisticated targeting systems ever created. But reaching the right people is only half the battle. Business results happen when campaigns are structured intelligently and creative is built to stop the scroll.
              </p>
              <p className="text-lg text-brand-gray leading-relaxed">
                At GTM OS, we don't optimize for vanity metrics like impressions or engagement. We build programs around lead generation, direct sales, and pipeline acceleration.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {platforms.map((platform, i) => (
                <div key={i} className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                    <platform.icon size={20} className="text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-brand-dark">{platform.name}</h3>
                    <p className="text-sm text-brand-gray leading-relaxed">{platform.desc}</p>
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
                Our Paid Social <span className="text-brand-primary">Management Process</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                A systematic framework that combines audience architecture, creative engineering, and data-driven optimization.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 pt-8">
                {processSteps.map((step, i) => (
                  <div key={i} className="space-y-3 group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                      <step.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-brand-primary transition-colors">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-brand-primary/20 rounded-full blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/paid-social-process/600/800" 
                  alt="Paid Social Process" 
                  className="rounded-2xl w-full h-auto shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-brand-primary p-6 rounded-2xl shadow-xl hidden md:block">
                  <div className="text-3xl font-bold mb-1">ROI</div>
                  <div className="text-xs uppercase tracking-widest font-bold opacity-80">Driven Management</div>
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
              <h2 className="text-4xl font-bold text-brand-dark">Get Your Paid Social Audit & Proposal</h2>
              <p className="text-lg text-brand-gray leading-relaxed">
                Ready to build a paid social program that delivers real business outcomes? Our team will audit your current setup and provide a clear roadmap for growth.
              </p>
              <ul className="space-y-4">
                {benefits.map((item, i) => (
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

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-brand-dark text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { 
                q: "Which social platform should we advertise on first?", 
                a: "It depends on your audience. B2C typically starts with Meta (Facebook/Instagram) for scale and targeting. B2B often prioritizes LinkedIn for professional targeting, despite higher CPCs. We provide a clear recommendation during onboarding." 
              },
              { 
                q: "How much does paid social advertising cost?", 
                a: "Costs vary by platform and audience. Meta CPMs can range from a few dollars to over $20, while LinkedIn CPMs are often $30-$80+. We provide a clear cost structure based on your specific goals." 
              },
              { 
                q: "What is creative fatigue and how do you manage it?", 
                a: "Creative fatigue happens when your audience has seen an ad too many times, causing engagement to drop. We monitor frequency metrics and proactively rotate creative to maintain performance." 
              },
              { 
                q: "Can paid social work for B2B businesses?", 
                a: "Absolutely. LinkedIn is the most powerful B2B targeting tool available. Meta also works well for reaching business owners and decision-makers when the offer and creative are aligned with their journey." 
              },
              { 
                q: "How do you track whether paid social is actually driving revenue?", 
                a: "We use a layered approach: platform pixels (Meta, LinkedIn), Google Analytics, UTM parameters, and CRM integration to link leads back to their acquisition source." 
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
            src="https://picsum.photos/seed/cta-bg-social/1920/1080?blur=10" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-primary/40 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">Ready to reach your audience and drive results?</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Stop guessing and start growing. Get a comprehensive paid social audit and strategy roadmap today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="px-10 py-5 bg-white text-brand-primary font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl text-lg">
              Get Your Free Audit
            </a>
            <a href="/services/paid-search" className="px-10 py-5 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-dark/90 transition-all shadow-xl text-lg">
              Paid Search Services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
