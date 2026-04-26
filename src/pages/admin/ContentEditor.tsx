import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, handleFirestoreError, OperationType } from '../../lib/firebase';
import { Save, ArrowLeft, Loader2, Upload, Image as ImageIcon } from 'lucide-react';
import RichTextEditor from '../../components/admin/RichTextEditor';
import MediaModal from '../../components/admin/MediaModal';
import { runLinkDiscovery } from '../../lib/linkDiscovery';

export default function ContentEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Parse collection from path: /admin/services/edit/abc123
  const pathParts = location.pathname.split('/');
  const editIndex = pathParts.indexOf('edit');
  const newIndex = pathParts.indexOf('new');
  const collectionName = editIndex > 0 ? pathParts[editIndex - 1] : (newIndex > 0 ? pathParts[newIndex - 1] : (useParams().collection || ''));

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<any>({
    status: 'draft' // Initialize new items as drafts
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
            setFormData(docSnap.data());
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, `${collectionName}/${id}`);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [id, collectionName]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `${collectionName}/${id || 'new'}/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFormData((prev: any) => ({ ...prev, [fieldName]: url }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collectionName) return;

    setSaving(true);
    try {
      if (id) {
        await setDoc(doc(db, collectionName, id), formData, { merge: true });
        if (formData.status === 'published') {
          const content = formData.long_content || formData.content || '';
          const title = formData.title || formData.name || '';
          runLinkDiscovery(id, collectionName, title, content).catch(console.error);
        }
      } else {
        const docRef = await addDoc(collection(db, collectionName), {
          ...formData,
          createdAt: new Date().toISOString()
        });
        if (formData.status === 'published') {
          const content = formData.long_content || formData.content || '';
          const title = formData.title || formData.name || '';
          runLinkDiscovery(docRef.id, collectionName, title, content).catch(console.error);
        }
      }
      navigate(`/admin/${collectionName}`);
    } catch (err) {
      handleFirestoreError(err, id ? OperationType.UPDATE : OperationType.CREATE, collectionName);
    }
    setSaving(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const getEditorContent = () => {
    if (collectionName === 'blog' || collectionName === 'insights') return formData.content || '';
    if (collectionName === 'authors') return formData.bio || '';
    return formData.long_content || '';
  };

  const handleEditorChange = (html: string) => {
    let fieldName = 'long_content';
    if (collectionName === 'blog' || collectionName === 'insights') fieldName = 'content';
    if (collectionName === 'authors') fieldName = 'bio';
    setFormData((prev: any) => ({ ...prev, [fieldName]: html }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-brand-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-brand-gray hover:text-brand-dark transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-brand-dark">
          {id ? 'Edit' : 'New'} {collectionName?.replace('_', ' ')}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-brand-white p-8 rounded-2xl border border-brand-dark/10 shadow-sm">
        <div className="grid grid-cols-1 gap-6">
          {collectionName === 'navigation' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">Menu Label</label>
                <input
                  type="text"
                  name="label"
                  value={formData.label || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">Menu Type</label>
                <select
                  name="type"
                  value={formData.type || 'link'}
                  onChange={(e) => {
                    const newType = e.target.value;
                    const newData = { ...formData, type: newType };
                    if (newType === 'mega' && !formData.columns) {
                      newData.columns = [{ title: 'New Column', links: [] }];
                    }
                    if (newType === 'dropdown' && !formData.links) {
                      newData.links = [];
                    }
                    setFormData(newData);
                  }}
                  className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                >
                  <option value="link">Single Link</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="mega">Mega Menu</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">Slug / URL</label>
                <input
                  type="text"
                  name="href"
                  value={formData.href || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                  placeholder="/services or https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order || 0}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">Visibility</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.visible_to?.includes('public')}
                      onChange={(e) => {
                        const visible_to = formData.visible_to || [];
                        if (e.target.checked) {
                          setFormData({ ...formData, visible_to: [...visible_to, 'public'] });
                        } else {
                          setFormData({ ...formData, visible_to: visible_to.filter((v: string) => v !== 'public') });
                        }
                      }}
                    />
                    <span className="text-sm text-brand-dark">Public</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.visible_to?.includes('admin')}
                      onChange={(e) => {
                        const visible_to = formData.visible_to || [];
                        if (e.target.checked) {
                          setFormData({ ...formData, visible_to: [...visible_to, 'admin'] });
                        } else {
                          setFormData({ ...formData, visible_to: visible_to.filter((v: string) => v !== 'admin') });
                        }
                      }}
                    />
                    <span className="text-sm text-brand-dark">Admin Only</span>
                  </label>
                </div>
              </div>

              {(formData.type === 'dropdown' || formData.type === 'mega') && (
                <div className="pt-6 border-t border-brand-dark/10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-brand-dark">Menu Structure</h3>
                    {formData.type === 'mega' && (
                      <button
                        type="button"
                        onClick={() => {
                          const columns = formData.columns || [];
                          setFormData({
                            ...formData,
                            columns: [...columns, { title: 'New Column', links: [] }]
                          });
                        }}
                        className="text-brand-primary text-sm font-semibold hover:underline"
                      >
                        + Add Column
                      </button>
                    )}
                  </div>

                  {formData.type === 'mega' ? (
                    <div className="space-y-6">
                      {(formData.columns || []).map((col: any, colIndex: number) => (
                        <div key={colIndex} className="p-6 border border-brand-dark/10 rounded-2xl bg-gray-50/30 relative">
                          <button
                            type="button"
                            onClick={() => {
                              const newCols = [...formData.columns];
                              newCols.splice(colIndex, 1);
                              setFormData({ ...formData, columns: newCols });
                            }}
                            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                          >
                            Remove Column
                          </button>
                          <div className="mb-4">
                            <label className="block text-xs font-bold text-brand-gray uppercase mb-1">Column Title</label>
                            <input
                              type="text"
                              value={col.title || ''}
                              onChange={(e) => {
                                const newCols = [...formData.columns];
                                newCols[colIndex] = { ...newCols[colIndex], title: e.target.value };
                                setFormData({ ...formData, columns: newCols });
                              }}
                              className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg bg-brand-white text-brand-dark"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-bold text-brand-gray uppercase mb-1">Links (One per line)</label>
                            <textarea
                              value={(col.links || []).map((l: any) => typeof l === 'string' ? l : `${l.label} | ${l.href}`).join('\n')}
                              onChange={(e) => {
                                const newCols = [...formData.columns];
                                newCols[colIndex] = { ...newCols[colIndex], links: e.target.value.split('\n').filter(l => l.trim()).map((l) => {
                                    if(l.includes('|')){
                                        const parts = l.split('|');
                                        return { label: parts[0].trim(), href: parts[1].trim() };
                                    }
                                    return l;
                                }) };
                                setFormData({ ...formData, columns: newCols });
                              }}
                              rows={5}
                              className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg bg-brand-white text-brand-dark font-mono text-sm"
                              placeholder="Service Name 1&#10;Service Name 2 | /service-2"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-brand-gray uppercase mb-1">Dropdown Links (One per line)</label>
                      <textarea
                        value={(formData.links || []).map((l: any) => typeof l === 'string' ? l : `${l.label} | ${l.href}`).join('\n')}
                        onChange={(e) => {
                          setFormData({ ...formData, links: e.target.value.split('\n').filter(l => l.trim()).map((l) => {
                              if(l.includes('|')){
                                  const parts = l.split('|');
                                  return { label: parts[0].trim(), href: parts[1].trim() };
                              }
                              return l;
                          }) });
                        }}
                        rows={8}
                        className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg bg-brand-white text-brand-dark font-mono text-sm"
                        placeholder="Link Name 1&#10;Link Name 2 | /link-name-2"
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              {collectionName !== 'authors' && (
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">Title / Name</label>
                  <input
                    type="text"
                    name={collectionName === 'services' || collectionName === 'solutions' ? 'name' : 'title'}
                    value={formData.name || formData.title || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                    required
                  />
                </div>
              )}

              {collectionName !== 'leads' && collectionName !== 'pages' && collectionName !== 'authors' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Hero Image</label>
                    <div className="flex items-center gap-4">
                      {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="h-20 w-20 object-cover rounded-lg border border-brand-dark/10" />}
                      <div className="flex flex-wrap gap-2">
                        <label className="inline-flex items-center px-4 py-2 bg-brand-dark/5 text-brand-dark rounded-xl cursor-pointer hover:bg-brand-dark/10 transition-all gap-2">
                          {uploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                          {uploading ? 'Uploading...' : 'Upload Image'}
                          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'imageUrl')} className="hidden" />
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMediaField('imageUrl');
                            setMediaModalOpen(true);
                          }}
                          className="inline-flex items-center px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-xl hover:bg-brand-primary/20 transition-all gap-2"
                        >
                          <ImageIcon size={20} />
                          Media Library
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      name="imageUrl"
                      value={formData.imageUrl || ''}
                      onChange={handleChange}
                      className="w-full mt-2 px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                      placeholder="Or enter Hero Image URL"
                    />
                  </div>

                  {collectionName === 'services' && (
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1">Value Proposition Image</label>
                      <div className="flex items-center gap-4">
                        {formData.valuePropImageUrl && <img src={formData.valuePropImageUrl} alt="Preview" className="h-20 w-20 object-cover rounded-lg border border-brand-dark/10" />}
                        <div className="flex flex-wrap gap-2">
                          <label className="inline-flex items-center px-4 py-2 bg-brand-dark/5 text-brand-dark rounded-xl cursor-pointer hover:bg-brand-dark/10 transition-all gap-2">
                            {uploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                            {uploading ? 'Uploading...' : 'Upload Image'}
                            <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'valuePropImageUrl')} className="hidden" />
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMediaField('valuePropImageUrl');
                              setMediaModalOpen(true);
                            }}
                            className="inline-flex items-center px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-xl hover:bg-brand-primary/20 transition-all gap-2"
                          >
                            <ImageIcon size={20} />
                            Media Library
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        name="valuePropImageUrl"
                        value={formData.valuePropImageUrl || ''}
                        onChange={handleChange}
                        className="w-full mt-2 px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                        placeholder="Or enter Value Prop Image URL"
                      />
                    </div>
                  )}
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">Slug / Identifier</label>
                <input
                  type="text"
                  name={collectionName === 'leads' ? 'email' : 'slug'}
                  value={collectionName === 'leads' ? (formData.email || '') : (formData.slug || '')}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                  required
                />
              </div>

              {collectionName === 'case_studies' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Client Name</label>
                    <input
                      type="text"
                      name="client"
                      value={formData.client || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Industry</label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all bg-brand-white text-brand-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Service Category</label>
                    <input
                      type="text"
                      name="serviceCategory"
                      value={formData.serviceCategory || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all bg-brand-white text-brand-dark"
                      placeholder="e.g. SEO Strategy"
                    />
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured || false}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 text-brand-primary border-brand-dark/10 rounded focus:ring-brand-primary"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-brand-dark">
                      Featured Case Study
                    </label>
                  </div>
                  <div className="pt-4 border-t border-brand-dark/10">
                    <h3 className="text-md font-bold text-brand-dark mb-4">Key Metrics</h3>
                    <div className="space-y-4">
                      {(formData.metrics || []).map((metric: any, mIdx: number) => (
                        <div key={mIdx} className="grid grid-cols-12 gap-4 items-end bg-gray-50/50 p-4 rounded-xl border border-brand-dark/5">
                          <div className="col-span-4">
                            <label className="block text-xs font-bold text-brand-gray uppercase mb-1">Value</label>
                            <input
                              type="text"
                              value={metric.value || ''}
                              onChange={(e) => {
                                const newMetrics = [...(formData.metrics || [])];
                                newMetrics[mIdx] = { ...newMetrics[mIdx], value: e.target.value };
                                setFormData({ ...formData, metrics: newMetrics });
                              }}
                              className="w-full px-3 py-1.5 border border-brand-dark/10 rounded-lg bg-white text-brand-dark"
                              placeholder="e.g. 150%"
                            />
                          </div>
                          <div className="col-span-6">
                            <label className="block text-xs font-bold text-brand-gray uppercase mb-1">Label</label>
                            <input
                              type="text"
                              value={metric.label || ''}
                              onChange={(e) => {
                                const newMetrics = [...(formData.metrics || [])];
                                newMetrics[mIdx] = { ...newMetrics[mIdx], label: e.target.value };
                                setFormData({ ...formData, metrics: newMetrics });
                              }}
                              className="w-full px-3 py-1.5 border border-brand-dark/10 rounded-lg bg-white text-brand-dark"
                              placeholder="e.g. Traffic Increase"
                            />
                          </div>
                          <div className="col-span-2">
                            <button
                              type="button"
                              onClick={() => {
                                const newMetrics = [...formData.metrics];
                                newMetrics.splice(mIdx, 1);
                                setFormData({ ...formData, metrics: newMetrics });
                              }}
                              className="p-2 text-red-500 hover:text-red-700 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            metrics: [...(formData.metrics || []), { value: '', label: '' }]
                          });
                        }}
                        className="text-brand-primary text-sm font-semibold hover:underline"
                      >
                        + Add Metric
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-brand-dark/10">
                    <h3 className="text-md font-bold text-brand-dark">Case Study Content</h3>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1">Background</label>
                      <textarea
                        name="background"
                        value={formData.background || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg outline-none min-h-[100px] bg-brand-white text-brand-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1">Objective</label>
                      <textarea
                        name="objective"
                        value={formData.objective || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg outline-none min-h-[100px] bg-brand-white text-brand-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1">Approach</label>
                      <textarea
                        name="approach"
                        value={formData.approach || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg outline-none min-h-[150px] bg-brand-white text-brand-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1">Outcome</label>
                      <textarea
                        name="outcome"
                        value={formData.outcome || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg outline-none min-h-[150px] bg-brand-white text-brand-dark"
                      />
                    </div>
                  </div>
                </>
              )}

              {collectionName === 'authors' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg bg-brand-white text-brand-dark"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg bg-brand-white text-brand-dark"
                      placeholder="e.g. Head of SEO"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">LinkedIn Profile</label>
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg bg-brand-white text-brand-dark"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Avatar / Photo</label>
                    <div className="flex items-center gap-4">
                      {formData.avatar && <img src={formData.avatar} alt="Preview" className="h-16 w-16 object-cover rounded-xl border border-brand-dark/10" />}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMediaField('avatar');
                          setMediaModalOpen(true);
                        }}
                        className="text-brand-primary text-sm font-semibold hover:underline"
                      >
                        Select from Media
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Credentials (One per line)</label>
                    <textarea
                      value={(formData.credentials || []).join('\n')}
                      onChange={(e) => {
                        setFormData({ ...formData, credentials: e.target.value.split('\n').filter(c => c.trim()) });
                      }}
                      className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg bg-brand-white text-brand-dark font-mono text-xs"
                      rows={3}
                      placeholder="MBA&#10;Google Ads Certified"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">Biography</label>
                    <RichTextEditor 
                      content={formData.bio || ''} 
                      onChange={(content) => setFormData({ ...formData, bio: content })}
                      mode="minimal"
                    />
                  </div>
                </>
              )}

              {collectionName === 'pseo_pages' && (
                <div className="space-y-8">
                   <div className="pt-4 border-b border-brand-dark/10 pb-6">
                     <h3 className="text-lg font-bold text-brand-dark">Hero Section (AI Generated)</h3>
                     <div className="grid grid-cols-1 gap-4 mt-4">
                       <div>
                         <label className="block text-xs font-bold text-brand-gray uppercase mb-1">H1 Heading</label>
                         <input
                           type="text"
                           value={formData.content?.hero?.h1 || ''}
                           onChange={(e) => setFormData({...formData, content: {...formData.content, hero: {...formData.content?.hero, h1: e.target.value}}})}
                           className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none bg-brand-white text-brand-dark"
                         />
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-brand-gray uppercase mb-1">Intro Text</label>
                         <textarea
                           value={formData.content?.hero?.intro_text || ''}
                           onChange={(e) => setFormData({...formData, content: {...formData.content, hero: {...formData.content?.hero, intro_text: e.target.value}}})}
                           className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none h-24 bg-brand-white text-brand-dark"
                         />
                       </div>
                     </div>
                   </div>

                   <div className="pt-4 border-b border-brand-dark/10 pb-6">
                     <h3 className="text-lg font-bold text-brand-dark mb-4">Value Grid</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {(formData.content?.value_grid || []).map((item: any, idx: number) => (
                         <div key={idx} className="p-4 bg-gray-50 border border-brand-dark/5 rounded-xl">
                           <input
                             type="text"
                             placeholder="Title"
                             value={item.title || ''}
                             onChange={(e) => {
                               const newGrid = [...formData.content.value_grid];
                               newGrid[idx] = { ...newGrid[idx], title: e.target.value };
                               setFormData({...formData, content: {...formData.content, value_grid: newGrid}});
                             }}
                             className="w-full px-2 py-1 mb-2 border border-brand-dark/10 rounded font-bold text-sm bg-white text-brand-dark"
                           />
                           <textarea
                             placeholder="Description"
                             value={item.description || ''}
                             onChange={(e) => {
                               const newGrid = [...formData.content.value_grid];
                               newGrid[idx] = { ...newGrid[idx], description: e.target.value };
                               setFormData({...formData, content: {...formData.content, value_grid: newGrid}});
                             }}
                             className="w-full px-2 py-1 text-xs border border-brand-dark/10 rounded h-20 bg-white text-brand-dark"
                           />
                         </div>
                       ))}
                     </div>
                   </div>

                   <div className="pt-4 border-b border-brand-dark/10 pb-6">
                     <h3 className="text-lg font-bold text-brand-dark mb-4">Comparison Table</h3>
                     <div className="grid grid-cols-2 gap-8">
                       <div className="p-4 bg-red-50/50 rounded-xl border border-red-100">
                          <input
                            type="text"
                            value={formData.content?.comparison_module?.left_side_title || ''}
                            onChange={(e) => setFormData({...formData, content: {...formData.content, comparison_module: {...formData.content.comparison_module, left_side_title: e.target.value}}})}
                            className="w-full bg-transparent font-bold text-red-700 mb-2 border-b border-red-200 outline-none"
                          />
                          <textarea
                            value={(formData.content?.comparison_module?.left_side_points || []).join('\n')}
                            onChange={(e) => {
                              const points = e.target.value.split('\n');
                              setFormData({...formData, content: {...formData.content, comparison_module: {...formData.content.comparison_module, left_side_points: points}}})
                            }}
                            className="w-full bg-transparent text-sm min-h-[150px] outline-none text-red-900"
                          />
                       </div>
                       <div className="p-4 bg-green-50/50 rounded-xl border border-green-100">
                          <input
                            type="text"
                            value={formData.content?.comparison_module?.right_side_title || ''}
                            onChange={(e) => setFormData({...formData, content: {...formData.content, comparison_module: {...formData.content.comparison_module, right_side_title: e.target.value}}})}
                            className="w-full bg-transparent font-bold text-green-700 mb-2 border-b border-green-200 outline-none"
                          />
                          <textarea
                            value={(formData.content?.comparison_module?.right_side_points || []).join('\n')}
                            onChange={(e) => {
                              const points = e.target.value.split('\n');
                              setFormData({...formData, content: {...formData.content, comparison_module: {...formData.content.comparison_module, right_side_points: points}}})
                            }}
                            className="w-full bg-transparent text-sm min-h-[150px] outline-none text-green-900"
                          />
                       </div>
                     </div>
                   </div>

                   <div className="pt-4 pb-4">
                     <h3 className="text-lg font-bold text-brand-dark mb-4">FAQs</h3>
                     <div className="space-y-4">
                       {(formData.content?.faq || []).map((item: any, idx: number) => (
                         <div key={idx} className="p-4 border border-brand-dark/10 rounded-xl bg-white">
                           <input
                             type="text"
                             value={item.question || ''}
                             onChange={(e) => {
                               const newFaqs = [...formData.content.faq];
                               newFaqs[idx] = { ...newFaqs[idx], question: e.target.value };
                               setFormData({...formData, content: {...formData.content, faq: newFaqs}});
                             }}
                             className="w-full font-bold mb-2 p-2 border border-brand-dark/10 rounded bg-white text-brand-dark"
                           />
                           <textarea
                             value={item.answer || ''}
                             onChange={(e) => {
                               const newFaqs = [...formData.content.faq];
                               newFaqs[idx] = { ...newFaqs[idx], answer: e.target.value };
                               setFormData({...formData, content: {...formData.content, faq: newFaqs}});
                             }}
                             className="w-full text-sm p-2 border border-brand-dark/10 rounded h-20 bg-white text-brand-dark"
                           />
                         </div>
                       ))}
                     </div>
                   </div>
                </div>
              )}
            </>
          )}

          {collectionName === 'pages' && (
            <div className="pt-6 border-t border-brand-dark/10">
              <h3 className="text-lg font-bold text-brand-dark mb-4">Page Sections</h3>
              <div className="space-y-6">
                {(formData.sections || []).map((section: any, index: number) => (
                  <div key={index} className="p-6 border border-brand-dark/10 rounded-2xl space-y-4 bg-gray-50/50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-brand-dark">Section {index + 1}</span>
                        <select
                          value={section.type}
                          onChange={(e) => {
                            const newSections = [...formData.sections];
                            newSections[index] = { ...newSections[index], type: e.target.value };
                            setFormData({ ...formData, sections: newSections });
                          }}
                          className="text-xs px-2 py-1 rounded border border-gray-200 outline-none"
                        >
                          <option value="hero">Hero</option>
                          <option value="advantage">Advantage</option>
                          <option value="content">Content Block</option>
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newSections = [...formData.sections];
                          newSections.splice(index, 1);
                          setFormData({ ...formData, sections: newSections });
                        }}
                        className="text-red-500 text-xs hover:underline"
                      >
                        Remove Section
                      </button>
                    </div>

                    {section.type === 'hero' && (
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Hero Title"
                          value={section.title || ''}
                          onChange={(e) => {
                            const newSections = [...formData.sections];
                            newSections[index] = { ...newSections[index], title: e.target.value };
                            setFormData({ ...formData, sections: newSections });
                          }}
                          className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg outline-none"
                        />
                        <textarea
                          placeholder="Hero Subtitle"
                          value={section.subtitle || ''}
                          onChange={(e) => {
                            const newSections = [...formData.sections];
                            newSections[index] = { ...newSections[index], subtitle: e.target.value };
                            setFormData({ ...formData, sections: newSections });
                          }}
                          className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg outline-none"
                          rows={2}
                        />
                      </div>
                    )}

                    {section.type === 'advantage' && (
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Badge"
                          value={section.badge || ''}
                          onChange={(e) => {
                            const newSections = [...formData.sections];
                            newSections[index] = { ...newSections[index], badge: e.target.value };
                            setFormData({ ...formData, sections: newSections });
                          }}
                          className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Title"
                          value={section.title || ''}
                          onChange={(e) => {
                            const newSections = [...formData.sections];
                            newSections[index] = { ...newSections[index], title: e.target.value };
                            setFormData({ ...formData, sections: newSections });
                          }}
                          className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg outline-none"
                        />
                        <RichTextEditor 
                          content={section.description || ''} 
                          onChange={(content) => {
                            const newSections = [...formData.sections];
                            newSections[index] = { ...newSections[index], description: content };
                            setFormData({ ...formData, sections: newSections });
                          }}
                        />
                        <div className="flex items-center gap-4">
                          {section.image_url && <img src={section.image_url} alt="Preview" className="h-16 w-16 object-cover rounded-lg" />}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMediaField(`sections.${index}.image_url`);
                              setMediaModalOpen(true);
                            }}
                            className="text-xs text-brand-primary font-semibold"
                          >
                            Select Image
                          </button>
                        </div>
                      </div>
                    )}

                    {section.type === 'content' && (
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Section Title"
                          value={section.title || ''}
                          onChange={(e) => {
                            const newSections = [...formData.sections];
                            newSections[index] = { ...newSections[index], title: e.target.value };
                            setFormData({ ...formData, sections: newSections });
                          }}
                          className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg outline-none"
                        />
                        <RichTextEditor 
                          content={section.content || ''} 
                          onChange={(content) => {
                            const newSections = [...formData.sections];
                            newSections[index] = { ...newSections[index], content: content };
                            setFormData({ ...formData, sections: newSections });
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      sections: [...(formData.sections || []), { type: 'content', title: '', content: '' }]
                    });
                  }}
                  className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-brand-gray hover:border-brand-primary hover:text-brand-primary transition-all font-medium"
                >
                  + Add New Section
                </button>
              </div>
            </div>
          )}

          {collectionName === 'services' && (
            <>
              <div className="pt-6 border-t border-brand-dark/10">
                <h3 className="text-lg font-bold text-brand-dark mb-4">Hero Section</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Hero Title</label>
                    <input
                      type="text"
                      name="hero_title"
                      value={formData.hero_title || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Hero Subtitle</label>
                    <textarea
                      name="hero_subtitle"
                      rows={2}
                      value={formData.hero_subtitle || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-dark/10">
                <h3 className="text-lg font-bold text-brand-dark mb-4">Value Proposition Section</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Value Prop Title</label>
                    <input
                      type="text"
                      name="value_prop_title"
                      value={formData.value_prop_title || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Value Prop Description</label>
                    <RichTextEditor 
                      content={formData.value_prop_description || ''} 
                      onChange={(content) => setFormData({ ...formData, value_prop_description: content })}
                      mode="minimal"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-dark/10">
                <h3 className="text-lg font-bold text-brand-dark mb-4">Service Grid (Features/Expertise)</h3>
                <div className="space-y-4">
                  {(formData.service_grid || []).map((item: any, index: number) => (
                    <div key={index} className="p-4 border border-brand-dark/10 rounded-xl space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-brand-dark">Item {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newList = [...formData.service_grid];
                            newList.splice(index, 1);
                            setFormData({ ...formData, service_grid: newList });
                          }}
                          className="text-red-500 text-xs hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Title"
                          value={item.title || ''}
                          onChange={(e) => {
                            const newList = [...(formData.service_grid || [])];
                            newList[index] = { ...newList[index], title: e.target.value };
                            setFormData({ ...formData, service_grid: newList });
                          }}
                          className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                        />
                        <input
                          type="text"
                          placeholder="Icon Name (Lucide)"
                          value={item.icon || ''}
                          onChange={(e) => {
                            const newList = [...(formData.service_grid || [])];
                            newList[index] = { ...newList[index], icon: e.target.value };
                            setFormData({ ...formData, service_grid: newList });
                          }}
                          className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-brand-gray">Item Description</label>
                        <RichTextEditor 
                          content={item.desc || ''} 
                          onChange={(content) => {
                            const newList = [...(formData.service_grid || [])];
                            newList[index] = { ...newList[index], desc: content };
                            setFormData({ ...formData, service_grid: newList });
                          }}
                          mode="minimal"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        service_grid: [...(formData.service_grid || []), { title: '', desc: '', icon: '' }]
                      });
                    }}
                    className="text-brand-primary text-sm font-semibold hover:underline"
                  >
                    + Add Grid Item
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-dark/10">
                <h3 className="text-lg font-bold text-brand-dark mb-4">Process Steps</h3>
                <div className="space-y-4">
                  {(formData.process_steps || []).map((item: any, index: number) => (
                    <div key={index} className="p-4 border border-brand-dark/10 rounded-xl space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-brand-dark">Step {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newList = [...formData.process_steps];
                            newList.splice(index, 1);
                            setFormData({ ...formData, process_steps: newList });
                          }}
                          className="text-red-500 text-xs hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Step Title"
                          value={item.title || ''}
                          onChange={(e) => {
                            const newList = [...(formData.process_steps || [])];
                            newList[index] = { ...newList[index], title: e.target.value };
                            setFormData({ ...formData, process_steps: newList });
                          }}
                          className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                        />
                        <input
                          type="text"
                          placeholder="Icon Name (Lucide)"
                          value={item.icon || ''}
                          onChange={(e) => {
                            const newList = [...(formData.process_steps || [])];
                            newList[index] = { ...newList[index], icon: e.target.value };
                            setFormData({ ...formData, process_steps: newList });
                          }}
                          className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-brand-gray">Step Description</label>
                        <RichTextEditor 
                          content={item.desc || ''} 
                          onChange={(content) => {
                            const newList = [...(formData.process_steps || [])];
                            newList[index] = { ...newList[index], desc: content };
                            setFormData({ ...formData, process_steps: newList });
                          }}
                          mode="minimal"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        process_steps: [...(formData.process_steps || []), { title: '', desc: '', icon: '' }]
                      });
                    }}
                    className="text-brand-primary text-sm font-semibold hover:underline"
                  >
                    + Add Process Step
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-dark/10">
                <h3 className="text-lg font-bold text-brand-dark mb-4">Engagement Models</h3>
                <div className="space-y-4">
                  {(formData.engagement_models || []).map((item: any, index: number) => (
                    <div key={index} className="p-4 border border-brand-dark/10 rounded-xl space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-brand-dark">Model {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newList = [...formData.engagement_models];
                            newList.splice(index, 1);
                            setFormData({ ...formData, engagement_models: newList });
                          }}
                          className="text-red-500 text-xs hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Model Title"
                        value={item.title || ''}
                        onChange={(e) => {
                          const newList = [...(formData.engagement_models || [])];
                          newList[index] = { ...newList[index], title: e.target.value };
                          setFormData({ ...formData, engagement_models: newList });
                        }}
                        className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                      />
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-brand-gray">Model Description</label>
                        <RichTextEditor 
                          content={item.desc || ''} 
                          onChange={(content) => {
                            const newList = [...(formData.engagement_models || [])];
                            newList[index] = { ...newList[index], desc: content };
                            setFormData({ ...formData, engagement_models: newList });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        engagement_models: [...(formData.engagement_models || []), { title: '', desc: '' }]
                      });
                    }}
                    className="text-brand-primary text-sm font-semibold hover:underline"
                  >
                    + Add Engagement Model
                  </button>
                </div>
              </div>
            </>
          )}

          {collectionName !== 'navigation' && collectionName !== 'leads' && collectionName !== 'pages' && collectionName !== 'authors' && (
            <>
              {(collectionName === 'blog' || collectionName === 'insights') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Author</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Content Type</label>
                    <select
                      name="type"
                      value={formData.type || 'blog'}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                    >
                      <option value="blog">Blog Post</option>
                      <option value="playbook">Playbook & Guide</option>
                      <option value="report">Report</option>
                      <option value="video">Video Hub</option>
                      <option value="news">News</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">Description / Short Content</label>
                <RichTextEditor 
                  content={formData.description || ''} 
                  onChange={(content) => setFormData({ ...formData, description: content })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">
                  {collectionName === 'case_studies' ? 'Case Study Results' : 'Long Form Content (Rich Text)'}
                </label>
                <RichTextEditor 
                  key={`${collectionName}-${id}`}
                  content={getEditorContent()} 
                  onChange={handleEditorChange} 
                />
              </div>

              {(collectionName === 'case_studies' || collectionName === 'solutions') && (
                <div className="pt-6 border-t border-brand-dark/10">
                  <h3 className="text-lg font-bold text-brand-dark mb-4">
                    {collectionName === 'case_studies' ? 'Case Study Details' : 'Solution Overview'}
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1">Problem Statement</label>
                      <textarea
                        name="problem"
                        value={formData.problem || ''}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg outline-none transition-all focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-brand-white text-brand-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1">Our Approach</label>
                      <textarea
                        name="approach"
                        value={formData.approach || ''}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg outline-none transition-all focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-brand-white text-brand-dark"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-brand-dark/10">
                <h3 className="text-lg font-bold text-brand-dark mb-4">SEO & Metadata</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Primary Keyword</label>
                    <input
                      type="text"
                      name="primary_keyword"
                      value={formData.primary_keyword || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Meta Title</label>
                    <input
                      type="text"
                      name="meta_title"
                      value={formData.meta_title || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-brand-dark mb-1">Meta Description</label>
                    <textarea
                      name="meta_description"
                      rows={2}
                      value={formData.meta_description || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-dark/10">
                <h3 className="text-lg font-bold text-brand-dark mb-4">CRO & CTAs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Primary CTA Text</label>
                    <input
                      type="text"
                      name="primary_cta_text"
                      placeholder="Book Consultation"
                      value={formData.primary_cta_text || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Secondary CTA Text</label>
                    <input
                      type="text"
                      name="secondary_cta_text"
                      placeholder="Get Free Audit"
                      value={formData.secondary_cta_text || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-dark/10">
                <h3 className="text-lg font-bold text-brand-dark mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {(formData.faqs || []).map((item: any, index: number) => (
                    <div key={index} className="p-4 border border-brand-dark/10 rounded-xl space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-brand-dark">FAQ {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newList = [...formData.faqs];
                            newList.splice(index, 1);
                            setFormData({ ...formData, faqs: newList });
                          }}
                          className="text-red-500 text-xs hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Question"
                        value={item.question || ''}
                        onChange={(e) => {
                          const newList = [...(formData.faqs || [])];
                          newList[index] = { ...newList[index], question: e.target.value };
                          setFormData({ ...formData, faqs: newList });
                        }}
                        className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
                      />
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-brand-gray">Answer</label>
                        <RichTextEditor 
                          content={item.answer || ''} 
                          onChange={(content) => {
                            const newList = [...(formData.faqs || [])];
                            newList[index] = { ...newList[index], answer: content };
                            setFormData({ ...formData, faqs: newList });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        faqs: [...(formData.faqs || []), { question: '', answer: '' }]
                      });
                    }}
                    className="text-brand-primary text-sm font-semibold hover:underline"
                  >
                    + Add FAQ
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end pt-4 gap-4 items-center border-t border-brand-dark/10">
          {collectionName !== 'navigation' && collectionName !== 'leads' && (
            <label className="flex items-center gap-2 cursor-pointer mr-auto border px-4 py-2 rounded-xl bg-brand-dark/5">
              <span className="text-sm font-semibold text-brand-dark">Status:</span>
              <select
                name="status"
                value={formData.status || 'draft'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="bg-transparent text-brand-dark focus:outline-none text-sm font-bold"
              >
                <option value="draft">Draft (Hidden)</option>
                <option value="published">Published (Live)</option>
              </select>
            </label>
          )}

          <button
            type="button"
            onClick={() => {
              const previewWindow = window.open('', '_blank');
              if (previewWindow) {
                previewWindow.document.write(`
                  <html>
                    <head><title>Preview</title></head>
                    <body>
                      <h1>${formData.title || formData.name || 'Preview'}</h1>
                      <div>${formData.long_content || formData.content || formData.results || ''}</div>
                    </body>
                  </html>
                `);
              }
            }}
            className="inline-flex items-center px-6 py-3 bg-brand-dark text-brand-white font-semibold rounded-xl hover:bg-brand-dark/90 transition-all gap-2"
          >
            Preview
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center px-6 py-3 bg-brand-primary text-brand-white font-semibold rounded-xl hover:bg-brand-primary/90 transition-all disabled:opacity-50 gap-2"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Save Changes
          </button>
        </div>
      </form>

      <MediaModal 
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => {
          if (activeMediaField) {
            if (activeMediaField.includes('.')) {
              const parts = activeMediaField.split('.');
              const newFormData = { ...formData };
              let current = newFormData;
              for (let i = 0; i < parts.length - 1; i++) {
                const part = parts[i];
                if (!isNaN(Number(parts[i+1]))) {
                  current[part] = [...(current[part] || [])];
                  current = current[part];
                } else if (!isNaN(Number(part))) {
                  current[Number(part)] = { ...current[Number(part)] };
                  current = current[Number(part)];
                } else {
                  current[part] = { ...current[part] };
                  current = current[part];
                }
              }
              const lastPart = parts[parts.length - 1];
              if (!isNaN(Number(lastPart))) {
                current[Number(lastPart)] = url;
              } else {
                current[lastPart] = url;
              }
              setFormData(newFormData);
            } else {
              setFormData((prev: any) => ({ ...prev, [activeMediaField]: url }));
            }
          }
        }}
      />
    </div>
  );
}
