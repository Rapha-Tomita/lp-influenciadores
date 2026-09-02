import { Router } from 'express';
import { ensureLeadsSchema, getPool } from './db.ts';
import { createKommoLead } from './kommo.ts';

type LeadBody = {
  fullName?: string;
  whatsapp?: string;
  couponCode?: string;
  courseType?: string;
  sourceUrl?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  utm_id?: string;
  influencerCode?: string;
};

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export function createLeadsRouter(): Router {
  const router = Router();

  router.get('/leads/stats', async (_req, res) => {
    try {
      await ensureLeadsSchema();
      const result = await getPool().query(
        `SELECT influencer, total_leads, com_kommo, canais, campanhas, primeiro, ultimo
         FROM leads_por_influencer
         ORDER BY total_leads DESC, influencer ASC`,
      );
      const total = result.rows.reduce((sum, row) => sum + Number(row.total_leads), 0);
      res.json({ ok: true, total, rows: result.rows });
    } catch (err) {
      console.error('[leads] stats failed', err);
      res.status(500).json({ ok: false, error: 'Não foi possível carregar os resultados.' });
    }
  });

  router.post('/leads', async (req, res) => {
    const body = (req.body || {}) as LeadBody;
    const fullName = String(body.fullName || '').trim();
    const whatsapp = String(body.whatsapp || '').trim();
    const couponCode = String(body.couponCode || '').trim().toUpperCase();
    const courseType = String(body.courseType || '').trim();
    const sourceUrl = String(body.sourceUrl || '').trim();
    const utmSource = String(body.utm_source || '').trim().slice(0, 255);
    const utmMedium = String(body.utm_medium || '').trim().slice(0, 255);
    const utmCampaign = String(body.utm_campaign || '').trim().slice(0, 255);
    const utmContent = String(body.utm_content || '').trim().slice(0, 255);
    const utmTerm = String(body.utm_term || '').trim().slice(0, 255);
    const utmId = String(body.utm_id || '').trim().slice(0, 255);
    const influencerCode = String(body.influencerCode || couponCode || utmSource || '').trim().slice(0, 80);
    const phoneDigits = digitsOnly(whatsapp);

    if (fullName.length < 2) {
      res.status(400).json({ ok: false, error: 'Informe o nome completo.' });
      return;
    }
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      res.status(400).json({ ok: false, error: 'Informe um WhatsApp válido.' });
      return;
    }

    try {
      await ensureLeadsSchema();
      const ORIGEM_NEW = 'Form-influencer';
      const result = await getPool().query(
        `INSERT INTO leads
           (full_name, whatsapp, coupon_code, course_type, influencer_code, source_url, origem_new,
            utm_source, utm_medium, utm_campaign, utm_content, utm_term, utm_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         RETURNING id, created_at, origem_new`,
        [
          fullName,
          whatsapp,
          couponCode || influencerCode || null,
          courseType || null,
          influencerCode || null,
          sourceUrl || null,
          ORIGEM_NEW,
          utmSource || null,
          utmMedium || null,
          utmCampaign || null,
          utmContent || null,
          utmTerm || null,
          utmId || null,
        ],
      );
      const row = result.rows[0];

      let kommoLeadId: number | null = null;
      let kommoContactId: number | null = null;
      try {
        const kommo = await createKommoLead({
          fullName,
          phoneDigits,
          whatsapp,
          courseType,
          utmSource,
          utmMedium,
          utmCampaign,
          utmContent,
          utmTerm,
          utmId,
          sourceUrl,
        });
        kommoLeadId = kommo.leadId;
        kommoContactId = kommo.contactId;
        await getPool().query(
          `UPDATE leads SET kommo_lead_id = $1, kommo_contact_id = $2 WHERE id = $3`,
          [kommoLeadId, kommoContactId, row.id],
        );
      } catch (kommoErr) {
        console.error('[leads] kommo create failed', kommoErr);
        res.status(502).json({
          ok: false,
          error: 'Recebemos seus dados, mas não foi possível criar o lead no Kommo. Tente de novo.',
          id: row.id,
        });
        return;
      }

      res.status(201).json({
        ok: true,
        id: row.id,
        createdAt: row.created_at,
        origemNew: row.origem_new,
        kommoLeadId,
        kommoContactId,
      });
    } catch (err) {
      console.error('[leads] insert failed', err);
      res.status(500).json({ ok: false, error: 'Não foi possível gravar o lead. Tente de novo.' });
    }
  });

  return router;
}
