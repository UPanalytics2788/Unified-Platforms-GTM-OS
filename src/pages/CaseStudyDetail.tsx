import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import LeadForm from '../components/ui/LeadForm';
import { Helmet } from 'react-helmet-async';
import SchemaMarkup from '../components/ui/SchemaMarkup';
import { CASE_STUDIES, CaseStudy } from '../data/caseStudies';

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const [study, setStudy] = useState<CaseStudy | any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudy = async () => {
      if (!slug) return;
      
      try {
        // Try Firestore first
        const docRef = doc(db, 'case_studies', slug);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setStudy({ id: docSnap.id, ...docSnap.data() });
        } else {
          // Fallback to local data
          const foundStudy = CASE_STUDIES.find(s => s.slug === slug);
          if (foundStudy) {
            setStudy(foundStudy);
          }
        }
      } catch (error) {
        console.error("Error fetching case study:", error);
        // Fallback to local data on error
        const foundStudy = CASE_STUDIES.find(s => s.slug === slug);
        if (foundStudy) {
          setStudy(foundStudy);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStudy();
  }, [slug]);

  if (loading) return <div className="py-20 text-center text-brand-gray">Loading...</div>;
  if (!study) return <div className="py-20 text-center text-brand-gray">Case study not found.</div>;

  return (
    <div className="bg-brand-white min-h-screen">
      <Helmet>
        <title>{`${study.title} | Case Study | Unified Platforms`}</title>
        <meta name="description" content={study.objective} />
      </Helmet>

      <SchemaMarkup type="Article" data={study} />

      <section className="bg-brand-white py-24 border-b border-brand-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/case-studies" className="inline-flex items-center text-brand-gray hover:text-brand-dark mb-8 transition-colors">
            <ArrowLeft size={18} className="mr-2" /> Back to Case Studies
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full uppercase tracking-widest">
                  {study.industry}
                </span>
                <span className="text-brand-gray/30">•</span>
                <span className="text-brand-gray font-medium">{study.client}</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-brand-dark leading-tight">
                {study.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl font-bold text-brand-dark mb-4">Background</h2>
                  <p className="text-brand-gray text-lg leading-relaxed">{study.background}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-brand-dark mb-4">Objective</h2>
                  <p className="text-brand-gray text-lg leading-relaxed">{study.objective}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-brand-dark mb-4">Approach</h2>
                  <p className="text-brand-gray text-lg leading-relaxed">{study.approach}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-brand-dark mb-4">Outcome</h2>
                  <p className="text-brand-gray text-lg leading-relaxed">{study.outcome}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                <div className="bg-brand-dark text-brand-white p-8 rounded-3xl shadow-xl">
                  <h3 className="text-xl font-bold mb-6">Key Results</h3>
                  <div className="space-y-6">
                    {study.metrics && study.metrics.length > 0 ? (
                      study.metrics.map((result, i) => (
                        <div key={i} className="border-b border-brand-gray/20 pb-4 last:border-0 last:pb-0">
                          <p className="text-3xl font-bold text-brand-accent">{result.value}</p>
                          <p className="text-brand-gray text-sm">{result.label}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-brand-gray italic">Results pending documentation.</p>
                    )}
                  </div>
                </div>

                <div className="bg-brand-white p-8 rounded-3xl border border-brand-dark/10 shadow-sm">
                  <h3 className="text-xl font-bold text-brand-dark mb-6">Get Similar Results</h3>
                  <LeadForm source="case_study_page" campaign={study.slug} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-brand-primary text-brand-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Want to Scale Like {study.client}?</h2>
          <p className="text-xl text-brand-white/80 mb-10">
            Discover how our {study.industry} solutions can drive predictable growth for your enterprise.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-4 bg-brand-dark text-brand-white font-bold rounded-xl hover:bg-brand-dark/90 transition-all">
              Book Consultation
            </button>
            <button className="px-10 py-4 bg-brand-white text-brand-primary font-bold rounded-xl hover:bg-brand-white/90 transition-all">
              Get Free Audit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
