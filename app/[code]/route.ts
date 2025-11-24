import { NextRequest, NextResponse } from 'next/server';
import { sql, ensureDb } from '@/lib/db';

// GET /:code - Redirect to original URL
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    await ensureDb();
    const { code } = params;
    
    // Prevent redirecting for reserved paths
    const reservedPaths = ['api', 'code', 'healthz', 'favicon.ico', '_next'];
    if (reservedPaths.includes(code.toLowerCase())) {
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404 }
      );
    }
    
    const result = await sql`
      SELECT url FROM links WHERE code = ${code}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      );
    }

    const url = result[0].url;

    // Update click count and last clicked time
    await sql`
      UPDATE links
      SET clicks = clicks + 1,
          last_clicked = CURRENT_TIMESTAMP
      WHERE code = ${code}
    `;

    // Return 302 redirect
    return NextResponse.redirect(url, { status: 302 });
  } catch (error) {
    console.error('Error redirecting:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

