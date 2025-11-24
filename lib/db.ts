import { neon } from '@neondatabase/serverless';

let sql: ReturnType<typeof neon> | null = null;

function getSql() {
  if (!sql) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    sql = neon(databaseUrl);
  }
  return sql;
}

let dbInitialized = false;

export async function initDatabase() {
  if (dbInitialized) return;
  
  try {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        code VARCHAR(8) UNIQUE NOT NULL,
        url TEXT NOT NULL,
        clicks INTEGER DEFAULT 0,
        last_clicked TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    // Create index on code for faster lookups
    await sql`
      CREATE INDEX IF NOT EXISTS idx_links_code ON links(code)
    `;
    
    dbInitialized = true;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Helper to ensure DB is initialized before queries
export async function ensureDb() {
  if (!dbInitialized) {
    await initDatabase();
  }
}

// Export a function that returns sql instead of sql directly
// This prevents initialization during build time
export function getDatabase() {
  return getSql();
}

