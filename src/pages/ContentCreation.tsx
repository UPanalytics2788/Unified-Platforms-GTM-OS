import { useCMSDocument } from '../hooks/useCMSDocument';
import ServicePageTemplate from '../components/ServicePageTemplate';

export default function ContentCreation() {
  const { data: pageData } = useCMSDocument('services', 'content-creation');
  
  const fallbackData = {
    title: 'Content Creation',
    hero_title: 'Content Creation That Builds Authority',
    hero_subtitle: 'We create high-quality content that educates your audience and builds long-term brand authority.',
  };

  return <ServicePageTemplate data={pageData} fallbackData={fallbackData} />;
}
