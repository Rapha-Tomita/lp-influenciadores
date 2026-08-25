import React, { useEffect, useState } from 'react';
import { ArrowRight, Tag } from 'lucide-react';

interface StickyCTAProps {
  formRef: React.RefObject<HTMLDivElement | null>;
  onScrollToForm: () => void;
  couponCode?: string;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({
  formRef,
  onScrollToForm,
  couponCode = 'JULIA70',
}) => {
  const [isPastForm, setIsPastForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!formRef.current) return;
      const rect = formRef.current.getBoundingClientRect();
      // Only show after the bottom of the form has passed above the top of the viewport
      if (rect.bottom <= 100) {
        setIsPastForm(true);
      } else {
        setIsPastForm(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [formRef]);

  if (!isPastForm) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-[#001A33] via-[#001A33]/95 to-transparent backdrop-blur-md flex justify-center animate-slideUp md:hidden">
      <div className="w-full max-w-[440px]">
        <button
          onClick={onScrollToForm}
          className="w-full py-4 px-6 bg-[#FFCC00] hover:bg-[#e6b800] active:scale-95 text-[#001A33] font-black text-sm rounded-2xl shadow-[0_8px_30px_rgba(255,204,0,0.4)] flex items-center justify-between transition-transform cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 fill-[#001A33]" />
            <span className="uppercase tracking-tight font-extrabold">RESGATAR DESCONTO</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#001A33] text-white flex items-center justify-center">
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </div>
        </button>
      </div>
    </div>
  );
};
