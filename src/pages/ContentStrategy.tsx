import { Target, BarChart3, Search, FileText, Settings, Link, PieChart, ShieldCheck, CheckCircle, ArrowRight, MessageSquare, PenTool, Layers, Users, Compass, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/ui/SchemaMarkup';
import { useCMSDocument } from '../hooks/useCMSDocument';

export default function ContentStrategy() {
  const { data: pageData, loading } = useCMSDocument('services', 'content-strategy');
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <Loader2 className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  const faqs = pageData?.faqs || [
    {
      question: "How is a content strategy different from a content calendar?",
      answer: "A content calendar is a scheduling tool that tells you what to publish and when. A content strategy is the plan that determines why those topics, for which audiences, through which channels, and toward what goals. Both are needed, and the calendar should be derived from and governed by the strategy rather than existing independently of it."
    },
    {
      question: "How long does it take to develop a content strategy?",
      answer: "A thorough content strategy development engagement typically takes four to six weeks, depending on the complexity of your business, the number of audience segments, the size of your existing content library, and the depth of audience research required. Simpler engagements with a narrow focus can be completed in two to three weeks."
    },
    {
      question: "We already have a marketing team. Where does a content strategy agency fit in?",
      answer: "Content strategy consulting typically works best as either a foundational project that gives your internal team a clear plan to execute against, or as an ongoing advisory engagement where we work alongside your team to refine direction based on performance data. We provide that layer without replacing your team."
    },
    {
      question: "How do you approach content strategy for businesses with multiple products or services?",
      answer: "We structure content strategy for these businesses around clear topic cluster separation, audience-specific content hubs, and navigation architecture that helps different visitor types find the content most relevant to them quickly. The strategy also defines how content investments are prioritized across product lines."
    },
    {
      question: "Can you develop content strategy for a specific channel only, like SEO content or social media?",
      answer: "Yes. While we believe the most effective content strategies take an integrated view across channels, we regularly develop channel-specific content strategies for clients who have clear channel priorities or who want to improve performance in one area before expanding."
    }
  ];

  const features = pageData?.features || pageData?.service_grid || [
    {
      title: "Audience-Centric Approach",
      desc: "We build content around your buyers' actual questions, pain points, and journey stages, not just what you want to say.",
      icon: Users
    },
    {
      title: "Cross-Channel Cohesion",
      desc: "Ensure your message is consistent and compounding across SEO, social media, email, and sales enablement.",
      icon: Layers
    },
    {
      title: "Measurable Outcomes",
      desc: "Every piece of content is tied to a specific business goal, with clear KPIs to track performance and ROI.",
      icon: BarChart3
    }
  ];

  const processSteps = pageData?.processSteps || pageData?.process_steps || [
    { icon: Search, title: "Discovery & Audit", desc: "We analyze your existing content, competitors, and market positioning to find gaps and opportunities." },
    { icon: Users, title: "Audience Research", desc: "Deep dive into your target buyers to understand their needs, search behavior, and content preferences." },
    { icon: Compass, title: "Strategic Framework", desc: "Developing the core pillars, messaging hierarchy, and channel strategy that will guide all creation." },
    { icon: FileText, title: "Editorial Planning", desc: "Creating a detailed content calendar with specific topics, formats, and distribution plans." },
    { icon: PenTool, title: "Creation Guidelines", desc: "Establishing brand voice, tone, and quality standards to ensure consistency across all creators." },
    { icon: Settings, title: "Governance Setup", desc: "Defining workflows, approval processes, and roles for sustainable content operations." },
    { icon: PieChart, title: "Measurement Plan", desc: "Setting up the analytics framework to track content performance against business goals." },
    { icon: ShieldCheck, title: "Ongoing Optimization", desc: "Regular reviews to refine the strategy based on real-world data and changing market conditions." }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={pageData?.meta_title || "Content Strategy Services | GTM OS"}
        description={pageData?.meta_description || "Build a content strategy that aligns with your business goals, serves your audience, and drives measurable growth. GTM OS develops content strategies that work."}
      />
      <SchemaMarkup type="Service" data={{
        title: pageData?.title || "Content Strategy Services",
        description: pageData?.hero_subtitle || pageData?.description || "Build a content strategy that aligns with your business goals, serves your audience, and drives measurable growth."
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
              {pageData?.category || 'Enterprise Content Strategy'}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              {pageData?.hero_title || (
                <>Content Strategy That Gives Your Marketing <span className="text-brand-primary">Direction</span></>
              )}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {pageData?.hero_subtitle || pageData?.description || "Stop creating content in a vacuum. We build the strategic framework that connects every piece of content to a measurable business outcome."}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2">
                Get Content Strategy <ArrowRight size={20} />
              </a>
              <a href="#process" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                View Framework
              </a>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img 
              src={pageData?.imageUrl || "https://picsum.photos/seed/content-strategy-hero/800/600"} 
              alt="Content Strategy" 
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
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Goal Aligned</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">Omnichannel</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Distribution</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">Data</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Driven Decisions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">Scalable</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Content Operations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-brand-dark mb-6">What a Content Strategy Actually Is</h2>
              <p className="text-lg text-brand-gray leading-relaxed mb-6">
                Most businesses produce content without a content strategy. They publish blog posts when someone has time, push social updates when they remember, and create landing pages when campaigns demand them. The result is a fragmented content library that does not build on itself.
              </p>
              <p className="text-lg text-brand-gray leading-relaxed">
                A content strategy changes that. It is the documented plan that defines the purpose of your content, the audiences it serves, the topics and formats it will cover, the channels it will be distributed through, and the metrics that will determine whether it is working.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon size={24} className="text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-brand-dark">{feature.title}</h3>
                    <p className="text-brand-gray leading-relaxed">{feature.desc}</p>
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
            <h2 className="text-4xl font-bold text-brand-dark mb-6">Our Content Strategy Process</h2>
            <p className="text-lg text-brand-gray">A systematic approach to turning your content into a measurable growth engine.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                  <step.icon className="text-brand-primary group-hover:text-white" size={28} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-brand-dark">{step.title}</h3>
                <p className="text-brand-gray leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-brand-dark mb-12">Who Our Content Strategy Service Is For</h2>
          <ul className="grid md:grid-cols-2 gap-6">
            {[
              "Businesses starting their content marketing program and wanting to build on a solid foundation",
              "Established companies whose content output lacks coherence or fails to drive measurable ROI",
              "Organizations entering new markets or launching new products that require targeted messaging",
              "Businesses going through a rebrand or repositioning that need to align their content library",
              "Marketing teams that need a strategic roadmap to guide their internal content creators"
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
          <h2 className="text-4xl font-bold mb-8">The Deliverables</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            A strategy is only as good as its execution. At the end of our engagement, you receive actionable deliverables: an audience persona documentation set, a content audit report, a channel and format strategy, a topic and keyword map, an editorial calendar for the first 3-6 months, brand voice guidelines, a measurement framework, and a content governance plan. We give you the exact blueprint needed to succeed.
          </p>
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
      <section className="py-20 bg-brand-primary text-white text-center relative overflow-hidden">
        <img 
          src="https://picsum.photos/seed/cta-bg-content-strategy/1920/1080?blur=4" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to give your content a clear direction?</h2>
          <p className="text-xl mb-8">Contact GTM OS to start building your content strategy.</p>
          <a href="/contact" className="inline-block px-8 py-4 bg-white text-brand-primary font-bold rounded-xl hover:bg-gray-100 transition-all">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
