import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Loader2, ArrowLeft, ArrowUp, ArrowDown, Trash2, Plus, ExternalLink, FileText } from 'lucide-react';
import { SITE_PAGES, SitePageDoc } from '../../data/sitePages';
import { mergeWithFallback } from '../../hooks/useSitePage';

const inputCls =
  'w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark';
const labelCls = 'block text-sm font-medium text-brand-dark mb-1';

function Field({ label, value, onChange, textarea = false, rows = 3, placeholder = '' }: any) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {textarea ? (
        <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={rows} className={inputCls} placeholder={placeholder} />
      ) : (
        <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputCls} placeholder={placeholder} />
      )}
    </div>
  );
}

const PAGE_ROUTES: Record<string, string> = {
  home: '/',
  contact: '/contact',
  services: '/services',
  solutions: '/solutions',
  insights: '/insights',
  'case-studies': '/case-studies'
};

// ---------------------------------------------------------------------------
// List view: the core site pages, each fully editable
// ---------------------------------------------------------------------------
export function SitePagesList() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-brand-dark mb-2">Site Pages</h1>
      <p className="text-brand-gray mb-8">
        Every headline, paragraph, button and SEO tag on the core pages. Changes go live on the website instantly after saving.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SITE_PAGES.map((page) => (
          <Link
            key={page.slug}
            to={`/admin/site-pages/${page.slug}`}
            className="bg-brand-white p-6 rounded-2xl border border-brand-dark/10 shadow-sm hover:shadow-md hover:border-brand-primary transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
              <FileText size={22} />
            </div>
            <div>
              <h3 className="font-bold text-brand-dark">{page.title}</h3>
              <p className="text-xs text-brand-gray">{PAGE_ROUTES[page.slug]}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section editors (home page builder)
// ---------------------------------------------------------------------------
function HeroSectionEditor({ section, update }: any) {
  return (
    <div className="space-y-4">
      <Field label="Badge (small label above headline)" value={section.badge} onChange={(v: string) => update('badge', v)} />
      <Field label="Headline (H1)" value={section.title} onChange={(v: string) => update('title', v)} textarea rows={2} />
      <Field label="Subtitle" value={section.subtitle} onChange={(v: string) => update('subtitle', v)} textarea rows={3} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Primary Button Label" value={section.cta_primary?.label} onChange={(v: string) => update('cta_primary', { ...section.cta_primary, label: v })} />
        <Field label="Primary Button Link" value={section.cta_primary?.link} onChange={(v: string) => update('cta_primary', { ...section.cta_primary, link: v })} />
        <Field label="Secondary Button Label" value={section.cta_secondary?.label} onChange={(v: string) => update('cta_secondary', { ...section.cta_secondary, label: v })} />
        <Field label="Secondary Button Link" value={section.cta_secondary?.link} onChange={(v: string) => update('cta_secondary', { ...section.cta_secondary, link: v })} />
      </div>
    </div>
  );
}

function AdvantageSectionEditor({ section, update }: any) {
  return (
    <div className="space-y-4">
      <Field label="Badge" value={section.badge} onChange={(v: string) => update('badge', v)} />
      <Field label="Headline" value={section.title} onChange={(v: string) => update('title', v)} textarea rows={2} />
      <Field label="Description (HTML allowed)" value={section.description} onChange={(v: string) => update('description', v)} textarea rows={4} />
      <Field
        label="Checklist Items (one per line)"
        value={(section.items || []).join('\n')}
        onChange={(v: string) => update('items', v.split('\n').filter((s: string) => s.trim() !== ''))}
        textarea
        rows={4}
      />
      <Field label="Image URL" value={section.image_url} onChange={(v: string) => update('image_url', v)} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Stat Value (e.g. 3.5x)" value={section.stats?.value} onChange={(v: string) => update('stats', { ...section.stats, value: v })} />
        <Field label="Stat Label" value={section.stats?.label} onChange={(v: string) => update('stats', { ...section.stats, label: v })} />
      </div>
    </div>
  );
}

const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero (dark header with headline + buttons)',
  trust_bar: 'Trust Bar (stats strip)',
  advantage: 'Advantage (text + image + checklist)'
};

function SectionsEditor({ sections, setSections }: any) {
  const move = (i: number, dir: number) => {
    const next = [...sections];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    setSections(next);
  };
  const remove = (i: number) => {
    if (!window.confirm('Remove this section from the page?')) return;
    setSections(sections.filter((_: any, idx: number) => idx !== i));
  };
  const updateAt = (i: number) => (key: string, value: any) => {
    const next = [...sections];
    next[i] = { ...next[i], [key]: value };
    setSections(next);
  };
  const addSection = (type: string) => {
    const blank =
      type === 'hero'
        ? { type, badge: '', title: '', subtitle: '', cta_primary: { label: '', link: '' }, cta_secondary: { label: '', link: '' } }
        : type === 'advantage'
        ? { type, badge: '', title: '', description: '', items: [], image_url: '', stats: { value: '', label: '' } }
        : { type };
    setSections([...sections, blank]);
  };

  return (
    <div className="space-y-6">
      {sections.map((section: any, i: number) => (
        <div key={i} className="border border-brand-dark/10 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-brand-dark/10">
            <span className="font-bold text-sm text-brand-dark uppercase tracking-wide">
              {i + 1}. {SECTION_LABELS[section.type] || section.type}
            </span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => move(i, -1)} className="p-2 text-brand-gray hover:text-brand-dark" title="Move up"><ArrowUp size={16} /></button>
              <button type="button" onClick={() => move(i, 1)} className="p-2 text-brand-gray hover:text-brand-dark" title="Move down"><ArrowDown size={16} /></button>
              <button type="button" onClick={() => remove(i)} className="p-2 text-red-400 hover:text-red-600" title="Remove section"><Trash2 size={16} /></button>
            </div>
          </div>
          <div className="p-5">
            {section.type === 'hero' && <HeroSectionEditor section={section} update={updateAt(i)} />}
            {section.type === 'advantage' && <AdvantageSectionEditor section={section} update={updateAt(i)} />}
            {section.type === 'trust_bar' && (
              <p className="text-sm text-brand-gray">
                Shows the animated stats strip. Edit the numbers under <Link to="/admin/trust" className="text-brand-primary font-semibold">Trust Signals</Link>.
              </p>
            )}
          </div>
        </div>
      ))}
      <div className="flex items-center gap-2 flex-wrap">
        {Object.keys(SECTION_LABELS).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => addSection(type)}
            className="inline-flex items-center gap-1 px-4 py-2 border border-dashed border-brand-dark/20 rounded-lg text-sm font-semibold text-brand-gray hover:border-brand-primary hover:text-brand-primary transition-all"
          >
            <Plus size={14} /> Add {type.replace('_', ' ')}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Per-page structured editors
// ---------------------------------------------------------------------------
function ContactFields({ data, set }: any) {
  return (
    <>
      <div className="space-y-4">
        <h2 className="font-bold text-brand-dark text-lg">Hero</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Heading" value={data.hero?.heading} onChange={(v: string) => set('hero', { ...data.hero, heading: v })} />
          <Field label="Highlighted Word (colored)" value={data.hero?.highlight} onChange={(v: string) => set('hero', { ...data.hero, highlight: v })} />
        </div>
        <Field label="Subtitle" value={data.hero?.subtitle} onChange={(v: string) => set('hero', { ...data.hero, subtitle: v })} textarea rows={3} />
      </div>
      <div className="space-y-4">
        <h2 className="font-bold text-brand-dark text-lg">Contact Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Email Label" value={data.contact_info?.email_label} onChange={(v: string) => set('contact_info', { ...data.contact_info, email_label: v })} />
          <Field label="Email Address" value={data.contact_info?.email} onChange={(v: string) => set('contact_info', { ...data.contact_info, email: v })} />
          <Field label="Phone Label" value={data.contact_info?.phone_label} onChange={(v: string) => set('contact_info', { ...data.contact_info, phone_label: v })} />
          <Field label="Phone Number" value={data.contact_info?.phone} onChange={(v: string) => set('contact_info', { ...data.contact_info, phone: v })} />
          <Field label="Address Label" value={data.contact_info?.address_label} onChange={(v: string) => set('contact_info', { ...data.contact_info, address_label: v })} />
          <Field label="Address" value={data.contact_info?.address} onChange={(v: string) => set('contact_info', { ...data.contact_info, address: v })} />
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="font-bold text-brand-dark text-lg">Support Box (dark card)</h2>
        <Field label="Title" value={data.support_box?.title} onChange={(v: string) => set('support_box', { ...data.support_box, title: v })} />
        <Field label="Text" value={data.support_box?.text} onChange={(v: string) => set('support_box', { ...data.support_box, text: v })} textarea rows={2} />
        <Field label="Button Label" value={data.support_box?.cta_label} onChange={(v: string) => set('support_box', { ...data.support_box, cta_label: v })} />
      </div>
      <div className="space-y-4">
        <h2 className="font-bold text-brand-dark text-lg">Lead Form Titles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Consultation Form Title" value={data.form_title_consultation} onChange={(v: string) => set('form_title_consultation', v)} />
          <Field label="Audit Form Title" value={data.form_title_audit} onChange={(v: string) => set('form_title_audit', v)} />
        </div>
      </div>
    </>
  );
}

function ListingHeaderFields({ data, set, withCategories = false }: any) {
  return (
    <div className="space-y-4">
      <h2 className="font-bold text-brand-dark text-lg">Page Header</h2>
      <Field label="Heading (H1)" value={data.header?.heading} onChange={(v: string) => set('header', { ...data.header, heading: v })} />
      <Field label="Intro Text" value={data.header?.intro} onChange={(v: string) => set('header', { ...data.header, intro: v })} textarea rows={3} />
      {withCategories && (
        <Field
          label="Service Category Order (one per line — must match each service's category)"
          value={(data.categories || []).join('\n')}
          onChange={(v: string) => set('categories', v.split('\n').filter((s: string) => s.trim() !== ''))}
          textarea
          rows={5}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Editor route: /admin/site-pages/:slug
// ---------------------------------------------------------------------------
export default function SitePageEditor() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const fallback = SITE_PAGES.find((p) => p.slug === slug);
  const [data, setData] = useState<SitePageDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!slug || !fallback) return;
    const fetchDoc = async () => {
      setLoading(true);
      try {
        const snap = await getDoc(doc(db, 'pages', slug));
        setData(snap.exists() ? mergeWithFallback(fallback, snap.data()) : { ...fallback });
      } catch {
        setData({ ...fallback });
      }
      setLoading(false);
    };
    fetchDoc();
  }, [slug]);

  if (!slug || !fallback) {
    return <div className="text-brand-gray">Unknown page. <Link to="/admin/site-pages" className="text-brand-primary">Back to Site Pages</Link></div>;
  }
  if (loading || !data) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-brand-primary" size={32} /></div>;
  }

  const set = (key: string, value: any) => setData((prev: any) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'pages', slug), {
        ...data,
        slug,
        status: 'published',
        updatedAt: new Date().toISOString()
      });
      alert('Saved! The live page updates instantly.');
    } catch (err: any) {
      console.error(err);
      alert(`Save failed: ${err.message}`);
    }
    setSaving(false);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin/site-pages')} className="p-2 text-brand-gray hover:text-brand-dark transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-brand-dark">Edit: {fallback.title} Page</h1>
        <div className="flex-1" />
        <a
          href={PAGE_ROUTES[slug]}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-brand-dark/10 bg-brand-white text-brand-dark font-semibold rounded-lg hover:bg-gray-50 transition-all"
        >
          <ExternalLink size={16} /> View Page
        </a>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2 bg-brand-primary text-white font-bold rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save & Publish
        </button>
      </div>

      <div className="space-y-10 bg-brand-white p-6 md:p-8 rounded-2xl border border-brand-dark/10 shadow-sm">
        {/* SEO — every page */}
        <div className="space-y-4">
          <h2 className="font-bold text-brand-dark text-lg">SEO</h2>
          <Field label="Meta Title" value={data.seo?.title} onChange={(v: string) => set('seo', { ...data.seo, title: v })} />
          <Field label="Meta Description" value={data.seo?.description} onChange={(v: string) => set('seo', { ...data.seo, description: v })} textarea rows={3} />
        </div>

        {/* Page-specific structure */}
        {slug === 'home' && (
          <div className="space-y-4">
            <h2 className="font-bold text-brand-dark text-lg">Page Sections</h2>
            <SectionsEditor sections={data.sections || []} setSections={(s: any[]) => set('sections', s)} />
          </div>
        )}
        {slug === 'contact' && <ContactFields data={data} set={set} />}
        {slug === 'services' && <ListingHeaderFields data={data} set={set} withCategories />}
        {['solutions', 'insights', 'case-studies'].includes(slug) && <ListingHeaderFields data={data} set={set} />}
      </div>
    </div>
  );
}
