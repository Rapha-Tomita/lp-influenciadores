import React from 'react';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="px-6 py-6 md:py-2 text-center border-t border-white/10 text-blue-100/60 text-[11px] md:text-[10px] leading-tight">
      <div className="flex items-center justify-center gap-1.5 mb-2 md:mb-0.5 font-bold text-white/80 uppercase tracking-wider text-[10px] md:text-[10px]">
        <Shield className="w-3.5 h-3.5 md:w-3 md:h-3 text-[#FFCC00]" />
        <span>Seus dados estão protegidos nos termos da LGPD</span>
      </div>

      <div className="flex justify-center gap-3 mb-3 md:mb-0.5 text-white/60 font-semibold text-[10px] md:text-[10px]">
        <a href="#" className="hover:text-white transition-colors">Privacidade</a>
        <span>•</span>
        <a href="#" className="hover:text-white transition-colors">Regulamento</a>
      </div>

      <p className="max-w-xs md:max-w-2xl mx-auto font-medium text-white/40 text-[10px] md:text-[10px]">
        Universidade Cruzeiro do Sul © 2026. Todos os direitos reservados.
        Campanha oficial de influenciadores com bolsas válidas para novos alunos.
      </p>
    </footer>
  );
};
