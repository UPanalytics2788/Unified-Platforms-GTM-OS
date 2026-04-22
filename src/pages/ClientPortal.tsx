import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Loader2, FileText, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

interface Project {
  id: string;
  title: string;
  status: string;
  deliverables: string[];
}

export default function ClientPortal() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!auth.currentUser) return;
      try {
        const q = query(collection(db, 'projects'), where('clientId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Project[];
        setProjects(projectsData);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="py-20 bg-brand-white min-h-screen">
      <SEO title="Client Portal" description="Manage your projects and deliverables." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-brand-dark mb-8">Your Projects</h1>
        {projects.length === 0 ? (
          <p className="text-brand-gray">No active projects found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map(project => (
              <div key={project.id} className="bg-brand-white p-8 rounded-2xl border border-brand-dark/10 shadow-sm">
                <h3 className="text-xl font-bold text-brand-dark mb-2">{project.title}</h3>
                <p className="text-sm text-brand-primary font-medium mb-4">{project.status}</p>
                <h4 className="font-semibold text-brand-dark mb-2">Deliverables:</h4>
                <ul className="space-y-2">
                  {project.deliverables.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-brand-gray text-sm">
                      <CheckCircle size={16} className="text-brand-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
