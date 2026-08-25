import { Router } from 'express';
import { ensureLeadsSchema, getPool } from './db.ts';
import { createKommoLead } from './kommo.ts';

type LeadBody = {
  fullName?: string;
  whatsapp?: string;
  couponCode?: string;
  courseType?: string;
  sourceUrl?: string;
};

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export function createLeadsRouter(): Router {
  const router = Router();

  router.post('/leads', async (req, res) => {
    const body = (req.body || {}) as LeadBody;
    const fullName = String(body.fullName || '').trim();
    const whatsapp = String(body.whatsapp || '').trim();
    const couponCode = String(body.couponCode || '').trim().toUpperCase();
    const courseType = String(body.courseType || '').trim();
    const sourceUrl = String(body.sourceUrl || '').trim();
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
           (full_name, whatsapp, coupon_code, course_type, influencer_code, source_url, origem_new)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, created_at, origem_new`,
        [
          fullName,
          whatsapp,
          couponCode || null,
          courseType || null,
          couponCode || null,
          sourceUrl || null,
          ORIGEM_NEW,
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
