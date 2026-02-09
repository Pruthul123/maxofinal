import * as fs from 'fs';
import * as path from 'path';
import * as prismic from '@prismicio/client';

const SITE_URL = 'https://www.maxo.co.in';

// Static routes with their priority and change frequency
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.9', changefreq: 'monthly' },
  { path: '/work', priority: '0.9', changefreq: 'weekly' },
  { path: '/future', priority: '0.8', changefreq: 'weekly' },
  { path: '/news', priority: '0.8', changefreq: 'daily' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
];

async function generateSitemap() {
  try {
    console.log('🚀 Generating sitemap...');

    // Initialize Prismic client
    const repoName = process.env.VITE_PRISMIC_REPO_NAME;
    if (!repoName) {
      console.warn('⚠️ VITE_PRISMIC_REPO_NAME not set, generating static sitemap only');
      generateStaticSitemap();
      return;
    }

    const client = prismic.createClient(repoName);

    // Fetch all research insights
    console.log('📡 Fetching research insights from Prismic...');
    const insightsResponse = await client.getAllByType('research_insight', {
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
    });

    console.log(`✅ Found ${insightsResponse.length} research insights`);

    // Fetch all work categories
    console.log('📡 Fetching work categories from Prismic...');
    const categoriesResponse = await client.getAllByType('work_category');
    console.log(`✅ Found ${categoriesResponse.length} work categories`);

    // Fetch all projects
    console.log('📡 Fetching projects from Prismic...');
    const projectsResponse = await client.getAllByType('project');
    console.log(`✅ Found ${projectsResponse.length} projects`);

    // Generate sitemap XML
    const currentDate = new Date().toISOString().split('T')[0];

    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Add static routes
    staticRoutes.forEach((route) => {
      sitemapXml += `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
    });

    // Add research insight detail pages
    insightsResponse.forEach((insight) => {
      if (insight.uid) {
        const lastmod = insight.last_publication_date
          ? new Date(insight.last_publication_date).toISOString().split('T')[0]
          : currentDate;

        sitemapXml += `  <url>
    <loc>${SITE_URL}/future/insight/${insight.uid}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      }
    });

    // Add work category pages
    categoriesResponse.forEach((category) => {
      if (category.uid) {
        sitemapXml += `  <url>
    <loc>${SITE_URL}/work/${category.uid}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
      }
    });

    // Add project detail pages
    projectsResponse.forEach((project) => {
      if (project.uid && (project.data as any).category?.uid) {
        const categoryUid = (project.data as any).category.uid;
        sitemapXml += `  <url>
    <loc>${SITE_URL}/work/${categoryUid}/${project.uid}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
      }
    });

    sitemapXml += `</urlset>
`;

    // Write sitemap to public directory
    const publicDir = path.join(process.cwd(), 'public');
    const sitemapPath = path.join(publicDir, 'sitemap.xml');

    fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');

    console.log(`✅ Sitemap generated successfully at ${sitemapPath}`);
    console.log(`📊 Total URLs: ${staticRoutes.length + insightsResponse.length + categoriesResponse.length + projectsResponse.length}`);
    console.log(`   - Static pages: ${staticRoutes.length}`);
    console.log(`   - Research insights: ${insightsResponse.length}`);
    console.log(`   - Work categories: ${categoriesResponse.length}`);
    console.log(`   - Projects: ${projectsResponse.length}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    // Generate static sitemap as fallback
    generateStaticSitemap();
  }
}

function generateStaticSitemap() {
  console.log('⚠️ Generating static sitemap as fallback...');

  const currentDate = new Date().toISOString().split('T')[0];

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  staticRoutes.forEach((route) => {
    sitemapXml += `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
  });

  sitemapXml += `</urlset>
`;

  const publicDir = path.join(process.cwd(), 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');

  fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');
  console.log(`✅ Static sitemap generated at ${sitemapPath}`);
}

// Run the script
generateSitemap();
