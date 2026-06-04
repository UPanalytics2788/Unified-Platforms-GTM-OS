/**
 * migrate-schema.ts
 * One-time migration utility: upgrades all Firestore service/solution docs
 * from Schema A (flat fields) to Schema B (nested, required by UnifiedServicePageTemplate).
 * Called from Admin Dashboard → "Repair Schema" button.
 */
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

function mapIcon(t: string): string {
  const lower = (t || '').toLowerCase();
  if (lower.includes('speed') || lower.includes('velocity')) return 'Zap';
  if (lower.includes('security') || lower.includes('shield')) return 'Shield';
  if (lower.includes('revenue') || lower.includes('growth') || lower.includes('roi')) return 'TrendingUp';
  if (lower.includes('search') || lower.includes('audit') || lower.includes('seo')) return 'Search';
  if (lower.includes('tech') || lower.includes('code') || lower.includes('dev')) return 'Code';
  if (lower.includes('data') || lower.includes('analytics')) return 'BarChart2';
  if (lower.includes('content') || lower.includes('writ')) return 'FileText';
  if (lower.includes('link') || lower.includes('authority')) return 'Link';
  if (lower.includes('email')) return 'Mail';
  if (lower.includes('social') || lower.includes('community')) return 'Users';
  if (lower.includes('paid') || lower.includes('ads') || lower.includes('ppc')) return 'Megaphone';
  return 'Check';
}

function deriveLayoutPattern(category: string): string {
  const c = (category || '').toLowerCase();
  if (c.includes('performance') || c.includes('media') || c.includes('cro') || c.includes('ads') || c.includes('paid') || c.includes('social')) return 'ACCELERATOR';
  if (c.includes('development') || c.includes('tech') || c.includes('web') || c.includes('cms') || c.includes('api') || c.includes('app')) return 'ENGINEER';
  if (c.includes('talent') || c.includes('hr') || c.includes('recruitment') || c.includes('executive') || c.includes('rpo')) return 'CONNECTOR';
  return 'ARCHITECT';
}

function upgradeDoc(docId: string, data: any): any {
  const title = data.title || data.name || '';
  const category = data.category || '';

  const features = data.service_grid || data.features || data.use_cases || [];
  const processSteps = data.process_steps || data.framework_steps || [];

  const value_grid = data.value_grid || features.map((f: any) => {
    if (typeof f === 'string') return { title: f, description: '', icon: mapIcon(f) };
    return {
      title: f.title || '',
      description: f.desc || f.description || '',
      icon: f.icon || mapIcon(f.title || '')
    };
  });

  const main_framework = data.main_framework || (processSteps.length > 0 ? {
    title: `The ${title} Process`,
    steps: processSteps.map((s: any, idx: number) => ({
      number: idx + 1,
      label: s.title || s.label || '',
      detail: s.desc || s.detail || s.description || ''
    }))
  } : null);

  const heroH1 = data.hero?.h1 || data.hero_title || title;
  const heroIntro = data.hero?.intro_text || data.hero_subtitle || data.description || '';

  return {
    ...data,
    slug: data.slug || docId,
    hero_title: heroH1,
    hero_subtitle: heroIntro,
    page_config: data.page_config || {
      layout_pattern: data.layout_pattern || deriveLayoutPattern(category),
      theme: 'LIGHT',
      url_slug: data.slug || docId,
    },
    seo: data.seo || {
      title: data.meta_title || (title ? `${title} | Unified Platforms` : 'Unified Platforms'),
      meta_description: data.meta_description || data.description || '',
      schema_type: 'Service',
    },
    hero: { h1: heroH1, intro_text: heroIntro },
    value_grid: value_grid.length > 0 ? value_grid : [],
    main_framework: main_framework || null,
    updatedAt: new Date().toISOString(),
  };
}

export async function migrateCollectionToNewSchema(
  collectionName: 'services' | 'solutions'
): Promise<{ success: number; failed: number; errors: string[] }> {
  let success = 0;
  let failed = 0;
  const errors: string[] = [];

  try {
    const snap = await getDocs(collection(db, collectionName));
    console.log(`[migrate] Found ${snap.size} docs in '${collectionName}'`);

    for (const docSnap of snap.docs) {
      const data = docSnap.data();
      const docId = docSnap.id;

      // Already fully migrated — just ensure slug field exists in body
      if (data.page_config && data.hero?.h1 && Array.isArray(data.value_grid)) {
        if (!data.slug) {
          await setDoc(docSnap.ref, { slug: docId }, { merge: true });
        }
        success++;
        continue;
      }

      try {
        const upgraded = upgradeDoc(docId, data);
        await setDoc(doc(db, collectionName, docId), upgraded, { merge: true });
        console.log(`[migrate] Upgraded: ${docId}`);
        success++;
      } catch (err: any) {
        console.error(`[migrate] Failed: ${docId}`, err);
        failed++;
        errors.push(`${docId}: ${err.message}`);
      }
    }
  } catch (err: any) {
    console.error('[migrate] Collection fetch failed:', err);
    errors.push(`Collection error: ${err.message}`);
  }

  return { success, failed, errors };
}

export async function migrateServicesToNewSchema() {
  return migrateCollectionToNewSchema('services');
}
