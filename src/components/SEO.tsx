import { Helmet } from 'react-helmet-async';

interface HreflangLink {
  href: string;
  hreflang: string;
}

interface SchemaData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  hreflangLinks?: HreflangLink[];
  schemaData?: SchemaData | SchemaData[];
  noindex?: boolean;
}

export default function SEO({ 
  title, 
  description, 
  canonical, 
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  hreflangLinks = [],
  schemaData,
  noindex = false
}: SEOProps) {
  const siteTitle = `${title} | GTM OS`;
  const schemaString = schemaData ? JSON.stringify(schemaData) : null;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow, max-image-preview:large" />}

      {/* Canonical & Internationalization */}
      {canonical && <link rel="canonical" href={canonical} />}
      {hreflangLinks.map((link, idx) => (
        <link key={idx} rel="alternate" href={link.href} hrefLang={link.hreflang} />
      ))}

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonical && <meta property="og:url" content={canonical} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter Cards */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD Schema Formatting */}
      {schemaString && (
        <script type="application/ld+json">
          {schemaString}
        </script>
      )}
    </Helmet>
  );
}
