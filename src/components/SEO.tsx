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

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <meta name="language" content={language === 'sk' ? 'Slovak' : 'English'} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:url" content={canonical || siteUrl} />
      <meta property="og:site_name" content="Šport & Body Terapia" />
    </Helmet>
  );
};

export default SEO;
