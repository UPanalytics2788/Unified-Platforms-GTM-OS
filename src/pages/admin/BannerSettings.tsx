import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Loader2 } from 'lucide-react';
import { BANNER_DEFAULTS } from '../../data/sitePages';

const inputCls =
  'w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark';
const labelCls = 'block text-sm font-medium text-brand-dark mb-1';

export default function BannerSettings() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'campaigns'));
        setData(snap.exists() ? { ...BANNER_DEFAULTS, ...snap.data() } : { ...BANNER_DEFAULTS });
      } catch {
        setData({ ...BANNER_DEFAULTS });
      }
      setLoading(false);
    };
    fetchDoc();
  }, []);

  if (loading || !data) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-brand-primary" size={32} /></div>;
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'campaigns'), { ...data, updatedAt: new Date().toISOString() });
      alert('Banner saved! The live site updates on next page load.');
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    }
    setSaving(false);
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-brand-dark">Announcement Banner</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2 bg-brand-primary text-white font-bold rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save & Publish
        </button>
      </div>

      <div className="space-y-6 bg-brand-white p-6 md:p-8 rounded-2xl border border-brand-dark/10 shadow-sm">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={!!data.active}
            onChange={(e) => setData({ ...data, active: e.target.checked })}
            className="w-5 h-5 accent-[var(--color-primary,#5dcaeb)]"
          />
          <span className="font-bold text-brand-dark">Banner is live (shows at the very top of every page)</span>
        </label>

        <div>
          <label className={labelCls}>Banner Text</label>
          <input type="text" value={data.text || ''} onChange={(e) => setData({ ...data, text: e.target.value })} className={inputCls} placeholder="e.g. 🎉 Free growth audit for new clients — this week only" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Button Text (optional)</label>
            <input type="text" value={data.ctaText || ''} onChange={(e) => setData({ ...data, ctaText: e.target.value })} className={inputCls} placeholder="Claim yours" />
          </div>
          <div>
            <label className={labelCls}>Button Link</label>
            <input type="text" value={data.ctaLink || ''} onChange={(e) => setData({ ...data, ctaLink: e.target.value })} className={inputCls} placeholder="/contact?type=audit" />
          </div>
          <div>
            <label className={labelCls}>Background Color</label>
            <input type="color" value={data.backgroundColor || '#5dcaeb'} onChange={(e) => setData({ ...data, backgroundColor: e.target.value })} className="h-11 w-full border border-brand-dark/10 rounded-lg cursor-pointer" />
          </div>
          <div>
            <label className={labelCls}>Text Color</label>
            <input type="color" value={data.textColor || '#ffffff'} onChange={(e) => setData({ ...data, textColor: e.target.value })} className="h-11 w-full border border-brand-dark/10 rounded-lg cursor-pointer" />
          </div>
        </div>

        {/* Live preview */}
        {data.text && (
          <div>
            <p className={labelCls}>Preview</p>
            <div
              className="w-full py-2 px-4 text-center text-sm font-medium flex items-center justify-center gap-3 rounded-lg"
              style={{ backgroundColor: data.backgroundColor, color: data.textColor }}
            >
              <span>{data.text}</span>
              {data.ctaText && <span className="underline font-bold">{data.ctaText}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
