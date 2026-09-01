export const COMMERCIAL_WHATSAPP = '5511917479873';

export function commercialWhatsAppUrl(fullName?: string): string {
  const text = fullName
    ? `Olá! Meu nome é ${fullName}. Vim pela campanha e quero garantir minha bolsa na Cruzeiro do Sul!`
    : 'Olá! Vim pela campanha e quero garantir minha bolsa na Cruzeiro do Sul!';
  return `https://wa.me/${COMMERCIAL_WHATSAPP}?text=${encodeURIComponent(text)}`;
}
