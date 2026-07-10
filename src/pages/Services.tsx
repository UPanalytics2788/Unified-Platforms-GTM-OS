import { useCMSCollection } from '../hooks/useCMS';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase } from 'lucide-react';
import SEO from '../components/SEO';
import { SERVICES_CONTENT } from '../data/seedContent';
import { useSitePage } from '../hooks/useSitePage';
import { SERVICES_PAGE } from '../data/sitePages';

export default function Services() {
  const { data: firestoreServices, loading } = useCMSCollection('services', true);
  const { data: page } = useSitePage('services', SERVICES_PAGE);

  // Fallback to local seed content if Firestore is empty
  const services = firestoreServices.length > 0 ? firestoreServices : SERVICES_CONTENT;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse text-brand-gray">Loading services...</div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-brand-white min-h-screen">
      <SEO
        title={page.seo?.title || 'Specialized Growth Services'}
        description={page.seo?.description || ''}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">{page.header?.heading}</h1>
          <p className="text-brand-gray max-w-2xl">
            {page.header?.intro}
          </p>
        </div>

        {services.length === 0 ? (
          <div className="bg-brand-white p-12 rounded-2xl border border-dashed border-brand-dark/20 text-center">
            <Briefcase className="mx-auto text-brand-gray/30 mb-4" size={48} />
            <h3 className="text-lg font-medium text-brand-dark">No services found</h3>
            <p className="text-brand-gray mt-2">Check back soon for our service offerings.</p>
          </div>
        ) : (
          <div>
            {(page.categories || ['Search & Organic', 'Performance Marketing', 'Content & Media', 'Development', 'Talent & HR']).map((cat: string) => {
              const catServices = services.filter((s: any) => s.category === cat);
              if (catServices.length === 0) return null;
              return (
                <div key={cat} className="mb-16">
                  <h2 className="text-2xl font-bold text-brand-dark mb-8 pb-4 border-b border-brand-dark/10">{cat}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {catServices.map((service: any, index: number) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-brand-white p-8 rounded-2xl border border-brand-dark/10 shadow-sm hover:shadow-md hover:border-brand-primary transition-all group"
                      >
                        <h3 className="text-2xl font-bold text-brand-dark mb-4">{service.title}</h3>
                        <p className="text-brand-gray text-sm mb-6 line-clamp-3">
                          {service.description}
                        </p>
                        <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center text-brand-primary font-semibold group-hover:gap-2 transition-all"
                        >
                          Learn More <ArrowRight size={18} className="ml-1" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
