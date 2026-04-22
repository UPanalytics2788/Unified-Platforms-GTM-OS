import { executeAgentCall } from './core';

const SYSTEM_PROMPT = `You are a Senior Content Strategist and Research Agent.
Your job is to generate a comprehensive research brief based on a topic and search intent.
The brief must include identified search intent, primary and secondary keywords,
important factual data points to include, and common questions (People Also Ask) to answer.
Always output valid JSON.`;

export const runResearchAgent = async (topic: string, intent: string, audience: string) => {
    const userPrompt = `Generate a research brief for the following topic: "${topic}".
    Search Intent: ${intent}
    Target Audience: ${audience}`;

    try {
        const response = await executeAgentCall<any>(
            SYSTEM_PROMPT,
            userPrompt,
            { type: 'object' }, // Dummy schema to trigger JSON parsing, though the prompt asks for JSON
            0.2,
            [{ googleSearch: {} }]
        );
        
        if (response.success && response.data) {
            return { success: true, data: response.data };
        } else {
             return { success: true, data: {
                intent: intent,
                primaryKeyword: topic,
                secondaryKeywords: [],
                factualDataPoints: [(response.error || "Failed to parse").substring(0, 500)],
                peopleAlsoAsk: [],
                competitorGaps: []
            }};
        }
    } catch (e: any) {
        console.error("Research agent failed:", e);
        return { success: false, error: e.message };
    }
};
