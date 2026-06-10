import React from 'react';
import { EditorProps } from './types';
import { Plus, Trash2 } from 'lucide-react';

export default function NavigationEditor({ formData, setFormData, handleChange }: EditorProps) {
  
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    const newData = { ...formData, type: newType };
    if (newType === 'mega_menu' && !formData.columns) {
      newData.columns = [{ title: 'New Column', links: [] }];
    }
    if (newType === 'dropdown' && !formData.links) {
      newData.links = [];
    }
    setFormData(newData);
  };

  const addColumn = () => {
    setFormData((prev: any) => ({
      ...prev,
      columns: [...(prev.columns || []), { title: 'New Column', links: [] }]
    }));
  };

  const removeColumn = (index: number) => {
    setFormData((prev: any) => {
      const newColumns = [...(prev.columns || [])];
      newColumns.splice(index, 1);
      return { ...prev, columns: newColumns };
    });
  };

  const handleColumnTitleChange = (index: number, title: string) => {
    setFormData((prev: any) => {
      const newColumns = [...(prev.columns || [])];
      newColumns[index] = { ...newColumns[index], title };
      return { ...prev, columns: newColumns };
    });
  };

  const handleColumnLinksChange = (index: number, text: string) => {
    setFormData((prev: any) => {
      const newColumns = [...(prev.columns || [])];
      const linkStrings = text.split('\n').filter(Boolean);
      const links = linkStrings.map(str => {
        const parts = str.split('|');
        return {
          label: parts[0]?.trim() || '',
          path: parts[1]?.trim() || '',
          description: parts[2]?.trim() || ''
        };
      });
      newColumns[index] = { ...newColumns[index], links };
      return { ...prev, columns: newColumns };
    });
  };

  const handleDropdownLinksChange = (text: string) => {
    const linkStrings = text.split('\n').filter(Boolean);
    const links = linkStrings.map(str => {
      const parts = str.split('|');
      return {
        label: parts[0]?.trim() || '',
        path: parts[1]?.trim() || '',
      };
    });
    setFormData((prev: any) => ({ ...prev, links }));
  };

  const formatDropdownLinks = () => {
    return (formData.links || []).map((l: any) => `${l.label} | ${l.path}`).join('\n');
  };

  const formatColumnLinks = (links: any[]) => {
    return (links || []).map(l => `${l.label} | ${l.path} | ${l.description || ''}`).join('\n');
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Menu Label</label>
          <input
            type="text"
            name="label"
            value={formData.label || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Menu Type</label>
          <select
            name="type"
            value={formData.type || 'link'}
            onChange={handleTypeChange}
            className="w-full px-4 py-2 border rounded-lg bg-brand-white text-brand-dark"
          >
            <option value="link">Single Link</option>
            <option value="dropdown">Dropdown</option>
            <option value="mega_menu">Mega Menu</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Slug / URL</label>
           <input
            type="text"
            name="path"
            value={formData.path || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Order</label>
          <input
            type="number"
            name="order"
            value={formData.order || 0}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {(formData.type === 'dropdown' || formData.type === 'mega_menu') && (
        <div className="pt-6 border-t border-brand-dark/10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-brand-dark">Menu Structure</h3>
            {formData.type === 'mega_menu' && (
              <button
                type="button"
                onClick={addColumn}
                className="flex items-center gap-2 px-4 py-2 bg-brand-dark text-brand-white text-sm font-medium rounded-lg hover:bg-brand-dark/90 transition-colors"
              >
                <Plus size={16} /> Add Column
              </button>
            )}
          </div>

          {formData.type === 'mega_menu' ? (
            <div className="space-y-6">
              {(formData.columns || []).map((col: any, colIndex: number) => (
                <div key={colIndex} className="p-6 border border-brand-dark/10 rounded-2xl bg-gray-50/30 relative">
                  <button
                    type="button"
                    onClick={() => removeColumn(colIndex)}
                    className="absolute top-4 right-4 p-2 text-brand-gray hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-12">
                    <div>
                      <label className="block text-xs font-bold text-brand-gray uppercase mb-1">Column Title</label>
                      <input
                        type="text"
                        value={col.title || ''}
                        onChange={(e) => handleColumnTitleChange(colIndex, e.target.value)}
                        className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                        placeholder="e.g. Core Services"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-gray uppercase mb-1">Links (One per line)</label>
                      <p className="text-xs text-brand-gray mb-2">Format: Label | Path | Description</p>
                      <textarea
                        value={formatColumnLinks(col.links)}
                        onChange={(e) => handleColumnLinksChange(colIndex, e.target.value)}
                        className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none transition-all font-mono text-sm"
                        rows={5}
                        placeholder="SEO Strategy | /services/seo | Organic growth framework"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {(!formData.columns || formData.columns.length === 0) && (
                <div className="text-center py-8 text-brand-gray text-sm">
                  No columns added. Click "Add Column" to build your mega menu.
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 border border-brand-dark/10 rounded-2xl bg-gray-50/30">
              <label className="block text-xs font-bold text-brand-gray uppercase mb-1">Dropdown Links (One per line)</label>
              <p className="text-xs text-brand-gray mb-2">Format: Label | Path</p>
              <textarea
                value={formatDropdownLinks()}
                onChange={(e) => handleDropdownLinksChange(e.target.value)}
                className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none transition-all font-mono text-sm"
                rows={6}
                placeholder="About Us | /about&#10;Contact | /contact"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
