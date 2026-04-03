import fs from 'fs';
import path from 'path';

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://carbonx.co.in').replace(/\/$/, '');
const APP_DIR = path.join(process.cwd(), 'src', 'app');

function normalizeRoute(route: string) {
  if (route === '') return '/';
  return route.startsWith('/') ? route : `/${route}`;
}

function collectAppRoutes(dir: string = APP_DIR, routePrefix = ''): string[] {
  const routes: string[] = [];

  const hasPage = fs.existsSync(path.join(dir, 'page.tsx')) || fs.existsSync(path.join(dir, 'page.ts'));
  if (hasPage) {
    routes.push(normalizeRoute(routePrefix));
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const name = entry.name;
    if (name.startsWith('(') || name.startsWith('_') || name.startsWith('@') || name === 'api') continue;
    if (name.includes('[') || name.includes(']')) continue;

    const childDir = path.join(dir, name);
    const childRoutePrefix = routePrefix === '' ? name : `${routePrefix}/${name}`;

    routes.push(...collectAppRoutes(childDir, childRoutePrefix));
  }

  return routes;
}

function buildSitemapXml() {
  const routes = collectAppRoutes().sort();
  const lastmod = new Date().toISOString().split('T')[0];

  const urls = routes
    .filter((route) => route !== '/sitemap.xml')
    .map((route) => {
      const loc = route === '/' ? BASE_URL : `${BASE_URL}${route}`;
      const priority = route === '/' ? '1.0' : '0.8';

      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
  const sitemap = buildSitemapXml();
  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=3600',
    },
  });
}
