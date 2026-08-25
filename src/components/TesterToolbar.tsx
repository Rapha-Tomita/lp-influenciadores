import React, { useState } from 'react';
import { Smartphone, Monitor, Download, Copy, Check, Sparkles, Code2, RefreshCw } from 'lucide-react';
import { generateSingleFileHTML } from '../utils/generateSingleFileHTML';

interface TesterToolbarProps {
  currentCoupon: string;
  onCouponChange: (newCoupon: string) => void;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
}

export const TesterToolbar: React.FC<TesterToolbarProps> = ({
  currentCoupon,
  onCouponChange,
  isMobileFrame,
  onToggleFrame,
}) => {
  const [customInput, setCustomInput] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);

  const presets = ['JULIA70', 'GABI_EAD', 'LUCAS_BASS', 'CRUZEIRO50'];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      onCouponChange(customInput.trim().toUpperCase());
      setCustomInput('');
    }
  };

  const handleCopyHTML = () => {
    const html = generateSingleFileHTML(currentCoupon);
    navigator.clipboard.writeText(html);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleDownloadHTML = () => {
    const html = generateSingleFileHTML(currentCoupon);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'landing-cruzeiro-influenciadores.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Top Tester Banner */}
      <div className="bg-[#0D182E] border-b border-[#1E2D53] text-gray-200 text-xs px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 z-50 relative">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-[#FFD100]"></span>
          <span className="font-bold text-white">Simulador de Influenciador:</span>
          <span className="font-mono text-[#FFD100] bg-black/40 px-2 py-0.5 rounded font-bold">
            ?cupom={currentCoupon}
          </span>
        </div>

        {/* Preset Coupons */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          <span className="text-gray-400 font-medium hidden sm:inline">Testar Cupom:</span>
          {presets.map((code) => (
            <button
              key={code}
              onClick={() => onCouponChange(code)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                currentCoupon === code
                  ? 'bg-[#FFD100] text-[#0A1329]'
                  : 'bg-white/10 hover:bg-white/20 text-gray-300'
              }`}
            >
              {code}
            </button>
          ))}

          <form onSubmit={handleCustomSubmit} className="flex items-center gap-1">
            <input
              type="text"
              placeholder="Outro cupom..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="w-24 px-2 py-0.5 bg-black/50 border border-gray-600 rounded text-[11px] font-mono text-white outline-none focus:border-[#FFD100]"
            />
            <button
              type="submit"
              className="bg-white/10 hover:bg-white/20 p-1 rounded text-gray-300 cursor-pointer"
              title="Aplicar cupom customizado"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Export & View Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleFrame}
            className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded text-gray-200 text-[11px] font-medium cursor-pointer"
            title="Alternar modo de moldura do celular"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Modo Tela Cheia</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Moldura Smartphone</span>
              </>
            )}
          </button>

          <button
            onClick={() => setShowCodeModal(true)}
            className="flex items-center gap-1 bg-[#FFD100] hover:bg-[#E6BD00] text-[#0A1329] px-2.5 py-1 rounded font-bold text-[11px] cursor-pointer shadow-sm"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Código HTML Único</span>
          </button>
        </div>
      </div>

      {/* Standalone HTML Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1329] border border-[#1E2D53] rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl text-white">
            <div className="p-4 border-b border-[#1E2D53] flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-[#FFD100]" />
                  Código HTML Único (Single-File)
                </h3>
                <p className="text-xs text-gray-400">
                  Arquivo 100% autônomo com HTML, CSS e JavaScript integrados
                </p>
              </div>

              <button
                onClick={() => setShowCodeModal(false)}
                className="text-gray-400 hover:text-white font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto font-mono text-xs bg-[#040914] text-emerald-400 select-all border-y border-[#1E2D53]">
              <pre className="whitespace-pre-wrap break-all">
                {generateSingleFileHTML(currentCoupon)}
              </pre>
            </div>

            <div className="p-4 flex items-center justify-between bg-[#0D182E]">
              <span className="text-xs text-gray-400">
                Tamanho: ~18 KB • Sem dependências npm
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyHTML}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar HTML</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadHTML}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#FFD100] hover:bg-[#E6BD00] text-[#0A1329] font-extrabold text-xs rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar .HTML</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
