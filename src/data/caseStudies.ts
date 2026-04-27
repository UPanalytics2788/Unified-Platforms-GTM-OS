export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  industry: string;
  serviceCategory: string;
  title: string;
  background: string;
  objective: string;
  approach: string;
  outcome: string;
  metrics: { value: string; label: string }[];
  featured?: boolean;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    slug: 'knowledgehut-seo',
    client: 'KnowledgeHut',
    industry: 'EdTech',
    serviceCategory: 'SEO Strategy',
    title: 'Building a Dominant Organic Search Presence',
    background: 'KnowledgeHut is a global upskilling and professional certification platform offering courses in project management, data science, cloud, and agile methodologies.',
    objective: 'Build a dominant organic search presence to reduce dependency on paid acquisition and drive scalable lead volume at lower CPL.',
    approach: 'Full-funnel SEO architecture: pillar-cluster content model, programmatic page generation for 15,000+ course-location keyword combinations, Core Web Vitals overhaul, technical audit, and a structured link acquisition program targeting educational and professional publications. 20M+ words of content produced across guides, course pages, and comparison articles.',
    outcome: '75M+ million organic sessions generated, 10M+ users acquired, 150,000+ organic leads, 18,000+ backlinks earned organically, conversion rate increased 300%, contributing 40% to top-line revenue. 15,000 pages created.',
    metrics: [
      { value: '75M+', label: 'Traffic Generated' },
      { value: '150K+', label: 'Organic Leads' },
      { value: '300%', label: 'CVR Improvement' }
    ],
    featured: true
  },
  {
    id: '2',
    slug: 'scaler-seo',
    client: 'Scaler',
    industry: 'EdTech',
    serviceCategory: 'SEO Strategy',
    title: 'Scaling Organic Traffic for Tech Education',
    background: 'Scaler is India\'s leading tech education and career acceleration platform for software engineers, offering programs in data structures, system design, and full-stack development.',
    objective: 'Build organic traffic that could carry significant user acquisition at scale while supporting brand authority in the competitive tech education space.',
    approach: 'End-to-end SEO execution: 3,000+ programmatic pages for tech roles, skills, and salary queries, 6M+ words of content produced, 30,000+ backlinks earned through PR-led outreach and technical publisher partnerships. 200% conversion rate improvement through content-led trust building.',
    outcome: '53M+ traffic generated, 2M+ users acquired, 1 Lakh+ organic leads, 200% conversion rate increase, 20% top-line revenue contribution from organic. 3,000+ pages created.',
    metrics: [
      { value: '53M+', label: 'Traffic Generated' },
      { value: '200%', label: 'CVR Improvement' },
      { value: '20%', label: 'Revenue Contribution' }
    ]
  },
  {
    id: '3',
    slug: 'great-learning-seo',
    client: 'Great Learning',
    industry: 'EdTech',
    serviceCategory: 'SEO Strategy',
    title: 'Driving Organic Revenue Contribution',
    background: 'Great Learning is a post-graduate education and professional certification platform offering MBA, data science, AI, and cloud programs in partnership with global universities.',
    objective: 'Drive organic revenue contribution from a site that had historically relied on outbound and paid acquisition for most of its lead volume.',
    approach: 'Technical SEO overhaul alongside content scale-up: 3M+ words of content produced, 1,000+ pages created, 6,000+ backlinks earned organically. Conversion rate optimization layered into organic landing pages.',
    outcome: '18M+ traffic generated, 2M+ users acquired, 700,000+ organic leads generated, 600% conversion rate increase, 15% top-line revenue contribution from organic.',
    metrics: [
      { value: '18M+', label: 'Traffic Generated' },
      { value: '700K+', label: 'Organic Leads' },
      { value: '600%', label: 'CVR Improvement' }
    ]
  },
  {
    id: '4',
    slug: 'housejoy-seo',
    client: 'Housejoy',
    industry: 'Home Services',
    serviceCategory: 'SEO Strategy',
    title: 'Building Organic Demand for Home Services',
    background: 'Housejoy is India\'s leading home services marketplace connecting customers with plumbers, carpenters, electricians, and other home service professionals across major Indian cities.',
    objective: 'Build organic demand and lead volume for home service categories through content and programmatic SEO, reducing dependence on paid acquisition.',
    approach: 'Content SEO targeting home repair, maintenance, and improvement queries. 10 Lakh+ words of content produced across service guides and city-service landing pages. Programmatic SEO deployed to create 100,000+ pages for service-pincode combinations.',
    outcome: '5M+ traffic generated, 10 Lakh+ users acquired, 400,000+ organic leads, 300% conversion rate increase, 1,000+ backlinks earned, 20% revenue contribution from website and apps.',
    metrics: [
      { value: '5M+', label: 'Traffic Generated' },
      { value: '400K+', label: 'Organic Leads' },
      { value: '100K+', label: 'Programmatic Pages' }
    ]
  },
  {
    id: '5',
    slug: 'ather-energy-tech-seo',
    client: 'Ather Energy',
    industry: 'Automotive',
    serviceCategory: 'Technical SEO',
    title: 'Resolving Deep Technical SEO Issues',
    background: 'Ather Energy is India\'s leading premium electric two-wheeler brand with a national dealership and experience centre network. The website is a primary driver of test ride bookings and product discovery.',
    objective: 'Resolve deep technical SEO issues suppressing crawl coverage and organic rankings across product and city landing pages. Achieve passing Core Web Vitals scores on mobile.',
    approach: 'Full technical audit covering site architecture, crawl budget analysis via log file review, canonicalization and hreflang errors, duplicate content from faceted navigation, and structured data implementation across product, FAQ, and review schemas. JavaScript rendering audit and server-side rendering migration for product pages. Core Web Vitals remediation targeting LCP, CLS, and INP on mobile.',
    outcome: 'Crawl coverage increased from 43% to 94% of indexable pages. Mobile LCP reduced from 4.8s to 1.4s — achieving Core Web Vitals pass across all key templates. Organic impressions grew 180% in 4 months post-fix. City landing page rankings improved an average of 14 positions for target terms.',
    metrics: [
      { value: '94%', label: 'Crawl Coverage' },
      { value: '1.4s', label: 'Mobile LCP' },
      { value: '+180%', label: 'Organic Impressions' }
    ]
  },
  {
    id: '6',
    slug: 'porter-content-seo',
    client: 'Porter',
    industry: 'Logistics',
    serviceCategory: 'Content SEO',
    title: 'Building Organic Demand for Logistics',
    background: 'Porter is India\'s leading intra-city logistics platform for businesses and individuals, offering mini trucks, packers and movers, and last-mile delivery services across 20+ cities.',
    objective: 'Build organic demand for logistics service categories through content that captures high-intent searches from SME and enterprise buyers earlier in the purchase cycle.',
    approach: 'Content SEO strategy built on three pillars: service category guides (moving costs, truck hire rates, packing guides), city-pair content targeting route-specific logistics queries, and a business logistics blog targeting SME decision-makers. Editorial calendar driven by keyword opportunity mapped against commercial intent signals. 180+ pieces published across 10 months.',
    outcome: 'Organic blog traffic grew from 18,000 to 210,000 monthly sessions in 10 months. Email subscriber list grew 4x. Organic-attributed enterprise inquiry form fills grew 220%. 3 original research reports published generated 580+ backlinks combined.',
    metrics: [
      { value: '210K/mo', label: 'Blog Traffic' },
      { value: '+220%', label: 'Enterprise Inquiries' },
      { value: '4x', label: 'Email Subscriber Growth' }
    ]
  },
  {
    id: '7',
    slug: 'mobisoft-authority',
    client: 'Mobisoft Technologies',
    industry: 'IT Services',
    serviceCategory: 'Authority Building',
    title: 'Increasing Domain Authority and Brand Visibility',
    background: 'Mobisoft Technologies is an enterprise mobility and digital transformation consulting firm providing custom application development and cloud services to mid-market and enterprise clients.',
    objective: 'Increase domain authority and brand visibility to support organic ranking for competitive enterprise tech keywords, and improve positioning in client RFP processes where brand credibility is evaluated.',
    approach: '12-month authority building roadmap: thought leadership content placed in CIO, ET Tech, and Inc42, digital PR campaigns anchored to two original research reports on enterprise mobility trends, structured guest posting program on DA60+ technology publications, and Wikipedia and Wikidata entity establishment. Outreach prioritized publications that LLMs and AI search engines weight as citation sources.',
    outcome: 'Domain Authority increased from 22 to 54 in 14 months. 200+ editorial placements secured. Organic visibility for target commercial keywords increased 4x. Brand search volume grew 85%. Two analyst mentions secured in Gartner-adjacent publications.',
    metrics: [
      { value: '54', label: 'Domain Authority' },
      { value: '200+', label: 'Editorial Placements' },
      { value: '4x', label: 'Keyword Visibility' }
    ]
  },
  {
    id: '8',
    slug: 'designcafe-local-seo',
    client: 'DesignCafe',
    industry: 'Real Estate & Interiors',
    serviceCategory: 'Local SEO',
    title: 'Improving Google Local Pack Visibility',
    background: 'DesignCafe is India\'s largest end-to-end home interior design firm operating across 12 cities with studios and a customer-facing consultation and design delivery model.',
    objective: 'Improve Google local pack visibility and GBP performance across all 12 city markets to drive studio consultation bookings from near-me and city-level searches.',
    approach: 'City-by-city GBP audit and optimization across 12 studios, structured citation cleanup across 50+ directories, creation of geo-optimized studio landing pages with LocalBusiness schema, a post-project NPS-triggered review generation program, and Q&A seeding on GBP profiles for high-frequency pre-purchase queries.',
    outcome: 'Local pack appearances increased from 3 to 11 active city markets. Average GBP rating improved to 4.6. Studio page organic traffic grew 220%. Direction requests and call clicks from GBP up 3x versus pre-engagement baseline.',
    metrics: [
      { value: '11', label: 'Local Pack Markets' },
      { value: '+220%', label: 'Studio Page Traffic' },
      { value: '3x', label: 'GBP Direction Requests' }
    ]
  },
  {
    id: '9',
    slug: 'saankhya-labs-aeo',
    client: 'Saankhya Labs',
    industry: 'Deep Tech',
    serviceCategory: 'AEO / GEO',
    title: 'Establishing Visibility in AI-Powered Search',
    background: 'Saankhya Labs is a deep-tech semiconductor company developing chipsets and platforms for broadcast technology and 5G applications — a category leader with limited consumer-facing brand recognition but strong enterprise buyer relevance.',
    objective: 'Establish Saankhya Labs as a visible, cited entity in AI-powered search results and LLM-generated responses for queries around broadcast semiconductor solutions, private 5G chipsets, and ATSC 3.0 technology.',
    approach: 'AEO and GEO strategy: FAQ and HowTo schema across all product pages, concise definitional content blocks written for AI extraction (100-150 word structured answers per key query), entity reinforcement across Wikipedia, Wikidata, Crunchbase, LinkedIn, and IEEE profiles, and citation seeding in authoritative publications that LLMs weight heavily as training and retrieval sources.',
    outcome: 'Saankhya Labs began appearing in Perplexity AI, Gemini, and ChatGPT responses for 14 target queries within 6 months. Featured snippet capture rate increased from 2% to 31%. Brand entity was confirmed indexed in 3 major LLM knowledge bases via structured testing.',
    metrics: [
      { value: '14', label: 'AI Search Queries' },
      { value: '31%', label: 'Featured Snippet Rate' },
      { value: '3', label: 'LLM Platforms Confirmed' }
    ]
  },
  {
    id: '10',
    slug: 'upgrad-paid-search',
    client: 'upGrad',
    industry: 'EdTech',
    serviceCategory: 'Paid Search',
    title: 'Reducing CPL While Scaling Lead Volume',
    background: 'upGrad is India\'s largest online higher education platform offering PG programs in MBA, data science, machine learning, and software engineering in partnership with top universities.',
    objective: 'Reduce cost per qualified lead from Google Ads while scaling lead volume as the brand expanded its program portfolio across 12 verticals.',
    approach: 'Full Google Ads account restructure: brand and non-brand separated, Performance Max implemented with segmented asset groups per program, advanced audience layering using CRM customer match lists and in-market audiences, dedicated landing pages per program with continuous A/B testing. Bid strategy migrated from target CPA to tROAS after 90 days of signal build-up. Monthly search term mining and negative keyword governance.',
    outcome: 'CPL reduced 38% in 5 months. Conversion rate from click to qualified form fill improved from 4.2% to 9.1%. ROAS improved 2.6x. Monthly qualified lead volume scaled 3x within existing budget.',
    metrics: [
      { value: '38%', label: 'CPL Reduction' },
      { value: '2.6x', label: 'ROAS Improvement' },
      { value: '3x', label: 'Lead Volume Scale' }
    ]
  },
  {
    id: '11',
    slug: 'housejoy-paid-social',
    client: 'Housejoy',
    industry: 'Home Services',
    serviceCategory: 'Paid Social',
    title: 'Driving Efficient Bookings at Scale',
    background: 'Housejoy is an online services provider which connects home service professionals such as plumbers and carpenters to customers. It is present in Delhi, Mumbai, Chennai, Bengaluru, and Hyderabad.',
    objective: 'Drive bookings for services at home at an efficient cost per booking across key metro markets.',
    approach: 'Housejoy utilised Smart Display Campaigns (SDC) by adopting recommended best practices and were able to drive efficiency and scale on Google\'s Display Network. Separate creative tracks for high-intent and awareness stages. SDC was also deployed specifically for the plumbing category in Delhi and Mumbai where it was tested against Search.',
    outcome: '100x bookings driven at 54% lower cost per booking using Smart Display Campaigns. SDC efficiency improved 54% versus previous Display. 20% of overall spend allocated to SDC. SDC was 30% more efficient than Search for the plumbing category in Delhi and Mumbai.',
    metrics: [
      { value: '54%', label: 'Cost Per Booking Reduction' },
      { value: '100x', label: 'Booking Volume' },
      { value: '30%', label: 'More Efficient vs Search' }
    ]
  },
  {
    id: '12',
    slug: 'metro-paid-social',
    client: 'METRO Cash & Carry India',
    industry: 'Retail & Wholesale',
    serviceCategory: 'Paid Social',
    title: 'Driving Qualified B2B Registrations',
    background: 'METRO Cash & Carry India is a leading B2B wholesale distribution chain serving restaurants, hotels, caterers, and kirana retailers across 31 stores in India.',
    objective: 'Drive qualified business buyer registrations (HoReCa and general trade) through paid social at efficient cost, separating genuine B2B buyers from consumer intent traffic.',
    approach: 'LinkedIn Lead Gen campaigns targeting hospitality owners, F&B managers, and retail business owners. Meta campaigns using lookalike audiences seeded from the existing registered customer database. WhatsApp-integrated lead forms for instant follow-up activation. Separate creative and copy tracks for HoReCa versus general trade segments. Offer-led creative testing at each funnel stage.',
    outcome: '8,400+ qualified B2B registrations in 90 days. Cost per qualified registration 44% below target. LinkedIn drove 31% of total registrations at higher average basket value. WhatsApp-integrated leads showed 2.4x higher engagement in follow-up than standard form leads.',
    metrics: [
      { value: '8,400+', label: 'B2B Registrations' },
      { value: '44%', label: 'Below Target Cost' },
      { value: '2.4x', label: 'WhatsApp Lead Lift' }
    ]
  },
  {
    id: '13',
    slug: 'max-fashion-marketplace',
    client: 'Max Fashion',
    industry: 'Retail & E-commerce',
    serviceCategory: 'Marketplace Ads',
    title: 'Unifying Marketplace Advertising Strategy',
    background: 'Max Fashion is one of India\'s largest value fashion retail chains with a significant presence on Myntra, Amazon, and Flipkart across apparel, footwear, and accessories.',
    objective: 'Unify marketplace advertising strategy across platforms to reduce ACoS, improve organic rank, and grow marketplace revenue contribution.',
    approach: 'Marketplace ad strategy across Myntra, Amazon, and Flipkart with platform-specific creative and bidding approaches. Sponsored search restructured by category, price point, and purchase intent signal. Automated dayparting and budget reallocation based on real-time ROAS signals. A+ content and brand store pages optimized to support conversion post-click. Seasonal campaign calendar aligned with national sale events.',
    outcome: 'Overall ACoS reduced from 18.4% to 9.6%. Sponsored product ROAS improved 2.1x. Organic category keyword rank improved an average of 11 positions. Total marketplace revenue attributable to ads grew 67%.',
    metrics: [
      { value: '9.6%', label: 'ACoS Achieved' },
      { value: '2.1x', label: 'Sponsored Product ROAS' },
      { value: '+67%', label: 'Marketplace Revenue Growth' }
    ]
  },
  {
    id: '14',
    slug: 'scaler-cro',
    client: 'Scaler',
    industry: 'EdTech',
    serviceCategory: 'CRO',
    title: 'Improving Demo Session Booking Rates',
    background: 'Scaler runs high-ticket technical education programs with long consideration cycles. Despite strong paid and organic traffic, program page conversion rates were not reflecting the quality of the product or the investment being made in traffic acquisition.',
    objective: 'Improve conversion rate from program page visit to demo session booking, reducing the CAC on both paid and organic channels without increasing spend.',
    approach: 'Full CRO audit of program landing pages using heatmaps, session recordings, and funnel analysis. Hypotheses prioritized via ICE scoring. A/B and multivariate tests run on: hero section value proposition, placement counsellor social proof, salary outcome data visualization, demo booking form friction, and urgency/scarcity elements. Mobile-first redesign given 68% mobile share. Implemented dynamic content blocks personalized by traffic source.',
    outcome: 'Demo booking rate from program pages improved 64% in 3 months. Mobile conversion rate specifically improved 82%. CAC on Google Ads reduced 28% without changing bids. Annual revenue impact of CVR improvement estimated at 3.2x the engagement cost.',
    metrics: [
      { value: '+64%', label: 'Demo Booking Rate' },
      { value: '+82%', label: 'Mobile CVR' },
      { value: '-28%', label: 'CAC Reduction' }
    ]
  },
  {
    id: '15',
    slug: 'porter-content-strategy',
    client: 'Porter',
    industry: 'Logistics',
    serviceCategory: 'Content Strategy',
    title: 'Developing a Structured Content Strategy',
    background: 'Porter is India\'s leading intra-city logistics platform for businesses and individuals. Despite strong brand recognition in consumer segments, Porter lacked a defined content strategy to build organic demand and credibility in enterprise logistics.',
    objective: 'Develop a structured content strategy that drives organic traffic growth, builds enterprise buyer trust, and positions Porter as a thought leader in the urban logistics category.',
    approach: 'ICP-mapped content pillar framework built for three distinct audiences: SME logistics buyers, enterprise supply chain managers, and individual movers. 60% SEO-led content, 40% thought leadership. Quarterly original research reports on urban logistics trends, promoted via PR and LinkedIn. Editorial calendar owned and executed by a dedicated content team. Distribution strategy included email nurture, LinkedIn amplification, and partner syndication.',
    outcome: 'Organic blog traffic grew from 18,000 to 210,000 monthly sessions in 10 months. Email subscriber base grew 4x. Enterprise inbound inquiries from content grew 220%. Research reports generated 580+ backlinks combined.',
    metrics: [
      { value: '210K', label: 'Monthly Blog Traffic' },
      { value: '+220%', label: 'Enterprise Inquiry Lift' },
      { value: '580+', label: 'Research Report Backlinks' }
    ]
  },
  {
    id: '16',
    slug: 'myntra-content-creation',
    client: 'Myntra',
    industry: 'Retail & E-commerce',
    serviceCategory: 'Content Creation',
    title: 'Establishing High-Output Content Creation',
    background: 'Myntra is India\'s leading fashion and lifestyle e-commerce platform with a large content demand across campaign launches, category editorials, product descriptions, and social media — at volumes the in-house team could not sustainably produce during peak sale periods.',
    objective: 'Establish a reliable, high-output managed content creation partnership that maintains brand voice consistency at scale across formats and teams.',
    approach: 'Dedicated writing team trained on Myntra\'s brand voice guidelines. Structured briefing-to-delivery workflow with defined SLA at each stage. Content calendar integrated with the merchandising and campaign calendar. Formats covered: product descriptions, trend editorials, campaign hero copy, social scripts, emailer copy, and video storyboards. Fortnightly brand voice QA scoring cycle.',
    outcome: '3,200+ pieces of content delivered across 6 months. Average turnaround from brief to first draft: 48 hours. Brand voice consistency score improved from 62% to 91% on in-house QA rubric. Content output directly supported 4 major sale events including the End of Reason Sale.',
    metrics: [
      { value: '3,200+', label: 'Content Pieces' },
      { value: '48 Hours', label: 'Average Turnaround' },
      { value: '91%', label: 'Brand Voice Score' }
    ]
  },
  {
    id: '17',
    slug: 'designcafe-social',
    client: 'DesignCafe',
    industry: 'Real Estate & Interiors',
    serviceCategory: 'Social Media',
    title: 'Building a Dominant Organic Social Brand',
    background: 'DesignCafe is India\'s largest end-to-end home interior design firm, present across 12 cities. Despite strong offline brand recognition, the company had minimal social media footprint when the engagement began.',
    objective: 'Build DesignCafe into a dominant organic social media brand in the home interiors category across YouTube, Instagram, Pinterest, LinkedIn, and Facebook.',
    approach: 'Platform-specific social strategy: YouTube driven by home transformation walkthroughs and design process content (grew from 2K to 500K subscribers). Instagram leveraging inspiration reels and client home tour content (grew from 7K to 150K followers). Pinterest established as a visual discovery channel (0 to 8M+ monthly impressions). LinkedIn built as employer brand and B2B channel (0 to 80K followers). 100+ viral content pieces produced, each exceeding 1M+ views.',
    outcome: '110M+ in top-line revenue contribution attributed to social channels. Combined follower and audience growth across all platforms represents one of the largest organic social builds in Indian home interiors.',
    metrics: [
      { value: '500K', label: 'YouTube Subscribers' },
      { value: '150K', label: 'Instagram Followers' },
      { value: '110M+', label: 'Revenue Contribution' }
    ]
  },
  {
    id: '18',
    slug: 'babychakra-social',
    client: 'BabyChakra',
    industry: 'Healthcare',
    serviceCategory: 'Social Media',
    title: 'Building Facebook and Community Presence',
    background: 'BabyChakra is India\'s fastest growing and largest platform for pregnancy and childcare with a mobile web and Android app. It has the largest community of Indian moms online (1M+ monthly unique visitors) and the biggest base of reviews on maternity and childcare services.',
    objective: 'Build Facebook and community presence from scratch and drive top-line revenue contribution through social media channels.',
    approach: 'Facebook page built from 0 to 50K followers with community-focused content. Private Facebook Group (BabyChakra Mom Stars) built from 0 to 20K engaged members — a niche, high-trust community of Indian mothers. YouTube channel developed alongside community content strategy.',
    outcome: '0 to 50K followers on Facebook. 0 to 20K community built for Moms. 110M+ top-line revenue contribution from social channels.',
    metrics: [
      { value: '50K', label: 'Facebook Followers' },
      { value: '20K', label: 'Mom Community Built' },
      { value: '110M+', label: 'Revenue Contribution' }
    ]
  },
  {
    id: '19',
    slug: 'red-pen-social',
    client: 'The Red Pen',
    industry: 'Education Consulting',
    serviceCategory: 'Social Media',
    title: 'Growing Organic Social Engagement',
    background: 'The Red Pen is an independent education consulting company (India and UK based) advising applicants who seek to study abroad at all levels of education. A 100+ member team recognised as the most trusted consulting partners for international admissions.',
    objective: 'Grow organic social engagement across Instagram and LinkedIn, and drive ROI from influencer marketing campaigns supporting brand events.',
    approach: 'Social media content strategy and copywriting across Instagram and LinkedIn. Influencer marketing partnerships for brand events — speakers, education fairs, and admissions workshops. Platform-specific content adapted for aspirational student and parent audiences.',
    outcome: 'Instagram organic engagement up 200%. LinkedIn organic engagement grew from 0 to 300%. 300% ROI on influencer marketing for brand events.',
    metrics: [
      { value: '+200%', label: 'Instagram Engagement' },
      { value: '300%', label: 'LinkedIn Engagement' },
      { value: '300%', label: 'Influencer ROI' }
    ]
  },
  {
    id: '20',
    slug: 'dunzo-email',
    client: 'Dunzo',
    industry: 'Logistics',
    serviceCategory: 'Email Marketing',
    title: 'Rebuilding Email Marketing for Engagement',
    background: 'Dunzo is a quick commerce and hyperlocal delivery platform operating in major Indian cities. Large registered user base with poor email engagement — open rates below 8%, high unsubscribe rates, and no audience segmentation.',
    objective: 'Rebuild email marketing from the ground up to improve engagement, reactivate dormant users, and grow GMV attributable to email as a channel.',
    approach: 'ESP migration to CleverTap. Behavioral segmentation built by order frequency, category preference, recency, and city. Trigger-based lifecycle flows implemented: onboarding, reactivation, cart recovery, and post-purchase. Continuous A/B testing cadence on subject lines, send times, and content formats. Suppression lists cleaned to protect sender reputation.',
    outcome: 'Open rate improved from 7.8% to 24.3%. Click-to-open rate increased 3.1x. Dormant user reactivation flow returned 18% of lapsed users within 60 days. Email-attributed GMV grew 4.2x in 6 months.',
    metrics: [
      { value: '24.3%', label: 'Open Rate' },
      { value: '3.1x', label: 'Click-to-Open Rate' },
      { value: '4.2x', label: 'Email-Attributed GMV' }
    ]
  },
  {
    id: '21',
    slug: 'ather-energy-copywriting',
    client: 'Ather Energy',
    industry: 'Automotive',
    serviceCategory: 'Copywriting',
    title: 'Overhauling Website and Campaign Copy',
    background: 'Ather Energy is India\'s leading premium electric two-wheeler brand. The brand needed a complete website and campaign copy overhaul to match its premium product positioning and improve conversion across the test ride booking funnel.',
    objective: 'Rewrite all consumer-facing copy — website, product pages, campaign ads, emailers, and dealership collateral — to reflect Ather\'s premium, tech-forward brand voice and improve conversion at key funnel stages.',
    approach: 'Brand voice definition exercise produced a copy style guide covering tone, vocabulary, sentence length, and platform-specific adaptations. Full website rewrite across product pages, city landing pages, FAQ, and the booking flow. Ad copy for Google Ads, Meta, and YouTube campaigns developed and A/B tested. Post-purchase and lifecycle email sequences written. Localized copy for South India markets developed in collaboration with regional teams.',
    outcome: 'Test ride booking page conversion rate improved 41% following copy rewrite. Ad CTR across Meta campaigns improved 28% with new copy framework. Emailer click-through rate grew 2.3x. Copy style guide adopted as internal standard across all marketing communications.',
    metrics: [
      { value: '+41%', label: 'Booking Page CVR' },
      { value: '+28%', label: 'Meta Ad CTR' },
      { value: '2.3x', label: 'Email CTR Growth' }
    ]
  },
  {
    id: '22',
    slug: 'ideaforge-web-dev',
    client: 'ideaForge Technology',
    industry: 'Aerospace & Defense',
    serviceCategory: 'Website Development',
    title: 'Designing an Enterprise-Grade Corporate Website',
    background: 'ideaForge Technology is India\'s leading drone manufacturer and a listed NSE company. The existing website did not reflect the company\'s enterprise positioning and had poor performance on mobile, affecting both investor and client perception.',
    objective: 'Design and develop a new corporate website that positions ideaForge as an enterprise-grade technology brand, improves organic discoverability, and supports lead generation from defence, surveillance, and agriculture segments.',
    approach: 'Ground-up website build on Next.js with headless CMS (Sanity.io) for marketing team independence. Performance-first development targeting sub-1.5s LCP. Solution-specific landing pages designed for each vertical (defence, infrastructure, agriculture). Product specification pages with structured data for search visibility. Secure investor relations section. Integrated demo request workflow with CRM push to HubSpot.',
    outcome: 'Mobile LCP reduced to 1.3 seconds. Organic impressions grew 160% in 4 months post-launch. Demo request form submissions increased 3.2x compared to previous site. Bounce rate reduced from 68% to 37%. CMS-enabled marketing team published 40+ updates independently in the first quarter.',
    metrics: [
      { value: '1.3s', label: 'Mobile LCP' },
      { value: '3.2x', label: 'Demo Request Conversion' },
      { value: '37%', label: 'Bounce Rate Achieved' }
    ]
  },
  {
    id: '23',
    slug: 'rentmystay-web-apps',
    client: 'RentMyStay',
    industry: 'Real Estate & Interiors',
    serviceCategory: 'Web Apps',
    title: 'Building a Tenant-Facing Web Application',
    background: 'RentMyStay is a co-living and managed accommodation platform for young professionals and students. The platform manages 1,200+ beds across multiple cities with a mix of corporate and individual tenants.',
    objective: 'Build a tenant-facing web application that handles room discovery, booking, payment, and ongoing tenancy management without requiring human intervention at each stage.',
    approach: 'Custom web app built on React with a Node.js backend and PostgreSQL database. Features developed: room availability calendar with real-time sync, online booking with Razorpay payment integration, tenant dashboard (rent payments, maintenance requests, documents), automated WhatsApp notification flows for booking confirmations, payment reminders, and move-out notices. Property manager dashboard with occupancy and revenue reporting.',
    outcome: 'Manual booking process eliminated — 100% of bookings processed through the platform within 2 months of launch. Maintenance request resolution time reduced from 4.2 days to 1.8 days. Rent collection compliance rate improved from 74% to 96% through automated reminders. Platform uptime maintained at 99.6% over 6 months.',
    metrics: [
      { value: '100%', label: 'Booking Automation' },
      { value: '1.8 Days', label: 'Maintenance Resolution' },
      { value: '96%', label: 'Rent Collection Compliance' }
    ]
  },
  {
    id: '24',
    slug: 'benzne-cms',
    client: 'Benzne Consulting',
    industry: 'Management Consulting',
    serviceCategory: 'CMS Development',
    title: 'Implementing a Headless CMS for Marketing',
    background: 'Benzne Consulting is a boutique agile transformation and product management consulting firm. Their marketing team needed to publish thought leadership, case studies, and event landing pages at high frequency without requiring developer involvement for every content update.',
    objective: 'Implement a headless CMS that enables the marketing team to manage all content independently while maintaining design consistency and site performance.',
    approach: 'Sanity.io headless CMS implemented and integrated with the existing Next.js website. Custom content schemas built for blog posts, case studies, team profiles, webinar and event pages, and testimonials. Structured content model designed to support multi-channel publishing from a single source — web, email newsletter, and LinkedIn articles. Editor onboarding, training sessions, and full documentation delivered at handoff.',
    outcome: 'Content publishing time per piece reduced from 3 days (developer dependency) to 2 hours (self-serve). Marketing team independently published 80+ pieces in the first quarter after launch. Developer time reclaimed from content updates: 8 hours per week. Blog traffic grew 240% in 6 months as publishing frequency increased 4x.',
    metrics: [
      { value: '2 Hours', label: 'Publishing Time' },
      { value: '80+', label: 'Pieces Published (Q1)' },
      { value: '+240%', label: 'Blog Traffic Growth' }
    ]
  },
  {
    id: '25',
    slug: 'envigaurd-api',
    client: 'Envigaurd Engineering',
    industry: 'Engineering',
    serviceCategory: 'API Integrations',
    title: 'Unifying Operational Workflows with APIs',
    background: 'Envigaurd Engineering and Survey Projects is a growing infrastructure and environmental consulting firm. Client project data, billing milestones, and field team reporting were being managed across disconnected systems — an internal ERP, a manual billing tracker, and field reporting via WhatsApp groups.',
    objective: 'Build an API integration layer that unifies the ERP, invoicing, field data collection, and client communication into a single operational workflow — reducing manual effort and improving project visibility.',
    approach: 'Integration architecture connecting Zoho CRM (client management), Zoho Books (invoicing and billing milestones), a custom field data collection app (built for Android), and WhatsApp Business API for automated project milestone notifications to clients. Bi-directional sync between CRM and Books to eliminate duplicate data entry. Automated invoice generation triggered by project stage updates in CRM.',
    outcome: 'Manual data entry across systems eliminated — estimated 14 hours per week reclaimed across the operations team. Invoice generation time reduced from 2 days to 4 hours. Client milestone communication response rate improved 60%. Data inconsistency errors between CRM and billing reduced to zero post-integration.',
    metrics: [
      { value: '14 hrs/wk', label: 'Manual Work Eliminated' },
      { value: '4 Hours', label: 'Invoice Generation' },
      { value: '+60%', label: 'Client Response Rate' }
    ]
  },
  {
    id: '26',
    slug: 'wednesday-recruitment',
    client: 'Wednesday Solutions',
    industry: 'IT Services',
    serviceCategory: 'Recruitment',
    title: 'Scaling a Specialized Engineering Team',
    background: 'Wednesday Solutions is a boutique product engineering and technology consulting firm based in Pune. Scaling a specialized engineering team in a competitive talent market with open senior roles unfilled for 60+ days on average.',
    objective: 'Source and place 15-20 specialized engineering hires within 4 months — senior full-stack, mobile, and DevOps roles — while improving the offer acceptance rate and reducing time-to-offer.',
    approach: 'Embedded recruitment partnership: sourcing strategy combining LinkedIn Recruiter, GitHub community outreach, and referral program activation with structured incentives. JD rewriting to lead with technical challenge and culture over perks. Structured interview process redesign reducing time-to-offer from 22 days to 8 days. Dedicated point of contact for candidate experience management.',
    outcome: '18 specialized engineering hires completed in 4 months. Time-to-offer reduced from 22 to 8 days. Offer acceptance rate improved from 55% to 82%. 90-day retention of placed candidates: 100%.',
    metrics: [
      { value: '18', label: 'Hires Completed' },
      { value: '8 Days', label: 'Time-to-Offer' },
      { value: '82%', label: 'Offer Acceptance Rate' }
    ]
  },
  {
    id: '27',
    slug: 'getwidget-executive-search',
    client: 'GetWidget',
    industry: 'SaaS',
    serviceCategory: 'Executive Search',
    title: 'Placing Senior Leadership Roles',
    background: 'GetWidget is a SaaS platform for app developers scaling from startup to growth stage post-Series A. The company needed a VP of Sales and a Head of Marketing to lead go-to-market — roles requiring a rare combination of SaaS domain expertise, developer-audience understanding, and remote-first team experience.',
    objective: 'Place both senior leadership roles simultaneously within 45 days, sourcing from the passive talent market.',
    approach: 'Executive search with targeted passive candidate engagement. Longlists of 40+ candidates per role built through LinkedIn research, competitor intelligence, and the Unified Platforms network. Structured competency-based assessment across three interview rounds. Full candidate management including offer structuring, reference checks, and counter-offer preparation.',
    outcome: 'VP of Sales placed in 34 days. Head of Marketing placed in 28 days. Both candidates sourced from outside the active job market. Both in role 18 months post-placement. Cost 40% below equivalent RPO firm engagement.',
    metrics: [
      { value: '34 Days', label: 'VP Sales Time-to-Fill' },
      { value: '28 Days', label: 'Head of Marketing Time-to-Fill' },
      { value: '40%', label: 'Lower Cost vs RPO' }
    ]
  },
  {
    id: '28',
    slug: 'envigaurd-rpo',
    client: 'Envigaurd Engineering',
    industry: 'Engineering',
    serviceCategory: 'RPO',
    title: 'Deploying an End-to-End RPO Solution',
    background: 'Envigaurd Engineering and Survey Projects won a series of large infrastructure projects requiring a rapid scale from 45 to 120 employees across 6 cities in 8 months — across survey engineers, environmental consultants, GIS analysts, and project managers. Internal HR capacity was approximately 4 hires per month.',
    objective: 'Deploy an end-to-end RPO solution capable of delivering 75 hires across 6 cities in 7 months without SLA breaches, at cost-per-hire below industry benchmark.',
    approach: '3 dedicated Unified Platforms recruiters embedded in the engagement. Purpose-built ATS configured for role-specific tracking. Competency frameworks developed for each role family. Parallel sourcing pipelines across LinkedIn, Naukri, and targeted campus drives. Weekly hiring dashboards delivered to senior leadership. Offer-to-join dropout management process established.',
    outcome: '75 hires completed in 7 months against a committed target of 75. Zero SLA breaches on timeline commitments. Cost-per-hire 28% below industry benchmark. 6-month retention rate of RPO-placed candidates: 91%.',
    metrics: [
      { value: '75', label: 'Hires Completed' },
      { value: '0', label: 'SLA Breaches' },
      { value: '28%', label: 'Lower Cost Per Hire' }
    ]
  },
  {
    id: '29',
    slug: 'mobisoft-hr',
    client: 'Mobisoft Technologies',
    industry: 'IT Services',
    serviceCategory: 'HR Consulting',
    title: 'Diagnosing and Reducing Attrition',
    background: 'Mobisoft Technologies is a 200-person enterprise technology services company. Annual attrition had climbed to 34% in 2023, significantly above the 18-22% benchmark for comparable firms. Exit interview data was inconsistent and employee engagement scores were declining quarter-on-quarter.',
    objective: 'Diagnose root causes of attrition and implement HR frameworks to reduce attrition to benchmark levels within 12 months.',
    approach: 'HR audit using structured exit interview re-analysis, manager effectiveness surveys, and compensation band benchmarking. Root causes identified: unclear career ladders, inconsistent manager quality, and absence of mid-year feedback. Designed and implemented: competency framework, career progression matrix, quarterly performance review structure, manager effectiveness program, and revised compensation bands in partnership with leadership.',
    outcome: 'Attrition reduced from 34% to 19% in 12 months. Employee NPS improved from 18 to 52. Manager effectiveness score improved from 56% to 78%. 3 high-performers who had submitted resignations were retained through structured role restructuring.',
    metrics: [
      { value: '19%', label: 'Attrition Achieved' },
      { value: '52', label: 'Employee NPS' },
      { value: '78%', label: 'Manager Effectiveness' }
    ]
  }
];
