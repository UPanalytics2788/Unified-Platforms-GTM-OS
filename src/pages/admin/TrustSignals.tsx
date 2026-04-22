import { useState, useEffect } from 'react';
import { Shield, Award, Building, CheckCircle2, Clock, Save, Loader2, ArrowRight, Plus, Pencil, Trash2, X } from 'lucide-react';
import { doc, collection, query, orderBy, getDocs, addDoc, updateDoc, deleteDoc, Timestamp, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Link } from 'react-router-dom';

interface TrustSignal {
  id: string;
  type: string;
  value: string;
  label: string;
  status: 'active' | 'inactive';
}

export default function TrustSignals() {
  const [activeTab, setActiveTab] = useState('signals');
  const [signals, setSignals] = useState<TrustSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSignal, setEditingSignal] = useState<TrustSignal | null>(null);
  const [formData, setFormData] = useState<{
    type: string;
    value: string;
    label: string;
    status: 'active' | 'inactive';
  }>({
    type: 'metric',
    value: '',
    label: '',
    status: 'active'
  });

  const [staleContent, setStaleContent] = useState<any[]>([]);
  const [loadingStale, setLoadingStale] = useState(false);

  useEffect(() => {
    if (activeTab === 'signals') {
      fetchSignals();
    } else if (activeTab === 'freshness') {
      fetchStaleContent();
    }
  }, [activeTab]);

  const fetchSignals = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'trust_signals'));
      const snap = await getDocs(q);
      setSignals(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as TrustSignal)));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const fetchStaleContent = async () => {
    setLoadingStale(true);
    try {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 180);
      
      const q = query(
        collection(db, 'insights'),
        where('updatedAt', '<', Timestamp.fromDate(sixMonthsAgo)),
        where('status', '==', 'published')
      );
      
      const snap = await getDocs(q);
      setStaleContent(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      console.error(e);
    }
    setLoadingStale(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingSignal) {
        await updateDoc(doc(db, 'trust_signals', editingSignal.id), formData);
      } else {
        await addDoc(collection(db, 'trust_signals'), formData);
      }
      setShowModal(false);
      setEditingSignal(null);
      setFormData({ type: 'metric', value: '', label: '', status: 'active' });
      fetchSignals();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this trust signal?')) return;
    try {
      await deleteDoc(doc(db, 'trust_signals', id));
      fetchSignals();
    } catch (e) {
      console.error(e);
    }
  };

  const openEdit = (signal: TrustSignal) => {
    setEditingSignal(signal);
    setFormData({
      type: signal.type,
      value: signal.value,
      label: signal.label,
      status: signal.status
    });
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
            <Shield className="text-[#fbbf24]" /> Trust Signals & Freshness
          </h1>
          <p className="text-brand-gray">Manage organizational trust factors and content audits.</p>
        </div>
        {activeTab === 'signals' && (
          <button 
            onClick={() => { setShowModal(true); setEditingSignal(null); setFormData({ type: 'metric', value: '', label: '', status: 'active' }); }}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all font-semibold shadow-sm"
          >
            <Plus size={18} /> New Signal
          </button>
        )}
      </div>

      <div className="bg-brand-white rounded-2xl border border-brand-dark/10 shadow-sm overflow-hidden mb-8">
        <div className="flex border-b border-brand-dark/5 px-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('signals')}
            className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors relative whitespace-nowrap ${
              activeTab === 'signals' ? 'text-brand-primary' : 'text-brand-gray hover:text-brand-dark'
            }`}
          >
            <Award size={18} /> Trust Signals
            {activeTab === 'signals' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-t-full" />}
          </button>
          <button
            onClick={() => setActiveTab('freshness')}
            className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors relative whitespace-nowrap ${
              activeTab === 'freshness' ? 'text-brand-primary' : 'text-brand-gray hover:text-brand-dark'
            }`}
          >
            <Clock size={18} /> Freshness Audits
            {activeTab === 'freshness' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-t-full" />}
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'signals' && (
            loading ? (
              <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-brand-primary" size={32} /></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {signals.map(signal => (
                  <div key={signal.id} className="p-6 bg-white border border-brand-dark/10 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2 rounded-lg ${signal.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        <Shield size={20} />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(signal)} className="p-2 text-brand-gray hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(signal.id)} className="p-2 text-brand-gray hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-brand-dark mb-1">{signal.value}</div>
                      <div className="text-sm font-bold text-brand-gray uppercase tracking-wider">{signal.label}</div>
                      <div className="mt-3 text-xs font-medium px-2 py-0.5 rounded-full bg-brand-dark/5 text-brand-gray inline-block uppercase italic">
                        {signal.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {activeTab === 'freshness' && (
            loadingStale ? (
              <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-brand-primary" size={32} /></div>
            ) : staleContent.length > 0 ? (
              <div className="border border-brand-dark/10 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50/50 border-b border-brand-dark/5">
                    <tr>
                      <th className="p-4 font-bold text-brand-gray uppercase tracking-wider text-xs">Content Title</th>
                      <th className="p-4 font-bold text-brand-gray uppercase tracking-wider text-xs">Last Updated</th>
                      <th className="p-4 font-bold text-brand-gray uppercase tracking-wider text-xs text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-dark/5">
                    {staleContent.map(item => (
                      <tr key={item.id} className="hover:bg-brand-dark/5 transition-colors">
                        <td className="p-4 font-medium text-brand-dark">{item.title}</td>
                        <td className="p-4 text-red-600 font-medium">Over 6 months ago</td>
                        <td className="p-4 text-right">
                          <Link to={`/admin/insights/edit/${item.id}`} className="inline-flex items-center gap-2 px-3 py-1 bg-brand-dark text-brand-white rounded-lg text-xs font-bold hover:bg-brand-primary transition-all">
                            Review <ArrowRight size={14} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center text-brand-gray bg-gray-50/50 rounded-xl border border-brand-dark/5">
                <CheckCircle2 size={48} className="mx-auto mb-4 opacity-20 text-green-500" />
                <h3 className="text-lg font-bold text-brand-dark mb-2">Content is Fresh</h3>
                <p className="max-w-md mx-auto mb-6">No published content older than 6 months requires human review right now.</p>
              </div>
            )
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-brand-dark/10 flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-brand-dark">
                {editingSignal ? 'Edit Trust Signal' : 'New Trust Signal'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-brand-dark/5 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-1">Signal Type</label>
                <select 
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-brand-white border border-brand-dark/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                >
                  <option value="metric">Metric (e.g. 500+)</option>
                  <option value="certification">Certification (e.g. ISO 9001)</option>
                  <option value="award">Award (e.g. Agency of the Year)</option>
                  <option value="partnership">Partnership (e.g. Google Partner)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-1">Value (Main Text)</label>
                <input 
                  type="text" 
                  value={formData.value}
                  onChange={e => setFormData({ ...formData, value: e.target.value })}
                  className="w-full bg-brand-white border border-brand-dark/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  placeholder="e.g. 10.5M"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-1">Label (Subtext)</label>
                <input 
                  type="text" 
                  value={formData.label}
                  onChange={e => setFormData({ ...formData, label: e.target.value })}
                  className="w-full bg-brand-white border border-brand-dark/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  placeholder="e.g. Organic Traffic Generated"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-1">Status</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      checked={formData.status === 'active'}
                      onChange={() => setFormData({ ...formData, status: 'active' })}
                      className="text-brand-primary focus:ring-brand-primary"
                    />
                    <span className="text-sm font-medium text-brand-dark group-hover:text-brand-primary">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      checked={formData.status === 'inactive'}
                      onChange={() => setFormData({ ...formData, status: 'inactive' })}
                      className="text-brand-primary focus:ring-brand-primary"
                    />
                    <span className="text-sm font-medium text-brand-dark group-hover:text-brand-primary">Inactive</span>
                  </label>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-brand-dark font-bold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  {editingSignal ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
