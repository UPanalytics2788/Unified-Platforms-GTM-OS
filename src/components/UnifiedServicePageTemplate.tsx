import React from 'react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import SchemaMarkup from './ui/SchemaMarkup';

interface UnifiedPageProps {
  data: any;
}

export default function UnifiedServicePageTemplate({ data }: UnifiedPageProps) {
  if (!data) return null;

  const { page_config, seo, hero, value_grid, main_framework, comparison_module, growth_entities, faq } = data;
  const layout = page_config?.layout_pattern || 'ARCHITECT';
  const theme = page_config?.theme || 'LIGHT';
  const isDark = theme === 'DARK';

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
    <div className={`${isDark ? 'bg-brand-dark text-white' : 'bg-white text-brand-dark'} min-h-screen font-sans selection:bg-brand-primary selection:text-white transition-colors duration-500`}>
      <SEO title={seo.title} description={seo.meta_description} />
      <SchemaMarkup type={seo.schema_type} data={data} />

      {/* Hero Section */}
      <section className={`pt-32 pb-24 px-4 border-b ${isDark ? 'border-white/5' : 'border-gray-100'} overflow-hidden relative`}>
        {isDark && (
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        )}
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-brand-primary/20">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
              <span>{layout} STRATEGY SYSTEM</span>
            </div>
            <h1 className={`text-6xl lg:text-8xl font-black ${isDark ? 'text-white' : 'text-brand-dark'} mb-10 tracking-tighter leading-[0.95] max-w-4xl`}>
              {hero.h1}
            </h1>
            <p className={`text-xl lg:text-3xl ${isDark ? 'text-gray-400' : 'text-brand-gray'} leading-tight max-w-3xl border-l-[6px] border-brand-primary pl-10 py-4 font-medium mb-12`}>
              {hero.intro_text}
            </p>
            {data.imageUrl && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <img 
                  src={data.imageUrl} 
                  alt={hero.h1} 
                  className="w-full aspect-[21/9] object-cover group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Value Grid */}
      {value_grid && (
        <section className={`py-32 px-4 ${isDark ? 'bg-white/5' : 'bg-gray-50/50'}`}>
          <div className="max-w-7xl mx-auto">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-16"
            >
              {value_grid.map((item: any, idx: number) => (
                <motion.div key={idx} variants={itemVariants} className="space-y-8 group">
                  <div className={`w-20 h-20 rounded-3xl ${isDark ? 'bg-white/10' : 'bg-white'} border ${isDark ? 'border-white/10' : 'border-gray-200'} flex items-center justify-center text-brand-primary group-hover:scale-105 transition-all duration-500 shadow-sm group-hover:shadow-[0_0_40px_rgba(93,202,235,0.2)]`}>
                    {renderIcon(item.icon, "w-10 h-10")}
                  </div>
                  <div className="space-y-4">
                    <h3 className={`text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-brand-dark'}`}>{item.title}</h3>
                    <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-brand-gray'}`}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Legacy HTML Content Support */}
      {data.content && (
        <section className={`py-32 px-4 ${isDark ? 'bg-brand-dark' : 'bg-white'} border-b ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
          <div className={`max-w-4xl mx-auto prose prose-2xl ${isDark ? 'prose-invert text-gray-300' : 'text-brand-dark'} prose-headings:font-black prose-headings:tracking-tighter prose-a:text-brand-primary`}>
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        </section>
      )}

      {/* Main Framework */}
      {main_framework && (
        <section className={`py-40 px-4 border-y ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-24">
              <h2 className={`text-5xl lg:text-7xl font-black ${isDark ? 'text-white' : 'text-brand-dark'} tracking-tighter mb-6`}>{main_framework.title}</h2>
              <div className="w-40 h-2 bg-brand-primary"></div>
            </div>
            <div className="grid lg:grid-cols-2 gap-24 items-start">
               <div className="space-y-6">
                  {main_framework.steps.map((step: any, idx: number) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className={`flex gap-8 p-10 rounded-[2.5rem] transition-all duration-500 border ${isDark ? 'hover:bg-white/5 border-transparent hover:border-white/10' : 'hover:bg-gray-50 border-transparent hover:border-gray-200'} group`}
                    >
                      <div className="flex-shrink-0 w-16 h-16 rounded-2xl border-2 border-brand-primary flex items-center justify-center font-black text-2xl text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                        {String(step.number).padStart(2, '0')}
                      </div>
                      <div>
                        <h4 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-brand-dark'} mb-3 tracking-tight group-hover:text-brand-primary transition-colors`}>{step.label}</h4>
                        <p className={`text-lg italic leading-relaxed ${isDark ? 'text-gray-400' : 'text-brand-gray'}`}>{step.detail}</p>
                      </div>
                    </motion.div>
                  ))}
               </div>
               <div className="bg-brand-dark rounded-[3.5rem] p-16 text-white relative overflow-hidden group shadow-2xl border border-white/5">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                  <h3 className="text-4xl font-black mb-10 relative z-10 tracking-tighter">Strategic Outcome</h3>
                  <p className="text-gray-400 mb-12 relative z-10 leading-relaxed text-xl italic font-light">
                    "We don't optimize for vanity metrics. We optimize for high-density revenue structures that scale in AI economies."
                  </p>
                  <ul className="space-y-8 relative z-10">
                    {['Revenue Attribution Integrity', 'Engineered Information Architecture', 'High-Velocity Experimentation'].map((point, i) => (
                      <li key={i} className="flex items-center gap-6 text-lg font-bold">
                        <LucideIcons.ShieldCheck className="text-brand-primary h-7 w-7" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-16 relative z-10">
                    <Link 
                      to="/contact?type=audit"
                      className="inline-flex items-center gap-3 bg-brand-primary text-white px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-[0_20px_50px_rgba(93,202,235,0.3)]"
                    >
                      Request Blueprint <LucideIcons.ArrowRight size={20} />
                    </Link>
                  </div>
               </div>
            </div>
          </div>
        </section>
      )}

      {/* Comparison Module */}
      {comparison_module && (
        <section className={`py-40 px-4 overflow-hidden ${isDark ? 'bg-brand-dark' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto">
            <div className={`grid lg:grid-cols-2 gap-px ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-[4rem] overflow-hidden border ${isDark ? 'border-white/10' : 'border-gray-200'} shadow-2xl`}>
               <div className={`p-16 lg:p-24 ${isDark ? 'bg-brand-dark/50' : 'bg-white'}`}>
                  <h3 className="text-3xl font-black text-red-500 mb-16 flex items-center gap-4 tracking-tighter uppercase">
                    <LucideIcons.XCircle className="w-8 h-8" />
                    {comparison_module.left_side_title}
                  </h3>
                  <ul className="space-y-10">
                    {comparison_module.left_side_points.map((point: string, i: number) => (
                      <li key={i} className={`text-lg font-medium italic ${isDark ? 'text-gray-500' : 'text-slate-400'} flex items-start gap-6 border-l-2 ${isDark ? 'border-white/5' : 'border-gray-100'} pl-8`}>
                        {point}
                      </li>
                    ))}
                  </ul>
               </div>
               <div className={`p-16 lg:p-24 ${isDark ? 'bg-brand-dark' : 'bg-brand-primary'} relative`}>
                  <div className="absolute top-1/2 left-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                  <h3 className={`text-3xl font-black ${isDark ? 'text-brand-primary' : 'text-white'} mb-16 flex items-center gap-4 relative z-10 tracking-tighter uppercase`}>
                    <LucideIcons.Zap className="w-8 h-8" />
                    {comparison_module.right_side_title}
                  </h3>
                  <ul className="space-y-10 relative z-10">
                    {comparison_module.right_side_points.map((point: string, i: number) => (
                      <li key={i} className={`text-xl font-black flex items-start gap-6 border-l-4 ${isDark ? 'border-brand-primary/50' : 'border-white/30'} pl-8 group ${isDark ? 'text-white' : 'text-brand-dark'}`}>
                        <span className={`text-brand-primary group-hover:translate-x-1 transition-transform inline-block ${!isDark && 'group-hover:text-white'}`}>→</span>
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
        <section className={`py-40 px-4 ${isDark ? 'bg-white/5' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-24">
              <h2 className={`text-5xl lg:text-7xl font-black ${isDark ? 'text-white' : 'text-brand-dark'} tracking-tighter mb-8`}>Deployment Ecosystem</h2>
              <p className={`text-2xl ${isDark ? 'text-gray-400' : 'text-brand-gray'} font-medium`}>Engineering this service for specific business infrastructures.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              {growth_entities.map((entity: any, idx: number) => (
                <div key={idx} className={`p-16 rounded-[3rem] ${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-2xl'} border transition-all duration-500 group relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity">
                    <LucideIcons.Box className="w-12 h-12 text-brand-primary" />
                  </div>
                  <h4 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-brand-dark'} mb-6 tracking-tight`}>{entity.title}</h4>
                  <p className={`text-xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-brand-gray'} mb-10`}>{entity.description}</p>
                  <div className={`pt-10 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <p className="text-xs uppercase tracking-[0.3em] font-black text-brand-primary mb-4">Lead Architect's Protocol</p>
                    <p className={`text-lg italic font-medium ${isDark ? 'text-gray-400' : 'text-brand-dark'} pl-6 border-l-2 border-brand-primary/30`}>{entity.context}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Rich Page Content (from Legacy or CMS) */}
      {data.content && (
        <section className={`py-40 px-4 ${isDark ? 'bg-brand-dark' : 'bg-white'}`}>
          <div className="max-w-4xl mx-auto">
            <div 
              className={`prose prose-xl max-w-none ${isDark ? 'prose-invert' : ''} 
                prose-headings:font-black prose-headings:tracking-tighter 
                prose-p:text-lg prose-p:leading-relaxed prose-p:opacity-80
                prose-strong:text-brand-primary`}
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </div>
        </section>
      )}

      {/* Case Studies Section */}
      {data.case_studies && data.case_studies.length > 0 && (
        <section className="py-32 px-4 bg-brand-dark text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">Proven Results.</h2>
                <p className="text-xl text-gray-400 border-l border-brand-primary/30 pl-8">
                  Direct impact across EdTech, SaaS, Logistics, and Enterprise sectors through our architectural approach.
                </p>
              </div>
              <button className="flex items-center gap-2 text-brand-primary font-bold hover:gap-4 transition-all">
                VIEW ALL CASE STUDIES <LucideIcons.ArrowRight size={20} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.case_studies.map((study: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-all group backdrop-blur-sm"
                >
                  <div className="text-brand-primary font-bold text-xs tracking-widest mb-4 uppercase">{study.client}</div>
                  <h3 className="text-2xl font-bold mb-6 group-hover:text-brand-primary transition-colors">{study.title}</h3>
                  <div className="space-y-6">
                    {study.metrics.map((metric: any, mIdx: number) => (
                      <div key={mIdx} className="flex items-end gap-3">
                        <div className="text-3xl font-bold text-white leading-none">{metric.value}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-tighter mb-1">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 pt-10 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button className="text-sm font-bold flex items-center gap-2 text-brand-primary">
                        READ CASE STUDY <LucideIcons.ChevronRight size={16} />
                     </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faq && (
        <section className={`py-40 px-4 ${isDark ? 'bg-brand-dark' : 'bg-gray-50/50'}`}>
          <div className="max-w-5xl mx-auto">
            <h2 className={`text-5xl lg:text-7xl font-black ${isDark ? 'text-white' : 'text-brand-dark'} mb-24 text-center tracking-tighter`}>Intelligence Matrix</h2>
            <div className="space-y-10">
              {faq.map((item: any, idx: number) => (
                <div key={idx} className={`p-12 rounded-3xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100'} border shadow-sm group hover:shadow-2xl transition-all duration-500`}>
                  <h4 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-brand-dark'} mb-6 flex gap-6 tracking-tight`}>
                    <span className="text-brand-primary font-mono opacity-50">[{String(idx + 1).padStart(2, '0')}]</span>
                    {item.question}
                  </h4>
                  <p className={`text-lg leading-relaxed pl-16 border-l-4 border-brand-primary/20 ml-6 group-hover:border-brand-primary transition-colors ${isDark ? 'text-gray-400' : 'text-brand-gray'}`}>
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className={`py-40 px-4 relative overflow-hidden ${isDark ? 'bg-brand-dark' : 'bg-brand-primary'}`}>
         <div className={`absolute inset-0 opacity-10 ${isDark && 'bg-brand-primary/20'}`}>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
         </div>
         <div className="max-w-5xl mx-auto text-center relative z-10">
            <h2 className={`text-6xl lg:text-9xl font-black ${isDark ? 'text-brand-primary' : 'text-white'} mb-16 tracking-tighter leading-[0.85]`}>
              ARCHITECT YOUR<br />GROWTH.
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
               <Link 
                 to="/contact?type=audit"
                 className={`${isDark ? 'bg-brand-primary text-white shadow-[0_0_50px_rgba(93,202,235,0.4)]' : 'bg-brand-dark text-white'} px-16 py-7 rounded-2xl font-black text-xl hover:scale-105 transition-transform flex items-center gap-4`}
               >
                 Book Engineering Audit <LucideIcons.ArrowRight className="w-6 h-6" />
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
