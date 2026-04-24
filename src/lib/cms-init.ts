import { doc, setDoc, collection, getDocs, query, where, addDoc, writeBatch, limit } from 'firebase/firestore';
import { db } from './firebase';
import { SOLUTIONS_CONTENT, SERVICES_CONTENT } from '../data/seedContent';
import { CASE_STUDIES } from '../data/caseStudies';

export const SEED_NAV = [
  {
    label: "Solutions",
    type: "mega_menu",
    visible_to: ["public"],
    order: 1,
    columns: [
      {
        title: "Growth Solutions",
        links: [
          { label: "Revenue Growth", href: "/solutions/revenue-growth" },
          { label: "Lead Generation", href: "/solutions/lead-generation" },
          { label: "Customer Acquisition", href: "/solutions/customer-acquisition" },
          { label: "Conversion Rate Optimization", href: "/solutions/conversion-rate-optimization" },
          { label: "Ecommerce Scaling", href: "/solutions/ecommerce-scaling" },
          { label: "Brand Building", href: "/solutions/brand-building" },
          { label: "Market Entry Strategy", href: "/solutions/market-entry-strategy" },
          { label: "Retention & Lifecycle Marketing", href: "/solutions/retention-lifecycle" },
          { label: "Talent & Hiring Solutions", href: "/solutions/talent-hiring" }
        ]
      }
    ]
  },
  {
    label: "Services",
    type: "mega_menu",
    visible_to: ["public"],
    order: 2,
    columns: [
      {
        title: "Search & Organic",
        links: [
          { label: "SEO Strategy", href: "/services/seo-strategy" },
          { label: "Technical SEO", href: "/services/technical-seo" },
          { label: "Content SEO", href: "/services/content-seo" },
          { label: "Authority Building", href: "/services/authority-building" },
          { label: "Local SEO", href: "/services/local-seo" },
          { label: "AEO / GEO", href: "/services/aeo-geo" }
        ]
      },
      {
        title: "Performance Marketing",
        links: [
          { label: "Paid Search", href: "/services/paid-search" },
          { label: "Paid Social", href: "/services/paid-social" },
          { label: "Marketplace Ads", href: "/services/marketplace-ads" },
          { label: "CRO", href: "/services/cro" }
        ]
      },
      {
        title: "Content & Media",
        links: [
          { label: "Content Strategy", href: "/services/content-strategy" },
          { label: "Content Creation", href: "/services/content-creation" },
          { label: "Social Media", href: "/services/social-media" },
          { label: "Email Marketing", href: "/services/email-marketing" },
          { label: "Copywriting", href: "/services/copywriting" }
        ]
      },
      {
        title: "Development",
        links: [
          { label: "Website Development", href: "/services/website-development" },
          { label: "Web Apps", href: "/services/web-apps" },
          { label: "CMS Development", href: "/services/cms-development" },
          { label: "API Integrations", href: "/services/api-integrations" }
        ]
      },
      {
        title: "Talent & HR",
        links: [
          { label: "Recruitment", href: "/services/recruitment" },
          { label: "Executive Search", href: "/services/executive-search" },
          { label: "RPO", href: "/services/rpo" },
          { label: "HR Consulting", href: "/services/hr-consulting" }
        ]
      },
      {
        title: "GTM-OS Strategies",
        links: [
          { label: "Architectural SEO", href: "/gtm/architectural-seo-strategy" },
          { label: "Sales Velocity Media", href: "/gtm/sales-velocity-performance" },
          { label: "Headless Commerce", href: "/gtm/headless-commerce-development" },
          { label: "Talent Engineering", href: "/gtm/rpo-talent-acquisition-engineering" }
        ]
      }
    ]
  },
  {
    label: "Industries",
    type: "dropdown",
    visible_to: ["public"],
    order: 3,
    links: [
      { label: "Ecommerce", href: "#" },
      { label: "Fintech", href: "#" },
      { label: "Real Estate", href: "#" },
      { label: "EdTech", href: "#" },
      { label: "SaaS", href: "#" },
      { label: "Healthcare", href: "#" },
      { label: "Automotive", href: "#" },
      { label: "Logistics", href: "#" },
      { label: "BFSI", href: "#" },
      { label: "Hospitality", href: "#" }
    ]
  },
  {
    label: "Case Studies",
    type: "link",
    href: "/case-studies",
    visible_to: ["public"],
    order: 4,
  },
  {
    label: "Insights",
    type: "dropdown",
    visible_to: ["public"],
    order: 5,
    links: [
      { label: "Blog", href: "/insights?type=blog" },
      { label: "Playbooks & Guides", href: "/insights?type=guide" },
      { label: "Reports", href: "/insights?type=report" },
      { label: "Video Hub", href: "/insights?type=video" },
      { label: "News", href: "/insights?type=news" }
    ]
  },
  {
    label: "About",
    type: "dropdown",
    visible_to: ["public"],
    order: 6,
    links: [
      { label: "About Unified Platforms", href: "#" },
      { label: "GTM Framework", href: "#" },
      { label: "Leadership", href: "#" },
      { label: "Clients", href: "#" },
      { label: "Careers", href: "#" }
    ]
  },
  {
    label: "Contact",
    type: "dropdown",
    visible_to: ["public"],
    order: 7,
    links: [
      { label: "Book Consultation", href: "/contact" },
      { label: "Request Proposal", href: "/contact" },
      { label: "Free Audit", href: "/contact" },
      { label: "Partnerships", href: "/contact" }
    ]
  }
];

