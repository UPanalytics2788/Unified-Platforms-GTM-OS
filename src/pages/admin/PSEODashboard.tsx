import { useState, useEffect } from 'react';
import { Globe, MapPin, FileCode, CheckCircle2, AlertCircle, PlayCircle, Clock, Plus, Upload, Loader2, Edit3, Trash2, X, Send, FileText, ExternalLink, RefreshCw } from 'lucide-react';
import { collection, getDocs, getCountFromServer, query, where, addDoc, serverTimestamp, orderBy, limit, deleteDoc, doc, updateDoc, writeBatch, getDocsFromServer, increment, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { runPSEOContentAgent } from '../../lib/agents/pseoAgent';

const TABS = [
  { id: 'overview', label: 'Overview', icon: Globe },
  { id: 'taxonomy', label: 'Geo Taxonomy', icon: MapPin },
  { id: 'templates', label: 'Templates', icon: FileCode },
  { id: 'pages', label: 'Generated Pages', icon: FileText },
  { id: 'queue', label: 'Generation Queue', icon: Clock },
];

export default function PSEODashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Dashboard Stats State
  const [stats, setStats] = useState({
    totalPages: 0,
    queuedPages: 0,
    activeTemplates: 0,
    errors: 0
  });
  const [loading, setLoading] = useState(true);
  
  // Taxonomy State
  const [taxonomyNodes, setTaxonomyNodes] = useState<any[]>([]);
  const [loadingTaxonomy, setLoadingTaxonomy] = useState(false);
  const [showTaxonomyModal, setShowTaxonomyModal] = useState(false);
  const [newTaxonomy, setNewTaxonomy] = useState({ name: '', slug: '', type: 'city', population: '', state: '', region: '' });

  // Templates State
  const [templates, setTemplates] = useState<any[]>([]);
  const [showTemplateDrawer, setShowTemplateDrawer] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [templateError, setTemplateError] = useState<string | null>(null);
  const [templateForm, setTemplateForm] = useState({
    name: '',
    slugPattern: '{city}-digital-marketing',
    h1Pattern: 'Digital Marketing Services in {city}',
    metaDescPattern: 'Expert digital marketing services for businesses in {city}, {state}.',
    schemaType: 'LocalBusiness',
    status: 'draft',
    baseServiceId: ''
  });

  // Job Queue State
  const [jobs, setJobs] = useState<any[]>([]);
  const [pseoPages, setPseoPages] = useState<any[]>([]);
  const [loadingPages, setLoadingPages] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [jobForm, setJobForm] = useState({
    templateId: '',
    geoType: 'city',
    maxPages: 10
  });
  const [processingJobId, setProcessingJobId] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState<{ current: number; total: number } | null>(null);

  useEffect(() => {
    fetchStats();
    fetchTaxonomy();
    fetchTemplates();
    fetchJobs();
    if (activeTab === 'pages') fetchPseoPages();
  }, [activeTab]);

  const fetchPseoPages = async () => {
    setLoadingPages(true);
    try {
      const snap = await getDocs(query(collection(db, 'pseo_pages'), orderBy('createdAt', 'desc'), limit(100)));
      setPseoPages(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
    }
    setLoadingPages(false);
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [pagesSnap, queueSnap, templatesSnap, errorSnap] = await Promise.all([
        getCountFromServer(query(collection(db, 'pseo_pages'), where('status', '==', 'published'))),
        getCountFromServer(query(collection(db, 'pseo_pages'), where('status', '==', 'queued'))),
        getCountFromServer(collection(db, 'pseo_templates')),
        getCountFromServer(query(collection(db, 'pseo_pages'), where('status', '==', 'error')))
      ]);

      setStats({
        totalPages: pagesSnap.data().count,
        queuedPages: queueSnap.data().count,
        activeTemplates: templatesSnap.data().count,
        errors: errorSnap.data().count
      });
    } catch (error) {
      console.error("Error fetching PSEO stats:", error);
    }
    setLoading(false);
  };

  const fetchTaxonomy = async () => {
    setLoadingTaxonomy(true);
    try {
      // Use getDocsFromServer to be absolutely sure we aren't seeing cached data
      const snap = await getDocsFromServer(query(collection(db, 'geo_taxonomy'), orderBy('name'), limit(100)));
      setTaxonomyNodes(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
    }
    setLoadingTaxonomy(false);
  };

  const [editingTaxonomyId, setEditingTaxonomyId] = useState<string | null>(null);

  const handleDeleteTaxonomy = async (id: string) => {
    console.log('Action: handleDeleteTaxonomy triggered for id:', id);
    if (!window.confirm('Are you sure you want to delete this location?')) return;
    
    // Save previous state for rollback if needed
    const previousNodes = [...taxonomyNodes];
    
    try {
      // Optimistic Update
      setTaxonomyNodes(prev => prev.filter(t => t.id !== id));
      
      const locationDoc = doc(db, 'geo_taxonomy', id);
      console.log('Attempting Firestore delete at path:', locationDoc.path);
      
      await deleteDoc(locationDoc);
      console.log('Firestore deleteDoc successful');
      
      // Still fetch to sync everything else
      await fetchTaxonomy();
    } catch (err: any) {
      console.error("Firestore Deletion Error:", err);
      // Rollback on error
      setTaxonomyNodes(previousNodes);
      
      let errorMsg = err.message;
      if (err.code === 'permission-denied') {
        errorMsg = "Permission Denied: You do not have authority to delete taxonomy nodes. Check your user role.";
      }
      
      alert(`Deletion Failed!\n\n${errorMsg}`);
    }
  };

  const handleEditTaxonomy = (node: any) => {
    setNewTaxonomy({
      name: node.name,
      slug: node.slug,
      type: node.type || 'city',
      population: node.population?.toString() || '',
      state: node.state || '',
      region: node.region || ''
    });
    setEditingTaxonomyId(node.id);
    setShowTaxonomyModal(true);
  };

  const fetchTemplates = async () => {
    const snap = await getDocs(collection(db, 'pseo_templates'));
    setTemplates(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const fetchJobs = async () => {
    const snap = await getDocs(query(collection(db, 'pseo_jobs'), orderBy('createdAt', 'desc')));
    setJobs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleSaveTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    setTemplateError(null);
    try {
      if (editingTemplate) {
        await updateDoc(doc(db, 'pseo_templates', editingTemplate.id), templateForm);
      } else {
        await addDoc(collection(db, 'pseo_templates'), { ...templateForm, createdAt: serverTimestamp() });
      }
      setShowTemplateDrawer(false);
      setEditingTemplate(null);
      fetchTemplates();
    } catch (error: any) {
      console.error(error);
      setTemplateError(error.message || 'Failed to save template. Check your permissions.');
    }
  };

  const handleLaunchJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const template = templates.find(t => t.id === jobForm.templateId);
      if (!template) return;

      const jobRef = await addDoc(collection(db, 'pseo_jobs'), {
        templateId: jobForm.templateId,
        templateName: template.name,
        status: 'pending',
        completed: 0,
        total: jobForm.maxPages,
        createdAt: serverTimestamp()
      });

      // Fetch geo nodes
      const geoSnap = await getDocs(query(collection(db, 'geo_taxonomy'), where('type', '==', jobForm.geoType), limit(jobForm.maxPages)));
      
      const batch = writeBatch(db);
      geoSnap.docs.forEach(geoDoc => {
        const geo = geoDoc.data();
        const pageRef = doc(collection(db, 'pseo_pages'));
        batch.set(pageRef, {
          jobId: jobRef.id,
          templateId: template.id,
          geoId: geoDoc.id,
          city: geo.name,
          state: geo.state || '',
          region: geo.region || '',
          slug: template.slugPattern.replace('{city}', geo.slug),
          status: 'queued',
          createdAt: serverTimestamp()
        });
      });
      await batch.commit();
      
      setShowJobModal(false);
      fetchJobs();
    } catch (error) {
      console.error(error);
    }
  };

  const runGeneration = async (jobId: string) => {
    setProcessingJobId(jobId);
    try {
      const pagesSnap = await getDocs(query(collection(db, 'pseo_pages'), where('jobId', '==', jobId), where('status', '==', 'queued')));
      const job = jobs.find(j => j.id === jobId);
      const template = templates.find(t => t.id === job.templateId);

      setGenerationProgress({ current: 0, total: pagesSnap.docs.length });

      let count = 0;
      let lastError = null;
      for (const pDoc of pagesSnap.docs) {
        const page = pDoc.data();
        const res = await runPSEOContentAgent(template, page);
        
        if (res.success && res.data) {
          count++;
          await updateDoc(doc(db, 'pseo_pages', pDoc.id), {
            content: res.data,
            status: 'published',
            updatedAt: serverTimestamp()
          });
          // Update job progress using atomic increment
          await updateDoc(doc(db, 'pseo_jobs', jobId), { completed: increment(1) });
        } else {
          lastError = res.error || 'Unknown AI error';
          await updateDoc(doc(db, 'pseo_pages', pDoc.id), { status: 'error', error: lastError });
        }

        setGenerationProgress({ current: count, total: pagesSnap.docs.length });

        // Rate limiting: delay 2s every 5 calls
        if (count % 5 === 0 && count < pagesSnap.docs.length) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
      
      const finalStatus = lastError && count === 0 ? 'failed' : 'completed';
      await updateDoc(doc(db, 'pseo_jobs', jobId), { 
        status: finalStatus,
        lastError: lastError || null 
      });
      fetchJobs();
    } catch (error) {
      console.error(error);
    }
    setProcessingJobId(null);
    setGenerationProgress(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">Programmatic SEO Engine</h1>
          <p className="text-brand-gray">Generate and manage local landing pages at scale.</p>
        </div>
      </div>

      <div className="bg-brand-white rounded-2xl border border-brand-dark/10 shadow-sm overflow-hidden mb-8">
        <div className="flex border-b border-brand-dark/5 px-4 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors relative whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'text-brand-primary' 
                  : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Pages Generated', value: loading ? '-' : stats.totalPages, status: 'live' },
                  { label: 'Pages in Queue', value: loading ? '-' : stats.queuedPages, status: 'pending' },
                  { label: 'Active Templates', value: loading ? '-' : stats.activeTemplates, status: 'neutral' },
                  { label: 'Generation Errors', value: loading ? '-' : stats.errors, status: 'error' },
                ].map((stat, i) => (
                  <div key={i} className="p-4 border border-brand-dark/5 rounded-xl bg-gray-50/50">
                    <p className="text-xs font-bold text-brand-gray/60 uppercase tracking-widest mb-1">{stat.label}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-brand-dark">{stat.value}</p>
                      {stat.status === 'live' && <CheckCircle2 size={20} className="text-green-500" />}
                      {stat.status === 'pending' && <Clock size={20} className="text-yellow-500" />}
                      {stat.status === 'error' && <AlertCircle size={20} className="text-red-500" />}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-brand-dark/5 rounded-xl p-6 border border-brand-dark/10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-brand-dark">Quick Actions</h3>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setActiveTab('queue')} className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-brand-white rounded-lg font-medium text-sm hover:bg-brand-primary/90 transition-colors">
                    <PlayCircle size={18} /> New Generation Job
                  </button>
                  <button onClick={() => setActiveTab('taxonomy')} className="flex items-center gap-2 px-4 py-2 bg-brand-white text-brand-dark border border-brand-dark/10 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
                    <MapPin size={18} /> Manage Taxonomy
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'taxonomy' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-brand-dark">Geo Taxonomy</h3>
                  <p className="text-sm text-brand-gray">Local enrichment data (population, coordinates) for page variability.</p>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-brand-dark/10 text-brand-dark rounded-lg text-sm font-medium hover:bg-gray-50">
                    <Upload size={16} /> Bulk Import CSV
                  </button>
                  <button onClick={() => { setEditingTaxonomyId(null); setNewTaxonomy({ name: '', slug: '', type: 'city', population: '', state: '', region: '' }); setShowTaxonomyModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-brand-white rounded-lg text-sm font-medium hover:bg-brand-primary/90">
                    <Plus size={16} /> Add Location
                  </button>
                </div>
              </div>

              {loadingTaxonomy ? (
                <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-brand-primary" size={32} /></div>
              ) : taxonomyNodes.length > 0 ? (
                <div className="border border-brand-dark/10 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50/50 border-b border-brand-dark/5">
                      <tr>
                        <th className="p-4 font-bold text-brand-gray uppercase tracking-wider text-xs">Name</th>
                        <th className="p-4 font-bold text-brand-gray uppercase tracking-wider text-xs">Type</th>
                        <th className="p-4 font-bold text-brand-gray uppercase tracking-wider text-xs">Population</th>
                        <th className="p-4 font-bold text-brand-gray uppercase tracking-wider text-xs text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-dark/5">
                      {taxonomyNodes.map(node => (
                        <tr key={node.id} className="hover:bg-brand-dark/5 transition-colors">
                          <td className="p-4 font-medium text-brand-dark">{node.name} <span className="text-brand-gray font-normal text-xs ml-2">/{node.slug}</span></td>
                          <td className="p-4 capitalize">{node.type}</td>
                          <td className="p-4">{node.population?.toLocaleString() || '-'}</td>
                          <td className="p-4 text-right flex items-center justify-end gap-2">
                             <button 
                               onClick={() => handleEditTaxonomy(node)} 
                               className="flex items-center gap-1 px-2 py-1 bg-white border border-brand-dark/10 rounded hover:bg-brand-primary hover:text-white transition-colors text-xs font-medium"
                             >
                               <Edit3 size={12} /> Edit
                             </button>
                             <button 
                               onClick={() => handleDeleteTaxonomy(node.id)} 
                               className="flex items-center gap-1 px-2 py-1 bg-white border border-red-200 text-red-600 rounded hover:bg-red-600 hover:text-white transition-colors text-xs font-medium"
                             >
                               <Trash2 size={12} /> Delete
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-brand-gray bg-gray-50/50 rounded-xl border border-brand-dark/5">
                  <MapPin size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="max-w-md mx-auto mb-4">No taxonomy data found.</p>
                  <button onClick={() => { setEditingTaxonomyId(null); setNewTaxonomy({ name: '', slug: '', type: 'city', population: '', state: '', region: '' }); setShowTaxonomyModal(true); }} className="px-4 py-2 bg-brand-dark text-brand-white rounded-lg font-medium text-sm">Add First Location</button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'templates' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-brand-dark">Page Templates</h3>
                  <p className="text-sm text-brand-gray">Patterns for H1, slugs, and AI content generation logic.</p>
                </div>
                <button 
                  onClick={() => { setEditingTemplate(null); setTemplateForm({ name: '', slugPattern: '{city}-digital-marketing', h1Pattern: 'Digital Marketing Services in {city}', metaDescPattern: 'Expert digital marketing services for businesses in {city}, {state}.', schemaType: 'LocalBusiness', status: 'draft', baseServiceId: '' }); setShowTemplateDrawer(true); }}
                  className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-brand-white rounded-lg text-sm font-medium hover:bg-brand-primary/90"
                >
                  <Plus size={16} /> New Template
                </button>
              </div>

              {templates.length > 0 ? (
                <div className="border border-brand-dark/10 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50/50 border-b border-brand-dark/5">
                      <tr>
                        <th className="p-4 font-bold text-brand-gray uppercase tracking-wider text-xs">Name</th>
                        <th className="p-4 font-bold text-brand-gray uppercase tracking-wider text-xs">Patterns</th>
                        <th className="p-4 font-bold text-brand-gray uppercase tracking-wider text-xs text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-dark/5">
                      {templates.map(t => (
                        <tr key={t.id} className="hover:bg-brand-dark/5">
                          <td className="p-4 font-bold text-brand-dark">{t.name}</td>
                          <td className="p-4">
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] text-brand-gray font-mono">Slug: {t.slugPattern}</span>
                              <span className="text-[10px] text-brand-gray font-mono">H1: {t.h1Pattern}</span>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                             <div className="flex justify-end gap-2">
                               <button onClick={() => { setEditingTemplate(t); setTemplateForm(t); setShowTemplateDrawer(true); }} className="p-2 text-brand-gray hover:text-brand-primary"><Edit3 size={16} /></button>
                               <button onClick={async () => { if(window.confirm('Delete template?')) { await deleteDoc(doc(db, 'pseo_templates', t.id)); fetchTemplates(); } }} className="p-2 text-brand-gray hover:text-red-500"><Trash2 size={16} /></button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-brand-gray bg-gray-50/50 rounded-xl border border-brand-dark/5">
                  <FileCode size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="max-w-md mx-auto mb-6">No templates created yet.</p>
                  <button onClick={() => setShowTemplateDrawer(true)} className="px-4 py-2 bg-brand-dark text-brand-white rounded-lg font-medium text-sm">Create First Template</button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'pages' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-brand-dark">Generated Pages</h3>
                  <p className="text-sm text-brand-gray">View and manage programmatic landing pages.</p>
                </div>
                <div className="flex gap-2">
                   <button onClick={fetchPseoPages} className="p-2 text-brand-gray hover:bg-gray-100 rounded-lg"><RefreshCw size={18} /></button>
                </div>
              </div>

              {loadingPages ? (
                <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-brand-primary" size={32} /></div>
              ) : pseoPages.length > 0 ? (
                <div className="border border-brand-dark/10 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50/50 border-b border-brand-dark/5">
                      <tr>
                        <th className="p-4 font-bold text-brand-gray uppercase tracking-wider text-xs">Title/Location</th>
                        <th className="p-4 font-bold text-brand-gray uppercase tracking-wider text-xs">Slug</th>
                        <th className="p-4 font-bold text-brand-gray uppercase tracking-wider text-xs">Status</th>
                        <th className="p-4 font-bold text-brand-gray uppercase tracking-wider text-xs text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-dark/5">
                      {pseoPages.map(page => (
                        <tr key={page.id} className="hover:bg-brand-dark/5">
                          <td className="p-4">
                             <div className="font-bold text-brand-dark">{page.city}, {page.state}</div>
                             <div className="text-[10px] text-brand-gray uppercase">{page.templateName || 'Page'}</div>
                          </td>
                          <td className="p-4 font-mono text-xs text-brand-gray">/local/{page.slug}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold ${
                              page.status === 'published' ? 'bg-green-100 text-green-700' : 
                              page.status === 'error' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {page.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                             <div className="flex justify-end gap-2">
                               <a href={`/local/${page.slug}`} target="_blank" rel="noreferrer" className="p-2 text-brand-gray hover:text-brand-primary"><ExternalLink size={16} /></a>
                               <button onClick={async () => { if(window.confirm('Delete page?')) { await deleteDoc(doc(db, 'pseo_pages', page.id)); fetchPseoPages(); } }} className="p-2 text-brand-gray hover:text-red-500"><Trash2 size={16} /></button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-brand-gray bg-gray-50/50 rounded-xl border border-brand-dark/5">
                  <FileText size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="max-w-md mx-auto mb-6">No generated pages found.</p>
                  <button onClick={() => setActiveTab('queue')} className="px-4 py-2 bg-brand-dark text-brand-white rounded-lg font-medium text-sm">Launch Generation Job</button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'queue' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-brand-dark">Generation Queue</h3>
                  <p className="text-sm text-brand-gray">Launch and monitor mass generation jobs.</p>
                </div>
                <button onClick={() => setShowJobModal(true)} className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-brand-white rounded-lg text-sm font-medium hover:bg-brand-primary/90">
                    <PlayCircle size={16} /> New Generation Job
                </button>
              </div>

              {jobs.length > 0 ? (
                <div className="border border-brand-dark/10 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50/50 border-b border-brand-dark/5">
                      <tr>
                        <th className="p-4 font-bold text-brand-gray uppercase tracking-wider text-xs">Template</th>
                        <th className="p-4 font-bold text-brand-gray uppercase tracking-wider text-xs">Status</th>
                        <th className="p-4 font-bold text-brand-gray uppercase tracking-wider text-xs">Progress</th>
                        <th className="p-4 font-bold text-brand-gray uppercase tracking-wider text-xs text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-dark/5">
                      {jobs.map(job => (
                        <tr key={job.id} className="hover:bg-brand-dark/5">
                          <td className="p-4 font-bold text-brand-dark">{job.templateName}</td>
                          <td className="p-4">
                            <div className="flex flex-col items-start gap-1">
                              <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold ${
                                job.status === 'completed' ? 'bg-green-100 text-green-700' : 
                                job.status === 'failed' ? 'bg-red-100 text-red-700' :
                                job.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-brand-primary/10 text-brand-primary'
                              }`}>
                                {job.status}
                              </span>
                              {job.lastError && (
                                <span className="text-[10px] text-red-600 max-w-[200px] truncate" title={job.lastError}>
                                  {job.lastError}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="w-full bg-gray-100 rounded-full h-2 max-w-[100px] mb-1">
                              <div className="bg-brand-primary h-2 rounded-full" style={{ width: `${(job.completed / job.total) * 100}%` }} />
                            </div>
                            <span className="text-[10px] text-brand-gray">{job.completed}/{job.total} Pages</span>
                          </td>
                          <td className="p-4 text-right">
                             {job.status !== 'completed' && (
                               <div className="flex flex-col items-end gap-2">
                                 <button 
                                   onClick={() => runGeneration(job.id)}
                                   disabled={processingJobId === job.id}
                                   className="px-3 py-1 bg-brand-dark text-white rounded text-xs font-bold hover:bg-brand-primary disabled:opacity-50 flex items-center gap-1 ml-auto"
                                 >
                                   {processingJobId === job.id ? <Loader2 className="animate-spin" size={12} /> : <Send size={12} />}
                                   Generate Content
                                 </button>
                                 {processingJobId === job.id && generationProgress && (
                                   <div className="w-full max-w-[120px]">
                                     <div className="flex justify-between text-[10px] text-brand-gray mb-1">
                                       <span>Progress</span>
                                       <span>{Math.round((generationProgress.current / generationProgress.total) * 100)}%</span>
                                     </div>
                                     <div className="w-full bg-gray-100 rounded-full h-1">
                                       <div 
                                         className="bg-brand-primary h-1 rounded-full transition-all duration-300" 
                                         style={{ width: `${(generationProgress.current / generationProgress.total) * 100}%` }} 
                                       />
                                     </div>
                                   </div>
                                 )}
                               </div>
                             )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-brand-gray bg-gray-50/50 rounded-xl border border-brand-dark/5">
                  <Clock size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="max-w-md mx-auto mb-6">No active generation jobs.</p>
                  <button onClick={() => setShowJobModal(true)} className="px-4 py-2 bg-brand-dark text-brand-white rounded-lg font-medium text-sm">Start Job</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showTaxonomyModal && (
        <div className="fixed inset-0 bg-brand-dark/50 z-50 flex items-center justify-center p-4">
          <div className="bg-brand-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-brand-dark mb-4">{editingTaxonomyId ? 'Edit Location' : 'Add Location'}</h3>
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                if (editingTaxonomyId) {
                  await updateDoc(doc(db, 'geo_taxonomy', editingTaxonomyId), { ...newTaxonomy, population: parseInt(newTaxonomy.population as any) || 0, updatedAt: serverTimestamp() });
                } else {
                  await addDoc(collection(db, 'geo_taxonomy'), { ...newTaxonomy, population: parseInt(newTaxonomy.population as any) || 0, createdAt: serverTimestamp() });
                }
                setShowTaxonomyModal(false);
                setEditingTaxonomyId(null);
                setNewTaxonomy({ name: '', slug: '', type: 'city', population: '', state: '', region: '' });
                fetchTaxonomy();
                alert('Taxonomy saved successfully');
              } catch (err: any) {
                console.error("Failed to save taxonomy:", err);
                alert(`Failed to save: ${err.message}`);
              }
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-1">Name</label>
                <input required value={newTaxonomy.name} onChange={e => setNewTaxonomy({...newTaxonomy, name: e.target.value})} type="text" className="w-full border border-brand-dark/20 rounded-lg p-2 focus:outline-brand-primary" />
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-1">URL Slug</label>
                <input required value={newTaxonomy.slug} onChange={e => setNewTaxonomy({...newTaxonomy, slug: e.target.value})} type="text" className="w-full border border-brand-dark/20 rounded-lg p-2 focus:outline-brand-primary" />
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-1">Type</label>
                <select value={newTaxonomy.type} onChange={e => setNewTaxonomy({...newTaxonomy, type: e.target.value})} className="w-full border border-brand-dark/20 rounded-lg p-2 focus:outline-brand-primary">
                  <option value="country">Country</option>
                  <option value="state">State/Region</option>
                  <option value="city">City</option>
                  <option value="locality">Locality/Neighborhood</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-1">Population (Enrichment)</label>
                <input type="number" value={newTaxonomy.population} onChange={e => setNewTaxonomy({...newTaxonomy, population: e.target.value})} className="w-full border border-brand-dark/20 rounded-lg p-2 focus:outline-brand-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-brand-dark mb-1">State / Province</label>
                  <input type="text" placeholder="e.g. TX" value={newTaxonomy.state} onChange={e => setNewTaxonomy({...newTaxonomy, state: e.target.value})} className="w-full border border-brand-dark/20 rounded-lg p-2 focus:outline-brand-primary" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-dark mb-1">Region</label>
                  <input type="text" placeholder="e.g. South" value={newTaxonomy.region} onChange={e => setNewTaxonomy({...newTaxonomy, region: e.target.value})} className="w-full border border-brand-dark/20 rounded-lg p-2 focus:outline-brand-primary" />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => { setShowTaxonomyModal(false); setEditingTaxonomyId(null); }} className="px-4 py-2 text-brand-gray font-medium hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-primary text-white font-medium rounded-lg hover:bg-brand-primary/90">Save Location</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Template Drawer */}
      {showTemplateDrawer && (
        <div className="fixed inset-0 bg-brand-dark/50 z-50 flex justify-end">
          <div className="bg-brand-white w-full max-w-xl p-8 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-brand-dark">{editingTemplate ? 'Edit template' : 'New template'}</h2>
              <button onClick={() => setShowTemplateDrawer(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveTemplate} className="space-y-6">
               <div>
                  <label className="block text-sm font-bold text-brand-dark mb-1">Template Name</label>
                  <input required value={templateForm.name} onChange={e => setTemplateForm({...templateForm, name: e.target.value})} type="text" className="w-full border border-brand-dark/20 rounded-xl p-3 focus:outline-brand-primary" placeholder="e.g. SEO Services - City Pages" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-brand-dark mb-1">Slug Pattern</label>
                    <input required value={templateForm.slugPattern} onChange={e => setTemplateForm({...templateForm, slugPattern: e.target.value})} type="text" className="w-full border border-brand-dark/20 rounded-xl p-3 focus:outline-brand-primary font-mono text-xs" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-dark mb-1">H1 Pattern</label>
                    <input required value={templateForm.h1Pattern} onChange={e => setTemplateForm({...templateForm, h1Pattern: e.target.value})} type="text" className="w-full border border-brand-dark/20 rounded-xl p-3 focus:outline-brand-primary font-mono text-xs" />
                  </div>
               </div>
               <div>
                  <label className="block text-sm font-bold text-brand-dark mb-1">Meta Description Pattern</label>
                  <textarea required value={templateForm.metaDescPattern} onChange={e => setTemplateForm({...templateForm, metaDescPattern: e.target.value})} className="w-full border border-brand-dark/20 rounded-xl p-3 focus:outline-brand-primary text-sm h-32" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-bold text-brand-dark mb-1">Schema.org Type</label>
                    <select value={templateForm.schemaType} onChange={e => setTemplateForm({...templateForm, schemaType: e.target.value})} className="w-full border border-brand-dark/20 rounded-xl p-3 focus:outline-brand-primary">
                      <option value="LocalBusiness">LocalBusiness</option>
                      <option value="ProfessionalService">ProfessionalService</option>
                      <option value="SoftwareApplication">SoftwareApplication</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-brand-dark mb-1">Base Service Pattern (Optional)</label>
                    <select value={templateForm.baseServiceId} onChange={e => setTemplateForm({...templateForm, baseServiceId: e.target.value})} className="w-full border border-brand-dark/20 rounded-xl p-3 focus:outline-brand-primary">
                      <option value="">Auto-Detect Layout</option>
                      <option value="ARCHITECT">ARCHITECT (SEO/Strategy)</option>
                      <option value="ACCELERATOR">ACCELERATOR (Performance)</option>
                      <option value="ENGINEER">ENGINEER (Development)</option>
                      <option value="CONNECTOR">CONNECTOR (Talent/HR)</option>
                    </select>
                 </div>
               </div>
               <button type="submit" className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl shadow-lg hover:bg-brand-primary transition-colors mt-4">
                 {editingTemplate ? 'Update Template' : 'Create Template'}
               </button>
               {templateError && (
                 <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-2">
                   <AlertCircle size={16} />
                   <p className="text-sm font-medium">{templateError}</p>
                 </div>
               )}
            </form>
          </div>
        </div>
      )}

      {/* New Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-brand-dark/50 z-50 flex items-center justify-center p-4">
          <div className="bg-brand-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-brand-dark mb-6">Launch Generation Job</h3>
            <form onSubmit={handleLaunchJob} className="space-y-4">
               <div>
                  <label className="block text-sm font-bold text-brand-dark mb-1">Select Template</label>
                  <select required value={jobForm.templateId} onChange={e => setJobForm({...jobForm, templateId: e.target.value})} className="w-full border border-brand-dark/20 rounded-xl p-3 focus:outline-brand-primary">
                    <option value="">Choose a template...</option>
                    {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-bold text-brand-dark mb-1">Target Geo Type</label>
                  <select value={jobForm.geoType} onChange={e => setJobForm({...jobForm, geoType: e.target.value})} className="w-full border border-brand-dark/20 rounded-xl p-3 focus:outline-brand-primary">
                    <option value="city">Cities</option>
                    <option value="state">States</option>
                    <option value="neighborhood">Neighborhoods</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-bold text-brand-dark mb-1">Max Pages to Generate</label>
                  <input type="number" value={jobForm.maxPages} onChange={e => setJobForm({...jobForm, maxPages: parseInt(e.target.value)})} className="w-full border border-brand-dark/20 rounded-xl p-3 focus:outline-brand-primary" />
               </div>
               
               <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setShowJobModal(false)} className="px-5 py-2 text-brand-gray font-bold hover:bg-gray-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-brand-primary text-white font-bold rounded-xl shadow-md hover:bg-brand-dark transition-colors">Launch Batch</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
