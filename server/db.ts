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
