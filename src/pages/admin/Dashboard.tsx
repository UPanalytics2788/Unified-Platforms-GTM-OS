import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BarChart, 
  Settings, 
  Package,
  Briefcase,
  Menu,
  Layers,
  CheckCircle,
  AlertCircle,
  Globe,
  PenTool,
  Shield,
  Link as LinkIcon,
  TrendingUp,
  X,
  ChevronRight,
  LogOut,
  Plus,
  Loader2,
  BookOpen,
  Navigation,
  Image,
  Settings2,
  RefreshCw
} from 'lucide-react';
import { runCMSInitialization } from '../../lib/cms-init';
import ContentList from './ContentList';
import ContentEditor from './ContentEditor';
import BrandsSettings from './BrandSettings';
import LandingPages from './LandingPages';
import LandingPageBuilder from './LandingPageBuilder';
import Leads from './Leads';
import Analytics from './Analytics';
import MigrateContent from './MigrateContent';
import PSEODashboard from './PSEODashboard';
import BlogStudio from './BlogStudio';
import TrustSignals from './TrustSignals';
import LinkGraph from './LinkGraph';
import MediaManager from './MediaManager';
import UserManagement from './UserManagement';
import Campaigns from './Campaigns';
import SEOSettings from './SEOSettings';

interface AdminDashboardProps {
  user: User | null;
  role: string | null;
}

