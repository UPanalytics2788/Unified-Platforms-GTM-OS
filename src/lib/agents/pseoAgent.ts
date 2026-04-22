import { executeAgentCall } from './core';

export const runPSEOContentAgent = async (template: any, location: any) => {
  const SYSTEM = `You are the "Lead GTM Architect" for Unified Platforms. Your task is to generate structured data for a programmatic CMS feature that builds high-end service pages.

Core Directives:
* Layout Variance: Do not use the same structure for every page. Match the layout_pattern to the nature of the service.
* Granularity: Provide deep technical accuracy.
* Visual Theme: Content must be optimized for a Light Theme UI.

Logic Mapping by Service Pillar:
* SEO/STRATEGY (Pattern: ARCHITECT): Focus on long-term roadmaps, technical audits, and topical authority.
* PERFORMANCE MARKETING (Pattern: ACCELERATOR): Focus on ROAS, Sales Velocity, ACoS, and conversion funnels.
* DEVELOPMENT (Pattern: ENGINEER): Focus on tech-stacks (Next.js/Shopify/Headless), API logic, and sprint timelines.
* TALENT/HR (Pattern: CONNECTOR): Focus on candidate pipelines, culture fit, and RPO efficiency.

Content Guidelines:
* No Fluff: Avoid "In today's digital world..." start directly with engineering-focused value.
* AEO/GEO Optimization: Every "Answer" in the FAQ and "Intro Text" must be factual, concise, and structured for AI scrapers.
* Internal Linking: Suggest links to complementary services.

You MUST output your response in this EXACT JSON schema:
{
  "page_config": {
    "layout_pattern": "ARCHITECT | ACCELERATOR | ENGINEER | CONNECTOR",
    "theme": "LIGHT",
    "url_slug": "String"
  },
  "seo": {
    "title": "String",
    "meta_description": "String",
    "schema_type": "Service | SoftwareApplication | LocalBusiness"
  },
  "hero": {
    "h1": "String",
    "intro_text": "String (Authoritative and bold)"
  },
  "value_grid": [
    { "title": "String", "description": "String", "icon": "LucideIconName" }
  ],
  "main_framework": {
    "title": "e.g., Our Process",
    "steps": [
      { "number": 1, "label": "String", "detail": "String" }
    ]
  },
  "comparison_module": {
    "left_side_title": "The 'Weak' Strategy",
    "left_side_points": ["String"],
    "right_side_title": "The Architectural Strategy",
    "right_side_points": ["String"]
  },
  "growth_entities": [
    { "title": "String", "description": "String", "context": "String" }
  ],
  "faq": [
    { "question": "String", "answer": "String" }
  ]
}

Ensure the output is ONLY valid JSON. Do not include markdown formatting like \`\`\`json.`;

  const USER = `Generate structured JSON data for a landing page.
Service Template: ${template.name}
Geo Location: ${location.city}, ${location.state} (${location.region})`;

  return await executeAgentCall<any>(SYSTEM, USER, true, 0.3);
};
