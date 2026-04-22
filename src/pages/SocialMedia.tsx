import SEO from '../components/SEO';
import AdvancedLeadForm from '../components/ui/AdvancedLeadForm';
import SchemaMarkup from '../components/ui/SchemaMarkup';
import { 
  Share2, 
  Instagram, 
  Linkedin, 
  Facebook, 
  Twitter, 
  Youtube, 
  BarChart3, 
  Search, 
  CheckCircle, 
  ArrowRight, 
  MessageSquare, 
  PenTool, 
  Users, 
  Calendar,
  Zap,
  Globe,
  Loader2
} from 'lucide-react';
import { useCMSDocument } from '../hooks/useCMSDocument';

export default function SocialMedia() {
  const { data: pageData, loading } = useCMSDocument('services', 'social-media');
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <Loader2 className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  const faqs = pageData?.faqs || [
    {
      question: "How many posts per week do you publish?",
      answer: "Publishing frequency varies by platform and is defined during the strategy phase. Generally, Instagram benefits from 4-7 posts per week (including Reels/Stories), LinkedIn at 3-5 posts, and Facebook at 3-5 posts. We prioritize quality over volume."
    },
    {
      question: "Do you create the visual assets or just the copy?",
      answer: "We handle both. Our service includes copywriting and creative direction. For clients with in-house design, we provide briefs. For others, we produce visual assets directly through our design team, including video scripts and production coordination."
    },
    {
      question: "How do you handle a negative comment or a PR issue on social media?",
      answer: "We have escalation protocols for sensitive situations. Routine negative comments get professional, on-brand responses. Potential PR issues are immediately escalated to you before any response is posted, ensuring you have full control over the approach."
    },
    {
      question: "Which social media platforms should we prioritize?",
      answer: "Prioritization follows your audience. B2C brands in India often focus on Instagram and Facebook. B2B firms focus on LinkedIn. Youth-oriented brands look at Instagram Reels, YouTube Shorts, and regional platforms like Moj. We conduct an audit to give you a specific recommendation."
    },
    {
      question: "How long before we see results from social media management?",
      answer: "Organic social is a medium to long-term investment. Meaningful growth and engagement improvements are typically visible within 3-4 months. Brand trust compounds over a 1-2 year horizon, though individual pieces can spike results earlier."
    }
  ];

  const platforms = pageData?.platforms || [
    { name: "Instagram", icon: Instagram, desc: "Visual storytelling through Reels, Stories, and feed posts with a clear aesthetic strategy." },
    { name: "LinkedIn", icon: Linkedin, desc: "Thought leadership and professional networking for B2B brands and executive profiles." },
    { name: "Facebook", icon: Facebook, desc: "Community building and local visibility, integrated with paid social campaigns." },
    { name: "X (Twitter)", icon: Twitter, desc: "Real-time commentary and fast-paced industry engagement for tech and media brands." },
    { name: "YouTube", icon: Youtube, desc: "Video search optimization, channel architecture, and community engagement." },
    { name: "Regional Platforms", icon: Globe, desc: "Reach tier 2 & 3 markets through ShareChat, Moj, and Josh with localized content." }
  ];

  const processSteps = pageData?.processSteps || pageData?.process_steps || [
    { 
      icon: Search, 
      title: "Audit & Strategy", 
      desc: "Baseline assessment of your presence vs competitors to define priorities and measurable goals." 
    },
    { 
      icon: Zap, 
      title: "Content Pillars", 
      desc: "Defining recurring topic categories that ensure consistency and variety across your profiles." 
    },
    { 
      icon: Calendar, 
      title: "Calendar & Production", 
      desc: "Monthly planning and creative execution of posts, visuals, and video scripts for your approval." 
    },
    { 
      icon: Users, 
      title: "Community Management", 
      desc: "Daily monitoring and on-brand responses to comments and messages to build real relationships." 
    },
    { 
      icon: BarChart3, 
      title: "Reporting & Optimization", 
      desc: "Monthly data reviews to refine the content mix, posting times, and format focus for better ROI." 
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={pageData?.meta_title || "Social Media Management Services | Unified Platforms"}
        description={pageData?.meta_description || "Build a social media presence that grows your audience, strengthens your brand, and drives real business outcomes. Unified Platforms manages social media strategy, content, and community."}
      />
      <SchemaMarkup type="Service" data={{
        title: pageData?.title || "Social Media Management Services",
        description: pageData?.hero_subtitle || pageData?.description || "Build a social media presence that grows your audience, strengthens your brand, and drives real business outcomes."
      }} />
      <SchemaMarkup type="FAQPage" data={{ faqs }} />
      
      {/* Hero Section */}
      <section className="bg-brand-dark py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-sm font-medium border border-brand-primary/30">
              {pageData?.category || 'Full-Service Social Management'}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              {pageData?.hero_title || (
                <>Social Media That Builds <span className="text-brand-primary">Presence</span> and Drives Outcomes</>
              )}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {pageData?.hero_subtitle || pageData?.description || "We handle the strategy, content, and community management so your brand shows up consistently with content that actually engages."}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2">
                Get Social Strategy <ArrowRight size={20} />
              </a>
              <a href="#platforms" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                View Platforms
              </a>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img 
              src={pageData?.imageUrl || "https://picsum.photos/seed/social-media-hero/800/600"} 
              alt="Social Media Management" 
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
              <div className="text-3xl font-bold text-brand-dark mb-1">Omnichannel</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Platform Reach</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">24h</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">Data</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Driven Growth</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-dark mb-1">Creative</div>
              <div className="text-sm text-brand-gray uppercase tracking-wider font-medium">Led Strategy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-brand-dark mb-6">More Than Just Scheduling Posts</h2>
              <p className="text-lg text-brand-gray leading-relaxed mb-6">
                Social media is where your audience spends time and forms opinions. A strong presence builds recognition and reinforces credibility. A weak one signals that a brand is not serious.
              </p>
              <p className="text-lg text-brand-gray leading-relaxed">
                Managing social well requires strategic clarity, creative execution, and disciplined consistency. We handle the full program—from strategy to community management—so your brand shows up the way it should, every week without fail.
              </p>
            </div>
            <div className="bg-brand-dark rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl"></div>
              <h3 className="text-2xl font-bold mb-6 relative z-10">What's Included:</h3>
              <ul className="space-y-4 relative z-10">
                {[
                  "Platform Strategy & Audit",
                  "Audience Growth Planning",
                  "Content Creation (All Formats)",
                  "Community Management",
                  "Influencer Coordination",
                  "Performance Analytics",
                  "Continuous Optimization"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-brand-primary" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Grid */}
      <section id="platforms" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-6">Platforms We Manage</h2>
            <p className="text-lg text-brand-gray">We build platform-specific strategies that respect the unique culture and audience of each channel.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platforms.map((platform, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                  <platform.icon size={28} className="text-brand-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand-dark">{platform.name}</h3>
                <p className="text-brand-gray leading-relaxed text-sm">{platform.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-6">Our Management Process</h2>
            <p className="text-lg text-brand-gray">A disciplined approach to building and maintaining your social presence.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((step, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 text-center hover:border-brand-primary/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <step.icon size={24} className="text-brand-primary group-hover:text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-brand-dark">{step.title}</h3>
                <p className="text-brand-gray text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Indian Market Focus */}
      <section className="py-24 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/india-social/800/600" 
                alt="Social Media in India" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 bg-brand-primary p-8 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold mb-1">India</div>
                <div className="text-sm font-bold uppercase tracking-widest opacity-80 text-white">Market Expertise</div>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold">Social Media for the <span className="text-brand-primary">Indian Market</span></h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                India has one of the most diverse social landscapes in the world. Multilingual audiences and regional platform usage (ShareChat, Moj, Josh) require understanding nuances, not just applying global templates.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our team has direct experience running programs for Indian brands, with deep understanding of cultural context, regional language dynamics, and festival relevance.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                {["Multilingual Content", "Regional Platforms", "Cultural Context", "Festival Strategy"].map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
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
            src="https://picsum.photos/seed/cta-social/1920/1080?blur=10" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">Ready to move your business forward?</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Build a social media presence that actually grows your audience and strengthens your brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="px-10 py-5 bg-white text-brand-primary font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl text-lg">
              Contact Us
            </a>
            <a href="/services/paid-social" className="px-10 py-5 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-dark/90 transition-all shadow-xl text-lg">
              Explore Paid Social
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
