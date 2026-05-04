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
  Loader2,
  Settings,
  Network,
  TrendingDown,
  ShieldCheck
} from 'lucide-react';
import { useCMSDocument } from '../hooks/useCMSDocument';
import LeadForm from '../components/ui/LeadForm';
import SchemaMarkup from '../components/ui/SchemaMarkup';
import { SERVICES_CONTENT } from '../data/seedContent';
import { motion } from 'motion/react';

export default function AEOGEO() {
  const { data: pageData, loading } = useCMSDocument('services', 'aeo-geo');
  // Also try to check unified pages for the high-end version if this is missing
  const { data: gtmData } = useCMSDocument('unified_pages', 'aeo-geo-answer-engine-optimization');

  const localFallback = SERVICES_CONTENT.find(s => s.slug === 'aeo-geo');
  const service = pageData || gtmData || localFallback;

  if (loading && !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-white">
        <Loader2 className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  if (!service && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-white text-brand-dark p-4">
          <h1 className="text-4xl font-bold mb-4">AEO Service Not Found</h1>
          <p className="text-brand-gray mb-8">The requested service configuration could not be loaded.</p>
          <Link to="/services" className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary/90 transition-all flex items-center gap-2">
            <ArrowLeft size={20} /> Back to Services
          </Link>
      </div>
    );
  }

  // If we have GTM data, we should ideally use the GTM Template, 
  // but for now let's enhance this component to look like the ARCHITECT pattern.
  
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-brand-primary/30">
      <SEO 
        title={service?.meta_title || 'AEO & GEO Optimization | AI Answer Dominance | Unified Platforms'} 
        description={service?.meta_description || 'Secure your brand citations in AI search results (ChatGPT, Perplexity, Gemini). Unified Platforms delivers technical AEO/GEO for the generative search era.'} 
      />

      <SchemaMarkup type="Service" data={service} />

      {/* Navigation Breadcrumb */}
      <nav className="fixed top-20 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-brand-gray/10 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link to="/services" className="inline-flex items-center text-brand-gray hover:text-brand-primary transition-colors gap-2 text-sm font-medium group">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Services / AEO Dominance
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#framework" className="text-sm font-semibold text-brand-gray hover:text-brand-dark">Framework</a>
            <a href="#comparison" className="text-sm font-semibold text-brand-gray hover:text-brand-dark">Comparison</a>
            <a href="#contact" className="px-4 py-1.5 bg-brand-dark text-white rounded-full text-sm font-bold hover:bg-brand-primary transition-colors">Get Audit</a>
          </div>
        </div>
      </nav>

      {/* Hero Section - ARCHITECT Pattern (Light Theme, Clean, Professional) */}
      <section className="pt-40 pb-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 -skew-x-12 transform translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider border border-brand-primary/20 mb-6">
              <Zap size={14} /> UNIFIED PROMETHEUS ARCHITECTURE
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-brand-dark mb-8 tracking-tight leading-[1.05]">
               become the <span className="text-brand-primary italic">definitive</span> AI answer.
            </h1>
            <p className="text-xl text-brand-gray leading-relaxed mb-10 max-w-2xl border-l-4 border-brand-primary pl-8 italic">
              "Traditional search was about ranking in the top 10. AEO and GEO are about becoming the single answer that AI engines trust and cite."
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-8 py-5 bg-brand-primary text-white font-bold rounded-full hover:bg-brand-dark transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-2 group">
                Scale Your AI Presence <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
              </a>
              <button className="px-8 py-5 bg-white border-2 border-brand-dark text-brand-dark font-bold rounded-full hover:bg-brand-dark hover:text-white transition-all flex items-center gap-2">
                Download AEO Roadmap
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Grid Section */}
      <section className="py-24 bg-brand-gray/5 border-y border-brand-gray/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "Entity Reinforcement",
                desc: "We harden your brand's presence in global knowledge bases like Wikipedia and Wikidata to build model-level trust.",
                icon: Globe,
                accent: "cyan"
              },
              {
                title: "Structured Answer Blocks",
                desc: "We engineer factual, high-density content blocks designed for rapid extraction by RAG (Retrieval-Augmented Generation).",
                icon: MessageSquare,
                accent: "dark"
              },
              {
                title: "Knowledge Graph Mapping",
                desc: "Connecting your brand to the core entities and topics LLMs prioritize for authoritative search results.",
                icon: Network,
                accent: "primary"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-white rounded-3xl border border-brand-gray/10 shadow-sm hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-8 group-hover:bg-brand-primary transition-colors duration-500">
                  <feature.icon size={32} className="text-brand-primary group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4">{feature.title}</h3>
                <p className="text-brand-gray text-lg leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework Section */}
      <section id="framework" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-brand-dark mb-8 leading-[1.1]">
                The Architectural <span className="text-brand-primary">AEO Dominance</span> Framework.
              </h2>
              <div className="space-y-12">
                {[
                  { n: 1, label: "Entity Audit", detail: "Exhaustive analysis of how LLMs currently perceive your brand and identifying knowledge gaps in the training data." },
                  { n: 2, label: "Semantic Structuring", detail: "Implementing advanced JSON-LD and definitional content schemas that force AI to cite your brand." },
                  { n: 3, label: "Citation Seeding", detail: "Strategic placement of factual assets across second-party sources that LLMs use as primary retrieval nodes." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-xl group-hover:bg-brand-primary transition-colors">
                      {step.n}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-brand-dark mb-2">{step.label}</h3>
                      <p className="text-brand-gray text-lg leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
                <div className="aspect-[4/5] bg-brand-dark rounded-[40px] overflow-hidden relative">
                    <img 
                        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000" 
                        alt="AI Architecture" 
                        className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
                    <div className="absolute bottom-10 left-10 right-10">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                            <div className="flex items-center gap-4 mb-4">
                                <ShieldCheck className="text-brand-primary" size={32} />
                                <div className="text-white font-bold">E-E-A-T Verified Architecture</div>
                            </div>
                            <p className="text-white/70 text-sm">Our framework is designed to align with Google's Quality Rater Guidelines while optimizing for RAG systems.</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Module */}
      <section id="comparison" className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-0 rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
            <div className="p-16 bg-white/5 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-gray-400 mb-8 flex items-center gap-3">
                    <TrendingDown className="text-red-400" /> The Legacy SEO
                </h3>
                <ul className="space-y-6">
                    {["Keyword-optimized fluff", "Manual backlink begging", "Rank-tracking vanity metrics", "Focus on 'ten blue links'"].map((p, i) => (
                        <li key={i} className="text-xl text-gray-300 flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-red-400"></div> {p}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="p-16 bg-brand-primary/10 border-l border-white/10 relative">
                <div className="absolute top-8 right-8">
                    <Zap className="text-brand-primary animate-pulse" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    <Zap className="text-brand-primary" /> The Architectural AEO
                </h3>
                <ul className="space-y-6">
                    {["Entity-relationship mapping", "Factual density per word", "LLM Share of Model tracking", "Citation engineering for RAG"].map((p, i) => (
                        <li key={i} className="text-xl text-white font-medium flex items-center gap-4">
                            <CheckCircle2 className="text-brand-primary" /> {p}
                        </li>
                    ))}
                </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-brand-gray/5 rounded-[60px] p-12 lg:p-20 border border-brand-gray/10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-brand-dark mb-8 leading-tight">
                  Stop being ranked. <br />Start being <span className="text-brand-primary">cited.</span>
                </h2>
                <p className="text-xl text-brand-gray mb-12 leading-relaxed">
                  The search landscape has shifted. If your brand isn't being cited by ChatGPT, Perplexity, or Google AI Overviews, you're effectively invisible. Secure your future share of model today.
                </p>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <div className="text-4xl font-bold text-brand-dark mb-1">85%</div>
                        <div className="text-sm font-bold text-brand-gray uppercase tracking-widest">Model Recognition</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-brand-dark mb-1">12:1</div>
                        <div className="text-sm font-bold text-brand-gray uppercase tracking-widest">ROI Momentum</div>
                    </div>
                </div>
              </div>
              <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-brand-gray/10">
                <h3 className="text-2xl font-bold text-brand-dark mb-2">Request AEO Audit</h3>
                <p className="text-brand-gray mb-8">Professional entity mapping for enterprise search.</p>
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white border-t border-brand-gray/10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-brand-dark text-center mb-16 uppercase tracking-widest">Technical FAQ</h2>
          <div className="space-y-0 divide-y divide-brand-gray/10">
            {(service?.faqs || [
              {
                question: "What is AEO?",
                answer: "Answer Engine Optimization is the technical process of structuring data and authority signals so that AI models like ChatGPT prioritize your brand as a citation."
              }
            ]).map((faq: any, i: number) => (
              <div key={i} className="py-10 first:pt-0">
                <h3 className="text-2xl font-bold text-brand-dark mb-4">{faq.question}</h3>
                <p className="text-brand-gray text-lg leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

