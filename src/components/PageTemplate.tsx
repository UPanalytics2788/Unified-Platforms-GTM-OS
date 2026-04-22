import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import TrustBar from './ui/TrustBar';

interface PageTemplateProps {
  data: any;
}

export default function PageTemplate({ data }: PageTemplateProps) {
  if (!data) return null;

  return (
    <div className="bg-brand-white">
      <SEO 
        title={data.seo?.title || data.title}
        description={data.seo?.description}
      />

      {data.sections?.map((section: any, index: number) => {
        switch (section.type) {
          case 'hero':
            return (
              <section key={index} className="relative pt-24 pb-32 lg:pt-36 lg:pb-48 border-b border-brand-dark/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto"
                  >
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-brand-dark mb-6 leading-tight">
                      {section.title}
                    </h1>
                    <p className="text-xl text-brand-gray mb-10 leading-relaxed max-w-2xl mx-auto">
                      {section.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      {section.cta_primary && (
                        <Link
                          to={section.cta_primary.link}
                          className="w-full sm:w-auto px-8 py-4 bg-brand-primary text-brand-white font-semibold rounded-xl hover:bg-brand-dark transition-all flex items-center justify-center gap-2"
                        >
                          {section.cta_primary.label} <ArrowRight size={20} />
                        </Link>
                      )}
                      {section.cta_secondary && (
                        <Link
                          to={section.cta_secondary.link}
                          className="w-full sm:w-auto px-8 py-4 bg-brand-white text-brand-dark font-semibold rounded-xl border border-brand-dark/20 hover:border-brand-primary hover:text-brand-primary transition-all flex items-center justify-center"
                        >
                          {section.cta_secondary.label}
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </div>
                {index === 0 && <TrustBar />}
              </section>
            );
          case 'advantage':
            return (
              <section key={index} className="py-24 bg-slate-50 border-t border-brand-dark/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                      {section.badge && (
                        <span className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider rounded-full mb-4 border border-brand-primary/20">
                          {section.badge}
                        </span>
                      )}
                      <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        {section.title}
                      </h2>
                      <div 
                        className="text-xl text-slate-600 mb-8 leading-relaxed prose prose-slate max-w-none"
                        dangerouslySetInnerHTML={{ __html: section.description }}
                      />
                      <ul className="space-y-4 mb-8">
                        {section.items?.map((item: string, i: number) => (
                          <li key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                              <CheckCircle size={14} className="text-brand-primary" />
                            </div>
                            <span className="text-slate-700 font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                      {section.cta && (
                        <Link
                          to={section.cta.link}
                          className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary/90 transition-all gap-2 shadow-lg shadow-brand-primary/20"
                        >
                          {section.cta.label} <ArrowRight size={20} />
                        </Link>
                      )}
                    </div>
                    <div className="lg:w-1/2">
                      <div className="relative">
                        <img 
                          src={section.image_url} 
                          alt={section.title} 
                          className="rounded-3xl shadow-2xl"
                          referrerPolicy="no-referrer"
                        />
                        {section.stats && (
                          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden sm:block">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                                <TrendingUp size={24} />
                              </div>
                              <div>
                                <p className="text-2xl font-bold text-slate-900">{section.stats.value}</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{section.stats.label}</p>
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
