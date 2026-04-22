import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Link } from 'react-router-dom';

export default function GlobalBanner() {
  const [banner, setBanner] = useState<{
    active: boolean;
    text: string;
    ctaText: string;
    ctaLink: string;
    backgroundColor: string;
    textColor: string;
  } | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'campaigns'));
        if (docSnap.exists() && docSnap.data().active) {
          setBanner(docSnap.data() as any);
        }
      } catch (err) {
        // Suppress errors for optional banner content
      }
    };
    fetchBanner();
  }, []);

  if (!banner || !banner.active) return null;

  return (
    <div 
      className="w-full py-2 px-4 text-center text-sm font-medium animate-in slide-in-from-top-full flex items-center justify-center gap-3 shadow-sm relative z-50"
      style={{ backgroundColor: banner.backgroundColor, color: banner.textColor }}
    >
      <span>{banner.text}</span>
      {banner.ctaText && banner.ctaLink && (
        <Link 
          to={banner.ctaLink} 
          className="underline font-bold hover:opacity-80 transition-opacity"
        >
          {banner.ctaText}
        </Link>
      )}
    </div>
  );
}
