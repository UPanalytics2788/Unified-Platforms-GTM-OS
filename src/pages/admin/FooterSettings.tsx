import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { FOOTER_DEFAULTS } from '../../data/sitePages';
import { mergeWithFallback } from '../../hooks/useSitePage';

const inputCls =
  'w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark';
const labelCls = 'block text-sm font-medium text-brand-dark mb-1';

export default function FooterSettings() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'footer'));
        setData(snap.exists() ? mergeWithFallback(FOOTER_DEFAULTS, snap.data()) : { ...FOOTER_DEFAULTS });
      } catch {
        setData({ ...FOOTER_DEFAULTS });
      }
      setLoading(false);
    };
    fetchDoc();
  }, []);

  if (loading || !data) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-brand-primary" size={32} /></div>;
  }

  const updateColumn = (i: number, patch: any) => {
    const columns = [...(data.columns || [])];
    columns[i] = { ...columns[i], ...patch };
    setData({ ...data, columns });
  };
  const updateLink = (ci: number, li: number, patch: any) => {
    const columns = [...(data.columns || [])];
    const links = [...(columns[ci].links || [])];
    links[li] = { ...links[li], ...patch };
    columns[ci] = { ...columns[ci], links };
    setData({ ...data, columns });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'footer'), { ...data, updatedAt: new Date().toISOString() });
      alert('Footer saved! The live site updates instantly.');
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    }
    setSaving(false);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-brand-dark">Footer</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2 bg-brand-primary text-white font-bold rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save & Publish
        </button>
      </div>

      <div className="space-y-8 bg-brand-white p-6 md:p-8 rounded-2xl border border-brand-dark/10 shadow-sm">
        <div>
          <label className={labelCls}>Footer Description (under the logo)</label>
          <textarea value={data.description || ''} onChange={(e) => setData({ ...data, description: e.target.value })} rows={3} className={inputCls} />
        </div>

        {(data.columns || []).map((column: any, ci: number) => (
          <div key={ci} className="border border-brand-dark/10 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className={labelCls}>Column Title</label>
                <input type="text" value={column.title || ''} onChange={(e) => updateColumn(ci, { title: e.target.value })} className={inputCls} />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!window.confirm('Remove this footer column?')) return;
                  setData({ ...data, columns: data.columns.filter((_: any, i: number) => i !== ci) });
                }}
                className="p-2 text-red-400 hover:text-red-600 mt-5"
                title="Remove column"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="space-y-2">
              {(column.links || []).map((link: any, li: number) => (
                <div key={li} className="flex items-center gap-2">
                  <input type="text" placeholder="Label" value={link.label || ''} onChange={(e) => updateLink(ci, li, { label: e.target.value })} className={inputCls} />
                  <input type="text" placeholder="/link" value={link.href || ''} onChange={(e) => updateLink(ci, li, { href: e.target.value })} className={inputCls} />
                  <button
                    type="button"
                    onClick={() => updateColumn(ci, { links: column.links.filter((_: any, i: number) => i !== li) })}
                    className="p-2 text-red-400 hover:text-red-600"
                    title="Remove link"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => updateColumn(ci, { links: [...(column.links || []), { label: '', href: '' }] })}
                className="inline-flex items-center gap-1 px-3 py-1.5 border border-dashed border-brand-dark/20 rounded-lg text-xs font-semibold text-brand-gray hover:border-brand-primary hover:text-brand-primary transition-all"
              >
                <Plus size={12} /> Add Link
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setData({ ...data, columns: [...(data.columns || []), { title: '', links: [] }] })}
          className="inline-flex items-center gap-1 px-4 py-2 border border-dashed border-brand-dark/20 rounded-lg text-sm font-semibold text-brand-gray hover:border-brand-primary hover:text-brand-primary transition-all"
        >
          <Plus size={14} /> Add Column
        </button>

        <div>
          <label className={labelCls}>Copyright Line (after the © year + site name)</label>
          <input type="text" value={data.rights_text || ''} onChange={(e) => setData({ ...data, rights_text: e.target.value })} className={inputCls} />
        </div>
      </div>
    </div>
  );
}
