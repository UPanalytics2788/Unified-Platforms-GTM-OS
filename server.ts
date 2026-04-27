import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.APP_URL}/api/calendar/callback`
);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });
  
  app.post("/api/agent", async (req, res) => {
    try {
      const { systemPrompt, userPrompt, responseSchema, temperature, tools, model: modelOverride } = req.body;
      const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;
      if (!ai) {
        return res.status(500).json({ success: false, error: 'GEMINI_API_KEY is not configured on the server.' });
      }
      
      const modelName = modelOverride || process.env.VITE_CHATBOT_MODEL || 'gemini-3-flash-preview';
      
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
          return res.json({ success: true, data: JSON.parse(text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()) });
        } catch {
          return res.json({ success: false, error: `JSON parse failed: ${text.substring(0, 200)}` });
        }
      }
      
      return res.json({ success: true, data: text });
    } catch (error: any) {
      console.error('Agent API error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.get("/api/calendar/auth", (req, res) => {
    const scopes = ["https://www.googleapis.com/auth/calendar"];
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
    });
    res.json({ url });
  });

  app.get("/api/calendar/callback", async (req, res) => {
    const { code } = req.query;
    try {
      const { tokens } = await oauth2Client.getToken(code as string);
      oauth2Client.setCredentials(tokens);
      // TODO: Store tokens in Firestore
      res.send("Authentication successful. You can close this window.");
    } catch (error) {
      res.status(500).send("Authentication failed.");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
