import { useSearchParams } from 'react-router-dom';
import AdvancedLeadForm from '../components/ui/AdvancedLeadForm';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';
import { useSitePage } from '../hooks/useSitePage';
import { CONTACT_PAGE } from '../data/sitePages';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'consultation';

  // Realtime CMS document (pages/contact) with code fallback
  const { data } = useSitePage('contact', CONTACT_PAGE);

  const formTitle = type === 'audit'
    ? (data.form_title_audit || 'Request a Free Audit')
    : (data.form_title_consultation || 'Book a Consultation');

  const hero = data.hero || {};
  const info = data.contact_info || {};
  const support = data.support_box || {};

  return (
    <div className="bg-brand-white min-h-screen py-20">
      <SEO
        title={data.seo?.title || 'Contact Our Growth Experts'}
        description={data.seo?.description || ''}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-dark mb-6">
              {hero.heading} {hero.highlight && <span className="text-brand-primary">{hero.highlight}</span>}
            </h1>
            <p className="text-xl text-brand-gray mb-12 leading-relaxed">
              {hero.subtitle}
            </p>

            <div className="space-y-8">
              {info.email && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-white rounded-xl shadow-sm border border-brand-dark/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-brand-primary" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark">{info.email_label || 'Email Us'}</p>
                    <p className="text-brand-gray">{info.email}</p>
                  </div>
                </div>
              )}

              {info.phone && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-white rounded-xl shadow-sm border border-brand-dark/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-brand-primary" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark">{info.phone_label || 'Call Us'}</p>
                    <p className="text-brand-gray">{info.phone}</p>
                  </div>
                </div>
              )}

              {info.address && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-white rounded-xl shadow-sm border border-brand-dark/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-brand-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark">{info.address_label || 'Global HQ'}</h3>
                    <p className="text-brand-gray">{info.address}</p>
                  </div>
                </div>
              )}
            </div>

            {support.title && (
              <div className="mt-16 p-8 bg-brand-dark text-brand-white rounded-3xl shadow-xl">
                <MessageSquare className="text-brand-accent mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">{support.title}</h3>
                <p className="text-brand-gray mb-6">{support.text}</p>
                {support.cta_label && (
                  <button className="px-6 py-3 bg-brand-white text-brand-dark font-bold rounded-xl hover:bg-brand-accent hover:text-brand-white transition-all">
                    {support.cta_label}
                  </button>
                )}
              </div>
            )}
          </div>

          <div>
            <AdvancedLeadForm title={formTitle} source="contact_page" campaign={type} />
          </div>
        </div>
      </div>
    </div>
  );
}
