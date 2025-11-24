# URL Shortener

A modern URL shortener application similar to bit.ly, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✅ Create short links with optional custom codes
- ✅ URL validation before saving
- ✅ Global uniqueness check for custom codes
- ✅ HTTP 302 redirects with click tracking
- ✅ Delete links (returns 404 after deletion)
- ✅ Dashboard with all links table
- ✅ Individual stats page for each link
- ✅ Health check endpoint
- ✅ Search/filter functionality
- ✅ Responsive design
- ✅ Clean, polished UI with proper error handling

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Neon PostgreSQL
- **Deployment**: Vercel (recommended)

## Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd TinyProject
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up database

1. Create a free account at [Neon](https://neon.tech)
2. Create a new PostgreSQL database
3. Copy the connection string

### 4. Configure environment variables

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your database URL:

```
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
```

### 5. Initialize the database

The database schema will be automatically created on first API call. Alternatively, you can run:

```sql
CREATE TABLE IF NOT EXISTS links (
  id SERIAL PRIMARY KEY,
  code VARCHAR(8) UNIQUE NOT NULL,
  url TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  last_clicked TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_links_code ON links(code);
```

### 6. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables:
   - `DATABASE_URL`: Your Neon database connection string
   - `NEXT_PUBLIC_BASE_URL`: Your Vercel deployment URL (optional)
4. Deploy!

### Deploy to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Add environment variables in the Render dashboard

### Deploy to Railway

1. Create a new project on Railway
2. Connect your GitHub repository
3. Add a PostgreSQL database service
4. Add environment variables
5. Deploy!

## API Endpoints

### POST /api/links
Create a new short link.

**Request Body:**
```json
{
  "url": "https://example.com/very/long/url",
  "code": "mycode" // optional, 6-8 alphanumeric characters
}
```

**Response (201):**
```json
{
  "code": "mycode",
  "url": "https://example.com/very/long/url",
  "shortUrl": "https://your-app.vercel.app/mycode",
  "clicks": 0,
  "lastClicked": null
}
```

**Error (409):** Code already exists
**Error (400):** Invalid URL or code format

### GET /api/links
List all links.

**Response (200):**
```json
[
  {
    "code": "mycode",
    "url": "https://example.com/very/long/url",
    "clicks": 42,
    "lastClicked": "2024-01-15T10:30:00Z",
    "createdAt": "2024-01-01T12:00:00Z"
  }
]
```

### GET /api/links/:code
Get stats for a specific link.

**Response (200):**
```json
{
  "code": "mycode",
  "url": "https://example.com/very/long/url",
  "clicks": 42,
  "lastClicked": "2024-01-15T10:30:00Z",
  "createdAt": "2024-01-01T12:00:00Z"
}
```

**Error (404):** Link not found

### DELETE /api/links/:code
Delete a link.

**Response (200):**
```json
{
  "success": true
}
```

**Error (404):** Link not found

### GET /healthz
Health check endpoint.

**Response (200):**
```json
{
  "ok": true,
  "version": "1.0"
}
```

## Routes

- `/` - Dashboard (list, add, delete links)
- `/code/:code` - Stats page for a specific link
- `/:code` - Redirect to original URL (302) or 404
- `/healthz` - Health check

## Code Conventions

- Short codes must be 6-8 alphanumeric characters: `[A-Za-z0-9]{6,8}`
- URLs are validated before saving
- Custom codes are globally unique
- Redirects return HTTP 302
- Deleted links return HTTP 404

## Testing

The application follows the specified conventions for automated testing:

1. `/healthz` returns 200
2. Creating a link works; duplicate codes return 409
3. Redirect works and increments click count
4. Deletion stops redirect (404)
5. UI meets expectations (layout, states, form validation, responsiveness)

## License

MIT

