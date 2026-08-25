import React from 'react';
import { Benefit } from '../types';

interface BenefitsGridProps {
  benefits: Benefit[];
}

export const BenefitsGrid: React.FC<BenefitsGridProps> = ({ benefits }) => {
  return (
    <section className="px-6 mb-6 md:px-0 md:mb-0">
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {benefits.map((b) => (
          <div
            key={b.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-3.5 md:p-5 flex flex-col justify-between hover:bg-white/10 transition-colors"
          >
            <div>
              <div className="text-[#FFCC00] text-lg md:text-xl font-black tracking-tight leading-tight mb-0.5 md:mb-1">
                {b.title}
              </div>
              <div className="text-white text-xs md:text-sm font-bold leading-tight mb-1 md:mb-2">
                {b.subtitle}
              </div>
            </div>
            <div className="text-white/60 text-[10px] md:text-xs uppercase font-semibold tracking-wider">
              ✓ {b.highlightText}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
