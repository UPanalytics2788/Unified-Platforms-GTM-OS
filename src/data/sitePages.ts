// Canonical default content for the core site pages and global settings.
// This is the SINGLE source of truth shared by:
//   1. The public pages (offline/empty-CMS fallback)
//   2. runCMSInitialization (first-time Firestore seeding)
// Every value here is editable in the Admin panel (Site Pages / Footer / Banner).
// The CMS document, once seeded, always wins over these defaults.

export interface SitePageDoc {
  slug: string;
  title: string;
  seo: { title: string; description: string };
  [key: string]: any;
}

export const HOME_PAGE: SitePageDoc = {
  slug: 'home',
  title: 'Home',
  seo: {
    title: 'Unified Platforms | Revenue-Focused Marketing & Growth Partner',
    description:
      'Scale your brand with Unified Platforms. Specialized in SEO strategy, performance marketing, and technical development built for revenue growth.'
  },
  sections: [
    {
      type: 'hero',
      badge: 'Growth Partner',
      title: 'Revenue-Focused Marketing & Growth Partner',
      subtitle:
        'We engineer measurable growth through data-driven performance and technical engineering—identifying and capturing your largest opportunities.',
      cta_primary: { label: 'Book Consultation', link: '/contact?type=consultation' },
      cta_secondary: { label: 'View Case Studies', link: '/case-studies' }
    },
    {
      type: 'trust_bar'
    },
    {
      type: 'advantage',
      badge: 'The Unified Platforms Advantage',
      title: 'Data-Driven Growth with Technical Precision',
      description:
        "We don't just run ads or build links. We build systems. Our unique approach combines deep technical engineering with performance marketing to create scalable revenue engines.",
      items: [
        'Cross-Channel Strategic Roadmap',
        'High-Performance Marketing Funnels',
        'Engineer-Led Technical SEO',
        'Proprietary Growth Frameworks'
      ],
      image_url:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      stats: { value: '3.5x', label: 'Avg. Sales Velocity' }
    }
  ]
};

export const CONTACT_PAGE: SitePageDoc = {
  slug: 'contact',
  title: 'Contact',
  seo: {
    title: 'Contact Our Growth Experts',
    description:
      'Get in touch with our revenue-focused growth experts. Book a free consultation or request a technical audit for your digital presence.'
  },
  hero: {
    heading: "Let's Scale Your",
    highlight: 'Revenue',
    subtitle:
      "Whether you're looking for a full growth engine overhaul or a specific performance marketing boost, our team is ready to help you execute."
  },
  contact_info: {
    email_label: 'Email Us',
    email: 'growth@unifiedplatforms.com',
    phone_label: 'Call Us',
    phone: '+1 (888) UNIFIED',
    address_label: 'Global HQ',
    address: '123 Growth Way, San Francisco, CA 94105'
  },
  support_box: {
    title: 'Need immediate support?',
    text: 'Our experts are available for a quick chat during business hours.',
    cta_label: 'Start Live Chat'
  },
  form_title_consultation: 'Book a Consultation',
  form_title_audit: 'Request a Free Audit'
};

export const SERVICES_PAGE: SitePageDoc = {
  slug: 'services',
  title: 'Services',
  seo: {
    title: 'Specialized Growth Services',
    description:
      'Comprehensive services to execute your growth strategy with precision. SEO, performance marketing, web development, and talent acquisition all under one roof.'
  },
  header: {
    heading: 'Our Services',
    intro: 'Specialized services to execute your growth strategy with precision and scale.'
  },
  categories: ['Search & Organic', 'Performance Marketing', 'Content & Media', 'Development', 'Talent & HR']
};

export const SOLUTIONS_PAGE: SitePageDoc = {
  slug: 'solutions',
  title: 'Solutions',
  seo: {
    title: 'Strategic Growth Solutions',
    description:
      'Tailored growth strategies and end-to-end technology stacks for every stage of your business. From early-stage growth to enterprise-level market expansion.'
  },
  header: {
    heading: 'Our Solutions',
    intro: 'Tailored growth strategies and technology stacks for every stage of your business.'
  }
};

export const INSIGHTS_PAGE: SitePageDoc = {
  slug: 'insights',
  title: 'Insights',
  seo: {
    title: 'Growth Insights & Industry Playbooks',
    description:
      'Expert perspectives on growth engineering, marketing technology, and the future of growth operations. Access our free strategy playbooks and guides.'
  },
  header: {
    heading: 'Insights & Playbooks',
    intro: 'Expert perspectives on growth, technology, and the future of growth operations.'
  }
};

export const CASE_STUDIES_PAGE: SitePageDoc = {
  slug: 'case-studies',
  title: 'Case Studies',
  seo: {
    title: 'Predictable ROI: Case Studies & Success Stories',
    description:
      'Explore how Unified Platforms engineers organic growth and high-performance paid media campaigns. Real results and case studies from market leaders across industries.'
  },
  header: {
    heading: 'Proven Results Across Industries',
    intro:
      "We don't just promise growth; we engineer it. Explore how we've solved complex challenges and delivered measurable ROI for our clients."
  }
};

export const SITE_PAGES: SitePageDoc[] = [
  HOME_PAGE,
  CONTACT_PAGE,
  SERVICES_PAGE,
  SOLUTIONS_PAGE,
  INSIGHTS_PAGE,
  CASE_STUDIES_PAGE
];

// settings/footer defaults — matches the previously hardcoded footer exactly.
export const FOOTER_DEFAULTS = {
  description:
    'Revenue-focused marketing and growth partner helping brands scale through SEO, performance marketing, and content.',
  columns: [
    {
      title: 'Platform',
      links: [
        { label: 'Solutions', href: '/solutions' },
        { label: 'Services', href: '/services' },
        { label: 'Case Studies', href: '/case-studies' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' }
      ]
    }
  ],
  rights_text: 'All rights reserved.'
};

// settings/campaigns defaults — announcement banner (off by default).
export const BANNER_DEFAULTS = {
  active: false,
  text: '',
  ctaText: '',
  ctaLink: '',
  backgroundColor: '#5dcaeb',
  textColor: '#ffffff'
};
