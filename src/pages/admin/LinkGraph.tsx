import { useState, useEffect, useRef } from 'react';
import { Link, Anchor, GitMerge, AlertTriangle, Loader2, Check, X, Trash2, Search, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';
import { collection, query, getDocs, where, deleteDoc, doc, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { runLinkDiscovery } from '../../lib/linkDiscovery';
import * as d3 from 'd3';

export default function LinkGraph() {
  const [links, setLinks] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalActive: 0, pending: 0, orphans: 0 });
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [filter, setFilter] = useState<'all' | 'suggested' | 'active' | 'rejected'>('all');
  const [showVisual, setShowVisual] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    if (showVisual && links.length > 0 && svgRef.current) {
      renderGraph();
    }
  }, [showVisual, links, searchTerm]);

    const renderGraph = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svgRef.current.clientWidth || 800;
    const height = 600;

    // We want to visualize EVERYTHING in the graph to show the full map
    // but color code by status
    const activeLinks = links.filter(l => l.status === 'active');
    
    const [insights, services, pseo] = [
      links.filter(l => l.sourceType === 'insights' || l.targetType === 'insights'),
      links.filter(l => l.sourceType === 'services' || l.targetType === 'services'),
      links.filter(l => l.sourceType === 'pseo_pages' || l.targetType === 'pseo_pages')
    ];

    // Extract unique nodes from ALL links and even orphans if we had them
    const nodesMap = new Map();
    
    // Add all nodes from links
    links.forEach(l => {
      if (!nodesMap.has(l.sourceId)) nodesMap.set(l.sourceId, { id: l.sourceId, label: l.sourceTitle, type: l.sourceType, status: l.status });
      if (!nodesMap.has(l.targetId)) nodesMap.set(l.targetId, { id: l.targetId, label: l.targetTitle, type: l.targetType, status: l.status });
    });

    const nodes = Array.from(nodesMap.values());
    const edges = activeLinks.map(l => ({
      source: l.sourceId,
      target: l.targetId,
      value: 1
    }));
    
    // Filter nodes based on search
    const filteredNodes = searchTerm 
      ? nodes.filter(n => n.label.toLowerCase().includes(searchTerm.toLowerCase()))
      : nodes;
      
    const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
    const finalEdges = edges.filter(e => filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target));

    // Create a container group for zooming
    const g = svg.append("g");

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom as any);

    const simulation = d3.forceSimulation(filteredNodes as any)
      .force("link", d3.forceLink(finalEdges).id((d: any) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(50));

    const link = g.append("g")
      .attr("stroke", "#cbd5e1")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(finalEdges)
      .join("line")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrowhead)");

    // Add arrowhead marker
    svg.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 20)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("xoverflow", "visible")
      .append("svg:path")
      .attr("d", "M 0,-5 L 10 ,0 L 0,5")
      .attr("fill", "#94a3b8")
      .style("stroke", "none");

    const node = g.append("g")
      .selectAll("g")
      .data(filteredNodes)
      .join("g")
      .attr("class", "node-group")
      .style("cursor", "pointer")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("circle")
      .attr("r", 10)
      .attr("fill", (d: any) => {
        if (d.type === 'services') return '#06b6d4';
        if (d.type === 'insights') return '#6366f1';
        if (d.type === 'pseo_pages') return '#ec4899';
        return '#94a3b8';
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("shadow", "0 4px 6px -1px rgb(0 0 0 / 0.1)");

    node.append("text")
      .text((d: any) => d.label)
      .attr("x", 14)
      .attr("y", 4)
      .style("font-size", "12px")
      .style("font-family", "Inter, sans-serif")
      .style("font-weight", "600")
      .style("fill", "#0f172a")
      .style("paint-order", "stroke")
      .style("stroke", "#fff")
      .style("stroke-width", "3px")
      .style("stroke-linecap", "round")
      .style("stroke-linejoin", "round");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  };

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'link_graph'));
      const linksData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setLinks(linksData);

      // Calc stats
      const active = linksData.filter((l: any) => l.status === 'active').length;
      const pending = linksData.filter((l: any) => l.status === 'suggested').length;
      
      // Calculate orphans among published insights/services
      const [insights, services] = await Promise.all([
        getDocs(query(collection(db, 'insights'), where('status', '==', 'published'))),
        getDocs(query(collection(db, 'services'), where('status', '==', 'published')))
      ]);
      
      const allPageIds = [...insights.docs.map(d => d.id), ...services.docs.map(d => d.id)];
      const idsWithIncoming = new Set(linksData.filter((l: any) => l.status === 'active').map((l: any) => l.targetId));
      const orphans = allPageIds.filter(id => !idsWithIncoming.has(id)).length;

      setStats({ totalActive: active, pending, orphans });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id: string, status: 'active' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'link_graph', id), { status });
      setLinks(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this link suggestion?')) return;
    try {
      await deleteDoc(doc(db, 'link_graph', id));
      setLinks(prev => prev.filter(l => l.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const runFullScan = async () => {
    setScanning(true);
    try {
      const [insights, services, pseo] = await Promise.all([
        getDocs(query(collection(db, 'insights'), where('status', '==', 'published'))),
        getDocs(query(collection(db, 'services'), where('status', '==', 'published'))),
        getDocs(query(collection(db, 'pseo_pages'), where('status', '==', 'published')))
      ]);

      const allDocs = [
        ...insights.docs.map(d => ({ id: d.id, coll: 'insights', data: d.data() })),
        ...services.docs.map(d => ({ id: d.id, coll: 'services', data: d.data() })),
        ...pseo.docs.map(d => ({ id: d.id, coll: 'pseo_pages', data: d.data() }))
      ];

      for (const item of allDocs) {
        let contentText = item.data.content || '';
        if (typeof contentText === 'object') {
          // Flatten PSEO structured content for scanning
          contentText = JSON.stringify(contentText);
        }
        await runLinkDiscovery(item.id, item.coll, item.data.title || item.data.name, contentText);
      }

      await fetchLinks();
      alert('Scanning complete! Discovered links across Insights, Services, and PSEO pages.');
    } catch (e) {
      console.error(e);
      alert('Scan failed. See console.');
    }
    setScanning(false);
  };

  const filteredLinks = links.filter(l => filter === 'all' || l.status === filter);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
            <GitMerge className="text-brand-primary" /> Internal Link Graph
          </h1>
          <p className="text-brand-gray text-sm">Managing semantic connections across Unified Platforms.</p>
        </div>
        <div className="flex items-center gap-4">
          {status && (
            <div className={`px-4 py-2 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-right-2 ${
              status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {status.message}
            </div>
          )}
          <button 
            onClick={() => setShowVisual(!showVisual)}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
              showVisual ? 'bg-brand-dark text-white' : 'bg-white border border-brand-dark/10 text-brand-dark'
            }`}
          >
            {showVisual ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            {showVisual ? 'Hide Visual Graph' : 'Show Visual Graph'}
          </button>
          <button 
            onClick={runFullScan}
            disabled={scanning}
            className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50"
          >
            {scanning ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />}
            Scan All Published Pages
          </button>
        </div>
      </div>

      {showVisual && (
        <div className="bg-white p-6 rounded-2xl border border-brand-dark/10 shadow-sm overflow-hidden relative">
          <div className="absolute top-10 right-10 z-10 bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-brand-dark/10 shadow-lg pointer-events-auto">
             <h4 className="text-xs font-black text-brand-dark uppercase tracking-widest mb-3">Graph Legend</h4>
             <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-gray">
                   <div className="w-3 h-3 rounded-full bg-[#06b6d4]" /> Services
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-brand-gray">
                   <div className="w-3 h-3 rounded-full bg-[#6366f1]" /> Insights / Blog
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-brand-gray">
                   <div className="w-3 h-3 rounded-full bg-[#ec4899]" /> PSEO Pages
                </div>
             </div>
             <div className="mt-4 pt-4 border-t border-brand-dark/5">
                <div className="relative">
                   <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-brand-gray" size={14} />
                   <input 
                     type="text" 
                     placeholder="Search nodes..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="pl-8 pr-2 py-1.5 text-xs border border-brand-dark/10 rounded-lg w-full focus:outline-brand-primary"
                   />
                </div>
             </div>
          </div>
          <div className="flex justify-center">
            <svg 
              ref={svgRef} 
              width={800} 
              height={600} 
              className="max-w-full"
              style={{ cursor: 'grab' }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-brand-dark/10 shadow-sm">
          <p className="text-sm font-bold text-brand-gray uppercase tracking-widest mb-1">Active Edges</p>
          <p className="text-3xl font-black text-brand-dark">{stats.totalActive}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-brand-dark/10 shadow-sm">
          <p className="text-sm font-bold text-brand-gray uppercase tracking-widest mb-1">New Suggestions</p>
          <p className="text-3xl font-black text-brand-primary">{stats.pending}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-brand-dark/10 shadow-sm">
          <p className="text-sm font-bold text-brand-gray uppercase tracking-widest mb-1">Orphan Pages</p>
          <p className="text-3xl font-black text-red-500">{stats.orphans}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-brand-dark/10 shadow-sm overflow-hidden">
        <div className="flex border-b">
          {(['all', 'suggested', 'active', 'rejected'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-4 text-sm font-bold capitalize transition-all border-b-2 ${
                filter === f ? 'border-brand-primary text-brand-primary bg-brand-primary/5' : 'border-transparent text-brand-gray hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-brand-gray text-xs font-black uppercase tracking-widest">
                <th className="px-6 py-4">Source Page</th>
                <th className="px-6 py-4">Target Page</th>
                <th className="px-6 py-4">Anchor Text</th>
                <th className="px-6 py-4 text-center">Relevance</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-brand-gray">
                    <Loader2 className="animate-spin mx-auto mb-2" size={24} /> Loading graph...
                  </td>
                </tr>
              ) : filteredLinks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-brand-gray">No links found for this filter.</td>
                </tr>
              ) : filteredLinks.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50 bg-white group text-sm">
                  <td className="px-6 py-4 font-bold text-brand-dark">{l.sourceTitle}</td>
                  <td className="px-6 py-4 text-brand-gray flex items-center gap-1">
                    {l.targetTitle}
                    <a href={`/insights/${l.targetSlug}`} target="_blank" rel="noreferrer"><ExternalLink size={12} /></a>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{l.anchorText}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-black ${
                      l.relevanceScore > 0.8 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {Math.round(l.relevanceScore * 100)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                      l.status === 'active' ? 'bg-green-100 text-green-700' : 
                      l.status === 'suggested' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                       {l.status === 'suggested' && (
                         <>
                           <button onClick={() => handleStatusChange(l.id, 'active')} className="p-1 text-green-600 hover:bg-green-50 rounded" title="Accept"><Check size={16} /></button>
                           <button onClick={() => handleStatusChange(l.id, 'rejected')} className="p-1 text-red-600 hover:bg-red-50 rounded" title="Reject"><X size={16} /></button>
                         </>
                       )}
                       <button onClick={() => handleDelete(l.id)} className="p-1 text-gray-400 hover:text-red-600 rounded" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
