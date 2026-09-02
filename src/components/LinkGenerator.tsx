import React, { useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Header } from './Header';
import { buildInfluencerLink, slugifyUtm } from '../utils/tracking';

const CHANNELS = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'kwai', label: 'Kwai' },
  { id: 'outro', label: 'Outro' },
] as const;

const inputClass =
  'w-full bg-white rounded-2xl px-4 py-3.5 text-sm font-semibold text-[#001A33] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent placeholder:text-gray-300 shadow-sm';

export const LinkGenerator: React.FC = () => {
  const [influencer, setInfluencer] = useState('');
  const [channel, setChannel] = useState('instagram');
  const [customChannel, setCustomChannel] = useState('');
  const [campaign, setCampaign] = useState('influenciadores');
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);

  const medium = channel === 'outro' ? customChannel : channel;
  const sourceSlug = slugifyUtm(influencer);
  const link = useMemo(
    () =>
      sourceSlug
        ? buildInfluencerLink({
            utm_source: influencer,
            utm_medium: medium,
            utm_campaign: campaign,
            utm_content: content,
          })
        : '',
    [influencer, medium, campaign, content, sourceSlug],
  );

  const copyLink = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen bg-[#001A33] desktop-bg text-white font-sans antialiased">
      <div className="py-0 md:py-4 flex justify-center items-start min-h-screen">
        <main className="w-full max-w-[440px] md:max-w-xl bg-[#001A33] min-h-screen md:min-h-0 relative md:rounded-[32px] overflow-hidden my-0 md:my-2">
          <Header />
          <section className="px-4 py-6 md:px-8 md:py-10">
            <div className="bg-[#F5F5F0] rounded-[36px] p-6 sm:p-8 shadow-2xl text-[#001A33] border border-white/60">
              <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
                <div>
                  <h1 className="text-2xl font-black tracking-tight mb-1">Gerar link do influenciador</h1>
                  <p className="text-xs text-gray-600 font-medium">
                    Preencha e copie. Quem abrir esse link fica marcado no lead (Kommo + banco).
                  </p>
                </div>
                <a href="/resultados" className="text-xs font-bold text-[#001A33] underline">
                  Ver resultados
                </a>
              </div>

              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-wider block mb-1">
                Influenciador
              </label>
              <input
                className={inputClass}
                value={influencer}
                onChange={(e) => setInfluencer(e.target.value)}
                placeholder="juliamartins"
              />
              {influencer && (
                <p className="text-[11px] text-gray-500 mt-1 ml-1">
                  utm_source = <strong>{sourceSlug || '—'}</strong>
                </p>
              )}

              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-wider block mt-4 mb-1">
                Canal
              </label>
              <select
                className={inputClass}
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
              >
                {CHANNELS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              {channel === 'outro' && (
                <input
                  className={`${inputClass} mt-2`}
                  value={customChannel}
                  onChange={(e) => setCustomChannel(e.target.value)}
                  placeholder="ex: stories, live"
                />
              )}

              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-wider block mt-4 mb-1">
                Campanha
              </label>
              <input
                className={inputClass}
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                placeholder="influenciadores"
              />

              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-wider block mt-4 mb-1">
                Conteúdo (opcional)
              </label>
              <input
                className={inputClass}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="reels, stories..."
              />

              <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-4">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2">Link</p>
                <p className="text-xs font-semibold break-all text-[#001A33] min-h-[3rem]">
                  {link || 'Digite o nome do influenciador'}
                </p>
                <button
                  type="button"
                  disabled={!link}
                  onClick={copyLink}
                  className="mt-4 w-full py-3.5 px-5 bg-[#FFCC00] hover:bg-[#e6b800] disabled:opacity-40 text-[#001A33] font-black text-sm rounded-2xl flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4 stroke-[2.5]" />}
                  {copied ? 'COPIADO' : 'COPIAR LINK'}
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
