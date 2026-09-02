import React from 'react';
import { ArrowRight } from 'lucide-react';
import { commercialWhatsAppUrl } from '../utils/whatsapp';
import { captureAndGetUtm } from '../utils/tracking';

export const HeroMap: React.FC = () => {
  return (
    <section className="relative px-6 pt-7 pb-6 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl overflow-hidden md:h-full md:flex md:flex-col md:justify-end border border-white/10 shadow-lg bg-[#001A33]">
      <div className="hidden md:block absolute inset-0 hero-photo" />

      {/* Gradient Overlay for Text Readability - Only on Desktop */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#001A33]/65 via-[#001A33]/45 to-[#001A33]/20" />

      {/* SVG Map Motif Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroGrid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
          <circle cx="280" cy="80" r="70" fill="none" stroke="#FFCC00" strokeWidth="1" strokeDasharray="4,4" />
          <circle cx="280" cy="80" r="5" fill="#FFCC00" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col justify-end md:h-full space-y-4 md:space-y-6">
        <div>
          {/* Punchy Bold Title - Resized for better visibility of image */}
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold text-white leading-[1.1] tracking-tight mb-2 md:mb-4 drop-shadow-md">
            SUA ROTA PARA O <br />
            <span className="text-[#FFCC00]">FUTURO</span> COMEÇA AQUI.
          </h1>

          <p className="text-white/90 text-xs sm:text-sm md:text-sm lg:text-base leading-relaxed mb-0 max-w-xs md:max-w-xl font-medium drop-shadow-sm">
            Garanta agora seu desconto. Bolsas até 50% para você começar agora mesmo!
          </p>
        </div>

        <a
          href={commercialWhatsAppUrl(undefined, captureAndGetUtm().utm_source)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto bg-[#FFCC00] hover:bg-[#e6b800] active:scale-95 text-[#001A33] font-black py-3.5 px-6 md:px-8 rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-transform"
        >
          <span className="uppercase tracking-tight text-sm md:text-base">GARANTIR MINHA BOLSA</span>
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#001A33] flex items-center justify-center text-white">
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </div>
        </a>
      </div>
    </section>
  );
};

