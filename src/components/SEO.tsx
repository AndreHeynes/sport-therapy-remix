import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  type?: 'website' | 'article';
}

const SEO = ({ title, description, keywords, canonical, ogImage, type = 'website' }: SEOProps) => {
  const { language } = useLanguage();
  
  const defaultTitles = {
    sk: 'Šport & Body Terapia - Fyzioterapia Dubnica nad Váhom',
    en: 'Sport & Body Therapy - Physiotherapy Dubnica nad Váhom'
  };
  
  const defaultDescriptions = {
    sk: 'Profesionálna fyzioterapia v Dubnici nad Váhom. André Heynes - 25+ rokov skúseností.',
    en: 'Professional physiotherapy in Dubnica nad Váhom. André Heynes - 25+ years experience.'
  };

  const siteTitle = title ? `${title} | ${defaultTitles[language]}` : defaultTitles[language];
  const siteDescription = description || defaultDescriptions[language];
  const siteUrl = 'https://sportandbodyterapia.org';

  // Always resolve og:url — use canonical if provided, otherwise derive from current path
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const ogUrl = canonical || `${siteUrl}${currentPath}`;

  const defaultOgImage = `${siteUrl}/og-default.png`;
  const imageUrl = ogImage || defaultOgImage;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <meta name="language" content={language === 'sk' ? 'Slovak' : 'English'} />
      <link rel="canonical" href={ogUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content="Šport & Body Terapia" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default SEO;
