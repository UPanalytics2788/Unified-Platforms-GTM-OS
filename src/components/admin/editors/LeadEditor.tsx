import React from 'react';
import { EditorProps } from './types';

export default function LeadEditor({ formData, handleChange }: EditorProps) {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-brand-primary/10 text-brand-primary rounded-xl text-sm font-medium">
        Leads are typically generated from website forms. You can view their details and update the status above.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-50"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-50"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-50"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-50"
            disabled
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-brand-dark mb-1">Message / Notes</label>
          <textarea
            name="message"
            value={formData.message || formData.notes || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-50"
            disabled
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}
