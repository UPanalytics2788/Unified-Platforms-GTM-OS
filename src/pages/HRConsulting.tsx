import { useCMSDocument } from '../hooks/useCMSDocument';
import ServicePageTemplate from '../components/ServicePageTemplate';

export default function HRConsulting() {
  const { data: pageData } = useCMSDocument('services', 'hr-consulting');
  
  const fallbackData = {
    title: 'HR Consulting',
    hero_title: 'HR Consulting That Builds Infrastructure',
    hero_subtitle: 'Build the people foundations your growing business needs to scale effectively.',
    description: 'Transform HR from a compliance burden into a strategic advantage inside your business. Our consulting services establish robust culture, retention, and performance frameworks.',
    primary_cta_text: 'Audit Your HR',
    category: 'Talent & HR',
    stats: [
      { value: 'Compliance', label: 'Assured' },
      { value: 'Culture', label: 'By Design' },
      { value: 'Tier 1', label: 'Retention' }
    ],
    value_prop_title: 'People Strategy for Ambitious Companies',
    value_prop_description: 'Fast-growing companies frequently outpace their HR capabilities, leading to cultural debt, legal risks, and high turnover. We provide the operational blueprints to stabilize and scale your team.',
    long_content: `
      <h3>1. Organizational Design</h3>
      <p>We review your current reporting structures, identify workflow bottlenecks, and design a scalable hierarchy that supports communication and rapid decision-making.</p>
      
      <h3>2. Compensation & Benefits Strategy</h3>
      <p>Are you paying too much, or not enough to compete? We provide market-mapped compensation benchmarking and design robust incentive programs (including equity and bonuses) to align your staff with company goals.</p>
      
      <h3>3. Compliance & Policy Development</h3>
      <p>We build comprehensive, legally-compliant employee handbooks and HR policies that protect the business while maintaining a modern, progressive work environment.</p>
    `,
    service_grid: [
      { icon: 'ShieldCheck', title: 'Legal Compliance', desc: 'Audits and protection against employment risks.' },
      { icon: 'Users', title: 'Leadership Training', desc: 'Coaching your managers to lead effectively.' },
      { icon: 'PieChart', title: 'Performance Arrays', desc: 'Implementing formal OKR and KPI structures.' }
    ],
    faqs: [
      {
        question: "Do you serve as our fractional HR director?",
        answer: "We offer both project-based consulting (e.g., compensation review) and retained fractional HR leadership depending on your internal maturity."
      },
      {
        question: "How do you measure culture?",
        answer: "We deploy validated engagement surveys and conduct qualitative interviews to benchmark employee net promoter scores (eNPS) and track improvement."
      }
    ]
  };

  return <ServicePageTemplate data={pageData} fallbackData={fallbackData} />;
}
