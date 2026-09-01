import 'dotenv/config';

export type KommoCreateInput = {
  fullName: string;
  phoneDigits: string;
  whatsapp?: string;
  courseType?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  utmId?: string;
  sourceUrl?: string;
};

export type KommoCreateResult = {
  leadId: number;
  contactId: number;
};

function kommoBase(): string {
  const raw = (process.env.KOMMO_BASE_URL || '').trim().replace(/\/+$/, '');
  if (!raw) throw new Error('KOMMO_BASE_URL não configurado');
  return raw.endsWith('/api/v4') ? raw : `${raw}/api/v4`;
}

function kommoToken(): string {
  const token = (process.env.KOMMO_TOKEN || '').trim();
  if (!token) throw new Error('KOMMO_TOKEN não configurado');
  return token;
}

function formatBrPhone(digits: string): string {
  if (digits.length === 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  if (digits.length === 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return digits;
}

function toE164(digits: string): string {
  if (digits.startsWith('55') && digits.length >= 12) return `+${digits}`;
  return `+55${digits}`;
}

async function kommoRequest(method: string, path: string, payload?: unknown): Promise<any> {
  const url = `${kommoBase()}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${kommoToken()}`,
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
    const detail = typeof body === 'object' ? JSON.stringify(body).slice(0, 400) : String(body).slice(0, 400);
    throw new Error(`Kommo ${method} ${path} HTTP ${res.status}: ${detail}`);
  }
  return body;
}

function utmNoteText(input: KommoCreateInput): string {
  const lines = [
    input.utmSource && `utm_source: ${input.utmSource}`,
    input.utmMedium && `utm_medium: ${input.utmMedium}`,
    input.utmCampaign && `utm_campaign: ${input.utmCampaign}`,
    input.utmContent && `utm_content: ${input.utmContent}`,
    input.utmTerm && `utm_term: ${input.utmTerm}`,
    input.utmId && `utm_id: ${input.utmId}`,
    input.sourceUrl && `url: ${input.sourceUrl}`,
  ].filter(Boolean);
  return lines.length ? `Atribuição LP Influenciadores\n${lines.join('\n')}` : '';
}

async function applyUtmToLead(leadId: number, input: KommoCreateInput): Promise<void> {
  const utmSourceFieldId = Number(process.env.KOMMO_UTM_SOURCE_FIELD_ID || 15860);
  const utmMediumFieldId = Number(process.env.KOMMO_UTM_MEDIUM_FIELD_ID || 15856);
  const utmCampaignFieldId = Number(process.env.KOMMO_UTM_CAMPAIGN_FIELD_ID || 15858);
  const utmContentFieldId = Number(process.env.KOMMO_UTM_CONTENT_FIELD_ID || 15854);
  const utmTermFieldId = Number(process.env.KOMMO_UTM_TERM_FIELD_ID || 15862);
  const utmReferrerFieldId = Number(process.env.KOMMO_UTM_REFERRER_FIELD_ID || 15864);
  const utmIdFieldId = Number(process.env.KOMMO_UTM_ID_FIELD_ID || 692967);

  const customFields = (
    [
      [utmSourceFieldId, input.utmSource],
      [utmMediumFieldId, input.utmMedium],
      [utmCampaignFieldId, input.utmCampaign],
      [utmContentFieldId, input.utmContent],
      [utmTermFieldId, input.utmTerm],
      [utmIdFieldId, input.utmId],
      [utmReferrerFieldId, input.sourceUrl],
    ] as Array<[number, string | undefined]>
  )
    .filter(([, value]) => Boolean(value))
    .map(([fieldId, value]) => ({ field_id: fieldId, values: [{ value: String(value) }] }));

  if (customFields.length) {
    try {
      await kommoRequest('PATCH', `/leads/${leadId}`, [
        { id: leadId, custom_fields_values: customFields },
      ]);
    } catch (err) {
      console.error('[kommo] utm custom fields failed', err);
    }
  }

  const note = utmNoteText(input);
  if (note) {
    try {
      await kommoRequest('POST', `/leads/${leadId}/notes`, [
        { note_type: 'common', params: { text: note } },
      ]);
    } catch (err) {
      console.error('[kommo] utm note failed', err);
    }
  }
}

export async function createKommoLead(input: KommoCreateInput): Promise<KommoCreateResult> {
  const pipelineId = Number(process.env.KOMMO_PIPELINE_ID || 5481944);
  const statusId = Number(process.env.KOMMO_STATUS_ID || 48539240);
  const tags = ['LP Influenciadores'];
  if (input.courseType) tags.push(input.courseType);
  if (input.utmSource) tags.push(input.utmSource.slice(0, 64));

  const origemFieldId = Number(process.env.KOMMO_ORIGEM_NEW_FIELD_ID || 686585);
  const origemEnumId = Number(process.env.KOMMO_ORIGEM_NEW_ENUM_ID || 452249);
  const nomeFieldId = Number(process.env.KOMMO_NOME_FIELD_ID || 304628);
  const telefoneComercialFieldId = Number(process.env.KOMMO_TELEFONE_COMERCIAL_FIELD_ID || 190582);
  const telefoneComercial = (input.whatsapp || '').trim() || formatBrPhone(input.phoneDigits);

  const leadBody = await kommoRequest('POST', '/leads', [
    {
      name: input.fullName,
      pipeline_id: pipelineId,
      status_id: statusId,
      custom_fields_values: [
        {
          field_id: nomeFieldId,
          values: [{ value: input.fullName }],
        },
        {
          field_id: telefoneComercialFieldId,
          values: [{ value: telefoneComercial }],
        },
        {
          field_id: origemFieldId,
          values: [{ enum_id: origemEnumId, value: 'Form-influencer' }],
        },
      ],
      _embedded: {
        tags: tags.map((name) => ({ name })),
      },
    },
  ]);
  const leadId = leadBody?._embedded?.leads?.[0]?.id;
  if (!leadId) throw new Error('Kommo criou o lead mas não devolveu o id');

  await applyUtmToLead(Number(leadId), input);

  const contactBody = await kommoRequest('POST', '/contacts', [
    {
      first_name: input.fullName,
      custom_fields_values: [
        {
          field_code: 'PHONE',
          values: [{ value: toE164(input.phoneDigits), enum_code: 'MOB' }],
        },
      ],
    },
  ]);
  const contactId = contactBody?._embedded?.contacts?.[0]?.id;
  if (!contactId) throw new Error('Kommo criou o contato mas não devolveu o id');

  await kommoRequest('POST', `/leads/${leadId}/link`, [
    { to_entity_id: contactId, to_entity_type: 'contacts' },
  ]);

  return { leadId: Number(leadId), contactId: Number(contactId) };
}
