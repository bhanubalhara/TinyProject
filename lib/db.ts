import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

let dbInitialized = false;

export async function initDatabase() {
  if (dbInitialized) return;
  
  try {
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

export { sql };

