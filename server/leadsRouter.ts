import { Router } from 'express';
import { getPool } from './db.ts';

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
      const result = await getPool().query(
        `INSERT INTO leads
           (full_name, whatsapp, coupon_code, course_type, influencer_code, source_url)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, created_at`,
        [
          fullName,
          whatsapp,
          couponCode || null,
          courseType || null,
          couponCode || null,
          sourceUrl || null,
        ],
      );
      const row = result.rows[0];
      res.status(201).json({ ok: true, id: row.id, createdAt: row.created_at });
    } catch (err) {
      console.error('[leads] insert failed', err);
      res.status(500).json({ ok: false, error: 'Não foi possível gravar o lead. Tente de novo.' });
    }
  });

  return router;
}
