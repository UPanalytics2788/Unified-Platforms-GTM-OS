import { useCMSDocument } from '../hooks/useCMSDocument';
import ServicePageTemplate from '../components/ServicePageTemplate';

export default function WebAppDevelopment() {
  const { data: pageData } = useCMSDocument('services', 'web-apps');
  
  const fallbackData = {
    title: 'Web App Development',
    hero_title: 'Custom Web Application Development',
    hero_subtitle: 'Build scalable, secure, and high-performance web applications tailored to your business needs.',
    description: 'We develop custom web applications using modern Javascript frameworks to solve complex business logic. Your app will be responsive, blazing fast, and securely connected to your existing toolstack.',
    primary_cta_text: 'Start Your App Build',
    category: 'Development',
    stats: [
      { value: 'API', label: 'First Approach' },
      { value: '99.9%', label: 'Uptime' },
      { value: '100%', label: 'Responsive UX' }
    ],
    value_prop_title: 'Web Apps Built for the Future',
    value_prop_description: 'We prioritize scalability and speed. Our web applications use serverless architectures and decoupled environments to guarantee low latency and high availability.',
    long_content: `
      <h3>1. Progressive Web Apps (PWAs)</h3>
      <p>Deliver app-like experiences directly in the browser. PWAs are fast, reliable, and function even on unstable networks, driving up engagement metrics and retention.</p>
      
      <h3>2. Single Page Applications (SPAs)</h3>
      <p>Using React and Vue, we build fluid interfaces that do not require full page reloads, dramatically improving speed and user experience.</p>
      
      <h3>3. Enterprise Admin Panels & Dashboards</h3>
      <p>Get full control of your data with custom-built administration panels. We build scalable data grids, charts, and metric visualizations to help your team make informed decisions faster.</p>
    `,
    service_grid: [
      { icon: 'Layout', title: 'UX/UI Engineering', desc: 'Crafting intuitive user journeys.' },
      { icon: 'Database', title: 'Scalable Backends', desc: 'Cloud-native databases built to scale.' },
      { icon: 'ShieldCheck', title: 'Advanced Security', desc: 'Enterprise-grade authentication and data protection.' }
    ],
    faqs: [
      {
        question: "How long does a custom web app take to build?",
        answer: "Depending on complexity, an MVP can be deployed in 2-3 months, while fully-featured enterprise applications typically take 4-6 months."
      },
      {
        question: "Do you own the code?",
        answer: "Yes, once the project is completed and handed over, you own 100% of the source code."
      }
    ]
  };

  return <ServicePageTemplate data={pageData} fallbackData={fallbackData} />;
}
