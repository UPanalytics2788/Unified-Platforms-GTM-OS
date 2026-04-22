import { useSearchParams } from 'react-router-dom';
import AdvancedLeadForm from '../components/ui/AdvancedLeadForm';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'consultation';

  const formTitle = type === 'audit' ? 'Request a Free Audit' : 'Book a Consultation';

  return (
    <div className="bg-brand-white min-h-screen py-20">
      <SEO 
        title="Contact Us"
        description="Get in touch with our growth experts to scale your business."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-dark mb-6">
              Let's Scale Your <span className="text-brand-primary">Revenue</span>
            </h1>
            <p className="text-xl text-brand-gray mb-12 leading-relaxed">
              Whether you're looking for a full GTM overhaul or a specific performance marketing boost, our team is ready to help you execute.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-white rounded-xl shadow-sm border border-brand-dark/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-brand-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark">Email Us</h3>
                  <p className="text-brand-gray">growth@unifiedplatforms.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-white rounded-xl shadow-sm border border-brand-dark/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-brand-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark">Call Us</h3>
                  <p className="text-brand-gray">+1 (888) GTM-EXEC</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-white rounded-xl shadow-sm border border-brand-dark/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-brand-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark">Global HQ</h3>
                  <p className="text-brand-gray">123 Growth Way, San Francisco, CA 94105</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 bg-brand-dark text-brand-white rounded-3xl shadow-xl">
              <MessageSquare className="text-brand-accent mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Need immediate support?</h3>
              <p className="text-brand-gray mb-6">Our experts are available for a quick chat during business hours.</p>
              <button className="px-6 py-3 bg-brand-white text-brand-dark font-bold rounded-xl hover:bg-brand-accent hover:text-brand-white transition-all">
                Start Live Chat
              </button>
            </div>
          </div>

          <div>
            <AdvancedLeadForm title={formTitle} source="contact_page" campaign={type} />
          </div>
        </div>
      </div>
    </div>
  );
}
