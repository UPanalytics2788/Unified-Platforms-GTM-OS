import { useCMSCollection } from '../hooks/useCMS';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import SEO from '../components/SEO';
import { SOLUTIONS_CONTENT } from '../data/seedContent';

export default function Solutions() {
  const { data: firestoreSolutions, loading } = useCMSCollection('solutions', true);

  // Fallback to local seed content if Firestore is empty
  const solutions = firestoreSolutions.length > 0 ? firestoreSolutions : SOLUTIONS_CONTENT;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse text-brand-gray">Loading solutions...</div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-brand-white min-h-screen">
      <SEO 
        title="Our Solutions"
        description="Tailored growth strategies and technology stacks for every stage of your business."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">Our Solutions</h1>
          <p className="text-brand-gray max-w-2xl">
            Tailored growth strategies and technology stacks for every stage of your business.
          </p>
        </div>

        {solutions.length === 0 ? (
          <div className="bg-brand-white p-12 rounded-2xl border border-dashed border-brand-dark/20 text-center">
            <Layers className="mx-auto text-brand-gray/30 mb-4" size={48} />
            <h3 className="text-lg font-medium text-brand-dark">No solutions found</h3>
            <p className="text-brand-gray mt-2">Check back soon or contact us for custom solutions.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-white p-8 rounded-2xl border border-brand-dark/10 shadow-sm hover:shadow-md hover:border-brand-primary transition-all group"
              >
                <h3 className="text-2xl font-bold text-brand-dark mb-4">{solution.title}</h3>
                <p className="text-brand-gray text-sm mb-6 line-clamp-3">
                  {solution.problem}
                </p>
                <Link
                  to={`/solutions/${solution.slug}`}
                  className="inline-flex items-center text-brand-primary font-semibold group-hover:gap-2 transition-all"
                >
                  Learn More <ArrowRight size={18} className="ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
