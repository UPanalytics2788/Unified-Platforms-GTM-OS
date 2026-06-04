import { doc, getDoc, setDoc, collection, getDocs, query, where, addDoc, writeBatch, limit } from 'firebase/firestore';
import { db } from './firebase';
import { SOLUTIONS_CONTENT, SERVICES_CONTENT, UNIFIED_PAGES } from '../data/seedContent';
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
          { label: "AEO / GEO Dominance", href: "/services/aeo-geo-answer-engine-optimization" }
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
        title: "Unified Strategies",
        links: [
          { label: "Architectural SEO", href: "/unified/architectural-seo-strategy" },
          { label: "Sales Velocity Media", href: "/unified/sales-velocity-performance" },
          { label: "Headless Commerce", href: "/unified/headless-commerce-development" },
          { label: "Talent Engineering", href: "/unified/rpo-talent-acquisition-engineering" }
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
      "About Us",
      { label: "Unified Framework", href: "#" },
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
    credentials: ['Unified Strategy', 'Performance Media'],
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
        badge: 'The Unified Platforms Advantage',
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

    console.log('[CMS Init] Starting...');

    // Step 1: Delete old data in resetable collections
    const collectionsToReset = ['services', 'solutions', 'case-studies', 'navigation', 'pseo_pages'];
    for (const collName of collectionsToReset) {
      try {
        const collRef = collection(db, collName);
        const snapshot = await getDocs(collRef);
        if (!snapshot.empty) {
          for (let i = 0; i < snapshot.docs.length; i += 400) {
            const batch = writeBatch(db);
            snapshot.docs.slice(i, i + 400).forEach(d => batch.delete(d.ref));
            await batch.commit();
          }
        }
      } catch (e) {
        console.warn(`[CMS Init] Could not clear ${collName}:`, e);
      }
    }

    // Step 2: Seed Services (one at a time, errors don't stop the whole run)
    console.log(`[CMS Init] Seeding ${SERVICES_CONTENT.length} services...`);
    for (const service of SERVICES_CONTENT) {
      try {
        await setDoc(doc(db, 'services', service.slug), {
          ...service,
          slug: service.slug,
          status: 'published',
          updatedAt: new Date().toISOString()
        });
        console.log(`[CMS Init] Service OK: ${service.slug}`);
      } catch (e) {
        console.error(`[CMS Init] Service FAILED: ${service.slug}`, e);
      }
    }

    // Step 3: Seed Solutions
    console.log(`[CMS Init] Seeding ${SOLUTIONS_CONTENT.length} solutions...`);
    for (const solution of SOLUTIONS_CONTENT) {
      try {
        await setDoc(doc(db, 'solutions', solution.slug), {
          ...solution,
          slug: solution.slug,
          status: 'published',
          updatedAt: new Date().toISOString()
        });
        console.log(`[CMS Init] Solution OK: ${solution.slug}`);
      } catch (e) {
        console.error(`[CMS Init] Solution FAILED: ${solution.slug}`, e);
      }
    }

    // Step 4: Seed Pages
    for (const page of PAGES_DATA) {
      try {
        await setDoc(doc(db, 'pages', page.slug), {
          ...page,
          status: 'published',
          updatedAt: new Date().toISOString()
        });
      } catch (e) {
        console.error(`[CMS Init] Page FAILED: ${page.slug}`, e);
      }
    }

    // Step 5: Seed Navigation (batch)
    try {
      const navBatch = writeBatch(db);
      SEED_NAV.forEach((item, index) => {
        const navId = item.label ? item.label.toLowerCase().replace(/\s+/g, '-') : `nav-item-${index}`;
        const ref = doc(db, 'navigation', navId);
        navBatch.set(ref, { ...item, id: navId, order: item.order ?? (index + 1) });
      });
      await navBatch.commit();
      console.log('[CMS Init] Navigation OK');
    } catch (e) {
      console.error('[CMS Init] Navigation FAILED:', e);
    }

    // Step 6: Seed Insights (deduplicated)
    for (const insight of SEED_INSIGHTS) {
      try {
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
        console.log(`[CMS Init] Insight OK: ${insight.slug}`);
      } catch (e) {
        console.error(`[CMS Init] Insight FAILED: ${insight.slug}`, e);
      }
    }

    // Step 7: Seed Authors
    for (const author of SEED_AUTHORS) {
      try {
        const q = query(collection(db, 'authors'), where('slug', '==', author.slug));
        const snap = await getDocs(q);
        if (snap.empty) {
          await setDoc(doc(db, 'authors', author.id), {
            ...author,
            status: 'published',
            createdAt: new Date().toISOString()
          }, { merge: true });
        }
      } catch (e) {
        console.error(`[CMS Init] Author FAILED: ${author.id}`, e);
      }
    }

    // Step 8: Seed Trust Signals
    try {
      const trustSnap = await getDocs(collection(db, 'trust_signals'));
      if (trustSnap.empty) {
        const batch2 = writeBatch(db);
        SEED_TRUST_SIGNALS.forEach((signal) => {
          const ref = doc(collection(db, 'trust_signals'));
          batch2.set(ref, { ...signal, createdAt: new Date().toISOString() });
        });
        await batch2.commit();
        console.log('[CMS Init] Trust signals OK');
      }
    } catch (e) {
      console.error('[CMS Init] Trust signals FAILED:', e);
    }

    // Step 9: Seed Geo Taxonomy
    try {
      const geoSnap = await getDocs(collection(db, 'geo_taxonomy'));
      if (geoSnap.empty) {
        const GEO_SEED = [
          { name: 'Bangalore', slug: 'bangalore', type: 'city', state: 'Karnataka', population: 12000000, region: 'South' },
          { name: 'Mumbai', slug: 'mumbai', type: 'city', state: 'Maharashtra', population: 20000000, region: 'West' },
          { name: 'Delhi', slug: 'delhi', type: 'city', state: 'Delhi', population: 19000000, region: 'North' },
          { name: 'Hyderabad', slug: 'hyderabad', type: 'city', state: 'Telangana', population: 10000000, region: 'South' },
          { name: 'Chennai', slug: 'chennai', type: 'city', state: 'Tamil Nadu', population: 11000000, region: 'South' },
          { name: 'San Francisco', slug: 'san-francisco', type: 'city', state: 'CA', population: 800000, region: 'West' },
          { name: 'New York', slug: 'new-york', type: 'city', state: 'NY', population: 8500000, region: 'East' },
          { name: 'London', slug: 'london', type: 'city', state: 'Greater London', population: 9000000, region: 'UK' },
          { name: 'Dubai', slug: 'dubai', type: 'city', state: 'Dubai', population: 3300000, region: 'UAE' },
          { name: 'Singapore', slug: 'singapore', type: 'city', state: 'Singapore', population: 5700000, region: 'APAC' }
        ];
        const geoBatch = writeBatch(db);
        GEO_SEED.forEach(node => {
          const ref = doc(collection(db, 'geo_taxonomy'));
          geoBatch.set(ref, { ...node, createdAt: new Date().toISOString() });
        });
        await geoBatch.commit();
        console.log('[CMS Init] Geo taxonomy OK');
      }
    } catch (e) {
      console.error('[CMS Init] Geo taxonomy FAILED:', e);
    }

    // Step 10: Seed Case Studies
    for (const study of CASE_STUDIES) {
      try {
        await setDoc(doc(db, 'case-studies', study.slug), {
          ...study,
          status: 'published',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } catch (e) {
        console.error(`[CMS Init] Case study FAILED: ${study.slug}`, e);
      }
    }

    // Step 11: Seed Unified Pages
    for (const unifiedPage of UNIFIED_PAGES) {
      try {
        await setDoc(doc(db, 'unified_pages', unifiedPage.page_config.url_slug), {
          ...unifiedPage,
          slug: unifiedPage.page_config.url_slug,
          status: 'published',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } catch (e) {
        console.error(`[CMS Init] Unified page FAILED: ${unifiedPage.page_config.url_slug}`, e);
      }
    }

    // Step 12: Seed Brand Settings (always overwrite)
    try {
      await setDoc(doc(db, 'settings', 'brand'), {
        siteName: 'Unified Platforms',
        description: 'Revenue-focused marketing and growth partner.',
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
      console.log('[CMS Init] Brand settings OK');
    } catch (e) {
      console.error('[CMS Init] Brand settings FAILED:', e);
    }

    console.log('[CMS Init] Complete.');
    return { success: true };

  } catch (err: any) {
    console.error('[CMS Init] Fatal error:', err);
    return { success: false, error: err.message };
  }
}
