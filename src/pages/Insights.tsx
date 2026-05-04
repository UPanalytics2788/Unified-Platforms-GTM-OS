import { useCMSCollection } from '../hooks/useCMS';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, BookOpen, Calendar, Tag } from 'lucide-react';
import SEO from '../components/SEO';

export default function Insights() {
  const { data: insights, loading } = useCMSCollection('insights', true);
  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get('type');

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse text-brand-gray">Loading insights...</div>
      </div>
    );
  }

  const filteredInsights = typeFilter 
    ? insights.filter((i: any) => i.type?.toLowerCase() === typeFilter.toLowerCase())
    : insights;

  return (
    <div className="py-20 bg-brand-white min-h-screen">
      <SEO 
        title="Growth Insights & Industry Playbooks | Unified Platforms"
        description="Expert perspectives on growth engineering, marketing technology, and the future of growth operations. Access our free strategy playbooks and guides."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">
            {typeFilter ? `${typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)}` : 'Insights & Playbooks'}
          </h1>
          <p className="text-brand-gray max-w-2xl">
            Expert perspectives on growth, technology, and the future of growth operations.
          </p>
        </div>

        {filteredInsights.length === 0 ? (
          <div className="bg-brand-white p-12 rounded-2xl border border-dashed border-brand-dark/20 text-center">
            <BookOpen className="mx-auto text-brand-gray/30 mb-4" size={48} />
            <h3 className="text-lg font-medium text-brand-dark">No insights found</h3>
            <p className="text-brand-gray mt-2">We're currently preparing our latest playbooks and guides.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.map((insight: any, index: number) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-white rounded-2xl border border-brand-dark/10 shadow-sm hover:shadow-md hover:border-brand-primary transition-all group overflow-hidden flex flex-col"
              >
                <div className="p-8 flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-bold rounded uppercase tracking-widest">
                      {insight.type || 'Article'}
                    </span>
                    {insight.publish_date && (
                      <div className="flex items-center text-brand-gray text-xs gap-1">
                        <Calendar size={12} />
                        <span>{new Date(insight.publish_date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-4 group-hover:text-brand-primary transition-colors">
                    {insight.title}
                  </h3>
                  <p className="text-brand-gray text-sm mb-6 line-clamp-3">
                    {insight.summary || insight.content?.substring(0, 150) || ''}
                  </p>
                </div>
                <div className="px-8 py-4 bg-brand-dark/5 border-t border-brand-dark/10">
                  <Link
                    to={`/insights/${insight.slug}`}
                    className="inline-flex items-center text-sm font-bold text-brand-dark group-hover:text-brand-primary transition-all"
                  >
                    Read More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
