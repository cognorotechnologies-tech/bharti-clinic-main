import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const BASE_URL = process.env.BASE_URL || 'https://bhartiveda.com';

interface SitemapUrl {
    loc: string;
    lastmod?: string;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
}

async function generateSitemap() {
    const urls: SitemapUrl[] = [];

    // Static pages
    const staticPages = [
        { loc: '/', changefreq: 'daily' as const, priority: 1.0 },
        { loc: '/shop', changefreq: 'daily' as const, priority: 0.9 },
        { loc: '/therapies', changefreq: 'weekly' as const, priority: 0.9 },
        { loc: '/packages', changefreq: 'weekly' as const, priority: 0.9 },
        { loc: '/blog', changefreq: 'daily' as const, priority: 0.8 },
        { loc: '/gallery', changefreq: 'weekly' as const, priority: 0.7 },
        { loc: '/about', changefreq: 'monthly' as const, priority: 0.7 },
        { loc: '/contact', changefreq: 'monthly' as const, priority: 0.7 },
    ];

    urls.push(...staticPages);

    // Dynamic pages - Products
    const products = await prisma.product.findMany({
        select: { slug: true, updatedAt: true },
        where: { isActive: true },
    });

    products.forEach(product => {
        urls.push({
            loc: `/shop/${product.slug}`,
            lastmod: product.updatedAt.toISOString().split('T')[0],
            changefreq: 'weekly',
            priority: 0.8,
        });
    });

    // Dynamic pages - Therapies
    const therapies = await prisma.therapy.findMany({
        select: { slug: true, updatedAt: true },
        where: { isActive: true },
    });

    therapies.forEach(therapy => {
        urls.push({
            loc: `/therapies/${therapy.slug}`,
            lastmod: therapy.updatedAt.toISOString().split('T')[0],
            changefreq: 'weekly',
            priority: 0.8,
        });
    });

    // Dynamic pages - Packages
    const packages = await prisma.package.findMany({
        select: { slug: true, updatedAt: true },
        where: { isActive: true },
    });

    packages.forEach(pkg => {
        urls.push({
            loc: `/packages/${pkg.slug}`,
            lastmod: pkg.updatedAt.toISOString().split('T')[0],
            changefreq: 'weekly',
            priority: 0.8,
        });
    });

    // Dynamic pages - Blog Posts
    const blogPosts = await prisma.blogPost.findMany({
        select: { slug: true, updatedAt: true },
        where: { status: 'PUBLISHED' },
    });

    blogPosts.forEach(post => {
        urls.push({
            loc: `/blog/${post.slug}`,
            lastmod: post.updatedAt.toISOString().split('T')[0],
            changefreq: 'monthly',
            priority: 0.7,
        });
    });

    // Generate XML
    const xml = generateSitemapXML(urls);

    // Write to file
    const outputPath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'sitemap.xml');
    fs.writeFileSync(outputPath, xml, 'utf-8');

    console.log(`✅ Sitemap generated successfully with ${urls.length} URLs`);
    console.log(`📍 Location: ${outputPath}`);
}

function generateSitemapXML(urls: SitemapUrl[]): string {
    const urlEntries = urls.map(url => {
        const loc = `${BASE_URL}${url.loc}`;
        const lastmod = url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : '';
        const changefreq = url.changefreq ? `\n    <changefreq>${url.changefreq}</changefreq>` : '';
        const priority = url.priority !== undefined ? `\n    <priority>${url.priority}</priority>` : '';

        return `  <url>
    <loc>${loc}</loc>${lastmod}${changefreq}${priority}
  </url>`;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// Run the script
generateSitemap()
    .then(() => {
        prisma.$disconnect();
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Error generating sitemap:', error);
        prisma.$disconnect();
        process.exit(1);
    });
