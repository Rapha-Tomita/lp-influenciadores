import React from 'react';
import { Star, Award, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface SocialProofProps {
  testimonials: Testimonial[];
}

export const SocialProof: React.FC<SocialProofProps> = ({ testimonials }) => {
  return (
    <section className="px-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <div className="flex text-[#FFCC00]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#FFCC00]" />
            ))}
          </div>
          <span className="text-xs font-black text-white ml-1">4.9 / 5.0</span>
        </div>

        <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-[10px] font-extrabold text-white uppercase tracking-wider">
          <Award className="w-3.5 h-3.5 text-[#FFCC00]" />
          <span>Nota 5 no MEC</span>
        </div>
      </div>

      {/* Horizontal Scroll Testimonial Cards */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="min-w-[260px] max-w-[280px] bg-white/5 border border-white/10 rounded-2xl p-4 snap-start shrink-0"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold text-[#FFCC00] bg-[#FFCC00]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {t.influencerRef}
              </span>
              <Quote className="w-4 h-4 text-white/30" />
            </div>

            <p className="text-xs text-blue-100/90 font-medium mb-3 leading-relaxed">
              "{t.text}"
            </p>

            <div className="flex items-center gap-2.5">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-8 h-8 rounded-full object-cover border border-[#FFCC00]/60"
              />
              <div>
                <span className="block text-xs font-extrabold text-white leading-tight">
                  {t.name}
                </span>
                <span className="block text-[10px] text-gray-400 font-semibold">
                  {t.course}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
