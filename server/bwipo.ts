import 'dotenv/config';

// Bwipo CRM (integrations.bwipo.com). Sem documentação pública: formatos
// confirmados por teste em 2026-11-11.
//   POST /leads                    -> cria/atualiza contato (por telefone) e negócio
//   PUT  /deals/:id/custom-fields  -> { values: [{ fieldId, value }] }
//   POST /deals/:id/tags           -> { tagId }

export type BwipoLeadInput = {
  fullName: string;
  phoneDigits: string;
  courseType?: string;
};

export type BwipoLeadResult = {
  dealId: string;
  contactId: string;
};

const DEFAULTS = {
  BWIPO_BASE_URL: 'https://integrations.bwipo.com/api',
  BWIPO_SOURCE: 'form-influencer',
  // Pipeline Principal > Lead de Entrada
  BWIPO_STAGE_ID: 'cmu2xmns00l6vq6019s508e9j',
  // Tag "influencers"
  BWIPO_TAG_ID: 'cmwcil4u90b57lg01iu4w4d55',
  // Campos personalizados do negócio
  BWIPO_FIELD_NOME: 'cmu2wwfah0bn5qn01ao6klixz', // Nome Completo
  BWIPO_FIELD_TELEFONE: 'cmu2wxfv80cu3qn01jzzi19lj', // Telefone da Inscrição
  BWIPO_FIELD_ORIGEM: 'cmu2x0o7p0gxzqn01aey739bm', // Origem do Lead
  BWIPO_FIELD_GRAU: 'cmu5r0cise7094117ddc51108', // Grau (Graduação / Pós-Graduação)
};

function env(key: keyof typeof DEFAULTS): string {
  return (process.env[key] || '').trim() || DEFAULTS[key];
}

export function bwipoEnabled(): boolean {
  return Boolean((process.env.BWIPO_TOKEN || '').trim());
}

async function bwipoRequest(method: string, path: string, payload?: unknown): Promise<any> {
  const base = env('BWIPO_BASE_URL').replace(/\/+$/, '');
  const res = await fetch(`${base}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${(process.env.BWIPO_TOKEN || '').trim()}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: payload === undefined ? undefined : JSON.stringify(payload),
  });
  const text = await res.text();
  let body: any = {};
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text.slice(0, 400) };
  }
  if (!res.ok) {
    throw new Error(`Bwipo ${method} ${path} HTTP ${res.status}: ${JSON.stringify(body).slice(0, 400)}`);
  }
  return body;
}

function grauFromCourseType(courseType?: string): string | null {
  const value = (courseType || '').toLowerCase();
  if (value.startsWith('pós') || value.startsWith('pos')) return 'Pós-Graduação';
  if (value.startsWith('gradua')) return 'Graduação';
  return null;
}

export async function createBwipoLead(input: BwipoLeadInput): Promise<BwipoLeadResult> {
  const source = env('BWIPO_SOURCE');

  // Se o telefone já existir no Bwipo, ele reaproveita o contato (e atualiza o nome).
  const created = await bwipoRequest('POST', '/leads', {
    contact: { name: input.fullName, phone: input.phoneDigits, source },
    deal: { title: input.fullName, stageId: env('BWIPO_STAGE_ID') },
  });
  const dealId = created?.deal?.id;
  const contactId = created?.contact?.id;
  if (!dealId || !contactId) throw new Error('Bwipo não devolveu o id do negócio/contato');

  // O POST /leads ignora customFields, por isso vão num PUT separado.
  const values = [
    { fieldId: env('BWIPO_FIELD_NOME'), value: input.fullName },
    { fieldId: env('BWIPO_FIELD_TELEFONE'), value: input.phoneDigits },
    { fieldId: env('BWIPO_FIELD_ORIGEM'), value: source },
  ];
  const grau = grauFromCourseType(input.courseType);
  if (grau) values.push({ fieldId: env('BWIPO_FIELD_GRAU'), value: grau });

  try {
    await bwipoRequest('PUT', `/deals/${dealId}/custom-fields`, { values });
  } catch (err) {
    console.error('[bwipo] custom fields failed', err);
  }
  try {
    await bwipoRequest('POST', `/deals/${dealId}/tags`, { tagId: env('BWIPO_TAG_ID') });
  } catch (err) {
    console.error('[bwipo] tag failed', err);
  }

  return { dealId: String(dealId), contactId: String(contactId) };
}
