import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { InfluencerData } from '../types';

interface CouponCardProps {
  influencer: InfluencerData;
}

export const CouponCard: React.FC<CouponCardProps> = ({ influencer }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(influencer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="px-6 mb-6">
      <div className="bg-[#0a2540] border-2 border-dashed border-[#FFCC00]/50 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-lg">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white/60 text-[10px] uppercase font-extrabold tracking-widest">
              Cupom Ativo • {influencer.handle}
            </span>
            <span className="bg-[#FFCC00] text-[#001A33] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              {influencer.discountPercentage}% OFF
            </span>
          </div>
          <div className="font-mono text-[#FFCC00] text-2xl font-black tracking-widest truncate">
            {influencer.code}
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="h-11 w-11 rounded-full bg-[#FFCC00] hover:bg-[#e6b800] active:scale-95 text-[#001A33] flex items-center justify-center shadow-[0_0_15px_rgba(255,204,0,0.4)] cursor-pointer transition-transform shrink-0"
          title="Copiar cupom de desconto"
        >
          {copied ? (
            <Check className="w-5 h-5 stroke-[3] text-[#001A33]" />
          ) : (
            <Copy className="w-5 h-5 stroke-[2.5]" />
          )}
        </button>
      </div>
    </section>
  );
};
