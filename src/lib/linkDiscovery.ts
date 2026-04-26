import { collection, getDocs, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { executeAgentCall } from './agents/core';

export async function runLinkDiscovery(
  sourceId: string, 
  sourceCollection: string, 
  sourceTitle: string, 
  sourceContent: string
): Promise<{ targetId: string; targetTitle: string; targetSlug: string; anchorText: string; contextSentence: string; relevanceScore: number }[]> {
  try {
    const [insightsSnap, servicesSnap, pseoSnap] = await Promise.all([
      getDocs(query(collection(db, 'insights'), where('status', '==', 'published'))),
      getDocs(query(collection(db, 'services'), where('status', '==', 'published'))),
      getDocs(query(collection(db, 'pseo_pages'), where('status', '==', 'published')))
    ]);
    
    const candidates = [
      ...insightsSnap.docs.map(d => ({ id: d.id, collection: 'insights', ...d.data() as any })),
      ...servicesSnap.docs.map(d => ({ id: d.id, collection: 'services', ...d.data() as any })),
      ...pseoSnap.docs.map(d => ({ id: d.id, collection: 'pseo_pages', ...d.data() as any }))
    ].filter(p => p.id !== sourceId);

    if (candidates.length === 0) return [];

    const candidateSummary = candidates.slice(0, 20).map(c => 
      `ID:${c.id} | Title: ${c.title || c.name} | Slug: ${c.slug} | Keywords: ${c.primary_keyword || ''}`
    ).join('\n');

    const SYSTEM = `You are an internal linking specialist. Given a source article and a list of candidate pages, identify the best internal link opportunities. Return JSON array only. No markdown.`;
    const USER = `Source Article Title: "${sourceTitle}"
Source Content (first 500 chars): ${sourceContent.substring(0, 500)}

Candidate Pages:
${candidateSummary}

Return a JSON array of up to 5 objects with keys: targetId, targetTitle, targetSlug, anchorText, contextSentence, relevanceScore (0-1). Only include candidates with relevanceScore >= 0.65. contextSentence must be an exact sentence from the source content.`;

    const result = await executeAgentCall<any[]>(SYSTEM, USER, [{}], 0.1);
    
    if (!result.success || !Array.isArray(result.data)) return [];

    // Write suggestions to Firestore
    for (const suggestion of result.data) {
      await addDoc(collection(db, 'link_graph'), {
        sourceId, sourceCollection, sourceTitle,
        targetId: suggestion.targetId,
        targetTitle: suggestion.targetTitle,
        targetSlug: suggestion.targetSlug,
        anchorText: suggestion.anchorText,
        contextSentence: suggestion.contextSentence,
        relevanceScore: suggestion.relevanceScore,
        status: 'suggested',
        createdAt: serverTimestamp()
      });
    }
    
    return result.data;
  } catch (e) {
    console.error('Link discovery error:', e);
    return [];
  }
}
