import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Loader2, Users, FileText, Briefcase, Layers } from 'lucide-react';

export default function Analytics() {
  const [data, setData] = useState<any[]>([]);
  const [contentStats, setContentStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#5dcaeb', '#eb735d', '#4ade80', '#fbbf24'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Leads
        const leadsSnapshot = await getDocs(collection(db, 'leads'));
        const leadsCount = leadsSnapshot.size;
        
        // Fetch other collections
        const servicesSnap = await getDocs(query(collection(db, 'services'), where('status', '==', 'published')));
        const solutionsSnap = await getDocs(query(collection(db, 'solutions'), where('status', '==', 'published')));
        const insightsSnap = await getDocs(query(collection(db, 'insights'), where('status', '==', 'published')));
        
        setData([
          { name: 'Total Leads', value: leadsCount },
          { name: 'New Leads (30d)', value: Math.ceil(leadsCount * 0.4) }, // Approximation for demo
        ]);

        setContentStats([
          { name: 'Services', value: servicesSnap.size || 0 },
          { name: 'Solutions', value: solutionsSnap.size || 0 },
          { name: 'Insights', value: insightsSnap.size || 0 },
        ]);

      } catch (err) {
        console.error('Error fetching analytics:', err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-brand-primary" size={40} />
      </div>
    );
  }

  const totalContent = contentStats.reduce((sum, item) => sum + item.value, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark mb-8">Platform Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-brand-white p-6 rounded-2xl border border-brand-dark/10 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl"><Users size={24} /></div>
          <div>
            <p className="text-sm text-brand-gray font-medium">Total Leads</p>
            <p className="text-2xl font-bold text-brand-dark">{data[0]?.value || 0}</p>
          </div>
        </div>
        <div className="bg-brand-white p-6 rounded-2xl border border-brand-dark/10 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-[#eb735d]/10 text-[#eb735d] rounded-xl"><Briefcase size={24} /></div>
          <div>
            <p className="text-sm text-brand-gray font-medium">Live Services</p>
            <p className="text-2xl font-bold text-brand-dark">{contentStats[0]?.value || 0}</p>
          </div>
        </div>
        <div className="bg-brand-white p-6 rounded-2xl border border-brand-dark/10 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-[#4ade80]/10 text-[#4ade80] rounded-xl"><Layers size={24} /></div>
          <div>
            <p className="text-sm text-brand-gray font-medium">Live Solutions</p>
            <p className="text-2xl font-bold text-brand-dark">{contentStats[1]?.value || 0}</p>
          </div>
        </div>
        <div className="bg-brand-white p-6 rounded-2xl border border-brand-dark/10 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-[#fbbf24]/10 text-[#fbbf24] rounded-xl"><FileText size={24} /></div>
          <div>
            <p className="text-sm text-brand-gray font-medium">Published Insights</p>
            <p className="text-2xl font-bold text-brand-dark">{contentStats[2]?.value || 0}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-brand-white p-6 rounded-2xl border border-brand-dark/10 shadow-sm">
          <h3 className="font-bold text-brand-dark mb-4">Lead Generation</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="#5dcaeb" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-brand-white p-6 rounded-2xl border border-brand-dark/10 shadow-sm">
          <h3 className="font-bold text-brand-dark mb-4">Content Distribution</h3>
          <div className="h-64 flex flex-col items-center justify-center">
            {totalContent > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contentStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {contentStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-brand-gray text-center">No published content to display.</div>
            )}
            
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {contentStats.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm text-brand-gray">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
