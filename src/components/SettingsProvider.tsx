import { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

const SettingsContext = createContext<any>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const path = 'settings/brand';
    const unsub = onSnapshot(doc(db, 'settings', 'brand'), (snapshot) => {
      if (snapshot.exists()) {
        setSettings(snapshot.data());
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (settings) {
      // Only apply if it's not the old green default (#166247 or similar)
      // and if it's actually a valid hex code
      if (settings.primaryColor && settings.primaryColor !== '#166247' && settings.primaryColor !== '#2e8b57') {
        document.documentElement.style.setProperty('--color-primary', settings.primaryColor);
      }
      if (settings.secondaryColor && settings.secondaryColor !== '#f27d26') {
        document.documentElement.style.setProperty('--color-secondary', settings.secondaryColor);
      }
      
      // Update favicon
      if (settings.faviconUrl) {
        const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement || document.createElement('link');
        link.rel = 'icon';
        link.href = settings.faviconUrl;
        document.head.appendChild(link);
      }
    }
  }, [settings]);

  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
}

export const useSettings = () => useContext(SettingsContext);
