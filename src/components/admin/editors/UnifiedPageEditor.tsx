import React from 'react';
import { EditorProps } from './types';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import RichTextEditor from '../RichTextEditor';

export default function UnifiedPageEditor({ formData, setFormData, handleChange, handleEditorChange, collectionName, setActiveMediaField, setMediaModalOpen }: EditorProps) {
  const handleObjectChange = (parent: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [parent]: {
        ...(prev[parent] || {}),
        [field]: value
      }
    }));
  };

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

  // Main Framework requires custom array handler
  const handleFrameworkStepChange = (index: number, key: string, value: any) => {
    setFormData((prev: any) => {
      const steps = [...(prev.main_framework?.steps || [])];
      steps[index] = { ...steps[index], [key]: value };
      return {
        ...prev,
        main_framework: {
          ...(prev.main_framework || {}),
          steps
        }
      };
    });
  };

  const addFrameworkStep = () => {
    setFormData((prev: any) => {
      const steps = [...(prev.main_framework?.steps || [])];
      steps.push({ number: steps.length + 1, label: '', detail: '' });
      return {
        ...prev,
        main_framework: {
          ...(prev.main_framework || {}),
          steps
        }
      };
    });
  };

  const removeFrameworkStep = (index: number) => {
    setFormData((prev: any) => {
      const steps = [...(prev.main_framework?.steps || [])];
      steps.splice(index, 1);
      // Reassign numbers
      const updatedSteps = steps.map((s, i) => ({ ...s, number: i + 1 }));
      return {
        ...prev,
        main_framework: {
          ...(prev.main_framework || {}),
          steps: updatedSteps
        }
      };
    });
  };

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">
          {collectionName === 'services' || collectionName === 'solutions' ? 'Name' : 'Title'}
        </label>
        <input
          type="text"
          name={collectionName === 'services' || collectionName === 'solutions' ? 'name' : 'title'}
          value={collectionName === 'services' || collectionName === 'solutions' ? (formData.name || '') : (formData.title || '')}
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
          className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">Description / Short Content</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-brand-white text-brand-dark"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">Long Form Content (Rich Text)</label>
        <div className="border border-brand-dark/10 rounded-lg overflow-hidden">
          <RichTextEditor
            content={formData.long_content || formData.content || ''}
            onChange={(html) => handleEditorChange(html, 'long_content')}
          />
        </div>
      </div>

      <div className="pt-8 border-t border-brand-dark/10">
        <h3 className="text-lg font-bold text-brand-dark mb-4">Unified Page Layout</h3>
        <p className="text-sm text-brand-gray mb-6">Structured sections for the unified architecture pattern.</p>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-gray uppercase mb-1">Layout Pattern</label>
              <select
                name="layout_pattern"
                value={formData.page_config?.layout_pattern || ''}
                onChange={(e) => handleObjectChange('page_config', 'layout_pattern', e.target.value)}
                className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg bg-brand-white text-brand-dark"
              >
                <option value="">Default (Flat)</option>
                <option value="ARCHITECT">Architect (SEO/Strategy)</option>
                <option value="ACCELERATOR">Accelerator (Performance/Ads)</option>
                <option value="ENGINEER">Engineer (Dev/Tech)</option>
                <option value="CONNECTOR">Connector (Talent/HR)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-gray uppercase mb-1">Theme</label>
              <select
                name="theme"
                value={formData.page_config?.theme || 'LIGHT'}
                onChange={(e) => handleObjectChange('page_config', 'theme', e.target.value)}
                className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg bg-brand-white text-brand-dark"
              >
                <option value="LIGHT">Light Theme</option>
                <option value="DARK">Dark Theme</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-gray uppercase mb-1">Hero H1 Override</label>
              <input
                type="text"
                value={formData.hero?.h1 || ''}
                onChange={(e) => handleObjectChange('hero', 'h1', e.target.value)}
                className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-gray uppercase mb-1">Hero Intro Text Override</label>
              <input
                type="text"
                value={formData.hero?.intro_text || ''}
                onChange={(e) => handleObjectChange('hero', 'intro_text', e.target.value)}
                className="w-full px-4 py-2 border border-brand-dark/10 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-gray uppercase mb-2">Value Grid Items</label>
            <div className="space-y-4">
              {(formData.value_grid || []).map((item: any, i: number) => (
                <div key={i} className="flex gap-4 items-start p-4 border border-brand-dark/10 rounded-xl bg-gray-50/50">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text" placeholder="Title" value={item.title || ''}
                      onChange={(e) => handleArrayChange('value_grid', i, 'title', e.target.value)}
                      className="px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="text" placeholder="Icon Name (e.g. Zap)" value={item.icon || ''}
                      onChange={(e) => handleArrayChange('value_grid', i, 'icon', e.target.value)}
                      className="px-3 py-2 border rounded-lg"
                    />
                    <textarea
                      placeholder="Description" value={item.description || ''}
                      onChange={(e) => handleArrayChange('value_grid', i, 'description', e.target.value)}
                      className="px-3 py-2 border rounded-lg md:col-span-3" rows={2}
                    />
                  </div>
                  <button type="button" onClick={() => removeItem('value_grid', i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem('value_grid', { title: '', description: '', icon: '' })}
                className="flex items-center gap-2 px-4 py-2 text-brand-primary font-medium hover:bg-brand-primary/10 rounded-xl"
              >
                <Plus size={16} /> Add Value Item
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-brand-dark/10">
            <label className="block text-xs font-bold text-brand-gray uppercase mb-2">Process Steps (Framework)</label>
            <div className="mb-4">
              <input
                type="text" placeholder="Framework Title (e.g. Our SEO Process)"
                value={formData.main_framework?.title || ''}
                onChange={(e) => handleObjectChange('main_framework', 'title', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="space-y-4">
              {(formData.main_framework?.steps || []).map((step: any, i: number) => (
                <div key={i} className="flex gap-4 items-start p-4 border border-brand-dark/10 rounded-xl bg-gray-50/50">
                  <div className="font-bold text-xl text-brand-gray pt-2">{step.number}</div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text" placeholder="Step Label" value={step.label || ''}
                      onChange={(e) => handleFrameworkStepChange(i, 'label', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <textarea
                      placeholder="Step Detail" value={step.detail || ''}
                      onChange={(e) => handleFrameworkStepChange(i, 'detail', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg" rows={2}
                    />
                  </div>
                  <button type="button" onClick={() => removeFrameworkStep(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFrameworkStep}
                className="flex items-center gap-2 px-4 py-2 text-brand-primary font-medium hover:bg-brand-primary/10 rounded-xl"
              >
                <Plus size={16} /> Add Step
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-brand-dark/10">
            <h4 className="text-sm font-bold text-brand-dark mb-4">Comparison Module</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 p-4 border border-red-200 bg-red-50/30 rounded-xl">
                <input
                  type="text" placeholder="Left Side Title (e.g. The 'Weak' Strategy)"
                  value={formData.comparison_module?.left_side_title || ''}
                  onChange={(e) => handleObjectChange('comparison_module', 'left_side_title', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-medium"
                />
                <textarea
                  placeholder="Points (one per line)"
                  value={(formData.comparison_module?.left_side_points || []).join('\n')}
                  onChange={(e) => handleObjectChange('comparison_module', 'left_side_points', e.target.value.split('\n'))}
                  className="w-full px-3 py-2 border rounded-lg" rows={4}
                />
              </div>
              <div className="space-y-4 p-4 border-green-200 bg-green-50/30 border rounded-xl">
                <input
                  type="text" placeholder="Right Side Title (e.g. The Architectural Strategy)"
                  value={formData.comparison_module?.right_side_title || ''}
                  onChange={(e) => handleObjectChange('comparison_module', 'right_side_title', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-medium"
                />
                <textarea
                  placeholder="Points (one per line)"
                  value={(formData.comparison_module?.right_side_points || []).join('\n')}
                  onChange={(e) => handleObjectChange('comparison_module', 'right_side_points', e.target.value.split('\n'))}
                  className="w-full px-3 py-2 border rounded-lg" rows={4}
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-brand-dark/10">
            <label className="block text-xs font-bold text-brand-gray uppercase mb-2">Growth Entities</label>
            <div className="space-y-4">
              {(formData.growth_entities || []).map((entity: any, i: number) => (
                <div key={i} className="flex gap-4 items-start p-4 border border-brand-dark/10 rounded-xl">
                  <div className="flex-1 space-y-4">
                    <input
                      type="text" placeholder="Entity Title / Component" value={entity.title || ''}
                      onChange={(e) => handleArrayChange('growth_entities', i, 'title', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <textarea
                      placeholder="Description" value={entity.description || ''}
                      onChange={(e) => handleArrayChange('growth_entities', i, 'description', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg" rows={2}
                    />
                    <textarea
                      placeholder="Context / Why it fits" value={entity.context || ''}
                      onChange={(e) => handleArrayChange('growth_entities', i, 'context', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50" rows={2}
                    />
                  </div>
                  <button type="button" onClick={() => removeItem('growth_entities', i)} className="p-2 text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem('growth_entities', { title: '', description: '', context: '' })}
                className="flex items-center gap-2 px-4 py-2 text-brand-primary font-medium hover:bg-brand-primary/10 rounded-xl"
              >
                <Plus size={16} /> Add Growth Entity
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-brand-dark/10">
            <label className="block text-xs font-bold text-brand-gray uppercase mb-2">FAQ</label>
            <div className="space-y-4">
              {(formData.faq || []).map((faqItem: any, i: number) => (
                <div key={i} className="flex gap-4 items-start p-4 border border-brand-dark/10 rounded-xl">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text" placeholder="Question" value={faqItem.question || ''}
                      onChange={(e) => handleArrayChange('faq', i, 'question', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg font-medium"
                    />
                    <textarea
                      placeholder="Answer" value={faqItem.answer || ''}
                      onChange={(e) => handleArrayChange('faq', i, 'answer', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg" rows={2}
                    />
                  </div>
                  <button type="button" onClick={() => removeItem('faq', i)} className="p-2 text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem('faq', { question: '', answer: '' })}
                className="flex items-center gap-2 px-4 py-2 text-brand-primary font-medium hover:bg-brand-primary/10 rounded-xl"
              >
                <Plus size={16} /> Add FAQ
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-brand-dark/10">
        <h3 className="text-lg font-bold text-brand-dark mb-4">SEO Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Primary Keyword</label>
            <input
              type="text"
              name="primary_keyword"
              value={formData.primary_keyword || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Theme Schema Type</label>
            <select
                name="schema_type"
                value={formData.seo?.schema_type || 'Service'}
                onChange={(e) => handleObjectChange('seo', 'schema_type', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-brand-white text-brand-dark"
              >
                <option value="Service">Service</option>
                <option value="SoftwareApplication">Software Application</option>
                <option value="LocalBusiness">Local Business</option>
                <option value="Article">Article</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-brand-dark mb-1">Meta Title</label>
            <input
              type="text"
              value={formData.seo?.title || formData.meta_title || ''}
              onChange={(e) => handleObjectChange('seo', 'title', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-brand-dark mb-1">Meta Description</label>
            <textarea
              value={formData.seo?.meta_description || formData.meta_description || ''}
              onChange={(e) => handleObjectChange('seo', 'meta_description', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
            />
          </div>
        </div>
      </div>
    </>
  );
}
