import { useCMSDocument } from '../hooks/useCMSDocument';
import ServicePageTemplate from '../components/ServicePageTemplate';

export default function APIIntegrations() {
  const { data: pageData } = useCMSDocument('services', 'api-integrations');
  
  const fallbackData = {
    title: 'API Integrations',
    hero_title: 'API Integration Services That Connect Your Systems',
    hero_subtitle: 'Stop managing disconnected systems manually. We build reliable API integrations that automate data flow.',
    description: 'We eliminate data silos by connecting your software tools. Our API integration services ensure data flows automatically between your CRM, marketing platforms, and operational systems.',
    primary_cta_text: 'Discuss Your Integration',
    category: 'Development',
    stats: [
      { value: 'Zero', label: 'Data Silos' },
      { value: '100%', label: 'Automated Workflows' },
      { value: 'Real', label: 'Time Syncing' }
    ],
    value_prop_title: 'Connect the Unconnected',
    value_prop_description: 'When systems do not talk to each other, humans have to bridge the gap. We automate this busywork so your team can focus on high-value tasks.',
    long_content: `
      <h3>1. Third-Party API Connections</h3>
      <p>Connect your custom applications to Salesforce, HubSpot, Stripe, or any other primary SaaS platform. We handle rate limits, pagination, and authentication robustly.</p>
      
      <h3>2. Custom Middleware Development</h3>
      <p>If two tools cannot talk directly, we build scalable middleware using Node.js to intercept, transform, and map data payloads accurately securely.</p>
      
      <h3>3. Legacy System Integration</h3>
      <p>Modernize older infrastructures. We build secure REST or GraphQL wrappers around complex legacy systems so they can interact with modern applications without exposing vulnerabilities.</p>
    `,
    service_grid: [
      { icon: 'Share2', title: 'Data Flow Maps', desc: 'Planning the exact routes your data travels.' },
      { icon: 'Shield', title: 'Secure Authentication', desc: 'OAuth 2.0 and API token management.' },
      { icon: 'Activity', title: 'Monitoring & Logs', desc: 'Real-time observability of your pipelines.' }
    ],
    faqs: [
      {
        question: "How do you handle API updates or breaking changes?",
        answer: "We implement versioning controls and robust error handling. When an external API updates, our middleware catches the warnings allowing for smooth, pre-planned transitions."
      },
      {
        question: "Can you guarantee real-time sync?",
        answer: "Yes, utilizing Webhooks, WebSockets, or high-frequency polling, we orchestrate near real-time synchronization between independent platforms."
      }
    ]
  };

  return <ServicePageTemplate data={pageData} fallbackData={fallbackData} />;
}
