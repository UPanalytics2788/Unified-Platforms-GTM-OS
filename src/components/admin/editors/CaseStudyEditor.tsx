import React from 'react';
import { EditorProps } from './types';
import RichTextEditor from '../RichTextEditor';
import { Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

export default function CaseStudyEditor({ formData, setFormData, handleChange, handleEditorChange, setActiveMediaField, setMediaModalOpen }: EditorProps) {
  
  const handleArrayChange = (field: string, index: number, key: string, value: any) => {
    setFormData((prev: any) => {
      const newArray = [...(prev[field] || [])];
      newArray[index] = { ...newArray[index], [key]: value };
      return { ...prev, [field]: newArray };
    });
  };

  const addItem = (field: string, defaultObj: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: [...(prev[field] || []), defaultObj]
    }));
  };

  const removeItem = (field: string, index: number) => {
    setFormData((prev: any) => {
      const newArray = [...(prev[field] || [])];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Slug / Identifier</label>
          <input
            type="text"
            name="slug"
            value={formData.slug || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Client Name</label>
          <input
            type="text"
            name="client"
            value={formData.client || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Industry</label>
          <input
            type="text"
            name="industry"
            value={formData.industry || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Service Category</label>
          <input
            type="text"
            name="category"
            value={formData.category || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">Short Description</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
        />
      </div>

      <div className="pt-6 border-t border-brand-dark/10">
        <label className="block text-xs font-bold text-brand-gray uppercase mb-2">Key Metrics</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(formData.metrics || []).map((item: any, i: number) => (
            <div key={i} className="flex gap-2 p-3 border rounded-xl items-center">
              <div className="flex-1 space-y-2">
                <div>
                  <label className="block text-xs font-bold text-brand-gray uppercase mb-1">Value</label>
                  <input
                    type="text" placeholder="e.g. 50%" value={item.value || ''}
                    onChange={(e) => handleArrayChange('metrics', i, 'value', e.target.value)}
                    className="w-full px-3 py-1 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-gray uppercase mb-1">Label</label>
                  <input
                    type="text" placeholder="e.g. Increase in Traffic" value={item.label || ''}
                    onChange={(e) => handleArrayChange('metrics', i, 'label', e.target.value)}
                    className="w-full px-3 py-1 border rounded-lg text-sm"
                  />
                </div>
              </div>
              <button type="button" onClick={() => removeItem('metrics', i)} className="text-red-500 p-2">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <div className="flex items-center justify-center border-2 border-dashed border-brand-dark/20 rounded-xl p-4 hover:bg-gray-50 cursor-pointer"
               onClick={() => addItem('metrics', { label: '', value: '' })}>
            <Plus size={24} className="text-brand-gray" />
            <span className="ml-2 font-medium text-brand-gray">Add Metric</span>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-brand-dark/10">
        <h3 className="text-lg font-bold text-brand-dark mb-4">Case Study Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Background / Context</label>
             <textarea
              name="background"
              value={formData.background || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Challenge / Objective</label>
            <textarea
              name="challenge"
              value={formData.challenge || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Our Approach</label>
            <textarea
              name="approach"
              value={formData.approach || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Outcome / Results</label>
            <textarea
              name="result"
              value={formData.result || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-brand-dark/10">
        <h3 className="text-lg font-bold text-brand-dark mb-4">Content Body (Rich Text)</h3>
        <div className="border border-brand-dark/10 rounded-lg overflow-hidden">
          <RichTextEditor
            content={formData.long_content || formData.content || formData.results || ''}
            onChange={(html) => handleEditorChange(html, 'long_content')}
          />
        </div>
      </div>

      <div className="pt-6 border-t border-brand-dark/10">
        <h3 className="text-lg font-bold text-brand-dark mb-4">Testimonial</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <textarea
              placeholder="Testimonial Quote"
              value={formData.testimonial?.quote || ''}
              onChange={(e) => handleObjectChange('testimonial', 'quote', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
            />
          </div>
          <div>
            <input
              type="text" placeholder="Author Name"
              value={formData.testimonial?.author || ''}
              onChange={(e) => handleObjectChange('testimonial', 'author', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <input
              type="text" placeholder="Author Role"
              value={formData.testimonial?.role || ''}
              onChange={(e) => handleObjectChange('testimonial', 'role', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>
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
      
    </>
  );
}
