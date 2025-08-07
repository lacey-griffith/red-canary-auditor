import fs from 'fs';
import { JSDOM } from 'jsdom';
import auditConfig from '../configs/mreAuditConfig.js';

// Use CLI argument to determine environment: "stage" or "prod"
const mode = process.argv[2]?.toLowerCase() || 'prod';
const useStaging = mode === 'stage';

const domain = useStaging ? auditConfig.staging : auditConfig.prod;
const selector = useStaging
  ? auditConfig.locationLinkSelector?.stage
  : auditConfig.locationLinkSelector?.prod;

async function scrapeLocalSlugs() {
  try {
    console.log(`🌐 Scraping ${useStaging ? 'STAGE' : 'PROD'} (${domain}/locations)`);
    const res = await fetch(`${domain}/locations`);
    const html = await res.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const links = Array.from(document.querySelectorAll(selector));
    console.log(`🔍 Found links: ${links.length}`);

    const slugs = links
      .map(a => {
        try {
          const url = new URL(a.href, domain);
          return url.pathname.replace(/\/$/, '');
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    const uniqueSlugs = Array.from(new Set(slugs));
    fs.writeFileSync('./results/mreLocalSlugs.json', JSON.stringify(uniqueSlugs, null, 2));
    console.log(`✅ Local slugs scraped: ${uniqueSlugs.length}`);
  } catch (err) {
    console.error('❌ Failed to scrape local slugs:', err.message);
  }
}

scrapeLocalSlugs();
