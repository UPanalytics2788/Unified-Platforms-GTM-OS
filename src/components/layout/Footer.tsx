import { Link } from 'react-router-dom';
import { useSettings } from '../SettingsProvider';
import NewsletterForm from '../NewsletterForm';

export default function Footer() {
  const settings = useSettings();
  return (
    <footer className="bg-brand-dark text-brand-gray py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              {settings?.logoUrl ? (
                <img src={settings.logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
              ) : (
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                  <span className="text-brand-white font-bold text-xl">U</span>
                </div>
              )}
              <span className="font-bold text-xl tracking-tight text-brand-white">{settings?.siteName || 'Unified Platforms'}</span>
            </Link>
            <p className="text-sm max-w-xs mb-6">
              {settings?.description || 'Revenue-focused marketing and growth partner helping brands scale through SEO, performance marketing, and content.'}
            </p>
            <NewsletterForm />
          </div>
          <div>
            <h3 className="text-brand-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/solutions" className="hover:text-brand-accent transition-colors">Solutions</Link></li>
              <li><Link to="/services" className="hover:text-brand-accent transition-colors">Services</Link></li>
              <li><Link to="/case-studies" className="hover:text-brand-accent transition-colors">Case Studies</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-brand-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-brand-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand-accent transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-brand-gray/20 text-xs text-center">
          &copy; {new Date().getFullYear()} {settings?.siteName || 'Unified Platforms'}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
