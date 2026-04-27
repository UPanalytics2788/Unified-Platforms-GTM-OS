import React from 'react';
import SEO from '../SEO';
import SchemaMarkup from '../ui/SchemaMarkup';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, MessageSquare } from 'lucide-react';
import * as Icons from 'lucide-react';

interface ServiceLayoutProps {
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  stats?: { label: string; value: string }[];
  features?: { title: string; desc: string; icon: string }[];
  processTitle?: string;
  processSubtitle?: string;
  processSteps?: { title: string; desc: string; icon: string }[];
  faqs?: { question: string; answer: string }[];
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaLink?: string;
  ctaText?: string;
  children?: React.ReactNode;
}

export default function ServiceLayout({
  title,
  metaTitle,
  metaDescription,
  heroTitle,
  heroSubtitle,
  heroImage = "https://picsum.photos/seed/service/800/600",
  stats = [],
  features = [],
  processTitle = "Our Strategic Process",
  processSubtitle = "A systematic, data-driven framework designed to deliver measurable results.",
  processSteps = [],
  faqs = [],
  ctaTitle = "Ready to build your growth engine?",
  ctaSubtitle = "Join market leaders who leverage GTM OS to engineer organic growth and scale performance marketing.",
  ctaLink = "/contact",
  ctaText = "Get Started",
  children
}: ServiceLayoutProps) {
  const renderIcon = (iconName: string, size = 24, className = "") => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComponent size={size} className={className} />;
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-brand-primary/30">
      <SEO 
        title={metaTitle || `${title} | GTM OS`}
        description={metaDescription || heroSubtitle}
      />
      <SchemaMarkup type="Service" data={{ title, description: heroSubtitle }} />
      {faqs.length > 0 && <SchemaMarkup type="FAQPage" data={{ faqs }} />}
      
      {/* Hero Section */}
      <section className="bg-brand-dark py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-sm font-bold border border-brand-primary/30 tracking-tight">
              {title}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              {heroTitle}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              {heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={ctaLink} className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2">
                {ctaText} <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group"
          >
            <img 
              src={heroImage} 
              alt={title} 
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      {stats.length > 0 && (
        <section className="py-12 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-brand-dark mb-1 tracking-tight">{stat.value}</div>
                  <div className="text-xs text-brand-gray uppercase tracking-widest font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content (Injected children) */}
      {children}

      {/* Value Grid / Features */}
      {features.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    {renderIcon(feature.icon, 28)}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-brand-dark tracking-tight">{feature.title}</h3>
                  <p className="text-brand-gray leading-relaxed text-sm font-light">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {processSteps.length > 0 && (
        <section className="py-24 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-brand-dark mb-6 tracking-tight">{processTitle}</h2>
              <p className="text-lg text-brand-gray font-light">{processSubtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                <div key={i} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 font-mono text-4xl font-bold text-brand-gray/5 pointer-events-none group-hover:text-brand-primary/10 transition-colors">
                    {(i + 1).toString().padStart(2, '0')}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    {renderIcon(step.icon, 28)}
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-brand-dark tracking-tight">{step.title}</h3>
                  <p className="text-brand-gray leading-relaxed text-sm font-light">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-brand-dark text-center mb-16 tracking-tight">Technical Perspective & FAQs</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="group overflow-hidden rounded-2xl border border-gray-100 transition-all hover:border-brand-primary/30">
                  <div className="p-6 md:p-8">
                    <h3 className="font-bold text-xl mb-4 text-brand-dark flex items-center tracking-tight">
                      <MessageSquare className="text-brand-primary mr-4 flex-shrink-0" size={24} />
                      {faq.question}
                    </h3>
                    <p className="text-brand-gray leading-relaxed pl-10 font-light border-l-2 border-gray-50 ml-3">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-24 bg-brand-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark/20 mix-blend-overlay"></div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight">{ctaTitle}</h2>
          <p className="text-xl mb-12 text-white/80 font-light leading-relaxed">
            {ctaSubtitle}
          </p>
          <a href={ctaLink} className="inline-block px-10 py-5 bg-white text-brand-primary font-bold rounded-2xl hover:bg-brand-dark hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl">
            {ctaText}
          </a>
        </div>
      </section>
    </div>
  );
}
