import { useState, useEffect } from 'react';
import { Link, Anchor, GitMerge, AlertTriangle, Loader2, Check, X, Trash2, Search, ExternalLink } from 'lucide-react';
import { collection, query, getDocs, where, deleteDoc, doc, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { runLinkDiscovery } from '../../lib/linkDiscovery';

export default function LinkGraph() {
  const [links, setLinks] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalActive: 0, pending: 0, orphans: 0 });
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [filter, setFilter] = useState<'all' | 'suggested' | 'active' | 'rejected'>('all');

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'link_graph'));
      const linksData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setLinks(linksData);

      // Calc stats
      const active = linksData.filter((l: any) => l.status === 'active').length;
      const pending = linksData.filter((l: any) => l.status === 'suggested').length;
      
      // Calculate orphans among published insights/services
      const [insights, services] = await Promise.all([
        getDocs(query(collection(db, 'insights'), where('status', '==', 'published'))),
        getDocs(query(collection(db, 'services'), where('status', '==', 'published')))
      ]);
      
      const allPageIds = [...insights.docs.map(d => d.id), ...services.docs.map(d => d.id)];
      const idsWithIncoming = new Set(linksData.filter((l: any) => l.status === 'active').map((l: any) => l.targetId));
      const orphans = allPageIds.filter(id => !idsWithIncoming.has(id)).length;

      setStats({ totalActive: active, pending, orphans });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id: string, status: 'active' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'link_graph', id), { status });
      setLinks(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this link suggestion?')) return;
    try {
      await deleteDoc(doc(db, 'link_graph', id));
      setLinks(prev => prev.filter(l => l.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const runFullScan = async () => {
    setScanning(true);
    try {
      const insights = await getDocs(query(collection(db, 'insights'), where('status', '==', 'published')));
      for (const d of insights.docs) {
        const data = d.data();
        await runLinkDiscovery(d.id, 'insights', data.title, data.content || '');
      }
      await fetchLinks();
      alert('Scanning complete!');
    } catch (e) {
      console.error(e);
    }
    setScanning(false);
  };

  const filteredLinks = links.filter(l => filter === 'all' || l.status === filter);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
            <GitMerge className="text-brand-primary" /> Internal Link Graph
          </h1>
          <p className="text-brand-gray text-sm">Managing semantic connections across GTM-OS.</p>
        </div>
        <button 
          onClick={runFullScan}
          disabled={scanning}
          className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50"
        >
          {scanning ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />}
          Scan All Published Pages
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-brand-dark/10 shadow-sm">
          <p className="text-sm font-bold text-brand-gray uppercase tracking-widest mb-1">Active Edges</p>
          <p className="text-3xl font-black text-brand-dark">{stats.totalActive}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-brand-dark/10 shadow-sm">
          <p className="text-sm font-bold text-brand-gray uppercase tracking-widest mb-1">New Suggestions</p>
          <p className="text-3xl font-black text-brand-primary">{stats.pending}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-brand-dark/10 shadow-sm">
          <p className="text-sm font-bold text-brand-gray uppercase tracking-widest mb-1">Orphan Pages</p>
          <p className="text-3xl font-black text-red-500">{stats.orphans}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-brand-dark/10 shadow-sm overflow-hidden">
        <div className="flex border-b">
          {(['all', 'suggested', 'active', 'rejected'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-4 text-sm font-bold capitalize transition-all border-b-2 ${
                filter === f ? 'border-brand-primary text-brand-primary bg-brand-primary/5' : 'border-transparent text-brand-gray hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-brand-gray text-xs font-black uppercase tracking-widest">
                <th className="px-6 py-4">Source Page</th>
                <th className="px-6 py-4">Target Page</th>
                <th className="px-6 py-4">Anchor Text</th>
                <th className="px-6 py-4 text-center">Relevance</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-brand-gray">
                    <Loader2 className="animate-spin mx-auto mb-2" size={24} /> Loading graph...
                  </td>
                </tr>
              ) : filteredLinks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-brand-gray">No links found for this filter.</td>
                </tr>
              ) : filteredLinks.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50 bg-white group text-sm">
                  <td className="px-6 py-4 font-bold text-brand-dark">{l.sourceTitle}</td>
                  <td className="px-6 py-4 text-brand-gray flex items-center gap-1">
                    {l.targetTitle}
                    <a href={`/insights/${l.targetSlug}`} target="_blank" rel="noreferrer"><ExternalLink size={12} /></a>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{l.anchorText}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-black ${
                      l.relevanceScore > 0.8 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {Math.round(l.relevanceScore * 100)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                      l.status === 'active' ? 'bg-green-100 text-green-700' : 
                      l.status === 'suggested' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                       {l.status === 'suggested' && (
                         <>
                           <button onClick={() => handleStatusChange(l.id, 'active')} className="p-1 text-green-600 hover:bg-green-50 rounded" title="Accept"><Check size={16} /></button>
                           <button onClick={() => handleStatusChange(l.id, 'rejected')} className="p-1 text-red-600 hover:bg-red-50 rounded" title="Reject"><X size={16} /></button>
                         </>
                       )}
                       <button onClick={() => handleDelete(l.id)} className="p-1 text-gray-400 hover:text-red-600 rounded" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
