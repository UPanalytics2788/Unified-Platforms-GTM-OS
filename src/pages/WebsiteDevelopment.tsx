import { useCMSDocument } from '../hooks/useCMSDocument';
import ServicePageTemplate from '../components/ServicePageTemplate';

export default function WebsiteDevelopment() {
  const { data: pageData } = useCMSDocument('services', 'website-development');
  
  const fallbackData = {
    title: 'High-Performance Website Development | Unified Platforms',
    hero_title: 'Website Development That Drives Growth',
    hero_subtitle: 'We build high-performance, conversion-optimized websites that serve as your 24/7 sales engine.',
    meta_description: 'Custom website development optimized for speed, SEO, and lead generation. We build scalable, high-performance web presences that serve as growth engines.',
    description: 'Your website is your most important sales tool. Our web development services focus on building high-performance, conversion-optimized digital experiences that drive measurable business growth.',
    primary_cta_text: 'Build Your Site',
    category: 'Development',
    stats: [
      { value: '50%+', label: 'Faster Load Times' },
      { value: '100%', label: 'Mobile Optimized' },
      { value: '99.9%', label: 'Uptime Guaranteed' },
      { value: 'SEO', label: 'Ready Architecture' }
    ],
    value_prop_title: 'Building the Foundation for Digital Growth',
    value_prop_description: 'In the digital-first world, your website is often the first and most important touchpoint for your prospects.',
    long_content: `
      <h3>1. Performance-First Architecture</h3>
      <p>Speed is a critical factor in both user experience and conversion rates. We build sites using modern, high-performance architectures that ensure lightning-fast load times and smooth interactions. We focus on Core Web Vitals and overall site performance from day one, ensuring that your site provides a superior experience that both users and search engines love.</p>
      
      <h3>2. Conversion-Optimized Design and UX</h3>
      <p>A great website must do more than just look good; it must convert. We integrate principles of conversion rate optimization (CRO) into our design and development process. This includes optimizing information hierarchy, streamlining navigation, and creating clear, compelling calls to action.</p>
      
      <h3>3. Scalable CMS and Content Management</h3>
      <p>We build sites that are easy for your team to manage. We implement scalable, user-friendly CMS solutions that allow your marketing team to update content, create new pages, and run experiments without needing constant developer support.</p>
      
      <h3>4. Seamless Integrations and Ecosystem Alignment</h3>
      <p>Your website is part of a broader ecosystem. We ensure that your site integrates seamlessly with your CRM, marketing automation, and analytics platforms. This 'Single Source of Truth' approach ensures that your data flows smoothly across your entire revenue engine.</p>
    `,
    service_grid: [
      { icon: 'Code', title: 'React & Next.js', desc: 'Modern web architectures for ultimate performance.' },
      { icon: 'Server', title: 'Headless CMS', desc: 'Decoupled backend for security and flexibility.' },
      { icon: 'Zap', title: 'Edge Computing', desc: 'Global CDN distribution for instant loading.' },
      { icon: 'Shield', title: 'Enterprise Security', desc: 'Rigorous protection for your data and users.' },
      { icon: 'Search', title: 'Technical SEO', desc: 'Built-in optimization for search engine indexing.' },
      { icon: 'Smartphone', title: 'Mobile-First', desc: 'Flawless responsive design for all devices.' }
    ],
    faqs: [
      {
        question: "What technologies do you use?",
        answer: "We specialize in modern, high-performance stacks including React, Next.js, and headless CMS architectures. Our technology choices are driven by your specific needs for speed, scalability, and security."
      },
      {
        question: "Do you provide ongoing maintenance?",
        answer: "Yes, we provide comprehensive support and maintenance packages to ensure your site remains secure, up-to-date, and performing at its peak."
      },
      {
        question: "Can you integrate our website with our CRM?",
        answer: "Absolutely. We have deep experience integrating websites with major CRMs like HubSpot and Salesforce, ensuring that your leads flow directly into your sales pipeline."
      }
    ]
  };

  return <ServicePageTemplate data={pageData} fallbackData={fallbackData} />;
}
