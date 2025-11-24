import { NextRequest, NextResponse } from 'next/server';
import { sql, ensureDb } from '@/lib/db';
import { validateUrl, validateCode, generateShortCode } from '@/lib/utils';
import { z } from 'zod';

const createLinkSchema = z.object({
  url: z.string().url('Invalid URL format'),
  code: z.string().regex(/^[A-Za-z0-9]{6,8}$/, 'Code must be 6-8 alphanumeric characters').optional(),
});

// POST /api/links - Create a new link
export async function POST(request: NextRequest) {
  try {
    await ensureDb();
    const body = await request.json();
    const { url, code } = createLinkSchema.parse(body);

    if (!validateUrl(url)) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    let finalCode = code;
    if (!finalCode) {
      // Generate a unique code
      let attempts = 0;
      do {
        finalCode = generateShortCode(6);
        const existing = await sql`SELECT id FROM links WHERE code = ${finalCode}`;
        if (existing.length === 0) break;
        attempts++;
        if (attempts > 10) {
          return NextResponse.json(
            { error: 'Failed to generate unique code' },
            { status: 500 }
          );
        }
      } while (true);
    } else {
      // Check if custom code already exists
      const existing = await sql`SELECT id FROM links WHERE code = ${finalCode}`;
      if (existing.length > 0) {
        return NextResponse.json(
          { error: 'Code already exists' },
          { status: 409 }
        );
      }
    }

    await sql`
      INSERT INTO links (code, url, clicks, last_clicked)
      VALUES (${finalCode}, ${url}, 0, NULL)
    `;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    return NextResponse.json({
      code: finalCode,
      url,
      shortUrl: `${baseUrl}/${finalCode}`,
      clicks: 0,
      lastClicked: null,
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error('Error creating link:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/links - List all links
export async function GET() {
  try {
    await ensureDb();
    const links = await sql`
      SELECT code, url, clicks, last_clicked, created_at
      FROM links
      ORDER BY created_at DESC
    `;

    return NextResponse.json(links.map(link => ({
      code: link.code,
      url: link.url,
      clicks: link.clicks,
      lastClicked: link.last_clicked,
      createdAt: link.created_at,
    })));
  } catch (error) {
    console.error('Error fetching links:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

