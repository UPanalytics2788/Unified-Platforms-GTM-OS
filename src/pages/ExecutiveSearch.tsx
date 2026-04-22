import { useCMSDocument } from '../hooks/useCMSDocument';
import ServicePageTemplate from '../components/ServicePageTemplate';

export default function ExecutiveSearch() {
  const { data: pageData } = useCMSDocument('services', 'executive-search');
  
  const fallbackData = {
    title: 'Executive Search',
    hero_title: 'Executive Search for Leadership Roles',
    hero_subtitle: 'Find the leadership talent that shapes your next chapter with our confidential, thorough search process.',
    description: 'We help you identify, attract, and retain transformative leaders. From C-suite executives to VP-level operators, we provide the discretion and global reach required for high-stakes appointments.',
    primary_cta_text: 'Discuss a Search Board',
    category: 'Talent & HR',
    stats: [
      { value: '100%', label: 'Discretion' },
      { value: 'C-Suite', label: 'To Director' },
      { value: 'Strategic', label: 'Alignment' }
    ],
    value_prop_title: 'Leadership That Drives Impact',
    value_prop_description: 'An executive hire is the highest leverage decision an organization makes. We treat it with the rigorous evaluation and market analysis it demands.',
    long_content: `
      <h3>1. Deep Market Penetration</h3>
      <p>The best leaders are rarely looking for jobs. They are actively engaged in their current roles. We utilize extensive networks to approach these passive candidates confidentially.</p>
      
      <h3>2. Cultural and Strategic Fit</h3>
      <p>A brilliant operator in a startup might fail in an enterprise. We spend significant time upfront aligning on your corporate culture, strategic vision, and the specific mandate of the role.</p>
      
      <h3>3. Compensation & Board Advisory</h3>
      <p>We provide real-time market intelligence on compensation structures, equity negotiations, and board expectations to ensure successful onboarding.</p>
    `,
    service_grid: [
      { icon: 'Award', title: 'C-Suite & Board', desc: 'CEOs, CFOs, COOs and independent directors.' },
      { icon: 'Shield', title: 'Confidentiality', desc: 'Secure processes for sensitive replacements.' },
      { icon: 'LineChart', title: 'Succession Planning', desc: 'Building robust future pipelines.' }
    ],
    faqs: [
      {
        question: "How does the retained search model work?",
        answer: "Executive search operates on a retained basis, ensuring dedicated resources. We commit exclusively to your mandate until the role is successfully filled."
      },
      {
        question: "How long does a typical search take?",
        answer: "From briefing to offer acceptance, most executive searches conclude within 8 to 12 weeks, depending on notice periods and market complexity."
      }
    ]
  };

  return <ServicePageTemplate data={pageData} fallbackData={fallbackData} />;
}
