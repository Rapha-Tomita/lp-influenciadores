import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

function createPool(): pg.Pool {
  if (process.env.DATABASE_URL) {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
      max: 5,
    });
  }

  const host = process.env.DATABASE_HOST;
  const database = process.env.DATABASE_NAME;
  if (!host || !database) {
    throw new Error('Defina DATABASE_URL ou DATABASE_HOST + DATABASE_NAME no .env');
  }

  return new Pool({
    host,
    port: Number(process.env.DATABASE_PORT || 5432),
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || '',
    database,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
    max: 5,
  });
}

let pool: pg.Pool | null = null;

export function getPool(): pg.Pool {
  if (!pool) pool = createPool();
  return pool;
}

let schemaReady: Promise<void> | null = null;

export async function ensureLeadsSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await getPool().query(`
        ALTER TABLE leads ADD COLUMN IF NOT EXISTS kommo_lead_id BIGINT;
        ALTER TABLE leads ADD COLUMN IF NOT EXISTS kommo_contact_id BIGINT;
        ALTER TABLE leads ADD COLUMN IF NOT EXISTS origem_new TEXT NOT NULL DEFAULT 'Form-influencer';
        ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_source TEXT;
        ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_medium TEXT;
        ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
        ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_content TEXT;
        ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_term TEXT;
        ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_id TEXT;
      `);
      await getPool().query(`
        CREATE OR REPLACE VIEW leads_por_influencer AS
        SELECT
          COALESCE(
            NULLIF(TRIM(utm_source), ''),
            NULLIF(TRIM(influencer_code), ''),
            '(sem utm)'
          ) AS influencer,
          COUNT(*)::bigint AS total_leads,
          COUNT(kommo_lead_id)::bigint AS com_kommo,
          COUNT(DISTINCT NULLIF(TRIM(utm_medium), ''))::bigint AS canais,
          COUNT(DISTINCT NULLIF(TRIM(utm_campaign), ''))::bigint AS campanhas,
          MIN(created_at) AS primeiro,
          MAX(created_at) AS ultimo
        FROM leads
        GROUP BY 1;
      `);
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  await schemaReady;
}
