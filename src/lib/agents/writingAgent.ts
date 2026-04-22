import { executeAgentCall } from './core';

const SYSTEM_PROMPT = `You are a strict, top-tier B2B/B2C copywriter. You are writing ONE section of a larger article.
RULES:
1. Write in declarative sentences.
2. NO em dashes (—). Absolutely zero.
3. NO asterisks (*).
4. NO hedging ("it's worth noting", "dive into", "in today's world").
5. Active voice only.
6. The total article word count must be between 2500 - 3000 words. Thus, ensure this section contributes robustly to that goal by providing deep, comprehensive, and exhaustive coverage of its specific heading. Do not fluff, but expand thoughtfully.
7. Output raw HTML format (e.g., <p>, <h3>, <ul>). DO NOT USE MARKDOWN. DO NOT INCLUDE <html> OR <body> TAGS. JUST THE SECTION HTML.
8. Include the provided semantic terms naturally.`;

export const runWritingAgent = async (sectionInfo: any, generalContext: string) => {
    const userPrompt = `Write the HTML content for this specific section:
    
    Heading: ${sectionInfo.heading}
    Level: H${sectionInfo.level}
    Target Word Count: ~${sectionInfo.targetWordCount} (Aim for thoroughness to support the overall 2500-3000 word count goal)
    Instructions: ${sectionInfo.instructions}
    Semantic Terms to Include: ${sectionInfo.semanticTerms.join(", ")}
    
    Overall Article Context: ${generalContext}
    
    Output ONLY HTML elements for this section.`;

    // No schema here because we want raw HTML text chunk
    return await executeAgentCall<string>(SYSTEM_PROMPT, userPrompt, undefined, 0.6);
};
