export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  utm_id?: string;
  influencerCode?: string;
};

const STORAGE_KEY = 'lp_utm_first_touch';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id'] as const;

function clean(value: string | null, max = 255): string {
  return (value || '').trim().slice(0, max);
}

function readFromUrl(): UtmParams {
  const params = new URLSearchParams(window.location.search);
  const utm: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = clean(params.get(key));
    if (value) utm[key] = value;
  }

  const influencer = clean(
    params.get('cupom') || params.get('coupon') || params.get('ref') || params.get('influencer'),
    80,
  );
  if (influencer) {
    utm.influencerCode = influencer;
    if (!utm.utm_source) utm.utm_source = influencer;
  }

  return utm;
}

function readStored(): UtmParams {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as UtmParams;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export const CAMPAIGN_BASE_URL = 'https://influencers.cruzeiroead.com.br';

export function slugifyUtm(value: string, max = 80): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
    .slice(0, max);
}

export function buildInfluencerLink(input: {
  baseUrl?: string;
  utm_source: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
}): string {
  const url = new URL(input.baseUrl || CAMPAIGN_BASE_URL);
  const source = slugifyUtm(input.utm_source);
  if (source) url.searchParams.set('utm_source', source);
  const medium = slugifyUtm(input.utm_medium || '', 40);
  if (medium) url.searchParams.set('utm_medium', medium);
  const campaign = slugifyUtm(input.utm_campaign || 'influenciadores', 80);
  if (campaign) url.searchParams.set('utm_campaign', campaign);
  const content = slugifyUtm(input.utm_content || '', 80);
  if (content) url.searchParams.set('utm_content', content);
  return url.toString();
}

export function captureAndGetUtm(): UtmParams {
  const incoming = readFromUrl();
  const stored = readStored();
  const merged: UtmParams = { ...incoming, ...stored };
  if (Object.values(merged).some(Boolean)) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {
      /* ignore quota / private mode */
    }
  }
  return merged;
}
