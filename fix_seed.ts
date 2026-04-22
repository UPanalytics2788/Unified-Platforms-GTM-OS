import fs from 'fs';

let content = fs.readFileSync('src/data/seedContent.ts', 'utf8');

const mapping: Record<string, string> = {
  'seo-strategy': 'Search & Organic',
  'performance-marketing': 'Performance Marketing',
  'content-marketing': 'Content & Media',
  'web-development': 'Development',
  'content-seo': 'Search & Organic',
  'technical-seo': 'Search & Organic',
  'local-seo': 'Search & Organic',
  'authority-building': 'Search & Organic',
  'aeo-geo': 'Search & Organic',
  'paid-search': 'Performance Marketing',
  'paid-social': 'Performance Marketing',
  'marketplace-ads': 'Performance Marketing',
  'content-strategy': 'Content & Media',
  'content-creation': 'Content & Media',
  'social-media': 'Content & Media',
  'email-marketing': 'Content & Media',
  'copywriting': 'Content & Media',
  'website-development': 'Development',
  'web-apps': 'Development',
  'cms-development': 'Development',
  'api-integrations': 'Development',
  'recruitment': 'Talent & HR',
  'executive-search': 'Talent & HR',
  'rpo': 'Talent & HR',
  'hr-consulting': 'Talent & HR',
  'cro': 'Performance Marketing',
};

// Also apply the fix carefully around single quotes/double quotes mappings.
for (const [slug, category] of Object.entries(mapping)) {
  const replaceStr = `$1\n    category: "${category}",`;
  
  // Clean up any existing category for this slug
  // the slug can be 'slug' or "slug"
  // so we find `slug: "some-slug",\n category: "...",` -> replace
  // or `slug: 'some-slug',` -> replace
  content = content.replace(
    new RegExp(`(slug:\\s*['"]${slug}['"],)\\s*category:\\s*['"][^'"]+['"],`, 'g'),
    replaceStr
  );
  
  // If not matched above, we find slug without category. We just add it
  // Wait, if it's already updated, maybe it has category now, but we just replaced it. 
  // Let's just do a replace, assuming it might not have category.
  if(!new RegExp(`(slug:\\s*['"]${slug}['"],)\\s*category:\\s*['"][^'"]+['"],`).test(content)) {
     // this will add it if it doesn't have it
     content = content.replace(
       new RegExp(`(slug:\\s*['"]${slug}['"],)(?!\\s*category:)`, 'g'),
       replaceStr
     );
  }
}

fs.writeFileSync('src/data/seedContent.ts', content);
console.log("Updated categories in seedContent.ts");
