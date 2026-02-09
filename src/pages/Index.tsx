import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import InteractiveBodyMap from '@/components/InteractiveBodyMap';
import PatientResourcesSection from '@/components/PatientResourcesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const Index = () => {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white font-body">
        <SEO />
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <InteractiveBodyMap />
          <PatientResourcesSection />
          <ContactSection />
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </HelmetProvider>
  );
};

export default Index;
