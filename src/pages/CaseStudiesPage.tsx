import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, TrendingUp, BarChart3, Users, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { CASE_STUDIES as SEED_CASE_STUDIES } from '../data/caseStudies';
import { useCMSCollection } from '../hooks/useCMS';

// Proven Results Across Industries
export default function CaseStudies() {
  const { data: firestoreData, loading } = useCMSCollection('case_studies', true);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');

  const studies = useMemo(() => {
    return firestoreData.length > 0 ? firestoreData : SEED_CASE_STUDIES;
  }, [firestoreData]);

  // Extract unique industries
  const industries = useMemo(() => {
    const uniqueIndustries = new Set(studies.map(study => study.industry));
    return ['All', ...Array.from(uniqueIndustries)].sort();
  }, [studies]);

  // Filter case studies
  const filteredStudies = useMemo(() => {
    if (selectedIndustry === 'All') {
      return studies;
    }
    return studies.filter(study => study.industry === selectedIndustry);
  }, [selectedIndustry, studies]);

  const featuredStudy = studies.find(study => study.featured);
  const displayStudies = featuredStudy && selectedIndustry === 'All' 
    ? filteredStudies.filter(study => study.id !== featuredStudy.id) 
    : filteredStudies;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-white">
        <Loader2 className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="py-20 bg-brand-white min-h-screen">
      <SEO 
        title="Predictable ROI: Case Studies & Success Stories | Unified Platforms"
        description="Explore how Unified Platforms engineers organic growth and high-performance paid media campaigns. Real results and case studies from market leaders across industries."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-brand-dark mb-6">Proven Results Across Industries</h1>
          <p className="text-xl text-brand-gray">
            We don't just promise growth; we engineer it. Explore how we've solved complex challenges and delivered measurable ROI for our clients.
          </p>
        </div>

        {/* Industry Filter Bar */}
        <div className="mb-16 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex justify-center gap-2 min-w-max">
            {industries.map(industry => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  selectedIndustry === industry
                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                    : 'bg-gray-100 text-brand-gray hover:bg-gray-200'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Case Study (Only show on 'All') */}
        {featuredStudy && selectedIndustry === 'All' && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-2">
              <TrendingUp className="text-brand-primary" /> Featured Success Story
            </h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-dark rounded-3xl overflow-hidden shadow-2xl border border-brand-dark/10 flex flex-col lg:flex-row group"
            >
              <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-brand-primary/20 text-brand-primary text-xs font-bold rounded-full uppercase tracking-wider border border-brand-primary/30">
                    {featuredStudy.industry}
                  </span>
                  <span className="text-gray-400 text-sm font-medium">{featuredStudy.serviceCategory}</span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                  {featuredStudy.title}
                </h3>
                <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                  {featuredStudy.objective}
                </p>
                <Link
                  to={`/case-studies/${featuredStudy.slug}`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all w-fit"
                >
                  Read Full Case Study <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
              <div className="lg:w-1/2 bg-white p-10 lg:p-16 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="mb-8">
                  <p className="text-sm font-bold text-brand-gray uppercase tracking-widest mb-2">Client</p>
                  <p className="text-3xl font-bold text-brand-dark">{featuredStudy.client}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {featuredStudy.metrics && featuredStudy.metrics.map((metric: any, idx: number) => (
                    <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <p className="text-4xl font-bold text-brand-primary mb-2">{metric.value}</p>
                      <p className="text-sm font-bold text-brand-gray uppercase tracking-wider">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {displayStudies.map((study, index) => (
              <motion.div
                layout
                key={study.id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-primary/30 transition-all group flex flex-col h-full overflow-hidden"
              >
                <div className="p-8 flex-grow flex flex-col relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full uppercase tracking-wider">
                      {study.industry}
                    </span>
                    <span className="text-brand-gray text-xs font-bold uppercase tracking-wider">{study.serviceCategory}</span>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm font-bold text-brand-gray uppercase tracking-widest mb-1">{study.client}</p>
                    <h3 className="text-2xl font-bold text-brand-dark leading-tight group-hover:text-brand-primary transition-colors">
                      {study.title}
                    </h3>
                  </div>
                  
                  <p className="text-brand-gray text-sm mb-8 line-clamp-3 leading-relaxed flex-grow">
                    {study.objective}
                  </p>

                  {/* Metrics Highlight */}
                  <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-gray-100 mt-auto">
                    {study.metrics && study.metrics.slice(0, 2).map((metric: any, idx: number) => (
                      <div key={idx}>
                        <p className="text-2xl font-bold text-brand-dark mb-1">{metric.value}</p>
                        <p className="text-xs font-bold text-brand-gray uppercase tracking-wider">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/case-studies/${study.slug}`}
                    className="inline-flex items-center text-brand-primary font-bold group-hover:gap-2 transition-all mt-auto"
                  >
                    View Results <ArrowRight size={18} className="ml-1" />
                  </Link>
                </div>
                <div className="h-2 w-full bg-gradient-to-r from-brand-primary to-brand-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredStudies.length === 0 && (
          <div className="bg-gray-50 p-12 rounded-3xl border border-dashed border-gray-200 text-center">
            <FileText className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-xl font-bold text-brand-dark mb-2">No case studies found</h3>
            <p className="text-brand-gray">We're currently documenting our latest success stories for this industry.</p>
          </div>
        )}
      </div>
    </div>
  );
}
