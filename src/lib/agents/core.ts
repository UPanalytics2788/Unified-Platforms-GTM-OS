import { GoogleGenAI } from '@google/genai';

// Initialize with VITE_GEMINI_API_KEY for static frontends (Vercel)
const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || '').trim();
export const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export interface AgentResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const executeAgentCall = async <T>(
  systemPrompt: string,
  userPrompt: string,
  responseSchema?: any,
  temperature: number = 0.3,
  tools?: any[],
  modelOverride?: string
): Promise<AgentResponse<T>> => {
  try {
    // 1. Try the AI Studio Express Backend Proxy first
    const response = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemPrompt, userPrompt, responseSchema, temperature, tools, model: modelOverride })
    });

    // If it succeeds or returns a clear error from the backend, use it.
    if (response.ok) {
      return await response.json();
    } 

    console.warn(`Backend proxy returned ${response.status}. Attempting client-side fallback.`);
    // Fall through to client-side logic below 
  } catch (err) {
    // Continue to fallback if fetch completely fails (e.g., network error or proxy unreachable)
    console.warn("Backend proxy unavailable, falling back to client-side SDK.");
  }

  // 2. Fallback to Client-Side API for Static Host Deployments (Vercel/Hostinger)
  if (!ai) {
    return { success: false, error: 'AI Backend returned an error and no VITE_GEMINI_API_KEY was found for client-side fallback.' };
  }

  try {
    const modelName = modelOverride || import.meta.env.VITE_CHATBOT_MODEL || 'gemini-flash-latest';
    
    const response = await ai.models.generateContent({
      model: modelName,
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature,
        responseMimeType: responseSchema ? 'application/json' : 'text/plain',
        tools: tools ? tools : undefined
      }
    });

    const text = response.text || '';
    
    if (responseSchema && text) {
      try {
        return { success: true, data: JSON.parse(text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()) };
      } catch {
        return { success: false, error: `JSON parse failed: ${text.substring(0, 200)}` };
      }
    }
    
    return { success: true, data: text as any };
  } catch (err: any) {
    console.error('Agent SDK error:', err);
    return { success: false, error: err.message || 'Agent logic execution failed in browser SDK.' };
  }
};
