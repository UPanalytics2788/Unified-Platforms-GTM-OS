import SEO from './SEO';
import SchemaMarkup from './ui/SchemaMarkup';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, MessageSquare, CheckCircle } from 'lucide-react';

interface ServicePageTemplateProps {
  data: any;
  fallbackData?: any;
}

export default function ServicePageTemplate({ data, fallbackData }: ServicePageTemplateProps) {
  const pageData = data || fallbackData;
  
  if (!pageData) return null;

  const renderIcon = (iconName: string, size = 24, className = "") => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent size={size} className={className} /> : null;
  };

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={pageData.meta_title || pageData.title}
        description={pageData.meta_description || pageData.hero_subtitle}
      />
      <SchemaMarkup type="Service" data={{
        title: pageData.title,
        description: pageData.hero_subtitle
      }} />
      {pageData.faqs && <SchemaMarkup type="FAQPage" data={{ faqs: pageData.faqs }} />}
      
      {/* Hero Section */}
      <section className="bg-brand-dark py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-sm font-medium border border-brand-primary/30">
              {pageData.category || 'Specialist Service'}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              {pageData.hero_title || pageData.title}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {pageData.hero_subtitle || pageData.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2">
                {pageData.primary_cta_text || 'Get Started'} <ArrowRight size={20} />
              </a>
              {pageData.process_steps && (
                <a href="#process" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                  Our Process
                </a>
              )}
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img 
              src={pageData.hero_image_url || pageData.imageUrl || "https://picsum.photos/seed/service/800/600"} 
              alt={pageData.title} 
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      {pageData.stats && (
        <section className="py-12 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className={`grid grid-cols-2 lg:grid-cols-${Math.min(pageData.stats.length, 4)} gap-8 text-center`}>
              {pageData.stats.map((stat: any, i: number) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-brand-dark mb-1">{stat.value}</div>
                  <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Value Prop Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-brand-dark mb-6">{pageData.value_prop_title || 'Why Work With Us'}</h2>
              <p className="text-lg text-brand-gray leading-relaxed mb-6">
                {pageData.value_prop_description || pageData.description}
              </p>
              {pageData.long_content && (
                <div className="prose prose-lg text-brand-gray" dangerouslySetInnerHTML={{ __html: pageData.long_content }} />
              )}
            </div>
            {pageData.value_prop_image_url && (
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img src={pageData.value_prop_image_url} alt="Value Proposition" className="w-full h-auto" referrerPolicy="no-referrer" />
              </div>
            )}
            {!pageData.value_prop_image_url && pageData.service_grid && (
               <div className="bg-brand-dark rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl"></div>
                <h3 className="text-2xl font-bold mb-6 relative z-10">Key Benefits:</h3>
                <ul className="space-y-4 relative z-10">
                  {pageData.service_grid.slice(0, 6).map((item: any, i: number) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-brand-primary" />
                      <span className="text-gray-300">{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service Grid */}
      {pageData.service_grid && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-brand-dark mb-6">Our Expertise</h2>
              <p className="text-lg text-brand-gray">Specialized capabilities designed to drive your business forward.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pageData.service_grid.map((item: any, i: number) => (
                <div key={i} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                  {item.icon && (
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                      {renderIcon(item.icon, 28, "text-brand-primary group-hover:text-white")}
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-4 text-brand-dark">{item.title}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {pageData.process_steps && (
        <section id="process" className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-brand-dark mb-6">Our Process</h2>
              <p className="text-lg text-brand-gray">A structured approach that ensures quality and consistency.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pageData.process_steps.map((step: any, i: number) => (
                <div key={i} className="p-8 bg-white rounded-2xl border border-gray-100 hover:border-brand-primary/30 transition-all group">
                  {step.icon && (
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                      {renderIcon(step.icon, 24, "text-brand-primary group-hover:text-white")}
                    </div>
                  )}
                  <h3 className="font-bold text-xl mb-4 text-brand-dark">{step.title}</h3>
                  <p className="text-brand-gray leading-relaxed text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Engagement Models */}
      {pageData.engagement_models && (
        <section className="py-24 bg-brand-dark text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">Engagement Models</h2>
              <p className="text-lg text-gray-400">Flexible ways to partner with us based on your needs.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {pageData.engagement_models.map((model: any, i: number) => (
                <div key={i} className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-brand-primary/50 transition-all">
                  <h3 className="font-bold text-xl mb-4 text-brand-primary">{model.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">{model.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {pageData.faqs && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-brand-dark text-center mb-16">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {pageData.faqs.map((faq: any, i: number) => (
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
      )}

      {/* Final CTA */}
      <section className="py-24 bg-brand-primary relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            {pageData.cta_title || 'Ready to get started?'}
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            {pageData.cta_subtitle || 'Contact Unified Platforms to discuss your requirements.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="px-10 py-5 bg-white text-brand-primary font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl text-lg">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
