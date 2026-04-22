import SEO from '../components/SEO';
import AdvancedLeadForm from '../components/ui/AdvancedLeadForm';
import SchemaMarkup from '../components/ui/SchemaMarkup';
import { 
  Mail, 
  Zap, 
  Users, 
  RefreshCw, 
  BarChart3, 
  ShieldCheck, 
  CheckCircle, 
  ArrowRight, 
  MessageSquare, 
  Layout, 
  MousePointer2, 
  ShoppingCart,
  Search,
  Settings,
  PieChart,
  Loader2,
  Heart
} from 'lucide-react';
import { useCMSDocument } from '../hooks/useCMSDocument';

export default function EmailMarketing() {
  const { data: pageData, loading } = useCMSDocument('services', 'email-marketing');
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <Loader2 className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  const faqs = pageData?.faqs || [
    {
      question: "What email platform do you recommend?",
      answer: "Platform recommendation depends on your business type, list size, and budget. For ecommerce, Klaviyo is typically the strongest choice. For B2B with CRM needs, HubSpot or ActiveCampaign are often right. For smaller lists, Mailchimp or Brevo offer strong value. We assess your specific situation and make a clear recommendation."
    },
    {
      question: "How often should we be emailing our list?",
      answer: "Frequency should be determined by the value you can consistently deliver. For most businesses, 1-2 campaigns per week is sustainable for a promotional list. Newsletters work well on a weekly or fortnightly cadence. Automated sequences are triggered by behavior and run independently."
    },
    {
      question: "Our open rates are very low. What can we do?",
      answer: "Low open rates are typically caused by subject lines, sender recognition, deliverability issues, or list quality. We diagnose the combination of factors at play—from SPF/DKIM setup to list hygiene—and address them systematically rather than just testing subject lines in isolation."
    },
    {
      question: "Do you handle the design of email templates as well?",
      answer: "Yes. Our service includes template design that reflects your brand identity, renders correctly across all major email clients, and is structured to direct attention toward the primary call to action. We design both campaign and automation templates using your brand's visual style."
    },
    {
      question: "How do you handle GDPR and data privacy compliance for email?",
      answer: "We build compliance into every program setup, including double opt-in configurations, clear identification of the sender, functional unsubscribe mechanisms, and proper data handling practices. We advise on requirements relevant to your subscriber geography."
    },
    {
      question: "Can email marketing work for a B2B business with long sales cycles?",
      answer: "Email is perfectly suited for long B2B cycles because it allows consistent, value-adding contact over the extended period between initial interest and purchase. A well-built nurture sequence educates prospects and keeps your brand top-of-mind when the decision is eventually made."
    }
  ];

  const programTypes = pageData?.programTypes || pageData?.service_grid || [
    {
      title: "Welcome & Onboarding",
      desc: "Set the tone for the relationship with sequences that introduce your brand and deliver immediate value.",
      icon: Users
    },
    {
      title: "Lead Nurture Sequences",
      desc: "Move prospects through their consideration journey systematically with value-driven, automated touchpoints.",
      icon: RefreshCw
    },
    {
      title: "Promotional Campaigns",
      desc: "Drive immediate action for sales, events, or content engagements with optimized subject lines and CTAs.",
      icon: Zap
    },
    {
      title: "Abandoned Cart Recovery",
      desc: "Recapture would-be purchases with multi-step sequences that address objections and create urgency.",
      icon: ShoppingCart
    },
    {
      title: "Retention & Post-Purchase",
      desc: "Build loyalty and drive repeat business with helpful onboarding info and satisfaction check-ins.",
      icon: Heart
    },
    {
      title: "Newsletters & Authority",
      desc: "Build long-term relationships and stay top-of-mind with consistent, value-first editorial content.",
      icon: Layout
    }
  ];

  const technicalServices = pageData?.technicalServices || [
    { icon: Settings, title: "Platform Setup", desc: "Configuration of lists, segments, domain authentication, and automation workflows." },
    { icon: ShieldCheck, title: "Deliverability", desc: "SPF, DKIM, and DMARC setup plus ongoing monitoring to ensure you stay out of spam." },
    { icon: Search, title: "Segmentation", desc: "Building logic based on behavior, purchase history, and funnel stage for relevant targeting." },
    { icon: PieChart, title: "Performance Tracking", desc: "Detailed reporting on revenue per email, conversion rates, and list health metrics." }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={pageData?.meta_title || "Email Marketing Services | Automation, Campaigns and Lifecycle Sequences | Unified Platforms"}
        description={pageData?.meta_description || "Build email programs that nurture leads, retain customers, and drive revenue on autopilot. Unified Platforms delivers email strategy, copywriting, automation, and full campaign management."}
      />
      <SchemaMarkup type="Service" data={{
        title: pageData?.title || "Email Marketing Services",
        description: pageData?.hero_subtitle || pageData?.description || "Build email programs that nurture leads, retain customers, and drive revenue on autopilot."
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
              {pageData?.category || 'High-ROI Lifecycle Marketing'}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              {pageData?.hero_title || (
                <>Email Marketing That <span className="text-brand-primary">Nurtures</span> and Drives Revenue</>
              )}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {pageData?.hero_subtitle || pageData?.description || "Build an owned asset that generates returns on autopilot. From first touchpoint to long-term retention, we manage the strategy, copy, and automation."}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2">
                Get Started <ArrowRight size={20} />
              </a>
              <a href="#programs" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                Our Programs
              </a>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img 
              src={pageData?.imageUrl || "https://picsum.photos/seed/email-marketing-hero/800/600"} 
              alt="Email Marketing Services" 
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
              <div className="text-3xl font-bold text-brand-dark mb-1">Owned</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Asset Growth</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">Highest</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">ROI Channel</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">24/7</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Revenue Engine</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">100%</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Data Driven</div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-brand-dark mb-6">Strategy, Segmentation, and Automation</h2>
              <p className="text-lg text-brand-gray leading-relaxed mb-6">
                Email remains the highest-ROI channel in digital marketing. Unlike social media where you rent access to an audience, your email list is an owned asset that keeps generating returns from the relationships you've already built.
              </p>
              <p className="text-lg text-brand-gray leading-relaxed">
                The difference between email programs that deliver strong returns and those that produce minimal results is strategy, segmentation, copy quality, and automation logic. We build programs designed to work at every stage of the customer relationship.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {technicalServices.map((service, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                    <service.icon size={24} className="text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-brand-dark">{service.title}</h3>
                    <p className="text-brand-gray text-sm leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program Types Grid */}
      <section id="programs" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-6">Email Marketing Program Types</h2>
            <p className="text-lg text-brand-gray">We design lifecycle sequences that serve the customer at every touchpoint of their journey.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programTypes.map((program, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                  <program.icon size={28} className="text-brand-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand-dark">{program.title}</h3>
                <p className="text-brand-gray leading-relaxed text-sm">{program.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Focus Section */}
      <section className="py-24 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold">Email Marketing for <span className="text-brand-primary">B2B Sales Cycles</span></h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Email is particularly well-suited to B2B businesses with long sales cycles. It allows you to maintain consistent, value-adding contact with prospects over the extended period between initial interest and purchase decision.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                A well-built B2B nurture sequence educates prospects, demonstrates expertise, addresses objections progressively, and keeps your brand at the top of the consideration list.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                {["Lead Education", "Expertise Demo", "Objection Handling", "Top-of-Mind Presence"].map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/b2b-email/800/600" 
                alt="B2B Email Marketing" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 bg-brand-primary p-8 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold mb-1">B2B</div>
                <div className="text-sm font-bold uppercase tracking-widest opacity-80 text-white">Nurture Specialist</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
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
            src="https://picsum.photos/seed/cta-email/1920/1080?blur=10" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">Ready to build an email program that works while you sleep?</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Stop blasting your list. Start building relationships that drive predictable revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="px-10 py-5 bg-white text-brand-primary font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl text-lg">
              Contact Us
            </a>
            <a href="/services/content-creation" className="px-10 py-5 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-dark/90 transition-all shadow-xl text-lg">
              Explore Content Creation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
