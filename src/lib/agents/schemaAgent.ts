import { executeAgentCall } from './core';

const SYSTEM_PROMPT = `You are a Technical SEO Schema.org Engineer.
Your job is to read an article outline and its meta information, and output a valid JSON-LD structure using Schema.org vocabulary.
For articles, use the 'Article' or 'BlogPosting' type. Ensure properties like headline, description, about (topics), and mainEntityOfPage are correctly populated based on the provided context.
Output only the raw JSON-LD object. Do not include <script> tags.`;

const SCHEMA = {
    type: "object",
    properties: {
        "@context": { type: "string" },
        "@type": { type: "string", enum: ["Article", "BlogPosting", "TechArticle"] },
        "headline": { type: "string" },
        "description": { type: "string" },
        "about": {
            type: "array",
            items: {
                type: "object",
                properties: {
                    "@type": { type: "string" },
                    "name": { type: "string" }
                },
                required: ["@type", "name"]
            }
        },
        "author": {
            type: "object",
            properties: {
                "@type": { type: "string" },
                "name": { type: "string" }
            },
            required: ["@type", "name"]
        }
    },
    required: ["@context", "@type", "headline", "description", "author"]
};

export const runSchemaAgent = async (outline: any, metaInfo: any) => {
    const userPrompt = `Generate a comprehensive JSON-LD schema for the following article:
    
    Meta Information:
    ${JSON.stringify(metaInfo, null, 2)}
    
    Article Outline:
    ${JSON.stringify(outline, null, 2)}
    `;
    return await executeAgentCall<any>(SYSTEM_PROMPT, userPrompt, SCHEMA, 0.2); // Low temp to ensure strict formatting
};
