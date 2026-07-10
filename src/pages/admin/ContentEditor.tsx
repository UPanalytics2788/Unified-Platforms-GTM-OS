import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, handleFirestoreError, OperationType } from '../../lib/firebase';
import { Save, ArrowLeft, Loader2, Zap } from 'lucide-react';
import MediaModal from '../../components/admin/MediaModal';
import { findInboundLinkOpportunities } from '../../lib/linkDiscovery';
import { runCmsAgent } from '../../lib/agents/cmsAgent';

// Import our modular editors
import UnifiedPageEditor from '../../components/admin/editors/UnifiedPageEditor';
import InsightEditor from '../../components/admin/editors/InsightEditor';
import CaseStudyEditor from '../../components/admin/editors/CaseStudyEditor';
import NavigationEditor from '../../components/admin/editors/NavigationEditor';
import AuthorEditor from '../../components/admin/editors/AuthorEditor';
import LeadEditor from '../../components/admin/editors/LeadEditor';

export default function ContentEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Parse collection from path: /admin/services/edit/abc123
  const pathParts = location.pathname.split('/');
  const editIndex = pathParts.indexOf('edit');
  const newIndex = pathParts.indexOf('new');
  const rawCollection = editIndex > 0 ? pathParts[editIndex - 1] : (newIndex > 0 ? pathParts[newIndex - 1] : (useParams().collection || ''));
  const collectionName = rawCollection;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generatingJson, setGeneratingJson] = useState(false);
  const [formData, setFormData] = useState<any>({
    status: 'draft'
  });
  
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [activeMediaField, setActiveMediaField] = useState<string | null>(null);

  useEffect(() => {
    if (id && collectionName) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, collectionName, id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
             const docData = docSnap.data();
             const repairedData = docData.slug ? docData : { ...docData, slug: id };
             setFormData(repairedData);
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, `${collectionName}/${id}`);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [id, collectionName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (html: string, fieldName: string) => {
    setFormData((prev: any) => ({ ...prev, [fieldName]: html }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collectionName) return;
    setSaving(true);
    
    try {
      const docSlug = formData.slug || id || '';
      // Retain backward compatibility nested formats for hero
      const heroH1 = formData.hero?.h1 || formData.hero_title || formData.title || formData.name || '';
      const heroIntro = formData.hero?.intro_text || formData.hero_subtitle || formData.description || '';
      const dataToSave = {
        ...formData,
        slug: docSlug,
        hero_title: heroH1,
        hero_subtitle: heroIntro,
        hero: { h1: heroH1, intro_text: heroIntro },
        updatedAt: new Date().toISOString(),
      };

      if (id) {
        await setDoc(doc(db, collectionName, id), dataToSave, { merge: true });
        if (dataToSave.status === 'published') {
          const title = dataToSave.title || dataToSave.name || '';
          findInboundLinkOpportunities(id, collectionName, title, dataToSave.primary_keyword || title).catch(console.error);
        }
      } else {
        const docRef = await addDoc(collection(db, collectionName), {
          ...dataToSave,
          createdAt: new Date().toISOString()
        });
        if (dataToSave.status === 'published') {
          const title = dataToSave.title || dataToSave.name || '';
          findInboundLinkOpportunities(docRef.id, collectionName, title, dataToSave.primary_keyword || title).catch(console.error);
        }
      }
      navigate(`/admin/${collectionName}`);
    } catch (err: any) {
      handleFirestoreError(err, id ? OperationType.UPDATE : OperationType.CREATE, collectionName);
    }
    setSaving(false);
  };

  const handleGenerateJson = async () => {
    if (!formData.name && !formData.title && !formData.slug) {
      alert("Please provide at least a title or slug before generating JSON structure.");
      return;
    }
    setGeneratingJson(true);
    try {
       const serviceName = formData.title || formData.name || formData.slug || '';
       const serviceDescription = formData.description || formData.category || 'Service';
       const res = await runCmsAgent(serviceName, serviceDescription);
       if (!res.success || res.data === undefined) {
         throw new Error(res.error || 'Agent returned no data');
       }
       const parsed = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
       setFormData((prev: any) => ({ ...prev, ...parsed }));
       alert("Structure generated! Review the changes and click Save to store them.");
    } catch (err: any) {
       console.error("AI Generation failed:", err);
       alert("Failed to generate structure. Please try again.");
    }
    setGeneratingJson(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-brand-primary" size={32} />
      </div>
    );
  }

  const editorProps = {
    formData,
    setFormData,
    handleChange,
    handleEditorChange,
    collectionName,
    setActiveMediaField,
    setMediaModalOpen,
    generatingJson
  };

  const renderCorrectEditor = () => {
    switch (collectionName) {
      case 'services':
      case 'solutions':
      case 'unified_pages':
      case 'pages':
        return <UnifiedPageEditor {...editorProps} />;
      case 'insights':
      case 'blog':
        return <InsightEditor {...editorProps} />;
      case 'case-studies':
        return <CaseStudyEditor {...editorProps} />;
      case 'navigation':
        return <NavigationEditor {...editorProps} />;
      case 'authors':
        return <AuthorEditor {...editorProps} />;
      case 'leads':
        return <LeadEditor {...editorProps} />;
      default:
        // Fallback catch-all simple text
        return <UnifiedPageEditor {...editorProps} />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-brand-gray hover:text-brand-dark transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-brand-dark hidden md:block">
          {id ? 'Edit' : 'New'} <span className="capitalize">{collectionName?.replace(/[-_]/g, ' ')}</span>
        </h1>
        
        <div className="flex-1"></div>

        {/* Global form controls */}
        <div className="flex items-center gap-3">
           {(collectionName === 'services' || collectionName === 'solutions' || collectionName === 'unified_pages') && (
            <button
              type="button"
              onClick={handleGenerateJson}
              disabled={generatingJson}
              className="inline-flex items-center px-4 py-2 bg-slate-900 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all gap-2 disabled:opacity-50"
              title="Auto-fill unified page structured data via AI"
            >
              {generatingJson ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} className="text-yellow-400" />}
              Generate Structure
            </button>
          )}
          {collectionName !== 'navigation' && collectionName !== 'leads' && (
            <label className="flex items-center gap-2 cursor-pointer border border-brand-dark/10 px-4 py-2 rounded-lg bg-brand-white">
              <span className="text-sm font-semibold text-brand-dark">Status:</span>
              <select
                name="status"
                value={formData.status || 'draft'}
                onChange={handleChange}
                className="bg-transparent border-none focus:ring-0 text-brand-dark font-medium text-sm outline-none cursor-pointer"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </label>
          )}
          {(collectionName === 'leads') && (
            <label className="flex items-center gap-2 cursor-pointer border border-brand-dark/10 px-4 py-2 rounded-lg bg-brand-white">
              <span className="text-sm font-semibold text-brand-dark">Status:</span>
              <select
                name="status"
                value={formData.status || 'new'}
                onChange={handleChange}
                className="bg-transparent border-none focus:ring-0 text-brand-dark font-medium text-sm outline-none cursor-pointer"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="closed">Closed / Won</option>
                <option value="lost">Lost</option>
              </select>
            </label>
          )}

          <button
            type="button"
            onClick={() => {
              const slug = formData.slug || id;
              if (!slug) { alert('Save the document first to preview.'); return; }
              const path = collectionName === 'solutions' ? `/solutions/${slug}`
                         : collectionName === 'unified_pages' ? `/unified/${slug}`
                         : collectionName === 'insights' ? `/insights/${slug}`
                         : collectionName === 'case-studies' ? `/case-studies/${slug}`
                         : `/services/${slug}`;
              window.open(path, '_blank');
            }}
            className="inline-flex items-center px-4 py-2 border border-brand-dark/10 bg-brand-white text-brand-dark font-semibold rounded-lg hover:bg-gray-50 transition-all gap-2"
          >
            Preview
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-brand-primary text-brand-dark font-bold rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save Changes
          </button>
        </div>
      </div>

      <form className="bg-brand-white p-6 md:p-8 rounded-2xl border border-brand-dark/10 shadow-sm space-y-6">
        {renderCorrectEditor()}
      </form>

      {mediaModalOpen && (
        <MediaModal
          isOpen={mediaModalOpen}
          onSelect={(url) => {
            if (activeMediaField) {
              setFormData((prev: any) => ({ ...prev, [activeMediaField]: url }));
            }
            setMediaModalOpen(false);
          }}
          onClose={() => setMediaModalOpen(false)}
        />
      )}
    </div>
  );
}
