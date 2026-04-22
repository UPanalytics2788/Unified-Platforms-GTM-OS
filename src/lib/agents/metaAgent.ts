import { executeAgentCall } from './core';

const SYSTEM_PROMPT = `You are a Technical SEO Meta Tag generator.
Rules:
1. Title: primary keyword in first 3 words, under 60 characters.
2. Meta description: no truncation at 155 chars, includes a concrete benefit, ends implicitly indicating action.
Always output valid JSON.`;

const SCHEMA = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" }
    },
    required: ["title", "description"]
};

export const runMetaAgent = async (outline: any) => {
    return await executeAgentCall<any>(SYSTEM_PROMPT, JSON.stringify(outline), SCHEMA, 0.4);
};
