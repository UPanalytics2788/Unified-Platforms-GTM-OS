import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  ArrowLeft, 
  CheckCircle2, 
  MessageSquare, 
  Zap, 
  Search, 
  Cpu, 
  Globe, 
  Mic, 
  BarChart3, 
  ChevronRight,
  Loader2
} from 'lucide-react';
import { useCMSDocument } from '../hooks/useCMSDocument';
import LeadForm from '../components/ui/LeadForm';
import SchemaMarkup from '../components/ui/SchemaMarkup';
import { SERVICES_CONTENT } from '../data/seedContent';

export default function AEOGEO() {
  const { data: pageData, loading } = useCMSDocument('services', 'aeo-geo');

  const localFallback = SERVICES_CONTENT.find(s => s.slug === 'aeo-geo');
  const service = pageData || localFallback;

  if (loading && !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <Loader2 className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  if (!service && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link to="/services" className="text-brand-primary hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={20} /> Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-white min-h-screen">
      <SEO 
        title={service?.meta_title || service?.metaTitle || 'AEO and GEO Services | Answer Engine and Generative Engine Optimization | Unified Platforms'} 
        description={service?.meta_description || service?.metaDescription || 'Get your brand cited in AI-generated answers and featured in voice and zero-click search. Unified Platforms delivers AEO and GEO strategies for the next era of search.'} 
      />

      {service && (
        <>
          <SchemaMarkup type="Service" data={service} />
          <SchemaMarkup type="FAQPage" data={service} />
        </>
      )}

      {/* Navigation Breadcrumb */}
      <div className="bg-brand-dark border-b border-white/10 pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/services" className="inline-flex items-center text-gray-400 hover:text-brand-primary transition-colors gap-2 text-sm font-medium group">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Services
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-brand-dark py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-sm font-medium border border-brand-primary/30 mb-8">
              Next-Gen Search Optimization
            </div>
            <h1 className="text-4xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
              {service?.title || 'AEO and GEO Services: Optimizing for AI-Driven Search'}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
              {service?.description || 'Search is changing. AI-powered answer engines like Google AI Overviews, ChatGPT, and Perplexity are answering questions directly. We help your brand get cited in the answers.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2 group">
                Get Your AEO Strategy <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-8 leading-tight">
                The Shift from Links to Answers
              </h2>
              <div className="space-y-6 text-lg text-brand-gray leading-relaxed">
                <p>
                  Search is changing in the most significant way it has changed in two decades. AI-powered answer engines like Google AI Overviews, ChatGPT, Perplexity, and Bing Copilot are increasingly answering questions directly rather than returning a list of links.
                </p>
                <p>
                  Voice assistants are reading out single answers rather than ranking ten results. Zero-click searches now account for a large share of queries where users get what they need without clicking through to any website.
                </p>
                <p>
                  For businesses that rely on organic search for visibility and lead generation, this shift demands a new layer of optimization strategy: Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO).
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-brand-gray/5 rounded-3xl overflow-hidden border border-brand-gray/10">
                <img 
                  src="https://picsum.photos/seed/aeo-problem/800/800" 
                  alt="AI Search Evolution" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-brand-primary p-8 rounded-2xl shadow-xl hidden lg:block">
                <div className="text-4xl font-bold text-white mb-1">65%</div>
                <div className="text-sm text-white/80 font-bold uppercase tracking-wider">Zero-Click Searches</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases / Features */}
      <section className="py-24 bg-brand-gray/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-6">Our AEO & GEO Framework</h2>
            <p className="text-lg text-brand-gray">We optimize your digital presence to be the authoritative source that AI models trust and cite.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "LLM Visibility Analysis",
                desc: "We audit how major LLMs (GPT-4, Claude, Gemini) currently perceive and cite your brand across their knowledge bases.",
                icon: Cpu
              },
              {
                title: "Structured Data Mastery",
                desc: "Advanced Schema.org implementation that provides the explicit context AI engines need to understand your entities.",
                icon: Globe
              },
              {
                title: "Voice Search Optimization",
                desc: "Optimizing for natural language patterns and conversational queries used in voice-activated search environments.",
                icon: Mic
              },
              {
                title: "Citation Building",
                desc: "Strategic placement of brand mentions in high-authority sources that AI models use for their retrieval-augmented generation (RAG).",
                icon: Search
              },
              {
                title: "Answer-First Content",
                desc: "Restructuring content to provide clear, concise answers that are easily extracted by generative AI summaries.",
                icon: MessageSquare
              },
              {
                title: "Performance Tracking",
                desc: "Monitoring brand citations and 'share of voice' within AI-generated answers and zero-click environments.",
                icon: BarChart3
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl border border-brand-gray/10 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                  <feature.icon size={28} className="text-brand-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-4">{feature.title}</h3>
                <p className="text-brand-gray leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg prose-brand max-w-none">
            <h2 className="text-3xl font-bold text-brand-dark mb-8">Why AEO and GEO are Critical for Future Growth</h2>
            <p className="text-brand-gray leading-relaxed mb-6">
              Traditional SEO was about ranking in the top 10 blue links. AEO and GEO are about becoming the single answer or the primary citation in an AI-generated response. If your brand isn't being cited by ChatGPT or Google AI Overviews, you're effectively invisible to a growing segment of users.
            </p>
            <p className="text-brand-gray leading-relaxed mb-6">
              Our approach focuses on three core pillars:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-brand-primary mt-1 flex-shrink-0" size={20} />
                <span><strong>Authority:</strong> Building the signals that prove to AI models that your brand is a trusted expert in its field.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-brand-primary mt-1 flex-shrink-0" size={20} />
                <span><strong>Clarity:</strong> Structuring information so it is unambiguous and easily processed by large language models.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-brand-primary mt-1 flex-shrink-0" size={20} />
                <span><strong>Connectivity:</strong> Ensuring your brand is mentioned in the specific datasets and sources that AI models prioritize.</span>
              </li>
            </ul>
            <p className="text-brand-gray leading-relaxed italic border-l-4 border-brand-primary pl-6 py-2 bg-brand-gray/5 rounded-r-lg">
              "The future of search isn't just about being found; it's about being cited as the definitive answer."
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof & Lead Form */}
      <section id="contact" className="py-24 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                Ready to Optimize for the <span className="text-brand-primary">AI Era?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                Don't wait for your organic traffic to disappear. Start building your AEO and GEO strategy today to secure your brand's future in AI-driven search.
              </p>
              
              <div className="space-y-6">
                {[
                  "Detailed LLM visibility audit",
                  "Strategic citation roadmap",
                  "Advanced Schema implementation",
                  "AI-first content strategy"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-white/80">
                    <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30">
                      <Zap size={12} className="text-brand-primary" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-bold text-brand-dark mb-2">Get Your AEO Audit</h3>
              <p className="text-brand-gray mb-8">Fill out the form below and our AI search specialists will reach out.</p>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark text-center mb-16">AEO & GEO FAQs</h2>
          <div className="space-y-6">
            {(service?.faqs || [
              {
                question: "What is the difference between AEO and GEO?",
                answer: "AEO (Answer Engine Optimization) focuses on optimizing for direct answers in engines like ChatGPT or Perplexity. GEO (Generative Engine Optimization) specifically targets generative features within traditional search engines, like Google's AI Overviews."
              },
              {
                question: "How long does it take to see results in AI answers?",
                answer: "AI models have different update cycles. While Google AI Overviews can update relatively quickly, LLMs like ChatGPT may take longer to incorporate new data unless they are using real-time search tools."
              },
              {
                question: "Will AEO hurt my traditional SEO rankings?",
                answer: "No. In fact, the two strategies are highly complementary. The authority and clarity required for AEO typically improve traditional organic rankings as well."
              }
            ]).map((faq: any, i: number) => (
              <div key={i} className="p-8 bg-brand-gray/5 rounded-2xl border border-brand-gray/10 hover:border-brand-primary/30 transition-all group">
                <h3 className="text-xl font-bold text-brand-dark mb-4 flex items-start gap-3">
                  <MessageSquare className="text-brand-primary mt-1 flex-shrink-0" size={20} />
                  {faq.question}
                </h3>
                <p className="text-brand-gray leading-relaxed pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-brand-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-30"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8">
            Future-Proof Your Search Visibility
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            The era of the ten blue links is ending. Join the brands that are winning the era of AI answers.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-10 py-5 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-dark/90 transition-all shadow-2xl text-lg group"
          >
            Start Your AEO Journey
            <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
