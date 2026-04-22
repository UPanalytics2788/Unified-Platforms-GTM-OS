import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { 
  Save, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  GripVertical, 
  ChevronUp, 
  ChevronDown, 
  Eye, 
  Settings, 
  Layout, 
  Type, 
  Image as ImageIcon, 
  CheckCircle, 
  MessageSquare, 
  HelpCircle, 
  CreditCard, 
  Mail,
  Loader2,
  BarChart3
} from 'lucide-react';
import { motion, Reorder } from 'motion/react';

type SectionType = 'hero' | 'features' | 'testimonials' | 'cta' | 'faq' | 'pricing' | 'contact' | 'talent-solutions';

interface Section {
  id: string;
  type: SectionType;
  content: any;
}

export default function LandingPageBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pageData, setPageData] = useState({
    title: '',
    slug: '',
    status: 'draft' as 'draft' | 'published',
    sections: [] as Section[],
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: ''
    }
  });

  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPage = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, 'landing_pages', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setPageData(docSnap.data() as any);
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, `landing_pages/${id}`);
        }
        setLoading(false);
      };
      fetchPage();
    }
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = {
        ...pageData,
        updatedAt: new Date().toISOString()
      };

      if (id) {
        await setDoc(doc(db, 'landing_pages', id), data);
      } else {
        await addDoc(collection(db, 'landing_pages'), {
          ...data,
          createdAt: new Date().toISOString()
        });
      }
      navigate('/admin/landing-pages');
    } catch (err) {
      handleFirestoreError(err, id ? OperationType.UPDATE : OperationType.CREATE, 'landing_pages');
    }
    setSaving(false);
  };

  const addSection = (type: SectionType) => {
    const newSection: Section = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: getDefaultContent(type)
    };
    setPageData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
    setActiveSection(newSection.id);
  };

  const removeSection = (id: string) => {
    setPageData(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== id)
    }));
    if (activeSection === id) setActiveSection(null);
  };

  const updateSectionContent = (id: string, content: any) => {
    setPageData(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === id ? { ...s, content } : s)
    }));
  };

  const getDefaultContent = (type: SectionType) => {
    switch (type) {
      case 'hero':
        return { title: 'New Hero Section', subtitle: 'Add a compelling subtitle here.', ctaText: 'Get Started', imageUrl: '' };
      case 'features':
        return { title: 'Our Features', items: [{ title: 'Feature 1', description: 'Description 1' }] };
      case 'testimonials':
        return { title: 'What Clients Say', items: [{ name: 'John Doe', role: 'CEO', text: 'Amazing service!' }] };
      case 'cta':
        return { title: 'Ready to scale?', subtitle: 'Join 500+ companies.', buttonText: 'Book a Call' };
      case 'faq':
        return { title: 'Frequently Asked Questions', items: [{ question: 'How does it work?', answer: 'It works great!' }] };
      case 'pricing':
        return { title: 'Simple Pricing', plans: [{ name: 'Pro', price: '$99', features: ['Feature A', 'Feature B'] }] };
      case 'contact':
        return { title: 'Get in Touch', subtitle: 'We respond in 24 hours.' };
      case 'talent-solutions':
        return {
          title: 'An Award Winning End-to-End Talent Solutions',
          subtitle: 'Our cutting-edge platform empowers businesses to strategically hire, develop, and retain top talent.',
          tabs: [
            {
              name: 'Hire',
              title: 'Find & Hire the Right Tech Talent, Faster',
              image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000',
              points: [
                { title: 'End-to-end AI-powered Recruiting', desc: 'Enhance the experience of hiring from sourcing to onboarding.' },
                { title: 'Role Based Hiring Assessments', desc: 'Conduct precise role-based assessments to identify the best-fit candidates.' }
              ]
            },
            {
              name: 'Learn',
              title: 'Continuous Learning for Modern Tech Teams',
              image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000',
              points: [
                { title: 'Personalized Learning Paths', desc: 'AI-driven curricula tailored to individual skill gaps.' }
              ]
            }
          ]
        };
      default:
        return {};
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="flex flex-col h-screen -m-8">
      {/* Header */}
      <header className="bg-brand-white border-b border-brand-dark/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/landing-pages')} className="p-2 text-brand-gray hover:text-brand-dark transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <input
              type="text"
              value={pageData.title}
              onChange={e => setPageData({ ...pageData, title: e.target.value })}
              placeholder="Page Title"
              className="text-xl font-bold text-brand-dark bg-transparent border-none focus:ring-0 p-0"
            />
            <div className="flex items-center gap-2 text-xs text-brand-gray">
              <span>slug: /lp/</span>
              <input
                type="text"
                value={pageData.slug}
                onChange={e => setPageData({ ...pageData, slug: e.target.value })}
                placeholder="page-slug"
                className="bg-transparent border-none focus:ring-0 p-0 text-brand-primary font-medium"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={pageData.status}
            onChange={e => setPageData({ ...pageData, status: e.target.value as any })}
            className="text-sm border border-brand-dark/10 rounded-lg px-3 py-2 bg-brand-white"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button className="p-2 text-brand-gray hover:text-brand-primary transition-colors" title="Preview">
            <Eye size={20} />
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center px-6 py-2 bg-brand-primary text-brand-white font-semibold rounded-xl hover:bg-brand-primary/90 transition-all disabled:opacity-50 gap-2"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save Page
          </button>
        </div>
      </header>

      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar: Components */}
        <aside className="w-64 bg-brand-white border-r border-brand-dark/10 p-6 overflow-y-auto">
          <h3 className="text-xs font-bold text-brand-gray uppercase tracking-wider mb-6">Add Sections</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { type: 'hero', icon: Layout, label: 'Hero' },
              { type: 'features', icon: CheckCircle, label: 'Features' },
              { type: 'testimonials', icon: MessageSquare, label: 'Testimonials' },
              { type: 'cta', icon: Type, label: 'CTA' },
              { type: 'faq', icon: HelpCircle, label: 'FAQ' },
              { type: 'pricing', icon: CreditCard, label: 'Pricing' },
              { type: 'contact', icon: Mail, label: 'Contact' },
              { type: 'talent-solutions', icon: BarChart3, label: 'Talent Solutions' }
            ].map(item => (
              <button
                key={item.type}
                onClick={() => addSection(item.type as SectionType)}
                className="flex items-center gap-3 p-3 bg-brand-dark/5 hover:bg-brand-primary/10 hover:text-brand-primary rounded-xl transition-all text-sm font-medium text-brand-dark group"
              >
                <item.icon size={18} className="group-hover:scale-110 transition-transform" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-xs font-bold text-brand-gray uppercase tracking-wider mb-6">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-brand-gray uppercase mb-1">Meta Title</label>
                <input
                  type="text"
                  value={pageData.seo.metaTitle}
                  onChange={e => setPageData({ ...pageData, seo: { ...pageData.seo, metaTitle: e.target.value } })}
                  className="w-full px-3 py-2 text-xs border border-brand-dark/10 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brand-gray uppercase mb-1">Meta Description</label>
                <textarea
                  rows={3}
                  value={pageData.seo.metaDescription}
                  onChange={e => setPageData({ ...pageData, seo: { ...pageData.seo, metaDescription: e.target.value } })}
                  className="w-full px-3 py-2 text-xs border border-brand-dark/10 rounded-lg"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Canvas: Builder Area */}
        <main className="flex-grow bg-brand-dark/5 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {pageData.sections.length === 0 ? (
              <div className="bg-brand-white border-2 border-dashed border-brand-dark/10 rounded-3xl p-20 text-center">
                <Layout className="mx-auto text-brand-gray mb-4" size={48} />
                <h3 className="text-xl font-bold text-brand-dark mb-2">Your canvas is empty</h3>
                <p className="text-brand-gray mb-6">Start by adding a hero section from the sidebar.</p>
                <button
                  onClick={() => addSection('hero')}
                  className="px-6 py-2 bg-brand-dark text-brand-white rounded-xl hover:bg-brand-dark/90 transition-all font-semibold"
                >
                  Add Hero Section
                </button>
              </div>
            ) : (
              <Reorder.Group axis="y" values={pageData.sections} onReorder={(newOrder) => setPageData({ ...pageData, sections: newOrder })}>
                {pageData.sections.map((section) => (
                  <Reorder.Item key={section.id} value={section}>
                    <div 
                      className={`bg-brand-white rounded-2xl border transition-all ${
                        activeSection === section.id ? 'border-brand-primary ring-4 ring-brand-primary/5' : 'border-brand-dark/10'
                      }`}
                    >
                      <div className="p-4 border-b border-brand-dark/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <GripVertical size={18} className="text-brand-gray cursor-grab" />
                          <span className="text-xs font-bold text-brand-dark uppercase tracking-wider">{section.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                            className="p-2 text-brand-gray hover:text-brand-primary transition-colors"
                          >
                            <Settings size={16} />
                          </button>
                          <button
                            onClick={() => removeSection(section.id)}
                            className="p-2 text-brand-gray hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      {activeSection === section.id && (
                        <div className="p-6 bg-brand-dark/5 border-b border-brand-dark/5">
                          <SectionEditor 
                            section={section} 
                            onChange={(content) => updateSectionContent(section.id, content)} 
                          />
                        </div>
                      )}

                      <div className="p-8 opacity-50 pointer-events-none select-none">
                        <SectionPreview section={section} />
                      </div>
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function SectionEditor({ section, onChange }: { section: Section, onChange: (content: any) => void }) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...section.content, [field]: value });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...(section.content.items || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    handleChange('items', newItems);
  };

  const addItem = () => {
    const newItem = section.type === 'features' ? { title: 'New Feature', description: 'Description' } : 
                    section.type === 'testimonials' ? { name: 'Name', role: 'Role', text: 'Testimonial' } :
                    section.type === 'faq' ? { question: 'Question', answer: 'Answer' } : {};
    handleChange('items', [...(section.content.items || []), newItem]);
  };

  const removeItem = (index: number) => {
    const newItems = [...(section.content.items || [])];
    newItems.splice(index, 1);
    handleChange('items', newItems);
  };

  switch (section.type) {
    case 'hero':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-brand-gray uppercase mb-1">Title</label>
              <input
                type="text"
                value={section.content.title}
                onChange={e => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-brand-gray uppercase mb-1">Subtitle</label>
              <textarea
                rows={3}
                value={section.content.subtitle}
                onChange={e => handleChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-brand-gray uppercase mb-1">CTA Text</label>
              <input
                type="text"
                value={section.content.ctaText}
                onChange={e => handleChange('ctaText', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-brand-gray uppercase mb-1">Image URL</label>
              <input
                type="text"
                value={section.content.imageUrl}
                onChange={e => handleChange('imageUrl', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
              />
            </div>
          </div>
        </div>
      );
    case 'features':
    case 'testimonials':
    case 'faq':
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-brand-gray uppercase mb-1">Section Title</label>
            <input
              type="text"
              value={section.content.title}
              onChange={e => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
            />
          </div>
          <div className="space-y-4">
            {(section.content.items || []).map((item: any, idx: number) => (
              <div key={idx} className="p-4 bg-brand-white rounded-xl border border-brand-dark/10 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-brand-gray uppercase">Item {idx + 1}</span>
                  <button onClick={() => removeItem(idx)} className="text-red-500 text-xs hover:underline">Remove</button>
                </div>
                {section.type === 'features' && (
                  <>
                    <input
                      type="text"
                      placeholder="Feature Title"
                      value={item.title}
                      onChange={e => updateItem(idx, 'title', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
                    />
                    <textarea
                      placeholder="Description"
                      value={item.description}
                      onChange={e => updateItem(idx, 'description', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
                    />
                  </>
                )}
                {section.type === 'testimonials' && (
                  <>
                    <textarea
                      placeholder="Testimonial Text"
                      value={item.text}
                      onChange={e => updateItem(idx, 'text', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Name"
                        value={item.name}
                        onChange={e => updateItem(idx, 'name', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Role"
                        value={item.role}
                        onChange={e => updateItem(idx, 'role', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
                      />
                    </div>
                  </>
                )}
                {section.type === 'faq' && (
                  <>
                    <input
                      type="text"
                      placeholder="Question"
                      value={item.question}
                      onChange={e => updateItem(idx, 'question', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
                    />
                    <textarea
                      placeholder="Answer"
                      value={item.answer}
                      onChange={e => updateItem(idx, 'answer', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
                    />
                  </>
                )}
              </div>
            ))}
            <button
              onClick={addItem}
              className="w-full py-2 border-2 border-dashed border-brand-dark/10 rounded-xl text-brand-gray text-xs font-bold hover:border-brand-primary hover:text-brand-primary transition-all"
            >
              + Add Item
            </button>
          </div>
        </div>
      );
    case 'cta':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-brand-gray uppercase mb-1">Title</label>
            <input
              type="text"
              value={section.content.title}
              onChange={e => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-brand-gray uppercase mb-1">Subtitle</label>
            <input
              type="text"
              value={section.content.subtitle}
              onChange={e => handleChange('subtitle', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-brand-gray uppercase mb-1">Button Text</label>
            <input
              type="text"
              value={section.content.buttonText}
              onChange={e => handleChange('buttonText', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
            />
          </div>
        </div>
      );
    case 'pricing':
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-brand-gray uppercase mb-1">Section Title</label>
            <input
              type="text"
              value={section.content.title}
              onChange={e => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
            />
          </div>
          <div className="space-y-4">
            {(section.content.plans || []).map((plan: any, idx: number) => (
              <div key={idx} className="p-4 bg-brand-white rounded-xl border border-brand-dark/10 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-brand-gray uppercase">Plan {idx + 1}</span>
                  <button 
                    onClick={() => {
                      const newPlans = [...section.content.plans];
                      newPlans.splice(idx, 1);
                      handleChange('plans', newPlans);
                    }}
                    className="text-red-500 text-xs hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Plan Name"
                    value={plan.name}
                    onChange={e => {
                      const newPlans = [...section.content.plans];
                      newPlans[idx] = { ...plan, name: e.target.value };
                      handleChange('plans', newPlans);
                    }}
                    className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Price"
                    value={plan.price}
                    onChange={e => {
                      const newPlans = [...section.content.plans];
                      newPlans[idx] = { ...plan, price: e.target.value };
                      handleChange('plans', newPlans);
                    }}
                    className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-gray uppercase mb-1">Features (one per line)</label>
                  <textarea
                    rows={3}
                    value={plan.features?.join('\n')}
                    onChange={e => {
                      const newPlans = [...section.content.plans];
                      newPlans[idx] = { ...plan, features: e.target.value.split('\n').filter(f => f.trim() !== '') };
                      handleChange('plans', newPlans);
                    }}
                    className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => handleChange('plans', [...(section.content.plans || []), { name: 'New Plan', price: '$0', features: [] }])}
              className="w-full py-2 border-2 border-dashed border-brand-dark/10 rounded-xl text-brand-gray text-xs font-bold hover:border-brand-primary hover:text-brand-primary transition-all"
            >
              + Add Plan
            </button>
          </div>
        </div>
      );
    case 'contact':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-brand-gray uppercase mb-1">Title</label>
            <input
              type="text"
              value={section.content.title}
              onChange={e => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-brand-gray uppercase mb-1">Subtitle</label>
            <input
              type="text"
              value={section.content.subtitle}
              onChange={e => handleChange('subtitle', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
            />
          </div>
        </div>
      );
    case 'talent-solutions':
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-brand-gray uppercase mb-1">Section Title</label>
              <input
                type="text"
                value={section.content.title}
                onChange={e => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-brand-gray uppercase mb-1">Section Subtitle</label>
              <input
                type="text"
                value={section.content.subtitle}
                onChange={e => handleChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-brand-dark/10 rounded-lg"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-[10px] font-bold text-brand-gray uppercase">Tabs</label>
              <button 
                onClick={() => {
                  const newTabs = [...(section.content.tabs || []), { name: 'New Tab', title: 'Tab Title', image: '', points: [] }];
                  handleChange('tabs', newTabs);
                }}
                className="text-brand-primary text-xs font-bold hover:underline"
              >
                + Add Tab
              </button>
            </div>
            
            {(section.content.tabs || []).map((tab: any, tIdx: number) => (
              <div key={tIdx} className="p-4 bg-brand-white rounded-xl border border-brand-dark/10 space-y-4">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    value={tab.name}
                    onChange={e => {
                      const newTabs = [...section.content.tabs];
                      newTabs[tIdx] = { ...tab, name: e.target.value };
                      handleChange('tabs', newTabs);
                    }}
                    className="text-xs font-bold text-brand-dark uppercase bg-transparent border-none focus:ring-0 p-0 w-1/2"
                    placeholder="Tab Name"
                  />
                  <button 
                    onClick={() => {
                      const newTabs = [...section.content.tabs];
                      newTabs.splice(tIdx, 1);
                      handleChange('tabs', newTabs);
                    }}
                    className="text-red-500 text-xs hover:underline"
                  >
                    Remove Tab
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-brand-gray uppercase mb-1">Tab Content Title</label>
                    <input
                      type="text"
                      value={tab.title}
                      onChange={e => {
                        const newTabs = [...section.content.tabs];
                        newTabs[tIdx] = { ...tab, title: e.target.value };
                        handleChange('tabs', newTabs);
                      }}
                      className="w-full px-3 py-2 text-xs border border-brand-dark/10 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-brand-gray uppercase mb-1">Tab Image URL</label>
                    <input
                      type="text"
                      value={tab.image}
                      onChange={e => {
                        const newTabs = [...section.content.tabs];
                        newTabs[tIdx] = { ...tab, image: e.target.value };
                        handleChange('tabs', newTabs);
                      }}
                      className="w-full px-3 py-2 text-xs border border-brand-dark/10 rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-bold text-brand-gray uppercase">Points</label>
                    <button 
                      onClick={() => {
                        const newTabs = [...section.content.tabs];
                        newTabs[tIdx] = { ...tab, points: [...(tab.points || []), { title: 'New Point', desc: 'Description' }] };
                        handleChange('tabs', newTabs);
                      }}
                      className="text-brand-primary text-[10px] font-bold hover:underline"
                    >
                      + Add Point
                    </button>
                  </div>
                  {(tab.points || []).map((point: any, pIdx: number) => (
                    <div key={pIdx} className="p-3 bg-brand-dark/5 rounded-lg space-y-2">
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          value={point.title}
                          onChange={e => {
                            const newTabs = [...section.content.tabs];
                            const newPoints = [...tab.points];
                            newPoints[pIdx] = { ...point, title: e.target.value };
                            newTabs[tIdx] = { ...tab, points: newPoints };
                            handleChange('tabs', newTabs);
                          }}
                          className="text-xs font-bold text-brand-dark bg-transparent border-none focus:ring-0 p-0 w-full"
                          placeholder="Point Title"
                        />
                        <button 
                          onClick={() => {
                            const newTabs = [...section.content.tabs];
                            const newPoints = [...tab.points];
                            newPoints.splice(pIdx, 1);
                            newTabs[tIdx] = { ...tab, points: newPoints };
                            handleChange('tabs', newTabs);
                          }}
                          className="text-red-500 text-[10px] hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                      <textarea
                        value={point.desc}
                        onChange={e => {
                          const newTabs = [...section.content.tabs];
                          const newPoints = [...tab.points];
                          newPoints[pIdx] = { ...point, desc: e.target.value };
                          newTabs[tIdx] = { ...tab, points: newPoints };
                          handleChange('tabs', newTabs);
                        }}
                        className="w-full px-2 py-1 text-xs border border-brand-dark/10 rounded bg-white"
                        placeholder="Point Description"
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return <div className="text-xs text-brand-gray italic">Editor for {section.type} coming soon.</div>;
  }
}

function TalentSolutionsPreview({ content }: { content: any }) {
  const [activeTab, setActiveTab] = useState(content.tabs?.[0]?.name || '');
  const currentTab = content.tabs?.find((t: any) => t.name === activeTab) || content.tabs?.[0];

  if (!currentTab) return null;

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
        <p className="text-sm text-brand-gray">{content.subtitle}</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 bg-brand-dark/5 rounded-xl">
          {content.tabs?.map((tab: any) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.name 
                  ? 'bg-brand-white text-brand-primary shadow-sm' 
                  : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-brand-dark/5 rounded-3xl p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <h3 className="text-xl font-bold mb-6">{currentTab.title}</h3>
            <div className="space-y-4 mb-6">
              {currentTab.points?.map((point: any, i: number) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-brand-primary text-brand-white rounded-full flex items-center justify-center text-[10px] font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-0.5">{point.title}</h4>
                    <p className="text-xs text-brand-gray">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="px-6 py-2 bg-brand-dark text-brand-white font-bold rounded-lg text-sm">
              Get Started
            </button>
          </div>
          <div className="lg:w-1/2">
            {currentTab.image && (
              <img 
                src={currentTab.image} 
                alt={currentTab.name} 
                className="rounded-2xl shadow-lg w-full h-48 object-cover"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionPreview({ section }: { section: Section }) {
  switch (section.type) {
    case 'hero':
      return (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{section.content.title}</h1>
          <p className="text-xl mb-8">{section.content.subtitle}</p>
          <button className="px-8 py-3 bg-brand-primary text-brand-white rounded-xl font-bold">
            {section.content.ctaText}
          </button>
        </div>
      );
    case 'features':
      return (
        <div className="py-12">
          <h2 className="text-3xl font-bold text-center mb-12">{section.content.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(section.content.items || []).map((item: any, idx: number) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-brand-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'testimonials':
      return (
        <div className="py-12">
          <h2 className="text-3xl font-bold text-center mb-12">{section.content.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(section.content.items || []).map((item: any, idx: number) => (
              <div key={idx} className="bg-brand-dark/5 p-8 rounded-3xl">
                <p className="text-lg italic mb-6">"{item.text}"</p>
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-brand-gray">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'faq':
      return (
        <div className="py-12">
          <h2 className="text-3xl font-bold text-center mb-12">{section.content.title}</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {(section.content.items || []).map((item: any, idx: number) => (
              <div key={idx} className="p-6 border border-brand-dark/10 rounded-2xl">
                <h3 className="font-bold mb-2">{item.question}</h3>
                <p className="text-brand-gray">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'cta':
      return (
        <div className="bg-brand-primary text-brand-white p-12 rounded-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">{section.content.title}</h2>
          <p className="text-brand-gray mb-8">{section.content.subtitle}</p>
          <button className="px-8 py-3 bg-brand-primary text-brand-white rounded-xl font-bold">
            {section.content.buttonText}
          </button>
        </div>
      );
    case 'pricing':
      return (
        <div className="py-12">
          <h2 className="text-3xl font-bold text-center mb-12">{section.content.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(section.content.plans || []).map((plan: any, idx: number) => (
              <div key={idx} className="bg-brand-white p-8 rounded-3xl border border-brand-dark/10 text-center">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-brand-primary mb-6">{plan.price}</p>
                <ul className="text-left space-y-3 mb-8">
                  {plan.features?.map((f: string, i: number) => (
                    <li key={i} className="text-xs text-brand-gray flex items-center gap-2">
                      <CheckCircle size={14} className="text-brand-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-2 bg-brand-dark text-brand-white rounded-lg font-bold text-sm">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    case 'contact':
      return (
        <div className="bg-brand-dark text-brand-white p-12 rounded-3xl">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{section.content.title}</h2>
            <p className="text-brand-gray mb-8">{section.content.subtitle}</p>
            <div className="space-y-4">
              <input type="text" placeholder="Name" className="w-full px-4 py-3 bg-brand-white/5 border border-brand-white/10 rounded-xl" disabled />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-brand-white/5 border border-brand-white/10 rounded-xl" disabled />
              <button className="w-full py-4 bg-brand-primary text-brand-white rounded-xl font-bold">
                Send Message
              </button>
            </div>
          </div>
        </div>
      );
    case 'talent-solutions':
      return <TalentSolutionsPreview content={section.content} />;
    default:
      return (
        <div className="p-12 border border-dashed border-brand-dark/10 rounded-3xl text-center">
          <span className="text-brand-gray font-bold uppercase tracking-widest">{section.type} Section</span>
        </div>
      );
  }
}
