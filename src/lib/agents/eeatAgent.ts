import { executeAgentCall } from './core';

const SYSTEM_PROMPT = `You are an EEAT (Experience, Expertise, Authoritativeness, Trustworthiness) Injection Agent.
Your job is to read an HTML draft of an article and inject authority signals.
Rules:
1. Do not rewrite the entire text unless a section lacks an original POV.
2. Maintain the HTML structure.
3. Identify 2-3 logical places to add factual stats or citations (wrap them in <cit> tags for the auditor to find later).
4. Add first-person perspective framing if it flows better than passive phrasing.
Always output the revised HTML natively.`;

export const runEEATAgent = async (htmlDraft: string) => {
    return await executeAgentCall<string>(SYSTEM_PROMPT, htmlDraft, undefined, 0.4);
};
