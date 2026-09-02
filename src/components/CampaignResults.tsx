import React, { useEffect, useState } from 'react';
import { Header } from './Header';

type StatRow = {
  influencer: string;
  total_leads: string | number;
  com_kommo: string | number;
  canais: string | number;
  campanhas: string | number;
  primeiro: string | null;
  ultimo: string | null;
};

function formatDate(value: string | null): string {
  if (!value) return '—';
  return new Date(value).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const CampaignResults: React.FC = () => {
  const [rows, setRows] = useState<StatRow[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = String(import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');
    fetch(`${apiBase}/api/leads/stats`)
      .then(async (res) => {
        const payload = await res.json().catch(() => ({}));
        if (!res.ok || !payload.ok) {
          throw new Error(payload.error || 'Falha ao carregar.');
        }
        setRows(payload.rows || []);
        setTotal(Number(payload.total || 0));
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Falha ao carregar.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#001A33] desktop-bg text-white font-sans antialiased">
      <div className="py-0 md:py-4 flex justify-center items-start min-h-screen">
        <main className="w-full max-w-[440px] md:max-w-4xl bg-[#001A33] min-h-screen md:min-h-0 relative md:rounded-[32px] overflow-hidden my-0 md:my-2">
          <Header />
          <section className="px-4 py-6 md:px-8 md:py-10">
            <div className="bg-[#F5F5F0] rounded-[36px] p-6 sm:p-8 shadow-2xl text-[#001A33] border border-white/60">
              <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
                <div>
                  <h1 className="text-2xl font-black tracking-tight mb-1">Resultados da campanha</h1>
                  <p className="text-xs text-gray-600 font-medium">Leads por influenciador (utm_source).</p>
                </div>
                <a href="/gerador" className="text-xs font-bold text-[#001A33] underline">
                  Gerar link
                </a>
              </div>

              <div className="bg-[#001A33] text-white rounded-2xl px-4 py-3 mb-5 inline-flex items-baseline gap-2">
                <span className="text-3xl font-black">{loading ? '—' : total}</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-white/70">leads no total</span>
              </div>

              {error && <p className="text-sm font-semibold text-red-600 mb-4">{error}</p>}

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      <th className="pb-2 pr-3">Influenciador</th>
                      <th className="pb-2 pr-3 text-right">Leads</th>
                      <th className="pb-2 pr-3 text-right">Kommo</th>
                      <th className="pb-2 pr-3 hidden sm:table-cell">Último</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <tr>
                        <td colSpan={4} className="py-6 text-gray-400 font-semibold">
                          Carregando...
                        </td>
                      </tr>
                    )}
                    {!loading && rows.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-6 text-gray-400 font-semibold">
                          Nenhum lead ainda.
                        </td>
                      </tr>
                    )}
                    {rows.map((row) => (
                      <tr key={row.influencer} className="border-t border-gray-200">
                        <td className="py-3 pr-3 font-black">{row.influencer}</td>
                        <td className="py-3 pr-3 text-right font-black">{row.total_leads}</td>
                        <td className="py-3 pr-3 text-right font-semibold text-gray-600">{row.com_kommo}</td>
                        <td className="py-3 pr-3 hidden sm:table-cell text-xs font-semibold text-gray-500">
                          {formatDate(row.ultimo)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
