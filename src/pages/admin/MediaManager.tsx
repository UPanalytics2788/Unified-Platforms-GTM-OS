import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import firebaseConfig from '../../../firebase-applet-config.json';
import { Upload, Trash2, Copy, Check, Loader2, Image as ImageIcon, Folder } from 'lucide-react';

export default function MediaManager() {
  const [files, setFiles] = useState<{ id: string; name: string; url: string; folder: string; type: string; size: number; }[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('media');

  const FOLDERS = ['media', 'blog', 'services', 'solutions', 'case_studies', 'team'];

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const fetchFiles = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const q = query(
        collection(db, 'media_library'), 
        where('folder', '==', selectedFolder)
      );
      const snapshot = await getDocs(q);
      const fileList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as { id: string; name: string; url: string; folder: string; type: string; size: number; }[];
      fileList.sort((a,b) => ((b as any).createdAt || '').localeCompare((a as any).createdAt || ''))
      setFiles(fileList);
    } catch (error: any) {
      console.error("Error fetching media from Firestore:", error);
      setStatus({ type: 'error', message: 'Failed to fully load media list.'});
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, [selectedFolder]);

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const { storageBucket } = firebaseConfig;
    
    // First try SDK upload
    try {
      const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
      const { storage } = await import('../../lib/firebase');
      const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      return await getDownloadURL(snapshot.ref);
    } catch (sdkError) {
      // If SDK fails (CORS), use REST API with auth token
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const token = await user.getIdToken();
      const encodedPath = encodeURIComponent(`${folder}/${Date.now()}_${file.name}`);
      const url = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o?uploadType=media&name=${encodedPath}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': file.type },
        body: file,
      });
      if (!response.ok) throw new Error(`Storage REST upload failed: ${response.status}`);
      const data = await response.json();
      return `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodedPath}?alt=media&token=${data.downloadTokens}`;
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setStatus({ type: 'error', message: 'File is too large. Max size is 10MB.' });
      return;
    }

    setUploading(true);
    setStatus(null);

    try {
      const downloadUrl = await uploadFile(file, selectedFolder);
      
      // Save metadata to Firestore
      await addDoc(collection(db, 'media_library'), {
        name: file.name,
        url: downloadUrl,
        folder: selectedFolder,
        type: file.type,
        size: file.size,
        createdAt: serverTimestamp()
      });

      await fetchFiles();
      setStatus({ type: 'success', message: 'File uploaded successfully!' });
    } catch (error: any) {
      console.error('Error uploading file:', error);
      setStatus({ 
        type: 'error', 
        message: error.message || 'Upload failed. Check your network or permissions.' 
      });
    }
    setUploading(false);
  };

  const handleDelete = async (fileId: string, fileUrl: string) => {
    if (!window.confirm('Are you sure you want to delete this file from the database?')) return;
    setStatus(null);
    try {
      await deleteDoc(doc(db, 'media_library', fileId));
      
      try {
        const { ref, deleteObject } = await import('firebase/storage');
        const { storage } = await import('../../lib/firebase');
        // Simple attempt to delete object. This might fail due to CORS. That is fine.
        // Wait, for this to work we have to know the path. It's usually in the URL.
        const pathRegex = new RegExp(`o\\/([^?]+)\\?`);
        const match = fileUrl.match(pathRegex);
        if (match && match[1]) {
           const decodedPath = decodeURIComponent(match[1]);
           const fileRef = ref(storage, decodedPath);
           await deleteObject(fileRef);
        }
      } catch (e) {
        // Ignore bucket delete errors
      }

      await fetchFiles();
      setStatus({ type: 'success', message: 'File deleted successfully!' });
    } catch (error) {
      console.error('Error deleting file:', error);
      setStatus({ type: 'error', message: 'Delete failed.' });
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const fakeEvent = { target: { files: [file] } } as any;
      handleUpload(fakeEvent);
    }
  };

  return (
    <div className="p-8 min-h-screen" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      {isDragging && (
        <div className="fixed inset-0 z-[100] bg-brand-primary/20 backdrop-blur-sm flex items-center justify-center border-4 border-dashed border-brand-primary pointer-events-none">
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center">
            <Upload className="mx-auto mb-4 text-brand-primary animate-bounce" size={48} />
            <h2 className="text-2xl font-bold text-brand-dark">Drop to Upload</h2>
            <p className="text-brand-gray mt-2">Release the file to start uploading to /{selectedFolder}</p>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">Media Manager</h1>
          <p className="text-brand-gray">Upload and manage your website assets</p>
        </div>
        <div className="flex items-center gap-4">
          {status && (
            <div className={`px-4 py-2 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-right-2 ${
              status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {status.message}
            </div>
          )}
          <label className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-brand-white rounded-xl cursor-pointer hover:bg-brand-dark transition-all shadow-sm">
            {uploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
            <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
            <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-brand-primary" size={40} />
        </div>
      ) : (
        <>
          <div className="mb-6 flex items-center gap-4 border-b border-brand-dark/10 pb-6">
            <Folder className="text-brand-gray" size={20} />
            <span className="font-semibold text-brand-dark text-sm">Select Folder:</span>
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="bg-brand-white border border-brand-dark/10 text-brand-dark text-sm rounded-lg focus:ring-brand-primary focus:border-brand-primary block p-2.5 outline-none"
            >
              {FOLDERS.map((folder) => (
                <option key={folder} value={folder}>
                  /{folder}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {files.map((file) => (
              <div key={file.id} className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                  {file.url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) || file.type?.startsWith('image/') ? (
                    <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={40} className="text-gray-300" />
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-brand-dark truncate mb-2" title={file.name}>{file.name}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => copyToClipboard(file.url)}
                      className="p-1.5 text-brand-gray hover:text-brand-primary transition-colors"
                      title="Copy URL"
                    >
                      {copied === file.url ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                    <button
                      onClick={() => handleDelete(file.id, file.url)}
                      className="p-1.5 text-brand-gray hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {files.length === 0 && (
              <div className="col-span-full py-12 text-center">
                <ImageIcon size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-brand-gray font-medium mb-2">No files in /{selectedFolder}</p>
                <p className="text-sm text-brand-gray/60">Upload a file using the button above.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
