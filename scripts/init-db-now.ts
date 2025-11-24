import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_sKGp59MIWPkm@ep-empty-leaf-ahet26pl-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sql = neon(DATABASE_URL);

async function initDatabase() {
  console.log('🔌 Connecting to database...');
  
  try {
    // Test connection
    await sql`SELECT 1 as test`;
    console.log('✅ Database connection successful!');
    
    console.log('📊 Creating tables...');
    
    // Create links table
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
    console.log('✅ Created links table');
    
    // Create index
    await sql`
      CREATE INDEX IF NOT EXISTS idx_links_code ON links(code)
    `;
    console.log('✅ Created index on code');
    
    // Verify table exists
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'links'
    `;
    
    if (tables.length > 0) {
      console.log('✅ Database initialized successfully!');
      console.log('\n📋 Table structure:');
      const columns = await sql`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'links'
        ORDER BY ordinal_position
      `;
      columns.forEach(col => {
        console.log(`   - ${col.column_name} (${col.data_type})`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();

