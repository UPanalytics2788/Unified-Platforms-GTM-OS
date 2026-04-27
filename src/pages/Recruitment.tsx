import { useCMSDocument } from '../hooks/useCMSDocument';
import ServicePageTemplate from '../components/ServicePageTemplate';

export default function Recruitment() {
  const { data: pageData } = useCMSDocument('services', 'recruitment');
  
  const fallbackData = {
    title: 'Recruitment Services | Strategic Talent Acquisition | GTM OS',
    hero_title: 'Recruitment Services That Find the Right People',
    hero_subtitle: 'We move fast enough to compete for the best candidates while being thorough enough to give you genuine confidence in every placement.',
    meta_description: 'Stop wasting time on bad candidates. GTM OS provides strategic recruitment services that find and secure top-tier talent for your business.',
    description: 'Stop wasting time on bad interviews. Our strategic recruitment framework isolates top-tier talent mapped exactly to your cultural and technical requirements.',
    primary_cta_text: 'Start Hiring Today',
    category: 'Talent & HR',
    stats: [
      { value: '45+', label: 'Placements' },
      { value: '30%', label: 'Faster Time to Hire' },
      { value: '90%', label: 'Retention Rate' }
    ],
    value_prop_title: 'Hiring Without the Guesswork',
    value_prop_description: 'We do not just forward CVs. We act as an extension of your employer brand to systematically assess and acquire talent that drives growth.',
    long_content: `
      <h3>1. Market Mapping & Sourcing</h3>
      <p>We actively map your talent market, tapping into passive candidates who aren't looking at job boards but are open to the right strategic move.</p>
      
      <h3>2. Competency-Based Assessment</h3>
      <p>Our screening goes beyond the resume. We use structured behavioral questions and technical assessments to validate a candidate's actual capability to perform.</p>
      
      <h3>3. Offer Negotiation & Closing</h3>
      <p>In highly competitive technical and executive markets, handling the offer stage delicately is vital. We manage candidate expectations early and frequently to secure highly successful win-wins.</p>
    `,
    service_grid: [
      { icon: 'Target', title: 'Precision Matching', desc: 'No more spray-and-pray talent approaches.' },
      { icon: 'Briefcase', title: 'Employer Branding', desc: 'We represent your brand authentically.' },
      { icon: 'Users', title: 'Talent Pooling', desc: 'Ready-made lists of vetted professionals.' }
    ],
    faqs: [
      {
        question: "How long does the average placement take?",
        answer: "Typically, we present an initial shortlist within 7 to 10 days, aiming for finalized offers inside of 4 weeks depending on interview velocity."
      },
      {
        question: "Do you specialize in particular industries?",
        answer: "We focus deeply on IT/Tech, Digital Marketing, Executive Leadership, and robust operational positions across SMEs and Enterprise."
      }
    ]
  };

  return <ServicePageTemplate data={pageData} fallbackData={fallbackData} />;
}