export const SEED_AUTHORS = [
  {
    id: 'team',
    name: 'Unified Platforms Team',
    slug: 'team',
    title: 'Expert Growth Collective',
    credentials: ['GTM Strategy', 'Performance Media'],
    bio: 'The Unified Platforms team is a group of seasoned digital marketing experts with decades of combined experience in scaling complex, global brands.',
    linkedin: 'https://linkedin.com/company/unifiedplatforms',
    avatar: 'https://picsum.photos/seed/team/200/200'
  }
];

export const SEED_TRUST_SIGNALS = [
  {
    type: 'stat',
    label: 'Clients Served',
    value: '200+',
    description: 'We have helped over 200 brands achieve their growth goals across various industries.',
    order: 1,
    status: 'active'
  },
  {
    type: 'stat',
    label: 'Years of Experience',
    value: '8+',
    description: 'Our core team has over 8 years of experience in high-growth marketing and engineering.',
    order: 2,
    status: 'active'
  },
  {
    type: 'stat',
    label: 'Avg. ROI Increase',
    value: '300%',
    description: 'Our clients see an average of 300% increase in their core ROI metrics within the first 6 months.',
    order: 3,
    status: 'active'
  },
  {
    type: 'stat',
    label: 'Team Members',
    value: '45+',
    description: 'A dedicated team of 45+ professionals working to drive results for your business.',
    order: 4,
    status: 'active'
  }
];

