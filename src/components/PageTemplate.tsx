import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, TrendingUp, Settings, Target, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import TrustBar from './ui/TrustBar';
import { cn } from '../lib/utils';

interface PageTemplateProps {
  data: any;
}

export default function PageTemplate({ data }: PageTemplateProps) {
  if (!data) return null;

  return (
    <div className="bg-brand-white font-sans selection:bg-brand-primary/30">
      <SEO 
        title={data.seo?.title || data.title}
        description={data.seo?.description}
      />

      {data.sections?.map((section: any, index: number) => {
        switch (section.type) {
          case 'hero':
            return (
              <section key={index} className="relative pt-32 pb-40 lg:pt-48 lg:pb-64 overflow-hidden bg-brand-dark">
                {/* Architectural Grid Background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-primary rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center max-w-4xl mx-auto"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-8 border border-brand-primary/30">
                      Growth Partner
                    </div>
                    <h1 className="text-5xl lg:text-8xl font-bold tracking-tighter text-white mb-8 leading-[0.9] uppercase">
                      {section.title}
                    </h1>
                    <p className="text-xl lg:text-2xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
                      {section.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                      {section.cta_primary && (
                        <Link
                          to={section.cta_primary.link}
                          className="w-full sm:w-auto px-10 py-5 bg-brand-primary text-white font-bold rounded-2xl hover:bg-white hover:text-brand-primary transition-all flex items-center justify-center gap-2 shadow-2xl shadow-brand-primary/20 group"
                        >
                          {section.cta_primary.label} 
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                      {section.cta_secondary && (
                        <Link
                          to={section.cta_secondary.link}
                          className="w-full sm:w-auto px-10 py-5 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center backdrop-blur-md"
                        >
                          {section.cta_secondary.label}
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-white to-transparent"></div>
              </section>
            );
          case 'advantage':
            return (
              <section key={index} className="py-32 bg-brand-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="lg:w-1/2">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="h-px w-12 bg-brand-primary"></div>
                        <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.3em]">
                          {section.badge || 'Engineering Growth'}
                        </span>
                      </div>
                      <h2 className="text-4xl lg:text-6xl font-bold text-brand-dark mb-8 tracking-tighter leading-[0.95] uppercase">
                        {section.title}
                      </h2>
                      <div 
                        className="text-lg text-brand-gray mb-10 leading-relaxed font-light prose prose-slate max-w-none"
                        dangerouslySetInnerHTML={{ __html: section.description }}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                        {section.items?.map((item: string, i: number) => (
                          <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-brand-primary/20 transition-all">
                            <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                              <CheckCircle size={16} />
                            </div>
                            <span className="text-brand-dark font-medium text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                      {section.cta && (
                        <Link
                          to={section.cta.link}
                          className="inline-flex items-center px-10 py-5 bg-brand-dark text-white font-bold rounded-2xl hover:bg-brand-primary transition-all gap-2 shadow-xl"
                        >
                          {section.cta.label} <ArrowRight size={20} />
                        </Link>
                      )}
                    </div>
                    <div className="lg:w-1/2">
                      <div className="relative p-4 md:p-8">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl"></div>
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
                          <img 
                            src={section.image_url} 
                            alt={section.title} 
                            className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        {section.stats && (
                          <div className="absolute -bottom-2 -left-2 md:-bottom-10 md:-left-10 bg-brand-dark p-8 rounded-3xl shadow-2xl border border-white/10 text-white min-w-[200px]">
                            <div className="flex items-center gap-5">
                              <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
                                <TrendingUp size={28} />
                              </div>
                              <div>
                                <p className="text-3xl font-bold tracking-tighter">{section.stats.value}</p>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{section.stats.label}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          case 'trust_bar':
            return <TrustBar key={index} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
