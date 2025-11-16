import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const config: PoolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'credential_verification',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

export const db = new Pool(config);

// Test connection
export const connect = async () => {
  try {
    await db.query('SELECT NOW()');
    return true;
  } catch (error) {
    throw error;
  }
};

