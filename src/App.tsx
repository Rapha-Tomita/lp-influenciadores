import React, { useRef, useState } from 'react';
import { BENEFITS_LIST } from './data/influencers';
import { Header } from './components/Header';
import { HeroMap } from './components/HeroMap';
import { BenefitsGrid } from './components/BenefitsGrid';
import { FormSheet } from './components/FormSheet';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { LeadFormData } from './types';
import { commercialWhatsAppUrl } from './utils/whatsapp';

export default function App() {
  const formSectionRef = useRef<HTMLDivElement | null>(null);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | null>(null);

  const handleScrollToForm = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        const input = document.getElementById('fullName');
        if (input) input.focus();
      }, 500);
    }
  };

  const handleFormSuccess = (data: LeadFormData) => {
    setWhatsAppUrl(commercialWhatsAppUrl(data.fullName));
  };

  return (
    <div className="min-h-screen bg-[#001A33] desktop-bg text-white font-sans antialiased selection:bg-[#FFCC00] selection:text-[#001A33]">
      <div className="py-0 md:py-4 flex justify-center items-start min-h-screen">
        <main className="w-full max-w-[440px] md:max-w-6xl bg-[#001A33] min-h-screen md:min-h-0 relative shadow-[0_0_60px_rgba(0,0,0,0.8)] md:shadow-none rounded-none sm:rounded-[44px] md:rounded-[32px] sm:border-[8px] md:border-0 sm:border-[#0a2540] overflow-hidden my-0 sm:my-2 md:my-2 transition-all duration-300">
          <Header onCtaClick={handleScrollToForm} />

          <div className="block md:hidden">
            <div className="px-6 mt-3.5 mb-6">
              <HeroMap onScrollToForm={handleScrollToForm} whatsAppUrl={whatsAppUrl} />
            </div>

            <BenefitsGrid benefits={BENEFITS_LIST} />

            <FormSheet
              onSubmitSuccess={handleFormSuccess}
              onReset={() => setWhatsAppUrl(null)}
              formRef={formSectionRef}
            />

            <FAQ />

            <Footer />
          </div>

          <div className="hidden md:block px-8 lg:px-12 pt-4 lg:pt-6 pb-8 lg:pb-12 space-y-8 lg:space-y-12">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="col-span-8">
                <HeroMap onScrollToForm={handleScrollToForm} whatsAppUrl={whatsAppUrl} />
              </div>

              <div className="col-span-4">
                <FormSheet
                  onSubmitSuccess={handleFormSuccess}
                  onReset={() => setWhatsAppUrl(null)}
                  formRef={formSectionRef}
                />
              </div>
            </div>

            <BenefitsGrid benefits={BENEFITS_LIST} />

            <div className="w-full pt-5 lg:pt-6">
              <FAQ />
            </div>

            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
