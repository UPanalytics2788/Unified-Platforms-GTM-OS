import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { motion } from 'framer-motion';

export default function TrustBar() {
  const [signals, setSignals] = useState<any[]>([]);

  useEffect(() => {
    const fetchSignals = async () => {
      const snap = await getDocs(query(collection(db, 'trust_signals'), where('status', '==', 'active')));
      setSignals(snap.docs.map(doc => doc.data()));
    };
    fetchSignals();
  }, []);

  if (signals.length === 0) return null;

  return (
    <div className="bg-brand-white border-y border-brand-dark/5 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-hide">
        <div className="flex justify-center md:justify-between items-center gap-12 min-w-max md:min-w-0">
          {signals.map((signal, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-black text-brand-dark mb-1">{signal.value}</p>
              <p className="text-xs font-bold text-brand-gray uppercase tracking-widest">{signal.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
