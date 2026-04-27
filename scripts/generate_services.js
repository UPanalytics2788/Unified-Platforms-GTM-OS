import fs from 'fs';

const servicesDefinition = [
  // Search & Organic
  { slug: "seo-strategy", title: "SEO Strategy", category: "Search & Organic" },
  { slug: "technical-seo", title: "Technical SEO", category: "Search & Organic" },
  { slug: "content-seo", title: "Content SEO", category: "Search & Organic" },
  { slug: "authority-building", title: "Authority Building", category: "Search & Organic" },
  { slug: "local-seo", title: "Local SEO", category: "Search & Organic" },
  { slug: "aeo-geo", title: "AEO & GEO", category: "Search & Organic" },
  
  // Performance Marketing
  { slug: "paid-search", title: "Paid Search", category: "Performance Marketing" },
  { slug: "paid-social", title: "Paid Social", category: "Performance Marketing" },
  { slug: "marketplace-ads", title: "Marketplace Ads", category: "Performance Marketing" },
  { slug: "cro", title: "Conversion Rate Optimization", category: "Performance Marketing" },

  // Content & Media
  { slug: "content-strategy", title: "Content Strategy", category: "Content & Media" },
  { slug: "content-creation", title: "Content Creation", category: "Content & Media" },
  { slug: "social-media", title: "Social Media", category: "Content & Media" },
  { slug: "email-marketing", title: "Email Marketing", category: "Content & Media" },
  { slug: "copywriting", title: "Copywriting", category: "Content & Media" },

  // Development
  { slug: "website-development", title: "Website Development", category: "Development" },
  { slug: "web-apps", title: "Web App Development", category: "Development" },
  { slug: "cms-development", title: "CMS Development", category: "Development" },
  { slug: "api-integrations", title: "API Integrations", category: "Development" },

  // Talent & HR
  { slug: "recruitment", title: "Recruitment", category: "Talent & HR" },
  { slug: "executive-search", title: "Executive Search", category: "Talent & HR" },
  { slug: "rpo", title: "RPO Services", category: "Talent & HR" },
  { slug: "hr-consulting", title: "HR Consulting", category: "Talent & HR" }
];

const generateServiceBlock = (s) => {
  return `  {
    id: "${s.slug}",
    title: "${s.title}",
    slug: "${s.slug}",
    category: "${s.category}",
    primary_keyword: "B2B ${s.title}",
    meta_title: "${s.title} Services | GTM OS",
    meta_description: "Expert ${s.title.toLowerCase()} services to accelerate your growth. We focus on scalable architecture and driving measurable impact for B2B enterprises.",
    description: "Expert ${s.title.toLowerCase()} services designed for scale and performance. We build robust systems to drive sustainable business growth and predictable pipeline.",
    primary_cta_text: "Get a Strategy Assessment",
    secondary_cta_text: "View Our Methodology",
    use_cases: [
      "Scaling architecture for enterprise systems",
      "Optimizing performance and stability",
      "Driving highly qualified B2B leads"
    ],
    faqs: [
      { question: "How do you measure success for ${s.title.toLowerCase()}?", answer: "We focus exclusively on metrics that impact your pipeline and revenue, moving beyond vanity metrics to real business outcomes." },
      { question: "What makes your approach to ${s.title.toLowerCase()} different?", answer: "We bring an engineering mindset to every discipline, ensuring robust architecture, data-driven decisions, and sustainable long-term scale." },
      { question: "How long does a typical engagement last?", answer: "Most engagements begin with a strategic foundation mapping phase followed by continuous execution and optimization over 6 to 12 months." },
      { question: "Do you offer tailored solutions?", answer: "Yes, every strategy is highly tailored to your specific industry environment, competitive landscape, and ICP requirements." }
    ],
    content: \`
      <h2>Comprehensive ${s.title} for B2B Enterprises</h2>
      <p>Modern businesses require structural engineering in their marketing and operations. Our ${s.title.toLowerCase()} services are built to address complex challenges that off-the-shelf solutions cannot touch. We prioritize scalability, precision, and alignment with your overarching revenue goals.</p>
      <p>We approach every engagement by first mapping your existing architecture, identifying constraints, and developing a strategic roadmap for optimization. By doing so, we ensure that every action we take compounds over time, building a moat around your competitive advantage.</p>
      <h3>The Architecture of Success</h3>
      <p>Success requires more than just execution; it requires a highly tuned framework. Our experts deploy industry-leading methodologies to reconstruct your processes from the ground up. This means eliminating bottlenecks, accelerating velocity, and implementing strict quality controls at every touchpoint.</p>
      <p>We operate as an extension of your team, bringing deep technical expertise and strategic foresight to the table. Our focus remains resolutely fixed on generating tangible business value and moving the needle on the metrics that matter most to your board and leadership.</p>
      <h3>Continuous Iteration and Growth</h3>
      <p>The landscape is constantly evolving, and so must your strategy. We institute rapid feedback loops, robust measurement systems, and continuous iteration protocols. This agile methodology ensures that your ${s.title.toLowerCase()} remains resilient and highly adaptive, capable of capitalizing on new opportunities while mitigating emerging risks.</p>
      <p>Through our rigorous approach, we transform your operations into a predictable, scalable engine of growth, driving long-term enterprise value and securing your position as a market leader.</p>
    \`
  }`;
};

const fileContent = fs.readFileSync('src/data/seedContent.ts', 'utf-8');

// Find the line index where `export const SERVICES_CONTENT = [` starts
const lines = fileContent.split('\n');
const startIndex = lines.findIndex(l => l.includes('export const SERVICES_CONTENT = ['));

if (startIndex === -1) {
  console.error("Could not find SERVICES_CONTENT array.");
  process.exit(1);
}

const beforeServices = lines.slice(0, startIndex + 1).join('\n');

const newServicesContent = servicesDefinition.map(generateServiceBlock).join(',\n');

const finalContent = beforeServices + '\n' + newServicesContent + '\n];\n';

fs.writeFileSync('src/data/seedContent.ts', finalContent);
console.log("Successfully rewrote SERVICES_CONTENT.");
