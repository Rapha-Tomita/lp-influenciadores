import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';
import { LeadFormData } from '../types';

interface FormSheetProps {
  onSubmitSuccess: (data: LeadFormData) => void;
  formRef?: React.RefObject<HTMLDivElement | null>;
}

export const FormSheet: React.FC<FormSheetProps> = ({
  onSubmitSuccess,
  formRef,
}) => {
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [courseType, setCourseType] = useState('Graduação');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [submittedData, setSubmittedData] = useState<LeadFormData | null>(null);

  const inputClass = (hasError: boolean) =>
    `w-full bg-white rounded-2xl px-4 py-3.5 text-sm font-semibold text-[#001A33] focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-gray-300 shadow-sm ${
      hasError
        ? 'border-2 border-red-500 focus:ring-red-400'
        : 'border border-gray-200 focus:ring-[#FFCC00]'
    }`;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    setWhatsapp(value);
    if (phoneError) setPhoneError('');
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneDigits = whatsapp.replace(/\D/g, '');
    let valid = true;

    if (!fullName.trim() || fullName.trim().length < 2) {
      setNameError('Informe seu nome completo.');
      valid = false;
    } else {
      setNameError('');
    }

    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      setPhoneError('WhatsApp inválido. Use DDD + número, ex: (11) 99999-9999.');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (!valid) return;

    const data: LeadFormData = {
      fullName,
      whatsapp,
      courseType,
      agreedToTerms: true,
    };

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const apiBase = String(import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');
      const res = await fetch(`${apiBase}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          whatsapp,
          courseType,
          sourceUrl: window.location.href,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok || !payload.ok) {
        throw new Error(payload.error || 'Não foi possível gravar seus dados.');
      }
      setSubmittedData(data);
      setIsSubmitted(true);
      onSubmitSuccess(data);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erro ao enviar. Tente de novo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppUrl = () => {
    if (!submittedData) return '#';
    const text = `Olá! Meu nome é ${submittedData.fullName}. Vim pela campanha e quero garantir minha bolsa na Cruzeiro do Sul!`;
    return `https://wa.me/5511917479873?text=${encodeURIComponent(text)}`;
  };

  return (
    <section ref={formRef} className="px-4 mb-8 md:px-0 md:mb-0 md:h-full">
      <div className="bg-[#F5F5F0] rounded-[36px] md:rounded-3xl p-6 sm:p-8 md:p-8 shadow-[0_-20px_40px_rgba(0,0,0,0.3)] md:shadow-2xl text-[#001A33] relative border border-white/60 md:h-full md:flex md:flex-col md:justify-between">
        {/* Drag Handle Bar (Mobile only) */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 md:hidden"></div>

        {!isSubmitted ? (
          <div>
            <h2 className="text-[#001A33] text-2xl font-black mb-1 leading-tight tracking-tight">
              Garanta sua vaga
            </h2>
            <p className="text-gray-500 text-xs mb-6 font-semibold">
              Preencha os dados abaixo para ativar seu desconto exclusivo.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Nome Completo */}
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-wider block">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (nameError) setNameError('');
                  }}
                  placeholder="Nome completo"
                  required
                  aria-invalid={Boolean(nameError)}
                  className={inputClass(Boolean(nameError))}
                />
                {nameError ? <p className="text-xs text-red-600 font-semibold ml-1">{nameError}</p> : null}
              </div>

              {/* WhatsApp */}
              <div className="space-y-1.5">
                <label htmlFor="whatsapp" className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-wider block">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  value={whatsapp}
                  onChange={handlePhoneChange}
                  placeholder="(11) 99999-9999"
                  required
                  aria-invalid={Boolean(phoneError)}
                  className={inputClass(Boolean(phoneError))}
                />
                {phoneError ? <p className="text-xs text-red-600 font-semibold ml-1">{phoneError}</p> : null}
              </div>

              {/* Modalidade */}
              <div className="space-y-1.5">
                <label htmlFor="courseType" className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-wider block">
                  Modalidade do Curso
                </label>
                <select
                  id="courseType"
                  value={courseType}
                  onChange={(e) => setCourseType(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-semibold text-[#001A33] focus:outline-none focus:ring-2 focus:ring-[#FFCC00] transition-all cursor-pointer shadow-sm"
                >
                  <option value="Graduação">Graduação</option>
                  <option value="Pós-graduação">Pós-graduação</option>
                </select>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FFCC00] hover:bg-[#e6b800] active:scale-95 text-[#001A33] font-black py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 mt-4 transition-transform cursor-pointer disabled:opacity-70 disabled:cursor-wait"
              >
                <span className="uppercase tracking-tight text-base">
                  {isSubmitting ? 'ENVIANDO...' : 'RESGATAR BOLSA'}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#001A33] flex items-center justify-center text-white">
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </div>
              </button>
              {submitError ? (
                <p className="text-xs text-center text-red-600 font-semibold">{submitError}</p>
              ) : null}
            </form>

            <p className="text-[9px] text-center text-gray-400 mt-5 leading-relaxed font-medium">
              Ao clicar, você concorda com o uso de dados para contato via WhatsApp em conformidade com a LGPD e nossa Política de Privacidade.
            </p>
          </div>
        ) : (
          /* Success State */
          <div className="text-center py-4 animate-fadeIn">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h3 className="text-[#001A33] text-2xl font-black mb-1">
              Bolsa Pré-Reservada!
            </h3>

            <p className="text-xs text-gray-600 mb-6 font-medium">
              Parabéns, <strong className="text-[#001A33]">{submittedData?.fullName}</strong>! Sua bolsa de estudos está reservada.
            </p>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-transform"
            >
              <MessageSquare className="w-5 h-5 fill-white" />
              <span>FINALIZAR NO WHATSAPP</span>
            </a>

            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 text-xs font-bold text-gray-500 hover:text-[#001A33] underline cursor-pointer"
            >
              Corrigir meus dados
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