export const SEED_INSIGHTS = [
  {
    title: "How to Scale Revenue Using SEO",
    type: "blog",
    slug: "how-to-scale-revenue-using-seo",
    summary: "Discover the architectural approach to SEO that translates directly into revenue growth for your business.",
    author_id: 'team',
    content: "<p>SEO is not just about traffic; it is about revenue. In this article, we explore how to build a topical authority roadmap that aligns with your sales funnel. By focusing on intent-driven keywords and technical excellence, we help you capture high-value users at the moment they are ready to convert. Our approach involves a deep audit of your current stack, followed by a multi-phase implementation plan that covers technical debt, on-page optimization, and strategic link acquisition.</p><p>We have seen brands triple their organic revenue by simply restructuring their content around user journey pillars rather than raw volume stats. This shift in perspective is what separates high-end growth engineering from generic digital marketing.</p>",
    meta_title: "How to Scale Revenue Using SEO | Unified Platforms",
    meta_description: "Learn the high-end SEO strategies used by leading brands to drive consistent organic revenue growth."
  },
  {
    title: "Performance Marketing Playbook 2026",
    type: "guide",
    slug: "performance-marketing-playbook-2026",
    summary: "The definitive guide to sales velocity and ROAS optimization in the AI-first marketing landscape.",
    author_id: 'team',
    content: "<p>The landscape of performance marketing is shifting rapidly towards AI-driven automation. To succeed in 2026, brands must focus on Sales Velocity and ACoS optimization through multi-channel attribution. This playbook outlines the exact frameworks we use to manage millions in monthly ad spend while maintaining peak efficiency. We cover everything from creative diversification on Paid Social to the granular auction dynamics of Marketplace Ads.</p><p>The key to winning in this environment is data density. By feeding accurate conversion signals back into the platforms, you allow AI bidding to find your best customers faster than manual optimizations ever could. This guide provides the technical steps to set up this feedback loop correctly.</p>",
    meta_title: "Performance Marketing Playbook 2026 | Unified Platforms",
    meta_description: "Unlock the growth frameworks needed to master performance marketing in the era of AI and automated bidding."
  },
  {
    title: "The Rise of AEO and GEO",
    type: "report",
    slug: "rise-of-aeo-and-geo",
    summary: "Why Answer Engine Optimization and Generative Engine Optimization are the next frontiers of search.",
    author_id: 'team',
    content: "<p>Traditional search is evolving into answer engines. AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) are becoming critical for brands that want to remain visible in AI-powered search results. This article breaks down how to structure your data for LLMs to scrape and cite your brand as an authority.</p><p>We discuss the importance of concise, factual declarations and why Schema.org markup is more important than ever. If you want to be the answer to your customers' questions in ChatGPT or Google Search Generative Experience, you need to adapt your content strategy today. We provide actionable tips on how to prune your content for maximum clarity and technical digestibility.</p>",
    meta_title: "The Rise of AEO and GEO | Unified Platforms",
    meta_description: "Learn how to optimize your brand for the new era of AI answer engines and generative search results."
  },
  {
    title: "Technical SEO Audit Checklist",
    type: "guide",
    slug: "technical-seo-audit-checklist",
    summary: "A comprehensive guide to finding and fixing the technical debt that is holding back your rankings.",
    author_id: 'team',
    content: "<p>Technical SEO is the foundation upon which all other organic growth is built. Without a crawlable and indexable site, even the best content will fail to rank. This checklist covers the 45 critical points we examine during our deep technical audits. From Core Web Vitals and server-side rendering issues to complex canonical chains and internationalization tags, we leave no stone unturned.</p><p>We also look at log file analysis to understand how actual search bots interact with your infrastructure. This data often reveals hidden crawl budget waste that standard tools miss. Fixing these issues can lead to immediate and dramatic improvements in indexation speed and rank stability.</p>",
    meta_title: "Technical SEO Audit Checklist | Unified Platforms",
    meta_description: "A professional-grade checklist for performing deep technical SEO audits on complex web applications and platforms."
  },
  {
    title: "Maximizing CRO for Ecommerce",
    type: "blog",
    slug: "maximizing-cro-for-ecommerce",
    summary: "Transform your traffic into transactions with these high-impact conversion rate optimization tactics.",
    author_id: 'team',
    content: "<p>Traffic is expensive; conversion is where the value is created. For ecommerce brands, CRO (Conversion Rate Optimization) is the lever that doubles your growth without increasing your ad spend. This article details our process for analyzing user behavior through heatmaps, session recordings, and A/B testing.</p><p>We focus on reducing friction at the most critical points of the funnel: the product page and the checkout. Small changes in micro-copy, button placement, and social proof can lead to double-digit increases in conversion rate. We share real-world case studies where we improved mobile checkout rates by 40% using simple psychological triggers and technical speed optimizations.</p>",
    meta_title: "Maximizing CRO for Ecommerce | Unified Platforms",
    meta_description: "Learn how to optimize your ecommerce store for maximum conversions and higher average order value."
  }
];

