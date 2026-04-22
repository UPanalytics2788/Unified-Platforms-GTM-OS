import { executeAgentCall } from './core';

const SYSTEM_PROMPT = `You are a Subject Matter Expert (SME) Insights Agent.
Your job is to review a research brief for a blog post and inject unique, experienced perspectives (SME insights) that generic articles would miss. 
Identify 3-5 non-obvious angles, proprietary insights, or advanced frameworks that elevate the content from basic to authoritative.
Always output valid JSON that strictly matches the schema.`;

const SCHEMA = {
    type: "object",
    properties: {
        expertAngles: {
            type: "array",
            items: { type: "string" },
            description: "A list of unique, non-obvious expert perspectives to explore in the article."
        },
        advancedFrameworks: {
            type: "array",
            items: { type: "string" },
            description: "A list of strategic models, frameworks, or methodologies relevant to the topic."
        },
        industryPitfalls: {
            type: "array",
            items: { type: "string" },
            description: "A list of common industry mistakes or pitfalls the reader should be warned about."
        }
    },
    required: ["expertAngles", "advancedFrameworks", "industryPitfalls"]
};

export const runSMEAgent = async (researchBrief: any) => {
    const userPrompt = `Review the following research brief and generate SME insights to elevate the article's depth and authority:\n\n${JSON.stringify(researchBrief, null, 2)}`;
    return await executeAgentCall<any>(SYSTEM_PROMPT, userPrompt, SCHEMA, 0.5); // A little higher temp for creativity
};
