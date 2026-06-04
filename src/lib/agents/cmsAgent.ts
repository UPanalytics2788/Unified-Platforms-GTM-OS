import { executeAgentCall } from './core';

const SYSTEM_PROMPT = `You are the "Lead Architect" for Unified Platforms. Your task is to generate structured data for a programmatic CMS feature that builds high-end service pages.

Core Directives:
* Layout Variance: Do not use the same structure for every page. Match the layout_pattern to the nature of the SERVICE.
* Granularity: Use deep depth, adapt the 8-step process and Value Grid to be technically accurate for the specific service.
* Visual Theme: Content must be optimized for a Light Theme UI (High-contrast, clean, cyan accents).

Logic Mapping by Service Pillar:
* SEO/STRATEGY (Pattern: ARCHITECT): Focus on long-term roadmaps, technical audits, and topical authority.
* PERFORMANCE MARKETING (Pattern: ACCELERATOR): Focus on ROAS, Sales Velocity, ACoS, and conversion funnels.
* DEVELOPMENT (Pattern: ENGINEER): Focus on tech-stacks (Next.js/Shopify/Headless), API logic, and sprint timelines.
* TALENT/HR (Pattern: CONNECTOR): Focus on candidate pipelines, culture fit, and RPO efficiency.

Content Guidelines:
* No Fluff: Avoid "In today's digital world..." start directly with engineering-focused value.
* AEO/GEO Optimization: Every "Answer" in the FAQ and "Intro Text" must be factual, concise, and structured for AI scrapers.
* Internal Linking: Suggest links to complementary services.

Always return a valid JSON object matching the schema exactly.`;

const SCHEMA = {
    type: "object",
    properties: {
        page_config: {
            type: "object",
            properties: {
                layout_pattern: { type: "string", enum: ["ARCHITECT", "ACCELERATOR", "ENGINEER", "CONNECTOR"] },
                theme: { type: "string" },
                url_slug: { type: "string" }
            },
            required: ["layout_pattern", "theme", "url_slug"]
        },
        seo: {
            type: "object",
            properties: {
                title: { type: "string" },
                meta_description: { type: "string" },
                schema_type: { type: "string", enum: ["Service", "SoftwareApplication", "LocalBusiness"] }
            },
            required: ["title", "meta_description", "schema_type"]
        },
        hero: {
            type: "object",
            properties: {
                h1: { type: "string" },
                intro_text: { type: "string" }
            },
            required: ["h1", "intro_text"]
        },
        value_grid: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    icon: { type: "string" }
                },
                required: ["title", "description", "icon"]
            }
        },
        main_framework: {
            type: "object",
            properties: {
                title: { type: "string" },
                steps: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            number: { type: "number" },
                            label: { type: "string" },
                            detail: { type: "string" }
                        },
                        required: ["number", "label", "detail"]
                    }
                }
            },
            required: ["title", "steps"]
        },
        comparison_module: {
            type: "object",
            properties: {
                left_side_title: { type: "string" },
                left_side_points: { type: "array", items: { type: "string" } },
                right_side_title: { type: "string" },
                right_side_points: { type: "array", items: { type: "string" } }
            },
            required: ["left_side_title", "left_side_points", "right_side_title", "right_side_points"]
        },
        growth_entities: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    context: { type: "string" }
                },
                required: ["title", "description", "context"]
            }
        },
        faq: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    answer: { type: "string" }
                },
                required: ["question", "answer"]
            }
        }
    },
    required: ["page_config", "seo", "hero", "value_grid", "main_framework", "comparison_module", "growth_entities", "faq"]
};

export const runCmsAgent = async (serviceName: string, serviceDescription: string) => {
    const userPrompt = `Generate the programatic CMS JSON for the following service:
    
    Service Name: ${serviceName}
    Additional Context / Brief Description: ${serviceDescription}
    
    Ensure you pick the correct layout_pattern based on the service's domain (SEO/Dev/Marketing/HR).`;

    return await executeAgentCall<any>(SYSTEM_PROMPT, userPrompt, SCHEMA, 0.4);
};
