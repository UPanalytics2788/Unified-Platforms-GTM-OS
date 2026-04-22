import { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import { X, Loader2, Image as ImageIcon, Search } from 'lucide-react';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export default function MediaModal({ isOpen, onClose, onSelect }: MediaModalProps) {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchFiles = async () => {
        setLoading(true);
        setError(null);
        
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timed out')), 15000)
        );

        try {
          const storageRef = ref(storage, 'media');
          const res = await Promise.race([listAll(storageRef), timeoutPromise]) as any;
          
          const filePromises = res.items.map(async (item: any) => {
            try {
              const url = await getDownloadURL(item);
              return { name: item.name, url };
            } catch (e) {
              console.error(`Error getting URL for ${item.name}:`, e);
              return null;
            }
          });
          const fileList = (await Promise.all(filePromises)).filter(Boolean) as { name: string; url: string }[];
          setFiles(fileList);
        } catch (error) {
          console.error('Error fetching files:', error);
          setError(
            error instanceof Error && error.message === 'Request timed out'
              ? 'Connection timed out. Please check your network or Firebase settings.'
              : 'Failed to load media library. Ensure Storage is enabled in your Firebase console.'
          );
        }
        setLoading(false);
      };
      fetchFiles();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-brand-dark">Select Media</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-brand-primary" size={40} />
            </div>
          ) : error ? (
            <div className="py-20 text-center">
              <p className="text-red-500 mb-2">{error}</p>
              <button onClick={() => window.location.reload()} className="text-brand-primary font-semibold hover:underline">Retry</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredFiles.map((file) => (
                <button
                  key={file.url}
                  onClick={() => {
                    onSelect(file.url);
                    onClose();
                  }}
                  className="group relative aspect-square bg-gray-50 rounded-xl border border-gray-100 overflow-hidden hover:border-brand-primary transition-all"
                >
                  {file.url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) ? (
                    <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={32} className="text-gray-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white text-[10px] truncate opacity-0 group-hover:opacity-100 transition-opacity">
                    {file.name}
                  </div>
                </button>
              ))}
              {filteredFiles.length === 0 && (
                <div className="col-span-full py-20 text-center text-brand-gray">
                  No matching files found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
