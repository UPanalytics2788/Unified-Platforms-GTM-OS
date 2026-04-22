import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCMSCollection } from '../../hooks/useCMS';
import { Plus, Edit, Trash2, Search, ExternalLink, FileText } from 'lucide-react';

export default function LandingPages() {
  const { data, loading } = useCMSCollection('landing_pages');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.slug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">Landing Pages</h1>
          <p className="text-brand-gray text-sm">Create and manage high-converting landing pages.</p>
        </div>
        <Link
          to="/admin/landing-pages/new"
          className="inline-flex items-center px-4 py-2 bg-brand-primary text-brand-white text-sm font-semibold rounded-lg hover:bg-brand-primary/90 transition-colors gap-2"
        >
          <Plus size={18} /> Create New Page
        </Link>
      </div>

      <div className="bg-brand-white rounded-2xl border border-brand-dark/10 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-brand-dark/5 flex items-center gap-3">
          <Search size={18} className="text-brand-gray" />
          <input
            type="text"
            placeholder="Search pages..."
            className="flex-grow bg-transparent border-none focus:ring-0 text-sm text-brand-dark"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-dark/5 text-brand-gray font-medium uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Updated</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-dark/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-brand-gray">Loading...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-brand-gray">No landing pages found.</td>
                </tr>
              ) : (
                filteredData.map((page) => (
                  <tr key={page.id} className="hover:bg-brand-dark/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-primary/10 text-brand-primary rounded-lg">
                          <FileText size={16} />
                        </div>
                        <span className="font-medium text-brand-dark">{page.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-brand-gray">/{page.slug}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        page.status === 'published' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {page.status || 'draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-brand-gray">
                      {page.updatedAt ? new Date(page.updatedAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <a
                          href={`/lp/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-brand-gray hover:text-brand-primary transition-colors"
                          title="View Live"
                        >
                          <ExternalLink size={18} />
                        </a>
                        <Link
                          to={`/admin/landing-pages/edit/${page.id}`}
                          className="p-2 text-brand-gray hover:text-brand-primary transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button 
                          className="p-2 text-brand-gray hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
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
