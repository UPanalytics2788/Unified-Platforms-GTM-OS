import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { Save, Loader2, Upload, Image as ImageIcon } from 'lucide-react';
import MediaModal from '../../components/admin/MediaModal';

export default function BrandSettings() {
  const [settings, setSettings] = useState({
    siteName: 'Unified Platforms',
    description: '',
    logoUrl: '',
    faviconUrl: '',
    primaryColor: '#5dcaeb',
    secondaryColor: '#eb735d',
    contactEmail: '',
    contactPhone: '',
    address: '',
    socialLinks: {
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [activeMediaField, setActiveMediaField] = useState<string | null>(null);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    const fetchSettings = async () => {
      const docRef = doc(db, 'settings', 'brand');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSettings(docSnap.data() as any);
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic size check
    if (file.size > 5 * 1024 * 1024) {
      setStatus({ type: 'error', message: 'Logo is too large. Max size is 5MB.' });
      return;
    }

    setUploading(true);
    setStatus(null);

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Upload timed out')), 30000)
    );

    try {
      const storageRef = ref(storage, `logos/${Date.now()}_${file.name}`);
      await Promise.race([uploadBytes(storageRef, file), timeoutPromise]);
      const url = await getDownloadURL(storageRef);
      const newSettings = { ...settings, logoUrl: url };
      setSettings(newSettings);
      await setDoc(doc(db, 'settings', 'brand'), newSettings);
      setStatus({ type: 'success', message: 'Logo uploaded and saved successfully!' });
    } catch (error) {
      console.error('Error uploading logo:', error);
      setStatus({ 
        type: 'error', 
        message: error instanceof Error && error.message === 'Upload timed out'
          ? 'Upload timed out. Connection might be slow.'
          : 'Failed to upload logo. Check your Firebase Storage permissions.' 
      });
    }
    setUploading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      await setDoc(doc(db, 'settings', 'brand'), settings);
      setStatus({ type: 'success', message: 'Brand settings saved successfully!' });
    } catch (error) {
      console.error('Error saving settings:', error);
      setStatus({ type: 'error', message: 'Failed to save settings.' });
    }
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-brand-primary" /></div>;

  return (
    <div className="max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-brand-dark">Brand Settings</h1>
        {status && (
          <div className={`px-4 py-2 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 ${
            status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {status.message}
          </div>
        )}
      </div>
      <form onSubmit={handleSave} className="space-y-6 bg-brand-white p-8 rounded-2xl border border-brand-dark/10 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Site Name</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Site Description</label>
          <textarea
            value={settings.description}
            onChange={(e) => setSettings({ ...settings, description: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Logo</label>
          <div className="flex items-center gap-4">
            {settings.logoUrl && <img src={settings.logoUrl} alt="Logo" className="h-12 w-12 object-contain rounded-lg border border-brand-dark/10" />}
            <div className="flex flex-wrap gap-2">
              <label className="inline-flex items-center px-4 py-2 bg-brand-dark/5 text-brand-dark rounded-xl cursor-pointer hover:bg-brand-dark/10 transition-all gap-2">
                {uploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                {uploading ? 'Uploading...' : 'Upload Logo'}
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
              <button
                type="button"
                onClick={() => {
                  setActiveMediaField('logoUrl');
                  setMediaModalOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-xl hover:bg-brand-primary/20 transition-all gap-2"
              >
                <ImageIcon size={20} />
                Media Library
              </button>
            </div>
          </div>
          <input
            type="text"
            value={settings.logoUrl}
            onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
            className="w-full mt-2 px-4 py-2 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            placeholder="Or enter Logo URL"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Contact Email</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Contact Phone</label>
            <input
              type="text"
              value={settings.contactPhone}
              onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Address</label>
          <textarea
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            rows={2}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">LinkedIn URL</label>
            <input
              type="text"
              value={settings.socialLinks.linkedin}
              onChange={(e) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, linkedin: e.target.value } })}
              className="w-full px-4 py-2 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Twitter URL</label>
            <input
              type="text"
              value={settings.socialLinks.twitter}
              onChange={(e) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, twitter: e.target.value } })}
              className="w-full px-4 py-2 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Favicon URL</label>
          <input
            type="text"
            value={settings.faviconUrl}
            onChange={(e) => setSettings({ ...settings, faviconUrl: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Primary Color</label>
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Secondary Color</label>
            <input
              type="color"
              value={settings.secondaryColor}
              onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center px-6 py-3 bg-brand-primary text-brand-white font-semibold rounded-xl hover:bg-brand-primary/90 transition-all disabled:opacity-50 gap-2"
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          Save Changes
        </button>
      </form>

      <MediaModal 
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => {
          if (activeMediaField) {
            setSettings((prev: any) => ({ ...prev, [activeMediaField]: url }));
          }
        }}
      />
    </div>
  );
}
