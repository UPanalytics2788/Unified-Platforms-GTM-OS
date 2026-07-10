import { Link } from 'react-router-dom';
import { useSettings } from '../SettingsProvider';
import NewsletterForm from '../NewsletterForm';
import { useFirestoreDoc } from '../../hooks/useSitePage';
import { FOOTER_DEFAULTS } from '../../data/sitePages';

export default function Footer() {
  const settings = useSettings();
  // Realtime CMS document (settings/footer) with code fallback
  const { data: footer } = useFirestoreDoc('settings', 'footer', FOOTER_DEFAULTS);

  return (
    <footer className="bg-brand-dark text-brand-gray py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              {settings?.logoUrl ? (
                <img src={settings.logoUrl} alt={settings?.siteName || 'Logo'} className="h-[50px] w-auto object-contain" />
              ) : (
                <img src="/logo.png" alt={settings?.siteName || 'Logo'} className="h-[50px] w-auto object-contain" />
              )}
            </Link>
            <p className="text-sm max-w-xs mb-6">
              {footer.description || settings?.description}
            </p>
            <NewsletterForm />
          </div>
          {(footer.columns || []).map((column: any, i: number) => (
            <div key={i}>
              <h3 className="text-brand-white font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2 text-sm">
                {(column.links || []).map((link: any, j: number) => (
                  <li key={j}>
                    <Link to={link.href || '#'} className="hover:text-brand-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-brand-gray/20 text-xs text-center">
          &copy; {new Date().getFullYear()} {settings?.siteName || 'Unified Platforms'}. {footer.rights_text || 'All rights reserved.'}
        </div>
      </div>
    </footer>
  );
}
