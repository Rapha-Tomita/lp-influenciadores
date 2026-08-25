import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: '1',
    question: 'Como funciona o desconto desta campanha?',
    answer: 'Ao preencher o formulário, você garante bolsas até 50% no valor das suas mensalidades para cursos de Graduação EAD/Semipresencial ou Pós-Graduação. Um consultor entra em contato pelo WhatsApp para finalizar a matrícula.'
  },
  {
    id: '2',
    question: 'A bolsa até 50% vale durante todo o curso?',
    answer: 'Sim! O desconto garantido no momento da sua inscrição nesta campanha permanece ativo do início ao fim da sua graduação ou pós-graduação.'
  },
  {
    id: '3',
    question: 'A Cruzeiro do Sul é reconhecida pelo MEC?',
    answer: 'Com certeza! A Cruzeiro do Sul Virtual possui Nota Máxima (Nota 5) no MEC. O seu diploma EAD tem exatamente o mesmo valor e reconhecimento de um diploma presencial.'
  },
  {
    id: '4',
    question: 'Como funciona a modalidade EAD e Semipresencial?',
    answer: 'No EAD você estuda com total flexibilidade de horário pela plataforma virtual interativa. No Semipresencial, você combina aulas online com momentos práticos e provas em um dos polos mais próximos.'
  },
  {
    id: '5',
    question: 'A mensalidade vai aumentar depois?',
    answer: 'A mensalidade pode ter um reajuste uma vez por ano, referente às atualizações de impostos e custos. Mas pode ficar tranquilo: o percentual da sua bolsa continua o mesmo, garantindo seu desconto durante o curso.'
  }
];

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('1');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="px-6 mb-8 md:px-8 md:py-8 md:bg-white/5 md:border md:border-white/10 md:rounded-3xl md:mb-0">
      {/* FAQ Header Title */}
      <div className="flex items-center gap-2.5 mb-4 md:mb-6">
        <div className="w-7 h-7 md:w-9 md:h-9 rounded-lg bg-[#FFCC00]/10 border border-[#FFCC00]/30 flex items-center justify-center text-[#FFCC00]">
          <HelpCircle className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <h2 className="text-lg md:text-2xl font-extrabold text-white tracking-tight">
          Dúvidas Frequentes
        </h2>
      </div>

      {/* Accordion List */}
      <div className="space-y-2.5 md:space-y-3">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white/10 border-[#FFCC00]/40 shadow-lg'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left gap-3 focus:outline-none cursor-pointer"
              >
                <span className="text-xs md:text-sm font-bold text-white leading-snug">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 md:w-5 md:h-5 text-[#FFCC00] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 md:px-5 md:pb-5 pt-0">
                  <div className="h-px w-full bg-white/10 mb-3" />
                  <p className="text-xs md:text-sm text-blue-100/90 leading-relaxed font-normal">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
