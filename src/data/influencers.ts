import { InfluencerData, Benefit, Testimonial } from '../types';

export const DEFAULT_INFLUENCERS: Record<string, InfluencerData> = {
  JULIA70: {
    code: 'JULIA70',
    creatorName: 'Júlia Martins',
    handle: '@juliamartins.edu',
    discountPercentage: 70,
    customMessage: 'Júlia reservou 70% de desconto especial para os seguidores dela no TikTok!',
  },
  GABI_EAD: {
    code: 'GABI_EAD',
    creatorName: 'Gabi Dev & Tech',
    handle: '@gabidev',
    discountPercentage: 65,
    customMessage: 'Cupom oficial de estudos de tecnologia da Gabi no Instagram!',
  },
  LUCAS_BASS: {
    code: 'LUCAS_BASS',
    creatorName: 'Lucas Medeiros',
    handle: '@lucas.med',
    discountPercentage: 70,
    customMessage: 'Garante o cupom do Lucas para fazer Graduação com 70% de bolsa!',
  },
  CRUZEIRO50: {
    code: 'CRUZEIRO50',
    creatorName: 'Parceiro Oficial',
    handle: '@cruzeirodosul',
    discountPercentage: 50,
    customMessage: 'Cupom oficial de boas-vindas da campanha de criadores!',
  },
};

export function getInfluencerFromParam(couponParam: string | null): InfluencerData {
  if (!couponParam || couponParam.trim() === '') {
    return DEFAULT_INFLUENCERS['JULIA70'];
  }

  const cleanCode = couponParam.trim().toUpperCase().replace(/[^A-Z0-9_]/g, '');

  if (DEFAULT_INFLUENCERS[cleanCode]) {
    return DEFAULT_INFLUENCERS[cleanCode];
  }

  // Dynamic formatting for any unknown influencer parameter e.g., ?cupom=MARIANATECH
  const nameParts = cleanCode.replace(/[0-9_]/g, ' ').trim().toLowerCase();
  const formattedName = nameParts.length > 0
    ? nameParts.charAt(0).toUpperCase() + nameParts.slice(1)
    : 'Criador Oficial';

  return {
    code: cleanCode,
    creatorName: formattedName,
    handle: `@${cleanCode.toLowerCase().replace(/_/g, '')}`,
    discountPercentage: 70,
    customMessage: `Cupom exclusivo verificado do criador ${formattedName}!`,
  };
}

export const BENEFITS_LIST: Benefit[] = [
  {
    id: 'b1',
    title: '+200 Cursos',
    subtitle: 'De graduação ou pós-graduação',
    iconName: 'GraduationCap',
    highlightText: 'Nota 5 no MEC',
  },
  {
    id: 'b2',
    title: 'Bolsas até 50%',
    subtitle: 'Desconto fixo no curso todo',
    iconName: 'Percent',
    highlightText: 'Bolsa Garantida',
  },
  {
    id: 'b3',
    title: 'Atendimento Humanizado',
    subtitle: 'Atendimento ágil, feito por pessoas',
    iconName: 'Zap',
    highlightText: '100% Digital',
  },
  {
    id: 'b4',
    title: 'Flexibilidade',
    subtitle: 'Cursos EAD e semipresenciais',
    iconName: 'Clock',
    highlightText: 'Estude do Seu Jeito',
  },
];

export const TESTIMONIALS_LIST: Testimonial[] = [
  {
    id: 't1',
    name: 'Matheus Silva',
    course: 'Análise e Dev. de Sistemas',
    influencerRef: 'Cupom @gabidev',
    text: 'Usei o cupom do influenciador que acompanho e consegui 70% de bolsa. A matrícula foi instantânea pelo WhatsApp!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 't2',
    name: 'Carolina Mendes',
    course: 'Pedagogia EAD',
    influencerRef: 'Cupom @juliamartins.edu',
    text: 'Achei que era bom demais pra ser verdade, mas o desconto veio direto no boleto do portal. Recomendo muito!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 't3',
    name: 'Felipe Ribeiro',
    course: 'Administração de Empresas',
    influencerRef: 'Cupom @lucas.med',
    text: 'O atendimento por WhatsApp tirou todas minhas dúvidas em 2 minutos. Comecei a estudar no mesmo mês.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  },
];
