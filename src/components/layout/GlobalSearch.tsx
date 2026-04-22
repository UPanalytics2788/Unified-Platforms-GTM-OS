import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, X, Layers, Briefcase, FileText, ArrowRight, Loader2 } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      const searchLower = searchTerm.toLowerCase();
      try {
        // Fetch published content
        const [servicesSnap, solutionsSnap, insightsSnap] = await Promise.all([
          getDocs(query(collection(db, 'services'), where('status', '==', 'published'))),
          getDocs(query(collection(db, 'solutions'), where('status', '==', 'published'))),
          getDocs(query(collection(db, 'insights'), where('status', '==', 'published')))
        ]);

        const aggregated: any[] = [];

        servicesSnap.forEach(doc => {
          const data = doc.data();
          if (data.title?.toLowerCase().includes(searchLower) || data.description?.toLowerCase().includes(searchLower)) {
            aggregated.push({ id: doc.id, ...data, _type: 'service', _path: `/services/${data.slug}` });
          }
        });

        solutionsSnap.forEach(doc => {
          const data = doc.data();
          if (data.title?.toLowerCase().includes(searchLower) || data.problem?.toLowerCase().includes(searchLower)) {
            aggregated.push({ id: doc.id, ...data, _type: 'solution', _path: `/solutions/${data.slug}` });
          }
        });

        insightsSnap.forEach(doc => {
          const data = doc.data();
          if (data.title?.toLowerCase().includes(searchLower)) {
            aggregated.push({ id: doc.id, ...data, _type: 'insight', _path: `/insights/${data.slug}` });
          }
        });

        setResults(aggregated);
      } catch (err) {
        console.error('Search error:', err);
      }
      setLoading(false);
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] bg-brand-dark/20 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="bg-brand-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-brand-dark/10"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center px-6 py-4 border-b border-brand-dark/5">
            <Search className="text-brand-gray" size={24} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search services, solutions, insights..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="flex-grow ml-4 bg-transparent border-none outline-none text-brand-dark text-lg placeholder-brand-gray/50"
            />
            <button onClick={onClose} className="p-2 bg-brand-dark/5 rounded-full text-brand-dark hover:bg-brand-dark/10 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-4 bg-gray-50/50">
            {loading ? (
              <div className="py-12 flex justify-center">
                <Loader2 className="animate-spin text-brand-primary" size={32} />
              </div>
            ) : searchTerm.length < 2 ? (
              <div className="py-12 text-center text-brand-gray text-sm">
                Type at least 2 characters to search across the platform.
              </div>
            ) : results.length === 0 ? (
              <div className="py-12 text-center text-brand-gray text-sm">
                No results found for "{searchTerm}".
              </div>
            ) : (
              <div className="space-y-2">
                {results.map((result) => (
                  <Link
                    key={`${result._type}-${result.id}`}
                    to={result._path}
                    onClick={onClose}
                    className="flex items-center gap-4 p-4 bg-brand-white rounded-xl border border-brand-dark/5 hover:border-brand-primary/50 hover:shadow-sm transition-all group"
                  >
                    <div className="p-3 bg-brand-dark/5 rounded-xl text-brand-dark group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors">
                      {result._type === 'service' && <Briefcase size={20} />}
                      {result._type === 'solution' && <Layers size={20} />}
                      {result._type === 'insight' && <FileText size={20} />}
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-brand-dark font-bold mb-1 group-hover:text-brand-primary transition-colors">
                        {result.title}
                      </h4>
                      <p className="text-xs text-brand-gray capitalize font-medium tracking-wide">
                        {result._type}
                      </p>
                    </div>
                    <ArrowRight className="text-brand-gray group-hover:text-brand-primary group-hover:translate-x-1 transition-all" size={20} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
