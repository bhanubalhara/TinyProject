import { NextRequest, NextResponse } from 'next/server';
import { sql, ensureDb } from '@/lib/db';

// GET /api/links/:code - Get stats for a specific code
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    await ensureDb();
    const { code } = params;
    
    const result = await sql`
      SELECT code, url, clicks, last_clicked, created_at
      FROM links
      WHERE code = ${code}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      );
    }

    const link = result[0];
    return NextResponse.json({
      code: link.code,
      url: link.url,
      clicks: link.clicks,
      lastClicked: link.last_clicked,
      createdAt: link.created_at,
    });
  } catch (error) {
    console.error('Error fetching link:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/links/:code - Delete a link
export async function DELETE(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    await ensureDb();
    const { code } = params;
    
    const result = await sql`
      DELETE FROM links
      WHERE code = ${code}
      RETURNING code
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting link:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

