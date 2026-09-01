export const COMMERCIAL_WHATSAPP = '5511917479873';

export function commercialWhatsAppUrl(fullName?: string, source?: string): string {
  const origin = source
    ? `Vim pela campanha (${source})`
    : 'Vim pela campanha';
  const text = fullName
    ? `Olá! Meu nome é ${fullName}. ${origin} e quero garantir minha bolsa na Cruzeiro do Sul!`
    : `Olá! ${origin} e quero garantir minha bolsa na Cruzeiro do Sul!`;
  return `https://wa.me/${COMMERCIAL_WHATSAPP}?text=${encodeURIComponent(text)}`;
}
