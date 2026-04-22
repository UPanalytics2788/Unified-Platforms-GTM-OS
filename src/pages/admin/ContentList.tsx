import { useParams, Link } from 'react-router-dom';
import { useCMSCollection } from '../../hooks/useCMS';
import { Plus, Edit, Trash2, Search, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface ContentListProps {
  collection?: string;
}

export default function ContentList({ collection: collectionProp }: ContentListProps) {
  const { collection: collectionParam } = useParams();
  const collectionName = collectionProp || collectionParam || '';
  const { data, loading } = useCMSCollection(collectionName);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Failed to delete entry.');
    }
    setDeletingId(null);
  };

  const filteredData = data.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark capitalize">{collectionName.replace('_', ' ')}</h1>
          <p className="text-brand-gray text-sm">Manage your {collectionName} content.</p>
        </div>
        <Link
          to={`/admin/${collectionName}/new`}
          className="inline-flex items-center px-4 py-2 bg-brand-primary text-brand-white text-sm font-semibold rounded-lg hover:bg-brand-primary/90 transition-colors gap-2"
        >
          <Plus size={18} /> New Entry
        </Link>
      </div>

      <div className="bg-brand-white rounded-2xl border border-brand-dark/10 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-brand-dark/5 flex items-center gap-3">
          <Search size={18} className="text-brand-gray" />
          <input
            type="text"
            placeholder="Search content..."
            className="flex-grow bg-transparent border-none focus:ring-0 text-sm text-brand-dark"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-dark/5 text-brand-gray font-medium uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Title / Name</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-dark/5">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-brand-gray">Loading...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-brand-gray">No entries found.</td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-brand-dark/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-brand-dark">
                      {item.title || item.name || item.label || <span className="text-brand-gray italic">Untitled ({item.id.substring(0, 8)})</span>}
                    </td>
                    <td className="px-6 py-4 text-brand-gray">
                      {item.slug || item.email || item.href || item.type || <span className="text-brand-gray/40">-</span>}
                    </td>
                    <td className="px-6 py-4">
                      {item.status ? (
                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {item.status}
                        </span>
                      ) : (
                        <span className="text-brand-gray/40">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      <Link
                        to={`/admin/${collectionName}/edit/${item.id}`}
                        className="p-2 text-brand-gray hover:text-brand-primary transition-colors"
                      >
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="p-2 text-brand-gray hover:text-red-600 transition-colors disabled:opacity-50"
                      >
                        {deletingId === item.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
