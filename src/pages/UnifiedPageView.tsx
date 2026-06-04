import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { doc, onSnapshot, collection, query, where, limit, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import UnifiedServicePageTemplate from '../components/UnifiedServicePageTemplate';
import { SERVICES_CONTENT, SOLUTIONS_CONTENT, UNIFIED_PAGES } from '../data/seedContent';
import { CASE_STUDIES } from '../data/caseStudies';

function processPageData(pageData: any, slug: string): any {
  if (!pageData) return null;

  const pageTitle = (pageData.title || pageData.name || '').toLowerCase();
  const pageCategory = (pageData.category || '').toLowerCase();
  const relevantCaseStudies = CASE_STUDIES.filter(cs =>
    cs.serviceCategory.toLowerCase().includes(pageTitle) ||
    pageTitle.includes(cs.serviceCategory.toLowerCase()) ||
    cs.serviceCategory.toLowerCase().includes(pageCategory) ||
    (slug && cs.slug.includes(slug))
  ).slice(0, 3);

  if (pageData.page_config && pageData.hero && pageData.value_grid) {
    return {
      ...pageData,
      case_studies: (pageData.case_studies && pageData.case_studies.length > 0)
        ? pageData.case_studies
        : relevantCaseStudies,
    };
  }

  const title = pageData.title || pageData.name || '';
  const category = pageCategory;

  let layout_pattern = 'ARCHITECT';
  if (category.includes('performance') || category.includes('media') || category.includes('cro') || category.includes('ads') || category.includes('paid') || category.includes('social')) {
    layout_pattern = 'ACCELERATOR';
  } else if (category.includes('development') || category.includes('tech') || category.includes('web') || category.includes('cms') || category.includes('api') || category.includes('app')) {
    layout_pattern = 'ENGINEER';
  } else if (category.includes('talent') || category.includes('hr') || category.includes('recruitment') || category.includes('executive') || category.includes('rpo')) {
    layout_pattern = 'CONNECTOR';
  }

  const mapIcon = (t: string) => {
    const lower = (t || '').toLowerCase();
    if (lower.includes('speed') || lower.includes('velocity')) return 'Zap';
    if (lower.includes('security') || lower.includes('shield')) return 'Shield';
    if (lower.includes('revenue') || lower.includes('growth') || lower.includes('roi')) return 'TrendingUp';
    if (lower.includes('search') || lower.includes('audit') || lower.includes('seo')) return 'Search';
    if (lower.includes('tech') || lower.includes('code') || lower.includes('dev')) return 'Code';
    if (lower.includes('data') || lower.includes('analytics')) return 'BarChart2';
    if (lower.includes('content') || lower.includes('writ')) return 'FileText';
    if (lower.includes('link') || lower.includes('authority')) return 'Link';
    if (lower.includes('local')) return 'MapPin';
    if (lower.includes('email')) return 'Mail';
    if (lower.includes('social') || lower.includes('community')) return 'Users';
    if (lower.includes('paid') || lower.includes('ads') || lower.includes('ppc')) return 'Megaphone';
    return 'Check';
  };

  const features = pageData.service_grid || pageData.features || pageData.use_cases || [];
  const processSteps = pageData.process_steps || pageData.framework_steps || [];

  const value_grid = pageData.value_grid ||
    (features.length > 0 ? features.map((f: any) => {
      if (typeof f === 'string') return { title: f, description: '', icon: mapIcon(f) };
      return {
        title: f.title || '',
        description: f.desc || f.description || '',
        icon: f.icon || mapIcon(f.title || '')
      };
    }) : []);

  const main_framework = pageData.main_framework ||
    (processSteps.length > 0 ? {
      title: `The ${title} Process`,
      steps: processSteps.map((s: any, idx: number) => ({
        number: idx + 1,
        label: s.title || s.label || '',
        detail: s.desc || s.detail || s.description || ''
      }))
    } : null);

  const heroH1 = pageData.hero?.h1 || pageData.hero_title || title;
  const heroIntro = pageData.hero?.intro_text || pageData.hero_subtitle || pageData.description || pageData.problem || '';

  return {
    ...pageData,
    slug: pageData.slug || slug,
    page_config: pageData.page_config || {
      layout_pattern: pageData.layout_pattern || layout_pattern,
      theme: pageData.theme || 'LIGHT',
      url_slug: slug
    },
    seo: pageData.seo || {
      title: pageData.meta_title || (title ? `${title} | Unified Platforms` : 'Unified Platforms'),
      meta_description: pageData.meta_description || pageData.description || '',
      schema_type: 'Service'
    },
    hero: { h1: heroH1, intro_text: heroIntro },
    value_grid,
    main_framework,
    comparison_module: pageData.comparison_module || null,
    growth_entities: pageData.growth_entities || null,
    engagement_models: pageData.engagement_models || null,
    faq: pageData.faq || pageData.faqs || [],
    case_studies: (pageData.case_studies && pageData.case_studies.length > 0)
      ? pageData.case_studies
      : relevantCaseStudies,
    content: pageData.content || pageData.long_content || null,
  };
}

export default function UnifiedPageView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  let collectionName = 'services';
  if (location.pathname.startsWith('/solutions')) collectionName = 'solutions';
  if (location.pathname.startsWith('/unified')) collectionName = 'unified_pages';

  useEffect(() => {
    if (!slug) return;

    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }

    setLoading(true);
    setData(null);
    setError(null);

    function useLocalFallback() {
      let localArray: any[] = collectionName === 'solutions' ? SOLUTIONS_CONTENT : SERVICES_CONTENT;
      if (collectionName === 'unified_pages') localArray = UNIFIED_PAGES;
      const local = localArray.find(
        (item) => item.slug === slug || item?.page_config?.url_slug === slug
      );
      if (local) {
        setData(processPageData(local, slug));
      } else {
        setError('Page not found');
      }
      setLoading(false);
    }

    // STRATEGY 1: Direct doc ID lookup (services seeded with doc ID = slug)
    const docRef = doc(db, collectionName, slug);
    let unsubQuery: (() => void) | null = null;

    const unsubDirect = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setData(processPageData({ id: docSnap.id, ...docSnap.data() }, slug));
          setLoading(false);
          return;
        }

        // STRATEGY 2: where('slug','==') query for auto-ID docs
        const q = query(collection(db, collectionName), where('slug', '==', slug), limit(1));
        unsubQuery = onSnapshot(
          q,
          (snapshot) => {
            if (!snapshot.empty) {
              const d = snapshot.docs[0];
              setData(processPageData({ id: d.id, ...d.data() }, slug));
              setLoading(false);
              return;
            }

            // STRATEGY 3: unified_pages fallback
            if (collectionName !== 'unified_pages') {
              const uniRef = doc(db, 'unified_pages', slug);
              getDoc(uniRef).then((uniSnap) => {
                if (uniSnap.exists()) {
                  setData(processPageData({ id: uniSnap.id, ...uniSnap.data() }, slug));
                  setLoading(false);
                } else {
                  useLocalFallback();
                }
              }).catch(() => useLocalFallback());
            } else {
              useLocalFallback();
            }
          },
          () => useLocalFallback()
        );
      },
      () => useLocalFallback()
    );

    unsubscribeRef.current = () => {
      unsubDirect();
      if (unsubQuery) unsubQuery();
    };

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [slug, collectionName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
          <div className="animate-pulse space-y-8">
            <div className="h-6 w-32 bg-gray-100 rounded-full" />
            <div className="h-16 w-3/4 bg-gray-100 rounded-xl" />
            <div className="h-8 w-1/2 bg-gray-100 rounded-xl" />
            <div className="grid grid-cols-3 gap-6 mt-16">
              {[1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-100 rounded-2xl" />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
        <p className="text-brand-gray text-sm uppercase tracking-widest mb-4">404</p>
        <h1 className="text-3xl font-bold text-brand-dark mb-4">Page not found</h1>
        <p className="text-brand-gray mb-8">We couldn't find the page you're looking for.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-brand-primary text-white rounded-lg font-bold"
        >
          Return Home
        </button>
      </div>
    );
  }

  return <UnifiedServicePageTemplate data={data} />;
}
