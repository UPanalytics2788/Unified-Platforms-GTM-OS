import { useCMSDocument } from '../hooks/useCMSDocument';
import ServicePageTemplate from '../components/ServicePageTemplate';

export default function RPO() {
  const { data: pageData } = useCMSDocument('services', 'rpo');
  
  const fallbackData = {
    title: 'RPO Services',
    hero_title: 'RPO Services That Scale Your Hiring',
    hero_subtitle: 'Scale your hiring without scaling your HR team. We embed experienced recruiters into your business.',
    description: 'Recruitment Process Outsourcing (RPO) acts as your internal talent acquisition team. We integrate entirely into your toolstack and culture to deliver volume hiring with high precision and radical transparency.',
    primary_cta_text: 'Scale Your Team',
    category: 'Talent & HR',
    stats: [
      { value: '40%', label: 'Cost Reduction' },
      { value: 'Scalable', label: 'Flexibility' },
      { value: '100%', label: 'Brand Integration' }
    ],
    value_prop_title: 'Enterprise-Grade Hiring Capability',
    value_prop_description: 'When you secure funding or open a new territory, you need to hire rapidly. RPO gives you instant access to seasoned recruiters, technology, and sourcing methodologies without permanent overhead.',
    long_content: `
      <h3>1. Embedded Talent Partners</h3>
      <p>Our recruiters work exclusively with your hiring managers. They use your email addresses, operate in your Slack instances, and act as absolute ambassadors of your brand.</p>
      
      <h3>2. Hiring Velocity at Scale</h3>
      <p>Need to hire 20 software engineers in 3 months? An RPO deployment handles the pipeline generation, screening, and interview scheduling so your internal managers only focus on final approvals.</p>
      
      <h3>3. Process Ownership</h3>
      <p>We own the outcomes. This means analyzing your current candidate experience, overhauling your Applicant Tracking System (ATS) workflows, and delivering actionable BI reporting on your talent pipeline.</p>
    `,
    service_grid: [
      { icon: 'Zap', title: 'Rapid Deployment', desc: 'Setup and running within 14 days.' },
      { icon: 'Settings', title: 'ATS Optimization', desc: 'Fixing leaky funnels in your hiring process.' },
      { icon: 'TrendingUp', title: 'Employer Branding', desc: 'Improving your Glassdoor and market perception.' }
    ],
    faqs: [
      {
        question: "Is RPO right for an SME?",
        answer: "Yes, we offer project-based RPO solutions scaled down for growing SMEs needing to sprint on 10+ hires over a short timeframe."
      },
      {
        question: "How is it priced?",
        answer: "Typically via a monthly management fee plus a highly reduced success fee per hire, leading to significant volume savings over traditional recruitment agency margins."
      }
    ]
  };

  return <ServicePageTemplate data={pageData} fallbackData={fallbackData} />;
}
