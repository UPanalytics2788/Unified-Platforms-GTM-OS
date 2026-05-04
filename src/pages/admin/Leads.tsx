import { useEffect, useState, useMemo } from 'react';
import { collection, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Loader2, Search, Download, Trash2, Filter, MoreVertical, CheckSquare, Square, ChevronDown } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  industry: string;
  createdAt: any;
  source?: string;
  status?: string;
}

type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Closed';

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const leadsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
      setLeads(leadsData);
    } catch (err) {
      console.error('Error fetching leads:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchTerm, statusFilter]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'leads', id), { status: newStatus });
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await deleteDoc(doc(db, 'leads', id));
      setLeads(prev => prev.filter(l => l.id !== id));
      setSelectedLeads(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  const toggleSelectAll = () => {
    if (selectedLeads.size === filteredLeads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(filteredLeads.map(l => l.id)));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedLeads(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const exportCSV = () => {
    const leadsToExport = filteredLeads;
    if (leadsToExport.length === 0) return;

    const headers = ['Name', 'Email', 'Company', 'Industry', 'Source', 'Status', 'Created At'];
    const rows = leadsToExport.map(l => [
      l.name,
      l.email,
      l.company,
      l.industry,
      l.source || 'N/A',
      l.status || 'New',
      new Date(l.createdAt?.seconds * 1000 || l.createdAt).toLocaleString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `unified_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statuses: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Closed'];

  if (loading && leads.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-brand-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">Lead Management</h1>
          <p className="text-brand-gray">
            {leads.length} leads total • {filteredLeads.length} filtered
          </p>
        </div>
        <button
          onClick={exportCSV}
          disabled={filteredLeads.length === 0}
          className="inline-flex items-center px-4 py-2 bg-brand-primary text-brand-white rounded-lg hover:bg-brand-primary/90 transition-all font-semibold shadow-sm gap-2 disabled:opacity-50"
        >
          <Download size={18} /> Export CSV
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray" size={18} />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-brand-white border border-brand-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>
        <div className="flex p-1 bg-brand-dark/5 rounded-xl border border-brand-dark/10">
          {['All', ...statuses].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                statusFilter === status
                  ? 'bg-brand-white text-brand-dark shadow-sm'
                  : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-brand-white rounded-2xl border border-brand-dark/10 shadow-sm overflow-hidden overflow-x-auto text-sm">
        <table className="w-full text-left">
          <thead className="bg-brand-dark/5 text-brand-dark font-bold border-b border-brand-dark/10">
            <tr>
              <th className="p-4 w-10">
                <button onClick={toggleSelectAll} className="text-brand-gray hover:text-brand-primary">
                  {selectedLeads.size === filteredLeads.length && filteredLeads.length > 0 ? (
                    <CheckSquare size={18} className="text-brand-primary" />
                  ) : (
                    <Square size={18} />
                  )}
                </button>
              </th>
              <th className="p-4">Lead</th>
              <th className="p-4">Company & Industry</th>
              <th className="p-4">Source</th>
              <th className="p-4">Created At</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-dark/10">
            {filteredLeads.map(lead => (
              <tr key={lead.id} className="hover:bg-brand-dark/5 transition-colors group">
                <td className="p-4">
                  <button onClick={() => toggleSelectOne(lead.id)} className="text-brand-gray hover:text-brand-primary">
                    {selectedLeads.has(lead.id) ? (
                      <CheckSquare size={18} className="text-brand-primary" />
                    ) : (
                      <Square size={18} />
                    )}
                  </button>
                </td>
                <td className="p-4">
                  <div className="font-bold text-brand-dark">{lead.name}</div>
                  <div className="text-xs text-brand-gray">{lead.email}</div>
                </td>
                <td className="p-4">
                  <div className="text-brand-dark font-medium">{lead.company}</div>
                  <div className="text-xs text-brand-gray font-bold uppercase tracking-wider">{lead.industry}</div>
                </td>
                <td className="p-4">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-brand-dark/10 text-brand-dark text-xs font-bold">
                    {lead.source || 'Direct'}
                  </span>
                </td>
                <td className="p-4 text-brand-gray">
                  {new Date(lead.createdAt?.seconds * 1000 || lead.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="relative inline-block">
                    <select
                      value={lead.status || 'New'}
                      onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                      className={`appearance-none pl-3 pr-8 py-1 rounded-full text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer focus:outline-none ${
                        lead.status === 'Closed' ? 'bg-green-100 text-green-700 border-green-200' :
                        lead.status === 'Qualified' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                        lead.status === 'Contacted' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                        'bg-brand-dark/10 text-brand-dark border-brand-dark/20'
                      }`}
                    >
                      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" size={14} />
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDelete(lead.id)}
                    className="p-2 text-brand-gray hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredLeads.length === 0 && (
          <div className="p-12 text-center text-brand-gray">
            <Filter size={48} className="mx-auto mb-4 opacity-20" />
            <p>No leads found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
