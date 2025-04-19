import { NextResponse } from 'next/server';

const BASE_URL = 'https://randomwise.tools'; // Replace with your actual domain

export async function GET() {
  const staticPages = [
    '', // Home
    '/all-tools',
    '/blog',
    '/flip-coin',
    '/random-number-generator',
    '/rock-paper-scissors',
    '/roll-dice',
    '/spin-the-wheel',
  ];

  // Blog articles (statically listed, can be automated with fs in a real backend)
  const blogArticles = [
    'introduction',
    'scientific-evidence-random-decision',
    'why-use-random-tools',
  ];

  const urls = [
    ...staticPages.map((page) => `${BASE_URL}${page}`),
    ...blogArticles.map((slug) => `${BASE_URL}/blog/articles/${slug}`),
  ];

  const lastmod = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (url) => `
      <url>
        <loc>${url}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `
      )
      .join('')}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