export default function AdminDashboard({ user, role }: AdminDashboardProps) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [stats, setStats] = useState<any>({
    pages: 0,
    leads: 0,
    users: 0,
    insights: 0
  });

  const handleSystemSync = async () => {
    if (!window.confirm('This will sync core content (Case Studies, Geo Taxonomy) from local data to Firestore. Existing data will be merged. Continue?')) return;
    setIsSyncing(true);
    try {
      await runCMSInitialization(true);
      alert('System sync complete! All case studies and taxonomy are up to date.');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Sync failed. Check console for details.');
    }
    setIsSyncing(false);
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const pagesSnap = await getDocs(collection(db, 'pages'));
        const leadsSnap = await getDocs(collection(db, 'leads'));
        const usersSnap = await getDocs(collection(db, 'users'));
        const insightsSnap = await getDocs(collection(db, 'insights'));
        
        setStats({
          pages: pagesSnap.size,
          leads: leadsSnap.size,
          users: usersSnap.size,
          insights: insightsSnap.size
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (!user || role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p className="text-brand-gray mb-4">You do not have permission to access the admin panel.</p>
          <Link to="/login" className="text-brand-primary font-semibold">Go to Login</Link>
        </div>
      </div>
    );
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
    { icon: Briefcase, label: 'Services', path: '/admin/services' },
    { icon: Layers, label: 'Solutions', path: '/admin/solutions' },
    { icon: FileText, label: 'Insights / Blog', path: '/admin/insights' },
    { icon: BookOpen, label: 'Case Studies', path: '/admin/case-studies' },
    { icon: FileText, label: 'Pages', path: '/admin/pages' },
    { icon: Navigation, label: 'Navigation', path: '/admin/navigation' },
    { icon: Users, label: 'Authors', path: '/admin/authors' },
    { icon: Image, label: 'Media', path: '/admin/media' },
    { icon: Users, label: 'User Management', path: '/admin/users' },
    { icon: BarChart, label: 'Campaigns', path: '/admin/campaigns' },
    { icon: Settings2, label: 'SEO Settings', path: '/admin/seo-settings' },
    { icon: PenTool, label: 'Blog Studio', path: '/admin/blog' },
    { icon: Layers, label: 'Landing Pages', path: '/admin/landing-pages' },
    { icon: Users, label: 'Leads', path: '/admin/leads' },
    { icon: BarChart, label: 'Analytics', path: '/admin/analytics' },
    { icon: Globe, label: 'PSEO Dashboard', path: '/admin/pseo' },
    { icon: Shield, label: 'Trust Signals', path: '/admin/trust' },
    { icon: LinkIcon, label: 'Link Graph', path: '/admin/links' },
    { icon: Settings, label: 'Brand Settings', path: '/admin/settings' },
    { icon: Plus, label: 'Migrate Content', path: '/admin/migrate' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-brand-dark text-white transition-all duration-300 flex flex-col fixed inset-y-0 z-50 lg:relative`}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight">GTM<span className="text-brand-primary">OS</span></span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-white/10 rounded">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
                location.pathname === item.path ? 'bg-brand-primary text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button 
            onClick={handleSystemSync}
            disabled={isSyncing}
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-colors w-full text-left disabled:opacity-50"
          >
            {isSyncing ? <Loader2 size={20} className="animate-spin text-brand-primary" /> : <RefreshCw size={20} />}
            {isSidebarOpen && <span className="font-medium text-sm">System Sync</span>}
          </button>
          <button className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-colors w-full text-left">
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <h1 className="text-lg font-bold text-slate-800">
            {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900">{user.displayName || 'Admin'}</p>
              <p className="text-xs text-brand-gray">{user.email}</p>
            </div>
            <img 
              src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'Admin'}`} 
              alt="Avatar" 
              className="w-10 h-10 rounded-full border border-slate-200"
            />
          </div>
        </header>

        <div className="p-8">
          <Routes>
            <Route index element={
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Published Pages', value: stats.pages, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Total Leads', value: stats.leads, icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Blog Posts', value: stats.insights, icon: PenTool, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Conversion Rate', value: '3.2%', change: '+0.4%', icon: TrendingUp, color: 'text-brand-primary', bg: 'bg-brand-primary/10' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                          <stat.icon size={24} />
                        </div>
                        {stat.change && <span className="text-xs font-bold text-green-600">{stat.change}</span>}
                      </div>
                      <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                    </div>
                  ))}
                </div>

                {/* Recent Content Table */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="font-bold text-slate-900">Recent Content</h2>
                    <Link to="/admin/content" className="text-brand-primary text-sm font-bold flex items-center gap-1 hover:underline">
                      View All <ChevronRight size={16} />
                    </Link>
                  </div>
                  <div className="overflow-x-auto">
                    <ContentList collection="insights" />
                  </div>
                </div>
              </div>
            } />
            <Route path="/services" element={<ContentList collection="services" />} />
            <Route path="/services/new" element={<ContentEditor />} />
            <Route path="/services/edit/:id" element={<ContentEditor />} />
            <Route path="/solutions" element={<ContentList collection="solutions" />} />
            <Route path="/solutions/new" element={<ContentEditor />} />
            <Route path="/solutions/edit/:id" element={<ContentEditor />} />
            <Route path="/insights" element={<ContentList collection="insights" />} />
            <Route path="/insights/new" element={<ContentEditor />} />
            <Route path="/insights/edit/:id" element={<ContentEditor />} />
            <Route path="/case-studies" element={<ContentList collection="case-studies" />} />
            <Route path="/case-studies/new" element={<ContentEditor />} />
            <Route path="/case-studies/edit/:id" element={<ContentEditor />} />
            <Route path="/pages" element={<ContentList collection="pages" />} />
            <Route path="/pages/new" element={<ContentEditor />} />
            <Route path="/pages/edit/:id" element={<ContentEditor />} />
            <Route path="/navigation" element={<ContentList collection="navigation" />} />
            <Route path="/navigation/new" element={<ContentEditor />} />
            <Route path="/navigation/edit/:id" element={<ContentEditor />} />
            <Route path="/authors" element={<ContentList collection="authors" />} />
            <Route path="/authors/new" element={<ContentEditor />} />
            <Route path="/authors/edit/:id" element={<ContentEditor />} />
            <Route path="/media" element={<MediaManager />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/seo-settings" element={<SEOSettings />} />

            <Route path="/content" element={<ContentList />} />
            <Route path="/content/edit/:id" element={<ContentEditor />} />
            <Route path="/content/new" element={<ContentEditor />} />
            <Route path="/blog" element={<BlogStudio />} />
            <Route path="/landing-pages" element={<LandingPages />} />
            <Route path="/landing-pages/new" element={<LandingPageBuilder />} />
            <Route path="/landing-pages/edit/:id" element={<LandingPageBuilder />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/pseo" element={<PSEODashboard />} />
            <Route path="/trust" element={<TrustSignals />} />
            <Route path="/links" element={<LinkGraph />} />
            <Route path="/settings" element={<BrandsSettings />} />
            <Route path="/migrate" element={<MigrateContent />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
