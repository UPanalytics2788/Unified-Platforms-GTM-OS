import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LeadFormProps {
  source?: string;
  campaign?: string;
  title?: string;
}

export default function LeadForm({ source = 'direct', campaign = 'none', title = 'Get a Free Audit' }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        source,
        campaign,
        page: window.location.pathname,
        createdAt: new Date().toISOString()
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-brand-white p-8 rounded-2xl border border-brand-dark/10 shadow-xl">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-2xl font-bold text-brand-dark mb-6">{title}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-gray mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-gray mb-1">Work Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-gray mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-gray mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                  placeholder="Acme Inc."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-brand-white font-semibold rounded-xl hover:bg-brand-dark transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                Submit Request
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold text-brand-dark mb-2">Request Received!</h3>
            <p className="text-brand-gray">
              Thank you for your interest. One of our growth experts will reach out to you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 text-brand-primary font-semibold hover:underline"
            >
              Send another request
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
