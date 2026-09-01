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
