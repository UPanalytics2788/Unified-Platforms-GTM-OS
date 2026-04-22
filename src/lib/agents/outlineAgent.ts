import { executeAgentCall } from './core';

const SYSTEM_PROMPT = `You are an Outline Generation Agent.
Your job is to read a research brief and generate a highly structured outline for a blog post.
No generic H2s like "Introduction" or "Conclusion". Every heading must answer a real user question or provide specific value.
Always output valid JSON representing the outline hierarchy.`;

const SCHEMA = {
    type: "object",
    properties: {
        title: { type: "string" },
        sections: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    heading: { type: "string" },
                    level: { type: "number" }, // 2 for H2, 3 for H3
                    targetWordCount: { type: "number" },
                    instructions: { type: "string" },
                    semanticTerms: { type: "array", items: { type: "string" } }
                },
                required: ["heading", "level", "targetWordCount", "instructions", "semanticTerms"]
            }
        }
    },
    required: ["title", "sections"]
};

export const runOutlineAgent = async (researchBrief: any) => {
    const userPrompt = `Based on the following research brief, generate a detailed outline:\n\n${JSON.stringify(researchBrief, null, 2)}`;
    return await executeAgentCall<any>(SYSTEM_PROMPT, userPrompt, SCHEMA, 0.4);
};
