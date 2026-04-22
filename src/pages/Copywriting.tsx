import { useCMSDocument } from '../hooks/useCMSDocument';
import ServicePageTemplate from '../components/ServicePageTemplate';

export default function Copywriting() {
  const { data: pageData } = useCMSDocument('services', 'copywriting');
  
  const fallbackData = {
    title: 'Copywriting',
    hero_title: 'Copywriting That Moves People From Reading to Acting',
    hero_subtitle: 'We write copy grounded in audience research, brand understanding, and conversion psychology.',
  };

  return <ServicePageTemplate data={pageData} fallbackData={fallbackData} />;
}
