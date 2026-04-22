import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Send, Loader2, CheckCircle } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'newsletter'), {
        email,
        createdAt: new Date().toISOString()
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-brand-primary font-semibold">
        <CheckCircle size={20} />
        <span>Thank you for subscribing!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-grow px-4 py-2 rounded-lg border border-brand-dark/10 focus:ring-2 focus:ring-brand-primary outline-none bg-brand-white text-brand-dark"
        placeholder="Enter your email"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-brand-primary text-brand-white font-semibold rounded-lg hover:bg-brand-dark transition-all disabled:opacity-50"
      >
        {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
      </button>
    </form>
  );
}
