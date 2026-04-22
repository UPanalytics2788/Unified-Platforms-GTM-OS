import { executeAgentCall } from './core';

const SYSTEM_PROMPT = `You are a strict Content Quality Auditor.
Read the provided HTML text and run automated checks.
Rules:
1. Zero tolerance for em dashes (—).
2. Zero tolerance for asterisks (*).
3. Flag generic AI phrases natively.
4. If a generic phrase is found, supply an exact rewrite.
5. Provide pass/fail grades for the rules.

Always output valid JSON.`;

const SCHEMA = {
    type: "object",
    properties: {
        score: { type: "number" }, // 0 to 100
        passed: { type: "boolean" },
        issues: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    type: { type: "string" }, // "em-dash", "asterisk", "ai-phrase", "passive-voice"
                    snippet: { type: "string" },
                    suggestion: { type: "string" }
                },
                required: ["type", "snippet", "suggestion"]
            }
        }
    },
    required: ["score", "passed", "issues"]
};

export const runAuditAgent = async (htmlDraft: string) => {
    return await executeAgentCall<any>(SYSTEM_PROMPT, htmlDraft, SCHEMA, 0.1); // Low temp for analysis
};
