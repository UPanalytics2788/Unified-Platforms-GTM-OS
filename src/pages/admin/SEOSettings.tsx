import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Loader2 } from 'lucide-react';

export default function SEOSettings() {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSEO = async () => {
      const docRef = doc(db, 'settings', 'seo');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }
      setLoading(false);
    };
    fetchSEO();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await setDoc(doc(db, 'settings', 'seo'), formData);
    setSaving(false);
    alert('SEO settings saved!');
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-brand-primary" size={32} /></div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-brand-dark mb-8">SEO Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-brand-white p-8 rounded-2xl border border-brand-dark/10 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Global Meta Title</label>
          <input
            type="text"
            value={formData.global_meta_title || ''}
            onChange={(e) => setFormData({ ...formData, global_meta_title: e.target.value })}
            className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Global Meta Description</label>
          <textarea
            value={formData.global_meta_description || ''}
            onChange={(e) => setFormData({ ...formData, global_meta_description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center px-6 py-3 bg-brand-primary text-brand-white font-semibold rounded-xl hover:bg-brand-primary/90 transition-all disabled:opacity-50 gap-2"
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          Save Settings
        </button>
      </form>
    </div>
  );
}
