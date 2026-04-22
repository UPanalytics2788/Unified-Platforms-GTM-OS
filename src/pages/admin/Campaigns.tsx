import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Loader2, Megaphone } from 'lucide-react';

export default function Campaigns() {
  const [formData, setFormData] = useState({
    active: false,
    text: '',
    ctaText: '',
    ctaLink: '',
    backgroundColor: '#eb735d',
    textColor: '#ffffff'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      const docRef = doc(db, 'settings', 'campaigns');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data() as any);
      }
      setLoading(false);
    };
    fetchCampaign();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'campaigns'), formData);
      alert('Campaign banner settings saved!');
    } catch (err) {
      console.error(err);
      alert('Failed to save settings.');
    }
    setSaving(false);
  };

  if (loading) return <div className="flex justify-center h-64 items-center"><Loader2 className="animate-spin text-brand-primary" size={32} /></div>;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <Megaphone className="text-brand-primary" size={28} />
        <h1 className="text-2xl font-bold text-brand-dark">Campaigns & Banners</h1>
      </div>

      <div className="bg-brand-white p-8 rounded-2xl border border-brand-dark/10 shadow-sm">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-brand-dark mb-2">Live Preview</h2>
          {formData.active ? (
            <div 
              className="w-full py-3 px-4 text-center rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-3"
              style={{ backgroundColor: formData.backgroundColor, color: formData.textColor }}
            >
              <span>{formData.text || 'Your announcement text here...'}</span>
              {formData.ctaText && (
                <span className="underline font-bold cursor-pointer hover:opacity-80">
                  {formData.ctaText}
                </span>
              )}
            </div>
          ) : (
            <div className="w-full py-4 text-center rounded-lg border-2 border-dashed border-brand-dark/20 text-brand-gray text-sm">
              Banner is currently disabled.
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="flex items-center gap-3 p-4 border border-brand-dark/10 rounded-xl cursor-pointer hover:bg-brand-dark/5 transition-colors">
            <input 
              type="checkbox" 
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-5 h-5 rounded border-brand-dark/20 text-brand-primary focus:ring-brand-primary"
            />
            <div>
              <div className="font-semibold text-brand-dark">Enable Global Banner</div>
              <div className="text-sm text-brand-gray">Show an announcement banner across the top of all public pages</div>
            </div>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-brand-dark mb-1">Announcement Text</label>
              <input
                type="text"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
                placeholder="e.g., Join our upcoming webinar on Q3 Growth Strategies!"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">CTA Text (Optional)</label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
                placeholder="Register Now"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">CTA Link (Optional)</label>
              <input
                type="text"
                value={formData.ctaLink}
                onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
                placeholder="/webinars or https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">Background Color</label>
              <input
                type="color"
                value={formData.backgroundColor}
                onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                className="w-full h-10 rounded-lg cursor-pointer border border-brand-dark/10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">Text Color</label>
              <input
                type="color"
                value={formData.textColor}
                onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                className="w-full h-10 rounded-lg cursor-pointer border border-brand-dark/10"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center px-6 py-3 bg-brand-primary text-brand-white font-semibold rounded-xl hover:bg-brand-primary/90 transition-all disabled:opacity-50 gap-2"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Save Banner State
          </button>
        </form>
      </div>
    </div>
  );
}