export const PAGES_DATA = [
  {
    slug: 'home',
    title: 'Home',
    sections: [
      {
        type: 'hero',
        title: 'Revenue-Focused Marketing & Growth Partner',
        subtitle: 'We help brands scale through SEO, performance marketing, content, web development, and hiring.',
        cta_primary: { label: 'Book Consultation', link: '/contact?type=consultation' },
        cta_secondary: { label: 'View Case Studies', link: '/case-studies' }
      },
      {
        type: 'advantage',
        badge: 'The Unified Advantage',
        title: 'Data-Driven Growth with Proprietary Insights',
        description: "We don't just execute campaigns; we engineer growth. Our unique approach combines cross-channel expertise with advanced AI analytics to uncover hidden opportunities and maximize your ROI.",
        items: [
          "AI-Powered Competitor Intelligence",
          "Cross-Channel Attribution Modeling",
          "Proprietary SEO & Content Frameworks",
          "Dedicated Growth Strategists"
        ],
        image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
        stats: { value: '300%', label: 'Avg. ROI Increase' }
      }
    ],
    seo: {
      title: 'Revenue-Focused Marketing & Growth Partner | Unified Platforms',
      description: 'We help brands scale through SEO, performance marketing, content, web development, and hiring.'
    }
  }
];

export async function runCMSInitialization(force: boolean = false) {
  try {
    if (!force) {
      const q = query(collection(db, 'settings'), limit(1));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        console.log('CMS already initialized.');
        return { success: true };
      }
    }

    const collectionsToReset = ['services', 'solutions', 'case_studies', 'navigation'];

    for (const collName of collectionsToReset) {
      const collRef = collection(db, collName);
      const snapshot = await getDocs(collRef);
      if (!snapshot.empty) {
        const docs = snapshot.docs;
        for (let i = 0; i < docs.length; i += 400) {
          const batch = writeBatch(db);
          const chunk = docs.slice(i, i + 400);
          chunk.forEach(d => batch.delete(d.ref));
          await batch.commit();
        }
      }
    }

    // 1. Migrate Services
    for (const service of SERVICES_CONTENT) {
      await setDoc(doc(db, 'services', service.slug), {
        ...service,
        status: 'published',
        updatedAt: new Date().toISOString()
      });
    }

    // 2. Migrate Solutions
    for (const solution of SOLUTIONS_CONTENT) {
      await setDoc(doc(db, 'solutions', solution.slug), {
        ...solution,
        status: 'published',
        updatedAt: new Date().toISOString()
      });
    }

    // 3. Migrate Pages
    for (const page of PAGES_DATA) {
      await setDoc(doc(db, 'pages', page.slug), {
        ...page,
        status: 'published',
        updatedAt: new Date().toISOString()
      });
    }

    // 4. Migrate Navigation
    const navBatch = writeBatch(db);
    SEED_NAV.forEach((item, index) => {
      // Use label to create deterministically
      const navId = item.label ? item.label.toLowerCase().replace(/\s+/g, '-') : `nav-item-${index}`;
      const ref = doc(db, 'navigation', navId);
      navBatch.set(ref, { ...item, id: navId });
    });
    await navBatch.commit();

    // 5. Migrate Insights (DEDUPLICATED)
    for (const insight of SEED_INSIGHTS) {
      const q = query(collection(db, 'insights'), where('slug', '==', insight.slug));
      const snap = await getDocs(q);
      if (snap.empty) {
        await addDoc(collection(db, 'insights'), {
          ...insight,
          status: 'published',
          createdAt: new Date().toISOString(),
          publish_date: new Date().toISOString()
        });
      }
    }

    // 6. Migrate Authors (DEDUPLICATED)
    for (const author of SEED_AUTHORS) {
      const q = query(collection(db, 'authors'), where('slug', '==', author.slug));
      const snap = await getDocs(q);
      if (snap.empty) {
        const authRef = doc(db, 'authors', author.id);
        await setDoc(authRef, {
          ...author,
          status: 'published',
          createdAt: new Date().toISOString()
        }, { merge: true });
      }
    }

    // 7. Migrate Trust Signals
    const trustSnap = await getDocs(collection(db, 'trust_signals'));
    if (trustSnap.empty) {
      const batch2 = writeBatch(db);
      SEED_TRUST_SIGNALS.forEach((signal) => {
        const ref = doc(collection(db, 'trust_signals'));
        batch2.set(ref, {
          ...signal,
          createdAt: new Date().toISOString()
        });
      });
      await batch2.commit();
    }

    // 8. Migrate Case Studies
    for (const study of CASE_STUDIES) {
      await setDoc(doc(db, 'case_studies', study.slug), {
        ...study,
        status: 'published',
        updatedAt: new Date().toISOString()
      });
    }

    // 9. Migrate GTM Pages (New Programmatic CMS Feature)
    const GTM_PAGES = [
      {
        page_config: {
          layout_pattern: "ARCHITECT",
          theme: "LIGHT",
          url_slug: "architectural-seo-strategy"
        },
        seo: {
          title: "Architectural SEO Strategy | Unified Platforms",
          meta_description: "Deep, technical SEO roadmaps and topical authority engineering for high-growth brands.",
          schema_type: "Service"
        },
        hero: {
          h1: "Topical Authority & Technical Precision.",
          intro_text: "We don't just 'do SEO'. We engineer topical dominance through multi-phase technical audits and semantic network maps that force Google to recognize your category leadership."
        },
        value_grid: [
          { title: "Technical Audit (Deep)", description: "Going beyond surface-level fixes to resolve crawl budget waste and SSR bottlenecks.", icon: "Settings" },
          { title: "Semantic Mapping", description: "Mapping 1,000+ keywords into a cohesive, interlinked knowledge graph.", icon: "Network" },
          { title: "Topical Velocity", description: "Increasing publication frequency without sacrificing E-E-A-T integrity.", icon: "Zap" }
        ],
        main_framework: {
          title: "The Architectural SEO Process",
          steps: [
            { number: 1, label: "Core Audit", detail: "Exhaustive analysis of server response headers, canonical chains, and rendering pipelines." },
            { number: 2, label: "Graph Construction", detail: "Defining primary entities and supporting LSI nodes to build absolute topical authority." },
            { number: 3, label: "Sprint Deployment", detail: "Bi-weekly implementation of technical fixes and content injections." }
          ]
        },
        comparison_module: {
          left_side_title: "The 'Weak' Strategy",
          left_side_points: ["Rank-chasing without intent", "Shallow 500-word blog posts", "Zero technical oversight", "Manual backlink begging"],
          right_side_title: "The Architectural Strategy",
          right_side_points: ["Revenue-aligned keyword maps", "High-density SME-led insights", "Infrastructure-level optimization", "Organic authority through value"]
        },
        growth_entities: [
          { title: "Enterprise SaaS", description: "Scales through complex feature-subset authority.", context: "Focus on feature-specific LSI clusters." },
          { title: "High-Ticket Service", description: "Scales through trust and precision.", context: "Focus on E-E-A-T signals and case study links." }
        ],
        faq: [
          { question: "How long does a technical audit take?", answer: "Our deep audits typically take 14 business days, resulting in a 40-page technical roadmap." },
          { question: "Is this suitable for new domains?", answer: "Yes, but we adjust the velocity to match domain age to avoid sandbox triggers." }
        ]
      },
      {
        page_config: {
          layout_pattern: "ACCELERATOR",
          theme: "LIGHT",
          url_slug: "sales-velocity-performance"
        },
        seo: {
          title: "Sales Velocity Performance Media | Unified Platforms",
          meta_description: "Maximizing ROAS and minimizing ACoS through AI-driven bid management and high-density creative testing.",
          schema_type: "Service"
        },
        hero: {
          h1: "High-Octane Performance Engineering.",
          intro_text: "Stop burning budget on generic algorithms. Our Accelerator framework focuses on Sales Velocity and LTV:CAC ratios, leveraging custom attribution loops that feed the machines better data."
        },
        value_grid: [
          { title: "Auction Mastery", description: "Real-time bid adjustments based on inventory density and competitor signal.", icon: "TrendingUp" },
          { title: "Creative Velocity", description: "Testing 50+ creative iterations per week to find the outliers that scale.", icon: "Layout" },
          { title: "Attribution Sync", description: "First-party data loops that resolve cross-device attribution gaps.", icon: "RefreshCw" }
        ],
        main_framework: {
          title: "The Performance Accelerator Cycle",
          steps: [
            { number: 1, label: "Signal Audit", detail: "Cleaning CAPI events and ensuring pixel integrity across all conversion touchpoints." },
            { number: 2, label: "Creative Sprint", detail: "Rapid production of high-performance hook variations and CTA tests." },
            { number: 3, label: "Scale Injection", detail: "Increasing daily spend on winning permutations while maintaining margin targets." }
          ]
        },
        comparison_module: {
          left_side_title: "The 'Standard' Agency",
          left_side_points: ["Set-and-forget campaign builds", "Monthly reporting on vanity metrics", "Generic stock-photo creatives", "No deep attribution setup"],
          right_side_title: "The Performance Accelerator",
          right_side_points: ["Daily auction-level optimizations", "Real-time revenue-first dashboards", "Custom motion-graphic assets", "Server-side proprietary tracking"]
        },
        growth_entities: [
          { title: "D2C Ecommerce", description: "Requires massive creative volume and attribution data.", context: "Focus on ACoS targets and first-purchase ROAS." },
          { title: "B2B Lead Gen", description: "Requires high-intent signal and MQL validation.", context: "Focus on lead quality scoring and CRM feedback." }
        ],
        faq: [
          { question: "What is the minimum ad spend required?", answer: "We typically work with brands spending $25,000/month or more to ensure statistical significance." },
          { question: "Do you handle creative production?", answer: "Yes, we have an in-house performance creative studio." }
        ]
      },
      {
        page_config: {
          layout_pattern: "ENGINEER",
          theme: "LIGHT",
          url_slug: "headless-commerce-development"
        },
        seo: {
          title: "Headless Commerce & Web Engineering | Unified Platforms",
          meta_description: "Building blazing-fast Next.js and Shopify Headless storefronts that outperform standard stacks.",
          schema_type: "SoftwareApplication"
        },
        hero: {
          h1: "Engineering for Next-Gen Conversion.",
          intro_text: "Legacy stacks are the biggest bottleneck to growth. Our Engineering team builds headless, high-performance web applications that load in under 1s and scale to millions of users without breaking."
        },
        value_grid: [
          { title: "Edge Deployment", description: "Sub-100ms global delivery using Vercel/Cloudflare edge networks.", icon: "Globe" },
          { title: "API-First Logic", description: "Seamlessly connecting ERPs, CRMs, and CMS via robust GraphQL layers.", icon: "Cpu" },
          { title: "Modular UI", description: "Custom component libraries built for design-system consistency and speed.", icon: "Box" }
        ],
        main_framework: {
          title: "The Engineering Sprint Roadmap",
          steps: [
            { number: 1, label: "Stack Analysis", detail: "Evaluating current technical debt and defining the target microservices architecture." },
            { number: 2, label: "Core Build", detail: "Implementing the frontend shell with Next.js and Tailwind CSS for max performance." },
            { number: 3, label: "Integrations", detail: "Wiring up the headless backend (Sanity/Contentful/Shopify) and middleware." }
          ]
        },
        comparison_module: {
          left_side_title: "The 'Plugin-Heavy' Site",
          left_side_points: ["Bloated WordPress/Shopify themes", "Slow LCP and bridge-heavy scripts", "Security vulnerabilities", "Hard-to-maintain codebases"],
          right_side_title: "The Headless Solution",
          right_side_points: ["Blazing fast static generation", "Absolute design freedom", "Rock-solid security posture", "Scalable, developer-friendly stack"]
        },
        growth_entities: [
          { title: "Global Retailers", description: "Need multi-currency and multi-region support.", context: "Focus on localization and performance at scale." },
          { title: "Product Platforms", description: "Complex user logic and dashboard requirements.", context: "Focus on state management and API efficiency." }
        ],
        faq: [
          { question: "Why go headless?", answer: "Headless decoupled the frontend from the backend, providing better performance, security, and scalability." },
          { question: "Is it more expensive to maintain?", answer: "Initial build costs are higher, but long-term maintenance and scaling costs are lower." }
        ]
      },
      {
        page_config: {
          layout_pattern: "CONNECTOR",
          theme: "LIGHT",
          url_slug: "rpo-talent-acquisition-engineering"
        },
        seo: {
          title: "RPO & Talent Acquisition Engineering | Unified Platforms",
          meta_description: "Building high-performance talent pipelines through algorithmic sourcing and culture-fit engineering.",
          schema_type: "Service"
        },
        hero: {
          h1: "Engineering the Perfect Team.",
          intro_text: "Scaling requires more than just resumes. Our Connector framework builds algorithmic sourcing pipelines that find the top 1% of talent, ensuring cultural alignment and technical mastery at every level."
        },
        value_grid: [
          { title: "Algorithmic Sourcing", description: "Using AI to scrape and rank candidates across 50+ professional networks.", icon: "Search" },
          { title: "Culture-Fit Matrix", description: "Proprietary testing modules to ensure alignment with high-performance cultures.", icon: "Users" },
          { title: "Pipeline Velocity", description: "Reducing time-to-hire by 60% through pre-vetted talent pools.", icon: "Activity" }
        ],
        main_framework: {
          title: "The Talent Connector Process",
          steps: [
            { number: 1, label: "Persona Definition", detail: "Mapping the technical and behavioral requirements for each core role." },
            { number: 2, label: "Sourcing Sprint", detail: "Activating automated outreach and multi-channel candidate attraction." },
            { number: 3, label: "Selection Matrix", detail: "Deep-dive interviewing and technical assessment based on engineering benchmarks." }
          ]
        },
        comparison_module: {
          left_side_title: "The 'Traditional' Recruiter",
          left_side_points: ["Manual keyword-matching on LinkedIn", "Spray-and-pray outreach", "Focus on quantity over quality", "No technical vet-capability"],
          right_side_title: "The Talent Connector",
          right_side_points: ["AI-enhanced talent discovery", "Deep assessment of soft-skills", "Rigorous technical vetting", "Strategic advisor on team scaling"]
        },
        growth_entities: [
          { title: "Series A/B Startups", description: "Need to build core engineering teams rapidly.", context: "Focus on speed and culture-defining hires." },
          { title: "Tech Consulting Firms", description: "Need specialized SME talent on-demand.", context: "Focus on technical depth and project agility." }
        ],
        faq: [
          { question: "Do you offer RPO models?", answer: "Yes, we can act as your internal talent acquisition department." },
          { question: "What is your time-to-hire?", answer: "Our average time-to-hire for technical roles is 21 days." }
        ]
      }
    ];

    for (const gtmPage of GTM_PAGES) {
      await setDoc(doc(db, 'gtm_pages', gtmPage.page_config.url_slug), {
        ...gtmPage,
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    
    // 10. Migrate default settings
    await setDoc(doc(db, 'settings', 'brand'), {
      siteName: 'Unified Platforms',
      description: 'Revenue-focused marketing and growth partner helping brands scale through SEO, performance marketing, and content.',
      logoUrl: '/logo.png',
      faviconUrl: '/favicon.ico',
      primaryColor: '#5dcaeb',
      secondaryColor: '#eb735d',
      contactEmail: 'hello@unifiedplatforms.com',
      contactPhone: '+91 98765 43210',
      address: 'Bangalore, India',
      socialLinks: {
        linkedin: 'https://linkedin.com/company/unifiedplatforms',
        twitter: 'https://twitter.com/unifiedplatforms',
        facebook: '',
        instagram: ''
      }
    });

    return { success: true };
  } catch (err: any) {
    console.error("CMS Initialization Error:", err);
    return { success: false, error: err.message };
  }
}
