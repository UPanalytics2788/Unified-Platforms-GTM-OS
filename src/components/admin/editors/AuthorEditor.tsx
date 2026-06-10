import React from 'react';
import { EditorProps } from './types';
import RichTextEditor from '../RichTextEditor';
import { Image as ImageIcon } from 'lucide-react';

export default function AuthorEditor({ formData, handleChange, handleEditorChange, setActiveMediaField, setMediaModalOpen }: EditorProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
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
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Title</label>
          <input
            type="text"
            name="role"
            value={formData.role || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g. Head of Strategy"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">LinkedIn Profile</label>
          <input
            type="url"
            name="linkedinUrl"
            value={formData.linkedinUrl || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="https://linkedin.com/in/..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">Credentials (One per line)</label>
        <textarea
          name="credentials"
          value={Array.isArray(formData.credentials) ? formData.credentials.join('\n') : (formData.credentials || '')}
          onChange={(e) => {
            handleChange({
               target: { name: 'credentials', value: e.target.value.split('\n').filter(Boolean) }
            } as any);
          }}
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
          placeholder="Ex-McKinsey&#10;Stanford MBA"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-2">Biography</label>
        <div className="border border-brand-dark/10 rounded-lg overflow-hidden">
          <RichTextEditor
            content={formData.bio || ''}
            onChange={(html) => handleEditorChange(html, 'bio')}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">Avatar / Photo</label>
        {formData.avatarUrl ? (
          <div className="relative rounded-lg overflow-hidden border border-brand-dark/10 inline-block">
            <img src={formData.avatarUrl} alt="Avatar" className="h-32 object-cover" />
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveMediaField('avatarUrl');
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
              setActiveMediaField('avatarUrl');
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
