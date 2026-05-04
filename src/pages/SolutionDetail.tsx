import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ArrowLeft, CheckCircle, HelpCircle, Star, ShieldCheck, Zap } from 'lucide-react';
import LeadForm from '../components/ui/LeadForm';
import { Helmet } from 'react-helmet-async';
import SchemaMarkup from '../components/ui/SchemaMarkup';
import { SOLUTIONS_CONTENT } from '../data/seedContent';

export default function SolutionDetail() {
  const { slug } = useParams();
  const [solution, setSolution] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolution = async () => {
      if (!slug) return;
      try {
        const q = query(collection(db, 'solutions'), where('slug', '==', slug), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setSolution({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() });
        } else {
          // Fallback to local seed content
          const localSolution = SOLUTIONS_CONTENT.find(s => s.slug === slug);
          if (localSolution) {
            setSolution(localSolution);
          }
        }
      } catch (error) {
        console.error("Error fetching solution from Firestore, falling back to local data:", error);
        const localSolution = SOLUTIONS_CONTENT.find(s => s.slug === slug);
        if (localSolution) {
          setSolution(localSolution);
        }
      }
      setLoading(false);
    };
    fetchSolution();
  }, [slug]);

  if (loading) return <div className="py-20 text-center text-brand-gray">Loading...</div>;
  if (!solution) return <div className="py-20 text-center text-brand-gray">Solution not found.</div>;

  return (
    <div className="bg-brand-white min-h-screen">
      <Helmet>
        <title>{solution.meta_title || `${solution.title} | Unified Platforms`}</title>
        <meta name="description" content={solution.meta_description || solution.problem} />
        {solution.primary_keyword && <meta name="keywords" content={solution.primary_keyword} />}
      </Helmet>
      
      <SchemaMarkup type="Service" data={solution} />
      {solution.faqs && solution.faqs.length > 0 && <SchemaMarkup type="FAQPage" data={solution} />}

      {/* Hero */}
      <section className="bg-brand-dark text-brand-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link to="/solutions" className="inline-flex items-center text-brand-gray hover:text-brand-white mb-8 transition-colors">
            <ArrowLeft size={18} className="mr-2" /> Back to Solutions
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              {solution.title}
            </h1>
            <p className="text-xl text-brand-gray mb-10 leading-relaxed">
              {solution.problem}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-8 py-4 bg-brand-primary text-brand-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all">
                {solution.primary_cta_text || 'Book Consultation'}
              </a>
              <a href="#contact" className="px-8 py-4 bg-brand-white text-brand-dark font-bold rounded-xl border border-brand-dark/10 hover:bg-brand-dark/5 transition-all">
                {solution.secondary_cta_text || 'Request Proposal'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-brand-white border-b border-brand-dark/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-dark mb-6">The Challenge</h2>
              <p className="text-brand-gray text-lg leading-relaxed mb-8">
                Many enterprises struggle with {solution.primary_keyword || 'scaling their growth operations'} effectively. 
                The common pitfalls include fragmented data, misaligned teams, and inefficient technology stacks.
              </p>
              <div className="space-y-4">
                {['Inefficient Resource Allocation', 'Lack of Data Transparency', 'Slow Market Response'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    </div>
                    <span className="text-brand-dark font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-brand-dark p-8 rounded-3xl text-brand-white">
              <h3 className="text-xl font-bold mb-4">Why this matters</h3>
              <p className="text-brand-gray mb-6 italic">
                "Without a unified growth operating system, companies lose an average of 20% in potential revenue due to operational friction."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center">
                  <Star className="text-brand-primary" size={24} />
                </div>
                <div>
                  <p className="font-bold">Industry Standard</p>
                  <p className="text-sm text-brand-gray">Revenue Operations Report 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Explanation */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">Our Strategic Approach</h2>
            <p className="text-brand-gray max-w-2xl mx-auto">
              {solution.approach}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
              { title: 'Strategic Alignment', desc: 'Aligning your sales, marketing, and success teams under a single revenue objective.', icon: Zap },
              { title: 'Tech Stack Optimization', desc: 'Building a scalable technology infrastructure that supports your unique business needs.', icon: ShieldCheck },
              { title: 'Data-Driven Execution', desc: 'Leveraging real-time analytics to make informed decisions and drive predictable growth.', icon: Star }
            ].map((benefit, idx) => (
              <div key={idx} className="p-8 bg-brand-white rounded-2xl border border-brand-dark/10 hover:border-brand-primary transition-all">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-6">
                  <benefit.icon className="text-brand-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">{benefit.title}</h3>
                <p className="text-brand-gray text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Long Form Content Depth */}
          {solution.long_content && (
            <div className="prose prose-neutral prose-lg max-w-4xl mx-auto pt-16 border-t border-brand-dark/10">
              <div dangerouslySetInnerHTML={{ __html: solution.long_content }} />
            </div>
          )}
        </div>
      </section>

      {/* Services Mapping */}
      {solution.services && (
        <section className="py-24 bg-brand-dark text-brand-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Integrated Services</h2>
                <p className="text-brand-gray mb-8">
                  Our {solution.title} solution leverages a specific set of services to deliver maximum impact.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {solution.services.map((service: string) => (
                    <div key={service} className="flex items-center gap-3 p-4 bg-brand-white/5 rounded-xl border border-brand-white/10">
                      <CheckCircle className="text-brand-primary" size={18} />
                      <span className="font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-brand-white p-8 rounded-3xl text-brand-dark" id="audit">
                <h3 className="text-2xl font-bold mb-6">Ready to scale?</h3>
                <LeadForm source="solution_services_section" campaign={solution.slug} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {solution.faqs && solution.faqs.length > 0 && (
        <section className="py-24 bg-brand-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-dark mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {solution.faqs.map((faq: any, idx: number) => (
                <div key={idx} className="p-6 bg-brand-white rounded-2xl border border-brand-dark/10">
                  <h3 className="text-lg font-bold text-brand-dark mb-3 flex items-start gap-3">
                    <HelpCircle className="text-brand-primary mt-1 flex-shrink-0" size={20} />
                    {faq.question}
                  </h3>
                  <p className="text-brand-gray leading-relaxed ml-8">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section id="contact" className="py-24 bg-brand-primary text-brand-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Start Your Transformation Today</h2>
          <p className="text-xl text-brand-white/80 mb-10">
            Join the leading enterprises that have optimized their Growth OS for predictable growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-brand-dark text-brand-white font-bold rounded-xl hover:bg-brand-dark/90 transition-all"
            >
              {solution.primary_cta_text || 'Book Consultation'}
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-brand-white text-brand-primary font-bold rounded-xl hover:bg-brand-white/90 transition-all"
            >
              Request Proposal
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
