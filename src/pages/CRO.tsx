import { Target, BarChart3, Search, FileText, Settings, CheckCircle, Link, Globe, ShieldCheck, ArrowRight, MessageSquare, Zap, Users, PieChart, PenTool, Layers, MousePointerClick, Eye, TestTube, LayoutTemplate, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/ui/SchemaMarkup';
import AdvancedLeadForm from '../components/ui/AdvancedLeadForm';
import { useCMSDocument } from '../hooks/useCMSDocument';

export default function CRO() {
  const { data: pageData, loading } = useCMSDocument('services', 'cro');
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <Loader2 className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  const faqs = pageData?.faqs || [
    { 
      question: "How much traffic do I need for CRO to be worthwhile?", 
      answer: "CRO requires sufficient traffic to run statistically valid A/B tests. As a rough guideline, pages with fewer than a few hundred conversions per month are difficult to test efficiently because achieving statistical significance takes too long. However, CRO work includes more than just A/B testing. Heuristic audits, user research, landing page redesigns, and expert recommendations based on established conversion principles can be implemented and measured without formal A/B testing infrastructure. These approaches produce meaningful results even at lower traffic volumes." 
    },
    { 
      question: "What is a good conversion rate to aim for?", 
      answer: "Conversion rates vary enormously by industry, traffic source, conversion type, and page purpose. A lead generation page for professional services converting cold traffic might benchmark well at 3 to 5 percent. An ecommerce site average conversion rate might range from 1 to 4 percent depending on the category. Rather than chasing an industry average, the most useful benchmark is your own historical performance. The goal of CRO is always to improve your specific conversion rate from where it is, not to reach an arbitrary industry number." 
    },
    { 
      question: "How is CRO different from web design or UX work?", 
      answer: "Web design and UX work typically focuses on aesthetics, usability, and brand expression. CRO is specifically focused on commercial conversion outcomes and uses a data-driven, hypothesis-testing approach to changes rather than making redesign decisions based on design preference or general best practices. CRO and good UX are complementary, and many CRO improvements involve UX changes, but CRO applies a rigorous measurement framework that design work alone typically does not." 
    },
    { 
      question: "Do you need to redesign our whole website for CRO?", 
      answer: "No. Full website redesigns are rarely the most efficient CRO approach. They are expensive, time-consuming, introduce many variables simultaneously making it impossible to isolate what drove any performance change, and carry the risk of hurting performance as much as helping it. CRO is typically more effective as an iterative, test-driven process that makes targeted improvements to specific pages and elements based on data. We start with your highest-traffic, highest-impact pages and work from there." 
    },
    { 
      question: "How long does it take to see CRO results?", 
      answer: "Quick wins from expert audits and heuristic changes can be implemented and show impact within the first four to six weeks. A/B test cycles typically run two to four weeks each depending on your traffic volume. Meaningful cumulative improvement from a systematic CRO program becomes visible within three to six months and continues compounding as each winning test raises the baseline for the next round of testing." 
    },
    { 
      question: "Can CRO help with our paid advertising campaigns specifically?", 
      answer: "Paid traffic landing page optimization is one of the highest-return areas of CRO work. Improving the conversion rate of pages receiving paid traffic directly reduces cost per acquisition and improves return on ad spend. We work closely with paid search and paid social campaign management to ensure landing page performance is assessed and improved as part of an integrated performance marketing program. In many cases, the fastest way to improve paid campaign performance is to improve the page, not the campaign." 
    },
    { 
      question: "What tools do you use for CRO?", 
      answer: "We work with standard industry tools including Google Analytics for quantitative analysis, Hotjar or Microsoft Clarity for heatmaps and session recordings, Google Optimize or VWO for A/B testing, and Typeform or Hotjar for on-site surveys. We also use Looker Studio for reporting. For clients who already have specific tools in place, we work with existing platforms rather than requiring unnecessary additional software." 
    }
  ];

  const processSteps = pageData?.processSteps || pageData?.process_steps || [
    { 
      icon: Search, 
      title: "Conversion Audit and Funnel Analysis", 
      desc: "We map the journey visitors take from arrival to conversion and identify where the largest drop-offs occur." 
    },
    { 
      icon: Eye, 
      title: "Heatmap and Session Recording Analysis", 
      desc: "We deploy tools to capture how visitors are actually interacting with your key pages: where they click, scroll, and get stuck." 
    },
    { 
      icon: Users, 
      title: "User Research and Voice of Customer", 
      desc: "We use on-site surveys and exit intent questions to gather direct feedback about what visitors were trying to accomplish." 
    },
    { 
      icon: FileText, 
      title: "CRO Hypothesis Development", 
      desc: "Every change we test is based on a documented hypothesis grounded in research and expected impact." 
    },
    { 
      icon: TestTube, 
      title: "A/B Testing and Experimentation", 
      desc: "We configure tests using industry-standard tools and calculate required sample sizes for statistical significance." 
    },
    { 
      icon: LayoutTemplate, 
      title: "Landing Page Design and Copy Optimization", 
      desc: "We design and write landing pages optimized for specific traffic sources, audience segments, and conversion goals." 
    }
  ];

  const features = pageData?.features || pageData?.service_grid || [
    {
      title: "What Is Conversion Rate Optimization",
      desc: "Conversion rate optimization is the process of increasing the percentage of website visitors who complete a desired action. CRO uses a combination of quantitative data analysis, qualitative user research, and controlled experimentation to identify and implement improvements that lift conversion rates.",
      icon: BarChart3
    },
    {
      title: "Why CRO Matters More Than Ever",
      desc: "Paid traffic costs have risen consistently. Acquiring traffic is more expensive than it used to be. In this environment, the conversion rate of the pages you send traffic to is one of the most powerful levers available to improve your marketing return on investment without simply spending more.",
      icon: Target
    },
    {
      title: "The Multiplier Effect",
      desc: "A CRO program that improves your landing page conversion rate from 3% to 5% improves the effective return on every traffic source that feeds those pages. This multiplier effect makes CRO one of the highest-leverage investments.",
      icon: Zap
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={pageData?.meta_title || "Conversion Rate Optimization (CRO) | ROI Multiplier | Unified Platforms"}
        description={pageData?.meta_description || "Turn more visitors into customers with data-driven CRO. Unified Platforms identifies conversion barriers and implements high-impact A/B tests to maximize your revenue."}
      />
      <SchemaMarkup type="Service" data={{
        title: pageData?.title || "Conversion Rate Optimization (CRO) Services",
        description: pageData?.hero_subtitle || pageData?.description || "Get more leads and sales from the traffic you already have. Unified Platforms delivers data-driven CRO that identifies conversion barriers and systematically removes them."
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
              Conversion Rate Optimization
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              {pageData?.hero_title || (
                <>Conversion Rate Optimization Services That Turn <span className="text-brand-primary">More Visitors Into Customers</span></>
              )}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {pageData?.hero_subtitle || pageData?.description || "Most businesses focus the majority of their marketing budget on driving more traffic. But if the pages that traffic lands on are converting at 2% when they should be converting at 5%, every traffic acquisition effort is working at less than half capacity."}
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Doubling your conversion rate has the same revenue impact as doubling your traffic, at a fraction of the cost.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#audit" className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2">
                Get CRO Audit <ArrowRight size={20} />
              </a>
              <a href="#process" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                Our Process
              </a>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img 
              src="https://picsum.photos/seed/cro-hero/800/600" 
              alt="CRO Strategy" 
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
              <div className="text-3xl font-bold text-brand-dark mb-1">2x</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Revenue Impact</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">Data</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Driven Decisions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">A/B</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Testing Focus</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">ROI</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Multiplier Effect</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-brand-dark mb-6">Systematic Conversion Growth</h2>
              <p className="text-lg text-brand-gray leading-relaxed mb-6">
                Conversion rate optimization is the discipline of systematically identifying why visitors do not convert and removing those barriers. It is not guesswork or aesthetic preference.
              </p>
              <p className="text-lg text-brand-gray leading-relaxed">
                It is a structured research, testing, and implementation process grounded in behavioral data, user research, and evidence-based design principles. At Unified Platforms, our CRO service is built to improve the commercial performance of your website in a way that compounds over time.
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

      {/* Process Section */}
      <section id="process" className="py-24 bg-brand-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Our <span className="text-brand-primary">CRO Process</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                We remove the guesswork from conversion optimization. Our process is rooted in quantitative data, qualitative research, and rigorous testing.
              </p>
              
              <div className="space-y-6 pt-8">
                {processSteps.map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-primary font-bold group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                      <step.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-brand-primary transition-colors">{step.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-brand-primary/20 rounded-full blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/cro-process/600/800" 
                  alt="Our CRO Process" 
                  className="rounded-2xl w-full h-auto shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-brand-primary p-6 rounded-2xl shadow-xl hidden md:block">
                  <div className="text-3xl font-bold mb-1">Data-Driven</div>
                  <div className="text-xs uppercase tracking-widest font-bold opacity-80">Experimentation</div>
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
              <h2 className="text-4xl font-bold text-brand-dark">Get Your Free CRO Audit</h2>
              <p className="text-lg text-brand-gray leading-relaxed">
                Want to know what is preventing your visitors from converting? Contact Unified Platforms for a free CRO audit of your key pages.
              </p>
              <ul className="space-y-4">
                {[
                  "Identify conversion bottlenecks",
                  "Analyze user behavior and drop-offs",
                  "Review form and checkout friction",
                  "Assess trust signals and credibility",
                  "Actionable optimization roadmap"
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
                  <img src="https://picsum.photos/seed/cro-case1/400/500" alt="Case 1" className="rounded-2xl w-full h-64 object-cover" referrerPolicy="no-referrer" />
                  <img src="https://picsum.photos/seed/cro-case2/400/300" alt="Case 2" className="rounded-2xl w-full h-48 object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4 pt-8">
                  <img src="https://picsum.photos/seed/cro-case3/400/300" alt="Case 3" className="rounded-2xl w-full h-48 object-cover" referrerPolicy="no-referrer" />
                  <img src="https://picsum.photos/seed/cro-case4/400/500" alt="Case 4" className="rounded-2xl w-full h-64 object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-4xl font-bold text-brand-dark">What CRO Improvements Look Like in Practice</h2>
              <p className="text-lg text-brand-gray leading-relaxed">
                We build optimization engines that match your business model and industry requirements.
              </p>
              <ul className="space-y-4">
                {[
                  "Rewriting a landing page headline to match the specific intent of the traffic source, increasing lead form completions by 30 to 50 percent",
                  "Reducing a 7-field lead form to 4 fields by removing questions not required for initial qualification, cutting abandonment significantly",
                  "Moving a call-to-action button above the fold based on scroll depth data, recovering conversions from visitors who never reached the original button placement",
                  "Adding a specific testimonial addressing the most common objection raised in exit surveys, improving conversion rate for cold traffic",
                  "Simplifying a checkout flow by removing an unnecessary account creation step, reducing cart abandonment",
                  "Improving page load speed on mobile, recovering conversions lost to abandonment from slow-loading experiences"
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
            <h2 className="text-3xl font-bold text-brand-dark">Tools We Use for CRO</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Google Analytics', 'Hotjar', 'Microsoft Clarity', 'Google Optimize', 'VWO', 'Typeform', 'Looker Studio'].map((tool) => (
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
            src="https://picsum.photos/seed/cta-bg-cro/1920/1080?blur=10" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-primary/40 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">Ready to turn more visitors into customers?</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Stop guessing what will improve your conversion rate. Build a data-driven optimization engine that drives predictable revenue growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#audit" className="px-10 py-5 bg-white text-brand-primary font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl text-lg">
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
