import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaMarkupProps {
  type: 'FAQPage' | 'Service' | 'Article';
  data: any;
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  let schema: any = {};

  if (type === 'FAQPage') {
    schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.faqs.map((faq: any) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  } else if (type === 'Service') {
    schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": data.title,
      "description": data.description || data.problem,
      "provider": {
        "@type": "Organization",
        "name": "GTM OS"
      }
    };
  } else if (type === 'Article') {
    schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "description": data.summary || data.description,
      "author": {
        "@type": "Organization",
        "name": "GTM OS"
      },
      "datePublished": data.createdAt
    };
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
