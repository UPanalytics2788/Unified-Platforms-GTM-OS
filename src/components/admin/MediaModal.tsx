import { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage, auth, db } from '../../lib/firebase';
import { X, Loader2, Image as ImageIcon, Search, Upload, Folder, Check } from 'lucide-react';
import firebaseConfig from '../../../firebase-applet-config.json';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export default function MediaModal({ isOpen, onClose, onSelect }: MediaModalProps) {
  const [files, setFiles] = useState<{ name: string; url: string; folder: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('media');

  const FOLDERS = ['media', 'blog', 'services', 'solutions', 'case_studies', 'team', 'logos'];

  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const storageRef = ref(storage, selectedFolder);
      const res = await listAll(storageRef);
      
      const filePromises = res.items.map(async (item: any) => {
        try {
          const url = await getDownloadURL(item);
          return { name: item.name, url, folder: selectedFolder };
        } catch (e) {
          return null;
        }
      });
      const fileList = (await Promise.all(filePromises)).filter(Boolean) as any[];
      setFiles(fileList);
    } catch (error) {
      console.error('Error fetching files:', error);
      setError('Failed to load media library.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchFiles();
    }
  }, [isOpen, selectedFolder]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      // 1. Upload to Storage
      let downloadUrl = '';
      try {
        const storageRef = ref(storage, `${selectedFolder}/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        downloadUrl = await getDownloadURL(snapshot.ref);
      } catch (sdkErr) {
        // Fallback to REST if CORS issue
        const user = auth.currentUser;
        if (!user) throw new Error('Not authenticated');
        const token = await user.getIdToken();
        const storageBucket = firebaseConfig.storageBucket;
        const encodedPath = encodeURIComponent(`${selectedFolder}/${Date.now()}_${file.name}`);
        const url = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o?uploadType=media&name=${encodedPath}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': file.type },
          body: file,
        });
        const data = await response.json();
        downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodedPath}?alt=media&token=${data.downloadTokens}`;
      }

      // 2. Save to Firestore
      await addDoc(collection(db, 'media_library'), {
        name: file.name,
        url: downloadUrl,
        folder: selectedFolder,
        type: file.type,
        size: file.size,
        createdAt: serverTimestamp()
      });

      await fetchFiles();
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    }
    setUploading(false);
  };

  if (!isOpen) return null;

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-brand-dark flex items-center gap-2">
              <ImageIcon className="text-brand-primary" /> Media Assets
            </h2>
            <p className="text-xs text-brand-gray">Select or upload files to your library</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center bg-white">
          <div className="flex-grow relative min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
            {FOLDERS.map(f => (
              <button
                key={f}
                onClick={() => setSelectedFolder(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  selectedFolder === f ? 'bg-white text-brand-primary shadow-sm' : 'text-brand-gray hover:text-brand-dark'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 px-4 py-2.5 bg-brand-primary text-white rounded-xl cursor-pointer hover:bg-brand-dark transition-all text-sm font-bold shadow-md">
            {uploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
            {uploading ? 'Processing...' : 'Upload New'}
            <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>

        <div className="flex-grow overflow-y-auto p-6 bg-gray-50/30">
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2 text-sm">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          {loading ? (
            <div className="h-full flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-brand-primary mb-4" size={40} />
              <p className="text-brand-gray font-medium">Syncing library...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredFiles.map((file) => (
                <button
                  key={file.url}
                  onClick={() => {
                    onSelect(file.url);
                    onClose();
                  }}
                  className="group relative aspect-square bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-brand-primary hover:shadow-lg transition-all"
                >
                  {file.url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) || file.url.includes('alt=media') ? (
                    <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4">
                      <Folder size={32} className="text-gray-300 mb-2" />
                      <span className="text-[10px] text-brand-gray truncate w-full text-center">{file.name}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <Check className="text-brand-primary bg-white rounded-full p-1" size={32} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent text-white text-[10px] truncate opacity-0 group-hover:opacity-100 transition-opacity">
                    {file.name}
                  </div>
                </button>
              ))}
              {filteredFiles.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <ImageIcon size={48} className="mx-auto mb-4 text-gray-200" />
                  <p className="text-brand-gray font-medium">No assets found in /{selectedFolder}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const AlertCircle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);
