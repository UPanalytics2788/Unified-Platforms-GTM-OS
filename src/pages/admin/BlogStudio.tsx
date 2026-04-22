import { useState } from 'react';
import { Bot, PenTool, CheckCircle, FileText, Settings, Play, Loader2, ArrowRight, Edit3, Link as LinkIcon, ExternalLink, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { ai } from '../../lib/agents/core';
import { runResearchAgent } from '../../lib/agents/researchAgent';
import { runOutlineAgent } from '../../lib/agents/outlineAgent';
import { runWritingAgent } from '../../lib/agents/writingAgent';
import { runSMEAgent } from '../../lib/agents/smeAgent';
import { runEEATAgent } from '../../lib/agents/eeatAgent';
import { runAuditAgent } from '../../lib/agents/auditAgent';
import { runMetaAgent } from '../../lib/agents/metaAgent';
import { runSchemaAgent } from '../../lib/agents/schemaAgent';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { runLinkDiscovery } from '../../lib/linkDiscovery';

export default function BlogStudio() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { num: 1, name: 'Research Brief', agent: 'Agent 1' },
    { num: 2, name: 'SME Insights', agent: 'Agent 2' },
    { num: 3, name: 'Outline Builder', agent: 'Agent 3' },
    { num: 4, name: 'Draft Writer', agent: 'Agent 4' },
    { num: 5, name: 'EEAT Injection', agent: 'Agent 5' },
    { num: 6, name: 'Quality Audit', agent: 'Agent 6' },
    { num: 7, name: 'Meta & Schema', agent: 'Agents 7 & 8' },
  ];


  const [topic, setTopic] = useState('');
  const [intent, setIntent] = useState('Informational');
  const [audience, setAudience] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [brief, setBrief] = useState<any>(null);
  const [sme, setSme] = useState<any>(null);
  const [outline, setOutline] = useState<any>(null);
  const [draft, setDraft] = useState<string | null>(null);
  const [eeatDraft, setEEATDraft] = useState<string | null>(null);
  const [audit, setAudit] = useState<any>(null);
  const [metaInfo, setMetaInfo] = useState<any>(null);
  const [schemaData, setSchemaData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [isEditingDraft, setIsEditingDraft] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [selectedSuggestions, setSelectedSuggestions] = useState<Record<string, boolean>>({});

  const navigate = useNavigate();

  const fetchLinkSuggestions = async (title: string) => {
    setLoadingSuggestions(true);
    try {
      // 1. Query existing suggestions from Firestore
      const q = query(collection(db, 'link_graph'), where('status', '==', 'suggested'), where('sourceTitle', '==', title));
      const snap = await getDocs(q);
      
      if (snap.empty) {
        // 2. If none, run discovery (which also writes to firestore)
        const discovered = await runLinkDiscovery('temp-id', 'insights', title, eeatDraft || '');
        setSuggestions(discovered);
      } else {
        setSuggestions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      }
    } catch (e) {
      console.error("Error fetching link suggestions", e);
    }
    setLoadingSuggestions(false);
  };

  const applySelectedLinks = () => {
    if (!eeatDraft) return;
    
    let newHtml = eeatDraft;
    const toApply = suggestions.filter(s => selectedSuggestions[s.id || s.targetId]);
    
    for (const s of toApply) {
      const anchor = `<a href="/insights/${s.targetSlug}" class="text-brand-primary font-semibold hover:underline">${s.anchorText}</a>`;
      // Simple string replace of the first occurrence of the context sentence with anchor wrapped around it if it matches
      // Actually the instruction says: insert anchor tags into eeatDraft at the contextSentence location (simple string replace of the first occurrence of the sentence with the sentence wrapped in an a tag)
      // Wait, anchorText is what should be wrapped? Or should I replace the sentence?
      // "insert anchor tags into eeatDraft at the contextSentence location (simple string replace of the first occurrence of the sentence with the sentence wrapped in an <a href="/insights/{slug}">{anchorText}</a>)"
      // Actually it's more common to wrap the anchor text. But I'll follow instructions.
      // Instructions: "replace of the first occurrence of the sentence with the sentence wrapped in an <a href="/insights/{slug}">{anchorText}</a>" -> this doesn't make sense.
      // Re-reading: "simple string replace of the first occurrence of the sentence with the sentence wrapped in an <a href="/insights/{slug}">{anchorText}</a>"
      // Maybe it meant: replace the first occurrence of s.anchorText within s.contextSentence with the link.
      // Let's do a more robust approach: replace first occurrence of contextSentence with a version where anchorText is linked.
      if (newHtml.includes(s.contextSentence)) {
        const linkedSentence = s.contextSentence.replace(s.anchorText, `<a href="/insights/${s.targetSlug}" class="text-brand-primary font-semibold hover:underline">${s.anchorText}</a>`);
        newHtml = newHtml.replace(s.contextSentence, linkedSentence);
      }
    }
    setEEATDraft(newHtml);
    setSuggestions(prev => prev.filter(s => !selectedSuggestions[s.id || s.targetId]));
    setSelectedSuggestions({});
  };

  const writeDraft = async (outlineData: any) => {
    setActiveStep(4);
    const sections = outlineData.sections || [];
    let combinedHTML = '';
    for (let i = 0; i < sections.length; i++) {
        const secRes = await runWritingAgent(sections[i], `Article Title: ${outlineData.title}`);
        if(secRes.success && secRes.data) {
            combinedHTML += secRes.data + '\n\n';
        } else {
             combinedHTML += `<!-- Failed to write section: ${sections[i].heading} -->\n`;
        }
    }
    setDraft(combinedHTML);
    return combinedHTML;
  };

  const handleStartResearch = async () => {
    if (!topic) {
      setError("Please enter a primary keyword.");
      return;
    }
    setError(null);
    setIsGenerating(true);
    
    // Reset state
    setBrief(null); setSme(null); setOutline(null); setDraft(null); setEEATDraft(null); setAudit(null); setMetaInfo(null); setSchemaData(null);
    
    // 1. Research
    setActiveStep(1);
    const res = await runResearchAgent(topic, intent, audience);
    if (!res.success || !res.data) {
        setError(res.error || "Failed to generate brief.");
        setIsGenerating(false);
        return;
    }
    setBrief(res.data);
    
    // 2. SME Insights
    setActiveStep(2);
    const smeRes = await runSMEAgent(res.data);
    let enhancedBrief = res.data;
    if (smeRes.success && smeRes.data) {
        setSme(smeRes.data);
        enhancedBrief = { ...res.data, smeInsights: smeRes.data };
    }

    // 3. Outline
    setActiveStep(3);
    const outlineRes = await runOutlineAgent(enhancedBrief);
    if (!outlineRes.success || !outlineRes.data) {
        setError(outlineRes.error || "Failed to generate outline.");
        setIsGenerating(false);
        return;
    }
    setOutline(outlineRes.data);

    // 4. Draft Writer
    const rawHTML = await writeDraft(outlineRes.data);

    // 5. EEAT
    setActiveStep(5);
    const eeatRes = await runEEATAgent(rawHTML);
    const finalHtml = eeatRes.data || rawHTML; // fallback to raw
    setEEATDraft(finalHtml);

    // 6. Audit
    setActiveStep(6);
    const auditRes = await runAuditAgent(finalHtml);
    if(auditRes.success) setAudit(auditRes.data);

    // 7. Meta & Schema
    setActiveStep(7);
    const metaRes = await runMetaAgent(outlineRes.data);
    let finalMeta = null;
    if(metaRes.success && metaRes.data) {
        setMetaInfo(metaRes.data);
        finalMeta = metaRes.data;
    }
    
    const schemaRes = await runSchemaAgent(outlineRes.data, finalMeta || {});
    if(schemaRes.success) setSchemaData(schemaRes.data);

    setIsGenerating(false);
    fetchLinkSuggestions(outlineRes.data.title);
  };

  const handleApproveAndMove = async () => {
    if (!eeatDraft || !metaInfo) return;
    
    try {
      // Create a new document in the insights collection
      const docRef = await addDoc(collection(db, 'insights'), {
        title: metaInfo.title,
        content: eeatDraft,
        slug: topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        seoContext: {
          title: metaInfo.title,
          description: metaInfo.description,
        },
        schemaInfo: schemaData || {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": metaInfo.title,
          "description": metaInfo.description,
          "author": {
             "@type": "Person",
             "name": "Unified Platforms AI"
          }
        },
        status: 'draft',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Navigate to the editor for this new document
      navigate(`/admin/insights/edit/${docRef.id}`);
    } catch (e) {
      console.error("Error saving draft to CMS", e);
      setError("Failed to save draft to CMS.");
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
            <Bot className="text-brand-primary" /> Blog Writing Studio
          </h1>
          <p className="text-brand-gray text-sm mt-1">Multi-agent pipeline for high-ranking, zero-fluff content.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-brand-dark/10 text-brand-dark rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <Settings size={16} /> Pipeline Config
          </button>
          <button className="px-4 py-2 bg-brand-primary text-brand-white rounded-lg text-sm font-medium hover:bg-brand-primary/90 flex items-center gap-2">
            <Play size={16} /> Run Full Swarm
          </button>
        </div>
      </div>

      <div className="flex-grow flex gap-6 min-h-0">
        {/* Left Column: Pipeline & Config */}
        <div className="w-80 flex flex-col gap-4">
          <div className="bg-brand-white rounded-2xl border border-brand-dark/10 shadow-sm p-4 overflow-y-auto">
            <h3 className="font-bold text-brand-dark mb-4 text-sm uppercase tracking-wider text-brand-gray/60">Swarm Pipeline</h3>
            <div className="space-y-2">
              {steps.map(step => (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(step.num)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border ${
                    activeStep === step.num 
                      ? 'bg-brand-primary/5 border-brand-primary/30 shadow-sm' 
                      : 'border-transparent hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeStep > step.num ? 'bg-green-100 text-green-700' : 
                    activeStep === step.num ? 'bg-brand-primary text-brand-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {activeStep > step.num ? <CheckCircle size={14} /> : step.num}
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-bold ${activeStep === step.num ? 'text-brand-dark' : 'text-brand-gray'}`}>{step.name}</p>
                    <p className="text-xs text-brand-gray/60">{step.agent}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-brand-dark text-brand-white p-5 rounded-2xl shadow-sm flex-grow">
             <h3 className="font-bold mb-3 flex items-center gap-2 text-sm"><PenTool size={16} /> Topic Input</h3>
             <div className="space-y-4">
                <div>
                  <label className="text-xs text-white/60 mb-1 block">Primary Keyword</label>
                  <input 
                    type="text" 
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    placeholder="e.g. B2B SEO Strategy" 
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-brand-primary" 
                  />
                </div>
                <div>
                  <label className="text-xs text-white/60 mb-1 block">Search Intent</label>
                  <select 
                    value={intent}
                    onChange={e => setIntent(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-sm text-white focus:outline-none"
                  >
                    <option value="Informational">Informational</option>
                    <option value="Commercial Investigation">Commercial Investigation</option>
                    <option value="Transactional">Transactional</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/60 mb-1 block">Target Audience</label>
                  <input 
                    type="text" 
                    value={audience}
                    onChange={e => setAudience(e.target.value)}
                    placeholder="e.g. CMOs of SaaS companies" 
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-sm text-white focus:outline-none" 
                  />
                </div>
                {error && <p className="text-red-400 text-xs">{error}</p>}
                
                {ai === null && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 flex items-start gap-2 mb-2">
                    <AlertCircle size={14} className="text-yellow-500 mt-0.5 shrink-0" />
                    <p className="text-[10px] leading-tight text-yellow-200/80">
                      AI is not configured. Set VITE_GEMINI_API_KEY in your environment to use Blog Studio.
                    </p>
                  </div>
                )}
                
                  <button 
                    onClick={handleStartResearch}
                    disabled={isGenerating || ai === null}
                    className="w-full py-2 bg-brand-primary rounded-lg text-sm font-bold text-white shadow hover:bg-brand-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isGenerating ? <><Loader2 size={16} className="animate-spin" /> Swarm Running...</> : 'Start Swarm Pipeline'}
                  </button>
             </div>
          </div>
        </div>

        {/* Right Column: Live Output & Audits */}
        <div className="flex-grow bg-brand-white rounded-2xl border border-brand-dark/10 shadow-sm flex flex-col overflow-hidden">
          <div className="border-b border-brand-dark/5 p-4 bg-gray-50/50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-brand-gray" />
              <span className="font-bold text-brand-dark">Live Output: {steps[activeStep-1].name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 font-bold rounded-lg uppercase">Draft Mode</span>
            </div>
          </div>
          
          <div className="flex-grow p-8 overflow-y-auto bg-gray-50/30 text-brand-dark relative text-base leading-relaxed">
            {activeStep === 1 && brief && (
              <div className="max-w-3xl mx-auto space-y-6">
                 <div>
                    <h2 className="text-xl font-bold border-b pb-2 mb-4">Research Brief</h2>
                    <p><strong>Intent:</strong> {brief.intent}</p>
                    <p><strong>Primary Keyword:</strong> {brief.primaryKeyword}</p>
                    <div className="mt-4">
                      <strong>Secondary Keywords:</strong>
                      <ul className="list-disc pl-5 mt-2">
                        {brief.secondaryKeywords?.map((k: string) => <li key={k}>{k}</li>)}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <strong>Factual Data Points:</strong>
                      <ul className="list-disc pl-5 mt-2">
                        {brief.factualDataPoints?.map((k: string) => <li key={k}>{k}</li>)}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <strong>People Also Ask:</strong>
                      <ul className="list-disc pl-5 mt-2">
                        {brief.peopleAlsoAsk?.map((k: string) => <li key={k}>{k}</li>)}
                      </ul>
                    </div>
                 </div>
              </div>
            )}
            
            {activeStep === 2 && sme && (
              <div className="max-w-3xl mx-auto space-y-6">
                 <div>
                    <h2 className="text-xl font-bold border-b pb-2 mb-4">SME Insights</h2>
                    <div className="mt-4">
                      <strong>Expert Angles:</strong>
                      <ul className="list-disc pl-5 mt-2">
                        {sme.expertAngles?.map((k: string) => <li key={k}>{k}</li>)}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <strong>Advanced Frameworks:</strong>
                      <ul className="list-disc pl-5 mt-2">
                        {sme.advancedFrameworks?.map((k: string) => <li key={k}>{k}</li>)}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <strong>Industry Pitfalls:</strong>
                      <ul className="list-disc pl-5 mt-2">
                        {sme.industryPitfalls?.map((k: string) => <li key={k}>{k}</li>)}
                      </ul>
                    </div>
                 </div>
              </div>
            )}
            
            {activeStep === 3 && outline && (
              <div className="max-w-3xl mx-auto space-y-6">
                 <div>
                    <h2 className="text-xl font-bold border-b pb-2 mb-4">Content Outline</h2>
                    <h1 className="text-2xl font-black mb-6">{outline.title}</h1>
                    {outline.sections?.map((sec: any, i: number) => (
                      <div key={i} className="mb-6 p-4 bg-white border border-brand-dark/10 rounded-xl shadow-sm">
                        <h3 className={`font-bold ${sec.level === 2 ? 'text-lg' : 'text-md ml-4'}`}>H{sec.level}: {sec.heading}</h3>
                        <p className="text-sm text-brand-gray mt-2">{sec.instructions}</p>
                        <div className="flex gap-4 mt-3 text-xs">
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg font-bold">~{sec.targetWordCount} words</span>
                          <div className="flex gap-1 flex-wrap">
                            {sec.semanticTerms?.slice(0,3).map((t: string) => <span key={t} className="px-2 py-1 bg-gray-100 text-brand-dark rounded-lg">{t}</span>)}
                          </div>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeStep === 4 && draft && (
              <div className="max-w-3xl mx-auto space-y-6">
                 <div>
                    <h2 className="text-xl font-bold border-b pb-2 mb-4">Raw Draft HTML</h2>
                    <div className="prose prose-sm max-w-none bg-white p-6 rounded-xl border object-contain overflow-auto max-h-[60vh]">
                        <pre className="whitespace-pre-wrap font-mono text-xs text-brand-dark/80">{draft}</pre>
                    </div>
                 </div>
              </div>
            )}

            {activeStep === 5 && eeatDraft && (
              <div className="max-w-3xl mx-auto space-y-6">
                 <div>
                    <div className="flex justify-between items-center border-b pb-2 mb-4">
                      <h2 className="text-xl font-bold">EEAT Injected HTML</h2>
                      <button 
                        onClick={() => setIsEditingDraft(!isEditingDraft)}
                        className={`p-2 rounded-lg transition-colors ${isEditingDraft ? 'bg-brand-primary text-white' : 'hover:bg-gray-100 text-brand-gray'}`}
                        title={isEditingDraft ? "View Preview" : "Edit HTML"}
                      >
                        <Edit3 size={18} />
                      </button>
                    </div>
                    {isEditingDraft ? (
                      <RichTextEditor content={eeatDraft || ''} onChange={(html) => setEEATDraft(html)} />
                    ) : (
                      <div className="prose prose-sm max-w-none bg-white p-6 rounded-xl border shadow-sm" dangerouslySetInnerHTML={{ __html: eeatDraft }} />
                    )}
                 </div>

                 {/* Internal Link Suggestions Panel */}
                 {metaInfo && (
                   <div className="mt-8 border border-brand-dark/10 rounded-2xl overflow-hidden bg-white shadow-sm">
                      <button 
                        onClick={() => setShowSuggestions(!showSuggestions)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-2 font-bold text-brand-dark">
                          <LinkIcon size={18} className="text-brand-primary" />
                          Internal Link Suggestions
                        </div>
                        {showSuggestions ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                      
                      {showSuggestions && (
                        <div className="p-4 space-y-4">
                          {loadingSuggestions ? (
                            <div className="flex items-center gap-2 text-sm text-brand-gray py-4">
                              <Loader2 size={16} className="animate-spin" /> Analyzing content for link opportunities...
                            </div>
                          ) : suggestions.length === 0 ? (
                            <p className="text-sm text-brand-gray py-4 text-center italic">No relevant internal link opportunities found.</p>
                          ) : (
                            <>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {suggestions.map((s: any, idx: number) => (
                                  <div key={idx} className="p-4 border rounded-xl hover:border-brand-primary/30 transition-all flex gap-3">
                                    <input 
                                      type="checkbox"
                                      checked={!!selectedSuggestions[s.id || s.targetId]}
                                      onChange={(e) => setSelectedSuggestions(prev => ({ ...prev, [s.id || s.targetId]: e.target.checked }))}
                                      className="mt-1"
                                    />
                                    <div className="flex-1">
                                      <div className="flex justify-between items-start mb-1">
                                        <p className="text-xs font-bold text-brand-primary flex items-center gap-1 uppercase tracking-wider">
                                          Score: {Math.round(s.relevanceScore * 100)}%
                                        </p>
                                        <a href={`/insights/${s.targetSlug}`} target="_blank" rel="noopener noreferrer" className="text-brand-gray hover:text-brand-primary">
                                          <ExternalLink size={12} />
                                        </a>
                                      </div>
                                      <p className="text-sm font-bold text-brand-dark leading-tight mb-1">{s.targetTitle}</p>
                                      <p className="text-xs text-brand-gray line-clamp-2 italic">"{s.contextSentence}"</p>
                                      <p className="text-xs mt-2 text-brand-primary font-medium">Anchor: {s.anchorText}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <button 
                                onClick={applySelectedLinks}
                                disabled={Object.values(selectedSuggestions).filter(Boolean).length === 0}
                                className="w-full py-2 bg-brand-dark text-white rounded-lg text-sm font-bold disabled:opacity-50 mt-2"
                              >
                                Apply Selected Links ({Object.values(selectedSuggestions).filter(Boolean).length})
                              </button>
                            </>
                          )}
                        </div>
                      )}
                   </div>
                 )}
              </div>
            )}

            {activeStep === 6 && audit && (
              <div className="max-w-3xl mx-auto space-y-6">
                 <div>
                    <h2 className="text-xl font-bold border-b pb-2 mb-4">Quality Audit Report</h2>
                    <div className={`p-4 rounded-xl border mb-6 inline-flex items-center gap-3 ${audit.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <span className={`text-4xl font-black ${audit.passed ? 'text-green-600' : 'text-red-600'}`}>{audit.score}/100</span>
                      <div className="flex flex-col text-sm">
                         <span className="font-bold">Overall Status</span>
                         <span className={audit.passed ? 'text-green-700' : 'text-red-700'}>{audit.passed ? 'Passed all checks' : 'Requires fixes'}</span>
                      </div>
                    </div>
                    
                    {audit.issues?.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="font-bold text-lg">Flagged Issues</h3>
                        {audit.issues.map((issue: any, i: number) => (
                           <div key={i} className="p-4 bg-white border border-brand-dark/10 rounded-xl shadow-sm">
                              <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded mb-2 uppercase">{issue.type}</span>
                              <div className="bg-red-50 border-l-2 border-red-400 p-2 text-sm font-mono text-red-900 mb-2">"...{issue.snippet}..."</div>
                              <div className="bg-green-50 border-l-2 border-green-400 p-2 text-sm font-mono text-green-900">Suggested: "...{issue.suggestion}..."</div>
                           </div>
                        ))}
                      </div>
                    )}
                 </div>
              </div>
            )}

            {activeStep === 7 && metaInfo && (
              <div className="max-w-3xl mx-auto space-y-6">
                 <div>
                    <h2 className="text-xl font-bold border-b pb-2 mb-4">Meta & Schema Finalizer</h2>
                    <div className="space-y-4">
                       <div>
                         <label className="text-sm font-bold text-brand-dark block mb-1">Generated Title</label>
                         <div className="p-3 bg-white border rounded-xl">{metaInfo.title}</div>
                       </div>
                       <div>
                         <label className="text-sm font-bold text-brand-dark block mb-1">Generated Description</label>
                         <div className="p-3 bg-white border rounded-xl">{metaInfo.description}</div>
                       </div>
                       {schemaData && (
                          <div>
                            <label className="text-sm font-bold text-brand-dark block mb-1">Generated JSON-LD Schema</label>
                            <div className="p-3 bg-white border rounded-xl font-mono text-xs overflow-auto max-h-48">
                               <pre>{JSON.stringify(schemaData, null, 2)}</pre>
                            </div>
                          </div>
                       )}
                    </div>
                    <div className="mt-8">
                       <button onClick={handleApproveAndMove} className="px-6 py-3 bg-brand-dark text-white font-bold rounded-xl shadow-md w-full hover:bg-brand-primary transition-colors flex items-center justify-center gap-2">
                          Approve & Move to CMS Editor <ArrowRight size={18} />
                       </button>
                    </div>
                 </div>
              </div>
            )}

            {!brief && !isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center opacity-50">
                <div className="text-center font-mono">
                  <Bot size={48} className="mx-auto mb-4 text-brand-gray/30" />
                  <p>Configure inputs and run the pipeline to see output.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
