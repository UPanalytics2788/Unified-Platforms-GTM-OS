import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth, db } from './lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { HelmetProvider } from 'react-helmet-async';
import { runCMSInitialization } from './lib/cms-init';

import { ADMIN_EMAILS, isAdmin } from './constants';
import { SEOProvider } from './components/SEOProvider';
import GlobalBanner from './components/layout/GlobalBanner';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ChatBot from './components/ChatBot';

// Lazy Pages
const Home = lazy(() => import('./pages/Home'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Services = lazy(() => import('./pages/Services'));
const Insights = lazy(() => import('./pages/Insights'));
const InsightDetail = lazy(() => import('./pages/InsightDetail'));
const CaseStudies = lazy(() => import('./pages/CaseStudiesPage'));
const Contact = lazy(() => import('./pages/Contact'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const LandingPageView = lazy(() => import('./pages/LandingPageView'));
const PSEOView = lazy(() => import('./pages/PSEOView'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const ClientPortal = lazy(() => import('./pages/ClientPortal'));
const Login = lazy(() => import('./pages/Login'));
const UnifiedPageView = lazy(() => import('./pages/UnifiedPageView'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
  </div>
);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Temporary logic to ensure logo is updated
    const updateLogo = async () => {
      try {
        const { doc, updateDoc } = await import('firebase/firestore');
        const brandRef = doc(db, 'settings', 'brand');
        await updateDoc(brandRef, { logoUrl: '/logo.png' });
        console.log('Logo path synced to /logo.png');
      } catch (err) {
        // Silently fail if connection issues
      }
    };
    updateLogo();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Check if user exists in Firestore, if not create
          const userRef = doc(db, 'users', firebaseUser.uid);
          const userSnap = await getDoc(userRef);
          
          let userRole = 'user';
          const isAdminEmail = isAdmin(firebaseUser.email);

          if (!userSnap.exists()) {
            userRole = isAdminEmail ? 'admin' : 'user';
            await setDoc(userRef, {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              role: userRole,
              createdAt: new Date().toISOString()
            });
          } else {
            const data = userSnap.data();
            if (data.suspended) {
              await signOut(auth);
              setUser(null);
              setRole(null);
              setLoading(false);
              return;
            }
            // Force admin role if email matches, even if DB says otherwise
            userRole = isAdminEmail ? 'admin' : data.role;
            
            // Sync DB if it's an admin but not marked as such
            if (isAdminEmail && data.role !== 'admin') {
              const { updateDoc } = await import('firebase/firestore');
              await updateDoc(userRef, { role: 'admin' });
            }
          }
          setUser(firebaseUser);
          setRole(userRole);
          console.log(`Auth state updated: user=${firebaseUser.email}, role=${userRole}`);

          // Auto-initialize CMS if missing and user is admin
          if (userRole === 'admin') {
            const checkAndInitCMS = async () => {
              try {
                // Connection test for admins to trigger seeding if needed
                const brandSnap = await getDoc(doc(db, 'settings', 'brand'));
                if (!brandSnap.exists()) {
                  console.log("Detecting empty CMS. Auto-initializing data...");
                  await runCMSInitialization();
                }
              } catch (err) {
                // Silently handle connection errors during auto-init
                console.warn("CMS auto-init check skipped due to connection/config.");
              }
            };
            checkAndInitCMS();
          }
        } catch (error) {
          // Fallback to basic email-based role identification if Firestore is unreachable
          setUser(firebaseUser);
          const fallbackRole = isAdmin(firebaseUser.email) ? 'admin' : 'user';
          setRole(fallbackRole);
          console.warn("Firestore unreachable for role check, using email-based fallback.");
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <SEOProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-brand-white text-brand-dark font-sans">
            <GlobalBanner />
            <Navbar user={user} />
            <main className="flex-grow pt-20">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/solutions/:slug" element={<UnifiedPageView />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<UnifiedPageView />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/insights/:slug" element={<InsightDetail />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/lp/:slug" element={<LandingPageView />} />
                <Route path="/local/:slug" element={<PSEOView />} />
                <Route path="/unified/:slug" element={<UnifiedPageView />} />
                <Route
                  path="/client-portal"
                  element={
                    <ProtectedRoute user={user} role={role} allowedRoles={['client', 'admin']}>
                      <ClientPortal />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute user={user} role={role} allowedRoles={['admin']}>
                      <AdminDashboard user={user} role={role} />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <ChatBot />
        </div>
      </Router>
      </SEOProvider>
    </HelmetProvider>
  );
}
