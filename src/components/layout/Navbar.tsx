import { Link, useNavigate } from 'react-router-dom';
import { User as FirebaseUser, signOut } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { Menu, X, LogOut, ChevronDown, ArrowRight, User as UserIcon, LayoutDashboard, ShieldCheck, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, onSnapshot, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { cn } from '../../lib/utils';
import { useSettings } from '../SettingsProvider';
import { isAdmin } from '../../constants';
import GlobalSearch from './GlobalSearch';

interface NavbarProps {
  user: FirebaseUser | null;
}

interface NavItem {
  id?: string;
  label: string;
  type: 'mega_menu' | 'dropdown' | 'link';
  visible_to: string[];
  columns?: { title: string; links: any[] }[];
  links?: any[];
  href?: string;
  order: number;
}

export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [navItems, setNavItems] = useState<NavItem[]>(INITIAL_NAV_STRUCTURE);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);
  const settings = useSettings();

  // Handle scroll for background adaptation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMenu(null);
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Fetch user role
  useEffect(() => {
    if (user) {
      const fetchRole = async () => {
        if (isAdmin(user.email)) {
          setUserRole('admin');
          // No need to fetch from DB if we've already confirmed they are a hardcoded admin
          return;
        }

        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role;
            if (role) setUserRole(role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      };
      fetchRole();
    } else {
      setUserRole(null);
    }
  }, [user]);

  // Fetch navigation from CMS
  useEffect(() => {
    const q = query(collection(db, 'navigation'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NavItem));
        // Deduplicate by label to prevent duplicate keys and UI duplication
        const uniqueItems = items.reduce((acc: NavItem[], current) => {
          const label = current.label.trim();
          const exists = acc.find(item => item.label.trim().toLowerCase() === label.toLowerCase());
          if (!exists) {
            return [...acc, { ...current, label }];
          }
          return acc;
        }, []);
        setNavItems(uniqueItems);
      }
    }, (error) => {
      // Use warning for expected local fallback when connectivity is limited
      console.warn("Firestore navigation unavailable, using local structure.");
      // We already initialized with INITIAL_NAV_STRUCTURE, so no action needed here
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const isVisible = (item: NavItem) => {
    if (item.visible_to.includes('public')) return true;
    if (user && item.visible_to.includes('admin') && userRole === 'admin') return true;
    return false;
  };

  return (
    <nav ref={navRef} className={cn(
      "fixed top-0 left-0 right-0 z-[9999] border-b transition-all duration-300",
      (isOpen || isScrolled) 
        ? "bg-brand-white border-brand-dark/10 shadow-sm" 
        : "bg-brand-white/90 backdrop-blur-md border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              {settings?.logoUrl ? (
                <img src={settings.logoUrl} alt="GTM OS" className="h-[58px] w-auto object-contain" />
              ) : (
                <img src="/logo.png" alt="GTM OS" className="h-[58px] w-auto object-contain" />
              )}
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-1 overflow-visible">
            {navItems.filter(isVisible).map((item) => (
              <div
                key={item.label}
                className={cn(item.type !== 'mega_menu' && "relative")}
                onMouseEnter={() => setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                {item.type === 'link' ? (
                  <Link
                    to={item.href || '#'}
                    className="px-4 py-2 text-sm font-medium text-brand-gray hover:text-brand-primary transition-colors flex items-center gap-1 rounded-lg hover:bg-brand-gray/5"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className={cn(
                      "px-4 py-2 text-sm font-medium text-brand-gray hover:text-brand-primary transition-colors flex items-center gap-1 rounded-lg hover:bg-brand-gray/5",
                      activeMenu === item.label && "text-brand-primary bg-brand-gray/5"
                    )}
                  >
                    {item.label}
                    <ChevronDown size={14} className={cn("transition-transform", activeMenu === item.label && "rotate-180")} />
                  </button>
                )}

                <AnimatePresence>
                  {activeMenu === item.label && (item.type === 'mega_menu' || item.type === 'dropdown') && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={cn(
                        "absolute top-full pt-2 z-[9999]",
                        item.type === 'mega_menu' 
                          ? "left-0 right-0 w-full" 
                          : "left-1/2 -translate-x-1/2 w-56"
                      )}
                    >
                      <div className="bg-brand-white rounded-2xl shadow-2xl border border-brand-dark/10 p-6 overflow-hidden">
                        {item.type === 'mega_menu' ? (
                          <div className="grid grid-cols-3 gap-8">
                            {item.columns?.map((col) => (
                              <div key={col.title}>
                                <h3 className="text-xs font-bold text-brand-gray/60 uppercase tracking-widest mb-4">{col.title}</h3>
                                <ul className="space-y-3">
                                    {col.links.map((link: any) => (
                                      <li key={link.label || link}>
                                        <Link
                                          to={link.href || `/${item.label.toLowerCase().replace(' ', '-')}/${(link.label || link).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                          className="text-sm text-brand-gray hover:text-brand-primary flex items-center group/link"
                                        >
                                          {link.label || link}
                                          <ArrowRight size={12} className="ml-1 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <ul className="space-y-2">
                              {item.links?.map((link: any) => (
                                <li key={link.label || link}>
                                  <Link
                                    to={link.href || `/${item.label.toLowerCase().replace(' ', '-')}/${(link.label || link).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                    className="block px-3 py-2 text-sm text-brand-gray hover:text-brand-primary hover:bg-brand-gray/5 rounded-lg transition-colors"
                                  >
                                    {link.label || link}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTAs & Profile */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/contact?type=consultation"
              className="px-5 py-2.5 bg-brand-primary text-brand-white text-sm font-bold rounded-xl hover:bg-brand-dark transition-all shadow-sm"
            >
              Book Consultation
            </Link>

            {user && (
              <div className="relative group">
                <button className="w-10 h-10 bg-brand-gray/10 rounded-full flex items-center justify-center hover:bg-brand-gray/20 transition-colors">
                  <UserIcon size={20} className="text-brand-gray" />
                </button>
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="bg-brand-white rounded-xl shadow-xl border border-brand-dark/10 w-56 p-2">
                    <div className="px-3 py-2 border-b border-brand-dark/5 mb-1">
                      <p className="text-xs font-bold text-brand-gray/60 uppercase tracking-widest">Account</p>
                      <p className="text-sm font-medium text-brand-dark truncate">{user.email}</p>
                    </div>
                    {userRole === 'admin' && (
                      <Link to="/admin" className="flex items-center space-x-2 px-3 py-2 text-sm text-brand-gray hover:bg-brand-gray/5 rounded-lg transition-colors">
                        <LayoutDashboard size={16} />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    {(userRole === 'client' || userRole === 'admin') && (
                      <Link to="/client-portal" className="flex items-center space-x-2 px-3 py-2 text-sm text-brand-gray hover:bg-brand-gray/5 rounded-lg transition-colors">
                        <ShieldCheck size={16} />
                        <span>Client Portal</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brand-gray hover:text-brand-dark focus:outline-none bg-brand-gray/10 rounded-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu (Accordion) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 h-[calc(100vh-80px)] z-[9999] lg:hidden bg-brand-white"
          >
            <div className="px-4 py-6 space-y-4 overflow-y-auto h-full pb-48">
              {user && (
                <div className="p-4 bg-brand-gray/5 rounded-2xl mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
                      <UserIcon size={20} className="text-brand-primary" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-brand-gray/60 uppercase tracking-widest">Logged in as</p>
                      <p className="text-sm font-medium text-brand-dark truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {userRole === 'admin' && (
                      <Link 
                        to="/admin" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-2 p-3 text-sm text-brand-gray hover:bg-brand-white rounded-xl transition-colors"
                      >
                        <LayoutDashboard size={18} />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    {(userRole === 'client' || userRole === 'admin') && (
                      <Link 
                        to="/client-portal" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-2 p-3 text-sm text-brand-gray hover:bg-brand-white rounded-xl transition-colors"
                      >
                        <ShieldCheck size={18} />
                        <span>Client Portal</span>
                      </Link>
                    )}
                  </div>
                </div>
              )}
              {navItems.filter(isVisible).map((item) => (
                <MobileNavItem key={item.label} item={item} onClose={() => setIsOpen(false)} />
              ))}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-brand-white border-t border-brand-dark/5 space-y-3 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-center py-3.5 text-red-600 font-bold border border-red-100 bg-red-50 rounded-xl"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/contact?type=consultation"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3.5 bg-brand-primary text-brand-white font-bold rounded-xl shadow-sm"
                  >
                    Book Consultation
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.type === 'link') {
    return (
      <Link
        to={item.href || '#'}
        onClick={onClose}
        className="block text-xl font-bold text-brand-dark"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-brand-dark/5 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-xl font-bold text-brand-dark"
      >
        {item.label}
        <ChevronDown size={20} className={cn("transition-transform", isOpen && "rotate-180")} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 pl-4 space-y-4">
              {item.type === 'mega_menu' ? (
                item.columns?.map(col => (
                  <div key={col.title}>
                    <h4 className="text-xs font-bold text-brand-gray/60 uppercase tracking-widest mb-3">{col.title}</h4>
                    <div className="space-y-3">
                      {col.links.map((link: any) => (
                        <Link
                          key={link.label || link}
                          to={link.href || `/${item.label.toLowerCase().replace(' ', '-')}/${(link.label || link).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                          onClick={onClose}
                          className="block text-brand-gray font-medium"
                        >
                          {link.label || link}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                item.links?.map((link: any) => (
                  <Link
                    key={link.label || link}
                    to={link.href || `/${item.label.toLowerCase().replace(' ', '-')}/${(link.label || link).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    onClick={onClose}
                    className="block text-brand-gray font-medium"
                  >
                    {link.label || link}
                  </Link>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const INITIAL_NAV_STRUCTURE: NavItem[] = [
  {
    label: "Solutions",
    type: "mega_menu",
    visible_to: ["public"],
    order: 1,
    columns: [
      {
        title: "Growth Solutions",
        links: [
          "Revenue Growth",
          "Lead Generation",
          "Customer Acquisition",
          "Conversion Rate Optimization",
          "Ecommerce Scaling",
          "Brand Building",
          "Market Entry Strategy",
          "Retention & Lifecycle Marketing",
          "Talent & Hiring Solutions",
          "Exit Readiness and Enterprise Value"
        ]
      }
    ]
  },
  {
    label: "Services",
    type: "mega_menu",
    visible_to: ["public"],
    order: 2,
    columns: [
      {
        title: "Search & Organic",
        links: ["SEO Strategy", "Technical SEO", "Content SEO", "Authority Building", "Local SEO", "AEO / GEO"]
      },
      {
        title: "Performance Marketing",
        links: ["Paid Search", "Paid Social", "Marketplace Ads", "CRO", "Advanced Analytics and Attribution"]
      },
      {
        title: "Content & Media",
        links: ["Content Strategy", "Content Creation", "Social Media", "Email Marketing", "Copywriting"]
      },
      {
        title: "Development",
        links: ["Website Development", "Web Apps", "CMS Development", "API Integrations"]
      },
      {
        title: "Talent & HR",
        links: ["Recruitment", "Executive Search", "RPO", "HR Consulting"]
      }
    ]
  },
  {
    label: "Industries",
    type: "dropdown",
    visible_to: ["public"],
    order: 3,
    links: [
      "Ecommerce",
      "Fintech",
      "Real Estate",
      "EdTech",
      "SaaS",
      "Healthcare",
      "Automotive",
      "Logistics",
      "BFSI",
      "Hospitality"
    ]
  },
  {
    label: "Case Studies",
    type: "link",
    href: "/case-studies",
    visible_to: ["public"],
    order: 4,
  },
  {
    label: "Insights",
    type: "dropdown",
    visible_to: ["public"],
    order: 5,
    links: [
      { label: "Blog", href: "/insights?type=blog" },
      { label: "Playbooks & Guides", href: "/insights?type=playbook" },
      { label: "Reports", href: "/insights?type=report" },
      { label: "Video Hub", href: "/insights?type=video" },
      { label: "News", href: "/insights?type=news" }
    ]
  },
  {
    label: "About",
    type: "dropdown",
    visible_to: ["public"],
    order: 6,
    links: [
      "About Us",
      "GTM Framework",
      "Leadership",
      "Clients",
      "Careers"
    ]
  },
  {
    label: "Contact",
    type: "dropdown",
    visible_to: ["public"],
    order: 7,
    links: [
      "Book Consultation",
      "Request Proposal",
      "Free Audit",
      "Partnerships"
    ]
  }
];

