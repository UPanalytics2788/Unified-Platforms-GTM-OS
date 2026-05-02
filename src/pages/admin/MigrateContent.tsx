import { useEffect, useState } from 'react';
import { doc, setDoc, collection, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { runCMSInitialization } from '../../lib/cms-init';

export default function MigrateContent() {
  const [status, setStatus] = useState<'idle' | 'migrating' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const runMigration = async () => {
    setStatus('migrating');
    const result = await runCMSInitialization();
    if (result.success) {
      setStatus('success');
    } else {
      setError(result.error || 'Unknown error');
      setStatus('error');
    }
  };

  const clearAllData = async () => {
    if (!window.confirm('Are you sure you want to clear ALL CMS data? This cannot be undone.')) return;
    setStatus('migrating');
    try {
      const collections = ['services', 'solutions', 'pages', 'navigation', 'insights', 'leads'];
      for (const colName of collections) {
        const snap = await getDocs(collection(db, colName));
        const batch = writeBatch(db);
        snap.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
      }
      setStatus('success');
      alert('All data cleared successfully. You can now re-initialize.');
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-brand-dark">CMS Initialization</h1>
      <div className="bg-brand-white p-8 rounded-2xl border border-brand-dark/10 shadow-sm">
        <p className="mb-6 text-brand-gray">
          This will initialize your CMS with the complete set of initial data, including:
        </p>
        <ul className="list-disc list-inside mb-6 text-sm text-brand-gray space-y-1">
          <li>Homepage and core pages</li>
          <li>Complete Navigation structure</li>
          <li>All Solutions and Services content</li>
          <li>Initial Insights and Blog posts</li>
          <li>Brand settings and colors</li>
        </ul>
        <p className="mb-6 text-xs text-brand-gray/60 italic">
          Note: This is a one-time operation. Existing content will be updated with the latest seed data.
        </p>
        
        {status === 'idle' && (
          <div className="flex flex-col gap-4">
            <button
              onClick={runMigration}
              className="px-6 py-3 bg-brand-primary text-brand-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all"
            >
              Initialize CMS Data
            </button>
            <button
              onClick={async () => {
                setStatus('migrating');
                const result = await runCMSInitialization(true);
                if (result.success) {
                  setStatus('success');
                } else {
                  setError(result.error || 'Unknown error');
                  setStatus('error');
                }
              }}
              className="px-6 py-3 bg-brand-dark text-brand-white font-bold rounded-xl hover:bg-brand-dark/90 transition-all"
            >
              Force Re-seed CMS Data
            </button>
            <button
              onClick={async () => {
                setStatus('migrating');
                try {
                  await setDoc(doc(db, 'settings', 'brand'), {
                    siteName: 'Unified Platforms',
                    description: 'Revenue-focused marketing and growth partner helping brands scale through SEO, performance marketing, and content.',
                    logoUrl: 'https://unifiedplatforms.com/logo.png',
                    faviconUrl: '/favicon.ico',
                    primaryColor: '#5dcaeb',
                    secondaryColor: '#eb735d',
                    contactEmail: 'hello@unifiedplatforms.com',
                    contactPhone: '+91 98765 43210',
                    address: 'Bangalore, India',
                    socialLinks: {
                      linkedin: 'https://linkedin.com/company/unified-platforms',
                      twitter: 'https://twitter.com/unifiedplatform',
                      facebook: '',
                      instagram: ''
                    }
                  });
                  setStatus('success');
                } catch (err: any) {
                  console.error(err);
                  setError(err.message);
                  setStatus('error');
                }
              }}
              className="px-6 py-3 bg-brand-accent text-brand-white font-bold rounded-xl hover:bg-brand-accent/90 transition-all"
            >
              Force Reset Brand Colors Only
            </button>
            <button
              onClick={clearAllData}
              className="px-6 py-3 border-2 border-red-100 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-all"
            >
              Clear All CMS Data
            </button>
          </div>
        )}

        {status === 'migrating' && (
          <div className="flex items-center gap-3 text-brand-primary font-bold">
            <Loader2 className="animate-spin" /> Initializing CMS...
          </div>
        )}

        {status === 'success' && (
          <div className="flex items-center gap-3 text-green-600 font-bold">
            <CheckCircle /> CMS initialized successfully!
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-3 text-red-600 font-bold">
            <AlertCircle /> Error: {error}
          </div>
        )}
      </div>
    </div>
  );
}
