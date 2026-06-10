import React from 'react';
import { EditorProps } from './types';
import RichTextEditor from '../RichTextEditor';
import { Image as ImageIcon } from 'lucide-react';

export default function InsightEditor({ formData, setFormData, handleChange, handleEditorChange, setActiveMediaField, setMediaModalOpen }: EditorProps) {
  const handleObjectChange = (parent: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [parent]: {
        ...(prev[parent] || {}),
        [field]: value
      }
    }));
  };

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Author</label>
          <input
            type="text"
            name="author_id"
            value={formData.author_id || ''}
            onChange={handleChange}
            placeholder="e.g. team"
            className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Category / Topic</label>
          <input
            type="text"
            name="category"
            value={formData.category || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Content Type</label>
          <select
            name="type"
            value={formData.type || 'blog'}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg bg-brand-white text-brand-dark"
          >
            <option value="blog">Blog Post</option>
            <option value="report">Industry Report</option>
            <option value="guide">Guide</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">Short Description</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">Hero Image</label>
        {formData.imageUrl ? (
          <div className="relative rounded-lg overflow-hidden border border-brand-dark/10 inline-block">
            <img src={formData.imageUrl} alt="Hero" className="h-48 object-cover" />
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveMediaField('imageUrl');
                  setMediaModalOpen(true);
                }}
                className="p-1 bg-white rounded shadow text-brand-dark hover:bg-gray-100"
              >
                <ImageIcon size={16} />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setActiveMediaField('imageUrl');
              setMediaModalOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 bg-brand-dark/5 text-brand-dark rounded-xl cursor-pointer hover:bg-brand-dark/10 transition-all gap-2"
          >
            <ImageIcon size={20} />
            Select Image
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">Long Form Content (Rich Text)</label>
        <div className="border border-brand-dark/10 rounded-lg overflow-hidden">
          <RichTextEditor
            content={formData.content || ''}
            onChange={(html) => handleEditorChange(html, 'content')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Primary Keyword</label>
          <input
            type="text"
            name="primary_keyword"
            value={formData.primary_keyword || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Reading Time (mins)</label>
          <input
            type="text"
            name="readingTime"
            value={formData.readingTime || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg"
          />
        </div>
      </div>

      <div className="pt-8 border-t border-brand-dark/10">
        <h3 className="text-lg font-bold text-brand-dark mb-4">SEO Context</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-brand-dark mb-1">Meta Title</label>
            <input
              type="text"
              value={formData.seoContext?.title || ''}
              onChange={(e) => handleObjectChange('seoContext', 'title', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-brand-dark mb-1">Meta Description</label>
            <textarea
              value={formData.seoContext?.description || ''}
              onChange={(e) => handleObjectChange('seoContext', 'description', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
            />
          </div>
        </div>
      </div>
    </>
  );
}
