import fs from 'fs';
import auditConfig from '../configs/mreAuditConfig.js';
import { XMLParser } from 'fast-xml-parser';

const { sitemapUrl } = auditConfig;

async function scrapeSitemap() {
  try {
    const res = await fetch(sitemapUrl);
    const xml = await res.text();

    const parser = new XMLParser();
    const json = parser.parse(xml);

    const urls = json.urlset.url
      .map(entry => {
        if (entry.loc) {
          const url = new URL(entry.loc);
          return url.pathname.replace(/\/$/, '');
        }
        return null;
      })
      .filter(Boolean);

    const uniqueUrls = Array.from(new Set(urls));
    fs.writeFileSync('./results/mreSitemapUrls.json', JSON.stringify(uniqueUrls, null, 2));
    console.log(`✅ Sitemap URLs scraped: ${uniqueUrls.length}`);
  } catch (err) {
    console.error('❌ Failed to scrape sitemap URLs:', err.message);
  }
}

scrapeSitemap();
