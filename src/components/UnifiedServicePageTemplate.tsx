import React from 'react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'motion/react';
import SEO from './SEO';
import SchemaMarkup from './ui/SchemaMarkup';

interface UnifiedPageProps {
  data: any;
}

export default function UnifiedServicePageTemplate({ data }: UnifiedPageProps) {
  if (!data) return null;

  const { page_config, seo, hero, value_grid, main_framework, comparison_module, growth_entities, faq } = data;
  const layout = page_config?.layout_pattern || 'ARCHITECT';

  const renderIcon = (iconName: string, className = "w-6 h-6") => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className={className} /> : <LucideIcons.Check className={className} />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-brand-primary selection:text-white">
      <SEO title={seo.title} description={seo.meta_description} />
      <SchemaMarkup type={seo.schema_type} data={data} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
              <span>{layout} STRATEGY</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-brand-dark mb-8 tracking-tight leading-[1.1]">
              {hero.h1}
            </h1>
            <p className="text-xl lg:text-2xl text-brand-gray leading-relaxed max-w-3xl border-l-4 border-brand-primary pl-8 py-2">
              {hero.intro_text}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Value Grid */}
      {value_grid && (
        <section className="py-24 px-4 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-12"
            >
              {value_grid.map((item: any, idx: number) => (
                <motion.div key={idx} variants={itemVariants} className="space-y-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow-lg">
                    {renderIcon(item.icon, "w-8 h-8")}
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark">{item.title}</h3>
                  <p className="text-brand-gray leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Main Framework */}
      {main_framework && (
        <section className="py-32 px-4 border-y border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-brand-dark tracking-tight">{main_framework.title}</h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto mt-6"></div>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
               <div className="space-y-4">
                  {main_framework.steps.map((step: any, idx: number) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-6 p-8 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200 group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-brand-primary flex items-center justify-center font-bold text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                        {step.number}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-brand-dark mb-2">{step.label}</h4>
                        <p className="text-brand-gray leading-relaxed">{step.detail}</p>
                      </div>
                    </motion.div>
                  ))}
               </div>
               <div className="bg-brand-dark rounded-[2.5rem] p-12 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <h3 className="text-3xl font-bold mb-8 relative z-10 tracking-tight">The Architectural Edge</h3>
                  <p className="text-gray-400 mb-10 relative z-10 leading-relaxed text-lg italic">
                    "Precision engineering applied to business growth results in predictable, scalable revenue."
                  </p>
                  <ul className="space-y-6 relative z-10">
                    {['Zero Fluff Implementation', 'AI-Ready Data Structures', 'Real-time Performance Reporting'].map((point, i) => (
                      <li key={i} className="flex items-center gap-4 text-sm font-medium">
                        <LucideIcons.ShieldCheck className="text-brand-primary h-5 w-5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-12 relative z-10">
                    <button className="bg-brand-primary text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform">
                      Request Blueprint
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </section>
      )}

      {/* Comparison Module */}
      {comparison_module && (
        <section className="py-32 px-4 overflow-hidden bg-brand-dark">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-px bg-white/10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
               <div className="p-12 lg:p-20 bg-brand-dark/50">
                  <h3 className="text-2xl font-bold text-red-500 mb-12 flex items-center gap-3">
                    <LucideIcons.XCircle className="w-6 h-6" />
                    {comparison_module.left_side_title}
                  </h3>
                  <ul className="space-y-8">
                    {comparison_module.left_side_points.map((point: string, i: number) => (
                      <li key={i} className="text-gray-500 flex items-start gap-4 border-l border-white/5 pl-6">
                        {point}
                      </li>
                    ))}
                  </ul>
               </div>
               <div className="p-12 lg:p-20 bg-brand-dark relative">
                  <div className="absolute top-1/2 left-0 w-32 h-32 bg-brand-primary/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                  <h3 className="text-2xl font-bold text-brand-primary mb-12 flex items-center gap-3 relative z-10">
                    <LucideIcons.Zap className="w-6 h-6" />
                    {comparison_module.right_side_title}
                  </h3>
                  <ul className="space-y-8 relative z-10">
                    {comparison_module.right_side_points.map((point: string, i: number) => (
                      <li key={i} className="text-white font-medium flex items-start gap-4 border-l border-brand-primary/50 pl-6 group">
                        <span className="text-brand-primary group-hover:translate-x-1 transition-transform inline-block">→</span>
                        {point}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
          </div>
        </section>
      )}

      {/* Growth Entities */}
      {growth_entities && (
        <section className="py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold text-brand-dark tracking-tight">Ecosystem Compatibility</h2>
              <p className="mt-4 text-brand-gray text-lg">How this service integrates with specific business structures.</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {growth_entities.map((entity: any, idx: number) => (
                <div key={idx} className="p-10 rounded-[2rem] bg-gray-50 border border-gray-100 hover:border-brand-primary/20 transition-all group">
                  <h4 className="text-xl font-bold text-brand-dark mb-4">{entity.title}</h4>
                  <p className="text-brand-gray mb-6 leading-relaxed">{entity.description}</p>
                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-xs uppercase tracking-widest font-bold text-brand-primary mb-2">Architect's Context</p>
                    <p className="text-sm text-brand-gray italic">{entity.context}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faq && (
        <section className="py-32 px-4 bg-gray-50/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-brand-dark mb-16 text-center">Intelligence Matrix / FAQ</h2>
            <div className="space-y-8">
              {faq.map((item: any, idx: number) => (
                <div key={idx} className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm group">
                  <h4 className="text-lg font-bold text-brand-dark mb-4 flex gap-4">
                    <span className="text-brand-primary font-mono opacity-50">[{String(idx + 1).padStart(2, '0')}]</span>
                    {item.question}
                  </h4>
                  <p className="text-brand-gray leading-relaxed pl-12 border-l border-brand-primary/20 ml-5 group-hover:border-brand-primary transition-colors">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-32 px-4 relative overflow-hidden bg-brand-primary">
         <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
         </div>
         <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-10 tracking-tight leading-tight">
              Ready to Architect Your Growth?
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="bg-brand-dark text-white px-12 py-5 rounded-2xl font-bold hover:scale-105 transition-transform flex items-center gap-3">
                Book Engineering Audit <LucideIcons.ArrowRight className="w-5 h-5" />
              </button>
            </div>
         </div>
      </section>
    </div>
  );
}
