import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useLanguage();

  const policyLinks = [
    { key: 'footer.gdpr', href: '/gdpr-compliance' },
    { key: 'footer.privacy', href: '/privacy-policy' },
    { key: 'footer.terms', href: '/terms-of-service' },
    { key: 'footer.medical-disclaimer', href: '/medical-disclaimer' },
    { key: 'footer.cookies', href: '/cookie-policy' }
  ];

  return (
    <footer className="bg-brand-charcoal text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="text-lg font-heading font-bold">Šport & Body Terapia</span>
            <p className="text-gray-300 text-sm leading-relaxed">{t('footer.description')}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-brand-teal">{t('footer.contact')}</h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p>{t('footer.address')}</p>
              <p><a href="tel:+421949291013" className="hover:text-brand-teal transition-colors">Tel: 0949 291 013</a></p>
              <p><a href="tel:+421948842420" className="hover:text-brand-teal transition-colors">Tel: 0948 842 420</a></p>
              <p><a href="mailto:info@sportbodyterapia.sk" className="hover:text-brand-teal transition-colors">Email: info@sportbodyterapia.sk</a></p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-brand-teal">{t('footer.policies')}</h3>
            <div className="text-gray-300 text-sm space-y-2">
              {policyLinks.map((link) => (
                <Link key={link.key} to={link.href} className="block hover:text-brand-teal transition-colors duration-200">
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-brand-teal">{t('footer.follow')}</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/DCAfyzio" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-teal transition-all duration-300 hover:scale-110">
                <Facebook size={24} />
              </a>
              <a href="https://www.instagram.com/sbt_fyzio" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-teal transition-all duration-300 hover:scale-110">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 Šport & Body Terapia. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
