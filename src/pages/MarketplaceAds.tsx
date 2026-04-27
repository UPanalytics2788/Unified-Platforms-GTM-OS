import { Target, BarChart3, Search, FileText, Settings, CheckCircle, Zap, TrendingUp, Users, MessageSquare, ShieldCheck, ArrowRight, ShoppingCart, Store, Package, ShoppingBag, Layers, PieChart, LineChart, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/ui/SchemaMarkup';
import AdvancedLeadForm from '../components/ui/AdvancedLeadForm';
import { useCMSDocument } from '../hooks/useCMSDocument';

export default function MarketplaceAds() {
  const { data: pageData, loading } = useCMSDocument('services', 'marketplace-ads');
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <Loader2 className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  const faqs = pageData?.faqs || [
    { 
      question: "What is a good ACoS target for marketplace advertising?", 
      answer: "It depends on your product margins and business objectives. Break-even ACoS equals your gross margin percentage. A profit-focused campaign sits below break-even, while a growth/launch campaign may intentionally run above break-even to build sales velocity and organic ranking." 
    },
    { 
      question: "How do marketplace ads affect organic rankings?", 
      answer: "On most major marketplaces, sales velocity is a strong organic ranking signal. Ads drive additional sales, which improve organic ranking, leading to more organic sales. This compounding effect means well-managed ads have benefits beyond direct ad-attributed revenue." 
    },
    { 
      question: "Should we advertise on Amazon India and Flipkart simultaneously?", 
      answer: "For most categories in India, yes. The buyer bases overlap but aren't identical. Amazon India indexes higher on premium categories, while Flipkart has strong penetration in others. We assess both and provide a clear recommendation on budget ratio." 
    },
    { 
      question: "Our products are not selling well organically. Will advertising fix that?", 
      answer: "If products aren't converting organically due to poor images, weak copy, low reviews, or uncompetitive pricing, ads will amplify the problem. We address listing quality issues before scaling ad spend to ensure the traffic actually converts." 
    },
    { 
      question: "How do you handle advertising for a large catalog with hundreds of products?", 
      answer: "We segment products by performance tier, profitability, and strategic importance. Top-selling, high-margin products get active bid optimization, while slower-moving products run on automated campaigns with conservative bids. We build frameworks that scale efficiently." 
    },
    { 
      question: "Do you handle marketplace listing optimization as well as advertising?", 
      answer: "Yes. Listing optimization and advertising are closely connected. We audit and optimize titles, bullet points, descriptions, backend keywords, and images as part of the onboarding process, because strong listings are a prerequisite for profitable advertising." 
    }
  ];

  const platforms = pageData?.platforms || [
    {
      name: "Amazon Ads",
      desc: "The most sophisticated marketplace ad platform. We manage Sponsored Products, Brands, Display, and DSP with an integrated approach that connects paid performance with organic ranking improvements.",
      icon: ShoppingCart
    },
    {
      name: "Flipkart Ads",
      desc: "Crucial for the Indian market. We manage Product Ads and brand placements with strategies tailored to Flipkart's unique buyer behavior, category dynamics, and platform mechanics.",
      icon: Store
    },
    {
      name: "Meesho Ads",
      desc: "Access a rapidly growing base of value-conscious shoppers in tier 2 and 3 cities. We deploy category-specific strategies that account for Meesho's distinct pricing dynamics.",
      icon: ShoppingBag
    },
    {
      name: "Other Marketplaces",
      desc: "We also manage advertising on Myntra, Nykaa, JioMart, BigBasket, and Google Shopping, determining the right mix based on where your products and target customers are.",
      icon: Package
    }
  ];

  const processSteps = pageData?.processSteps || pageData?.process_steps || [
    { 
      icon: Search, 
      title: "Account & Listing Audit", 
      desc: "Assessing listing optimization levels, identifying conversion gaps, and providing clear recommendations before increasing ad spend to prevent wasted budget." 
    },
    { 
      icon: Target, 
      title: "Marketplace Keyword Research", 
      desc: "Building marketplace-specific keyword universes covering high-volume, brand, competitor, and long-tail intent keywords to maximize total search visibility." 
    },
    { 
      icon: Layers, 
      title: "Campaign Structure & Build", 
      desc: "Creating clear separation between campaign types, targeting strategies, and product groups with conservative, data-driven initial bid strategies." 
    },
    { 
      icon: TrendingUp, 
      title: "Bid Optimization & ACoS Management", 
      desc: "Managing bids at the keyword and target level based on your target ACoS for each product, adjusting for performance and seasonal demand shifts." 
    },
    { 
      icon: ShieldCheck, 
      title: "Brand & Display Campaigns", 
      desc: "Developing full-funnel strategies using Sponsored Brands for top-of-search awareness and Sponsored Display to reach shoppers browsing competitor products." 
    },
    { 
      icon: Settings, 
      title: "Search Term & Competitor Targeting", 
      desc: "Harvesting high-performing search terms, adding negatives to prevent waste, and targeting competitor product pages to capture market share." 
    }
  ];

  const useCases = pageData?.use_cases || pageData?.useCases || [
    "Brand owners and direct-to-consumer manufacturers growing their marketplace presence",
    "Private label sellers building and scaling product lines on Amazon and Flipkart",
    "Distributors and wholesalers managing large product catalogs across multiple platforms",
    "D2C brands using marketplaces as a secondary sales channel alongside their website",
    "New product launchers needing rapid sales velocity to build reviews and organic ranking"
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={pageData?.meta_title || "Marketplace Ads Management | Amazon & Flipkart Advertising | Unified Platforms"}
        description={pageData?.meta_description || "Scale your sales on Amazon, Flipkart, and Meesho with expert Marketplace Ads management. Unified Platforms optimizes bids and listings to drive profitable sales velocity."}
      />
      <SchemaMarkup type="Service" data={{
        title: pageData?.title || "Marketplace Ads Management",
        description: pageData?.hero_subtitle || pageData?.description || "Grow sales on Amazon, Flipkart, and other marketplace platforms with expert ad management. Unified Platforms runs marketplace advertising campaigns that improve visibility and drive profitable sales."
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
              {pageData?.category || 'Marketplace Advertising'}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              {pageData?.hero_title || (
                <>Marketplace Ads That Grow Your Sales on <span className="text-brand-primary">Amazon, Flipkart</span> and Beyond</>
              )}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {pageData?.hero_subtitle || pageData?.description || "Winning in marketplaces requires mastering the advertising systems that control visibility. We build programs that improve visibility, drive profitable sales, and strengthen your organic ranking as a compounding benefit."}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#audit" className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2">
                Get Free Account Audit <ArrowRight size={20} />
              </a>
              <a href="#process" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                Our Process
              </a>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img 
              src="https://picsum.photos/seed/marketplace-ads-hero/800/600" 
              alt="Marketplace Advertising Management" 
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
              <div className="text-3xl font-bold text-brand-dark mb-1">ACoS</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Efficiency Focus</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">Flywheel</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Organic + Paid</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">Scale</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Multi-Platform</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">ROI</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Profitable Growth</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-brand-dark mb-6">Mastering the Walled Gardens of Ecommerce</h2>
              <p className="text-lg text-brand-gray leading-relaxed mb-6">
                Marketplaces have become the first stop for product discovery. When someone is ready to buy, the search is increasingly happening inside Amazon, Flipkart, or Meesho rather than on Google. The businesses that win are the ones that have mastered the advertising systems that control visibility.
              </p>
              <p className="text-lg text-brand-gray leading-relaxed">
                Marketplace advertising operates inside walled garden platforms with their own auction mechanics and ranking algorithms. Winning requires deep understanding of how organic ranking, reviews, pricing, and ad performance interact within each platform.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {platforms.map((platform, i) => (
                <div key={i} className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                    <platform.icon size={20} className="text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-brand-dark">{platform.name}</h3>
                    <p className="text-sm text-brand-gray leading-relaxed">{platform.desc}</p>
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
                Our Marketplace Ads <span className="text-brand-primary">Management Process</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                A comprehensive approach that connects listing optimization, keyword strategy, and rigorous bid management to drive profitable sales velocity.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 pt-8">
                {processSteps.map((step, i) => (
                  <div key={i} className="space-y-3 group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                      <step.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-brand-primary transition-colors">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-brand-primary/20 rounded-full blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/marketplace-process/600/800" 
                  alt="Marketplace Ads Process" 
                  className="rounded-2xl w-full h-auto shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-brand-primary p-6 rounded-2xl shadow-xl hidden md:block">
                  <div className="text-3xl font-bold mb-1">Scale</div>
                  <div className="text-xs uppercase tracking-widest font-bold opacity-80">Profitable Growth</div>
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
              <h2 className="text-4xl font-bold text-brand-dark">Get Your Free Marketplace Account Audit</h2>
              <p className="text-lg text-brand-gray leading-relaxed">
                Advertising on top of weak listings or poorly structured campaigns is a costly mistake. Let our experts audit your marketplace presence and identify immediate opportunities for profitable growth.
              </p>
              
              <div>
                <h3 className="text-xl font-bold text-brand-dark mb-4">Who We Help:</h3>
                <ul className="space-y-4">
                  {useCases.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-brand-primary flex-shrink-0 mt-1" size={20} />
                      <span className="text-brand-gray font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <AdvancedLeadForm />
            </div>
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
            src="https://picsum.photos/seed/cta-bg-marketplace/1920/1080?blur=10" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-primary/40 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">Ready to grow your marketplace sales?</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Stop wasting spend and start dominating your category. Get a free account audit and discover your true growth potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="px-10 py-5 bg-white text-brand-primary font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl text-lg">
              Get Your Free Audit
            </a>
            <a href="/services/paid-search" className="px-10 py-5 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-dark/90 transition-all shadow-xl text-lg">
              Explore Paid Search
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
