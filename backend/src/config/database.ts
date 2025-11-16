import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Helper to fix IPv6 addresses in connection strings for WSL compatibility
const fixConnectionStringForWSL = (connectionString: string): string => {
  // If connection string contains IPv6 address in brackets, extract hostname
  // Pattern: postgresql://user:pass@[2600:1f13:...]:5432/db
  const ipv6BracketMatch = connectionString.match(/@\[([0-9a-fA-F:]+)\]/);
  
  if (ipv6BracketMatch) {
    // This is an IPv6 address - we need to replace with hostname
    // For Supabase, the hostname should be in the format: db.[project-ref].supabase.co
    console.warn('⚠️  IPv6 address detected in DATABASE_URL. For WSL compatibility, use hostname format instead.');
    console.warn('   Example: postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres');
    throw new Error('IPv6 addresses in connection strings are not supported in WSL. Please use hostname format (e.g., db.xxxxx.supabase.co) instead of IPv6 address.');
  }
  
  return connectionString;
};

const config: PoolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'credential_verification',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionString: process.env.DATABASE_URL ? fixConnectionStringForWSL(process.env.DATABASE_URL) : undefined,
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

