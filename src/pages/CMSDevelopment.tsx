import { useCMSDocument } from '../hooks/useCMSDocument';
import ServicePageTemplate from '../components/ServicePageTemplate';

export default function CMSDevelopment() {
  const { data: pageData } = useCMSDocument('services', 'cms-development');
  
  const fallbackData = {
    title: 'CMS Development',
    hero_title: 'Custom CMS Development & Integration',
    hero_subtitle: 'Take control of your content with a custom CMS built for speed, security, and ease of use.',
    description: 'Stop fighting your content management system. We build and integrate custom CMS solutions that fit your workflow—not the other way around. From headless architectures to traditional platforms, we power your content engine.',
    primary_cta_text: 'Upgrade Your CMS',
    category: 'Development',
    stats: [
      { value: '3x', label: 'Faster Publishing' },
      { value: '100%', label: 'Custom Workflows' },
      { value: 'Omni', label: 'Channel Ready' }
    ],
    value_prop_title: 'Empower Your Content Team',
    value_prop_description: 'A great CMS goes unnoticed. It simply works, allowing your marketers to publish seamlessly across platforms without involving developers.',
    long_content: `
      <h3>1. Headless CMS Architecture</h3>
      <p>Decouple your backend content repository from your frontend presentation. Deliver content via API to any device: websites, mobile apps, or smart devices.</p>
      
      <h3>2. Custom Content Workflows</h3>
      <p>We configure permissions, draft states, and publishing pipelines so your editorial team has total control and accountability over the content lifecycle.</p>
      
      <h3>3. Migration & Legacy Updates</h3>
      <p>Moving away from an outdated CMS? We ensure a seamless, SEO-safe migration mapping old URLs to new structures without losing rankings.</p>
    `,
    service_grid: [
      { icon: 'Server', title: 'Headless Solutions', desc: 'Sanity, Contentful, and Strapi integrations.' },
      { icon: 'Database', title: 'Data Modeling', desc: 'Structuring your content for maximum reuse.' },
      { icon: 'Users', title: 'Role-Based Access', desc: 'Granular permissions for enterprise teams.' }
    ],
    faqs: [
      {
        question: "Why choose a headless CMS over WordPress?",
        answer: "Headless CMS provides vastly superior security and speed by decoupling the database from the public-facing code. It also allows developers to use modern frameworks like React."
      },
      {
        question: "Can you migrate our existing content?",
        answer: "Yes, we handle complex data migrations and ensure 301 redirects are perfectly mapped to protect your SEO."
      }
    ]
  };

  return <ServicePageTemplate data={pageData} fallbackData={fallbackData} />;
}
