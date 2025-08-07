// utils/expandExpectedUrls.js

import auditConfig from '../configs/mreAuditConfig.js';
import fs from 'fs';
import path from 'path';

// Read scraped slugs and sitemap URLs
const localSlugs = JSON.parse(fs.readFileSync('./results/mreLocalSlugs.json', 'utf-8'));
const sitemapUrls = JSON.parse(fs.readFileSync('./results/mreSitemapUrls.json', 'utf-8'));

// Add logic later for: @local-homepages-with-offers
// For now, this is a placeholder to prevent crash
const localHomepagesWithOffers = []; // Could be updated via a scrapeOffers util later

// Helper to normalize all URLs to relative path (e.g., "/toledo/")
const normalizePath = (url) => {
  const u = new URL(url, auditConfig.domain);
  return u.pathname.endsWith('/') ? u.pathname : u.pathname + '/';
};

// Build a map of token → array of resolved relative paths
const urlTokenMap = {
  '@national-homepage': ['/'],
  '@local-homepages': localSlugs.map(slug => `/${slug}/`),
  '@local-homepages-with-offers': localHomepagesWithOffers.map(slug => `/${slug}/offer`),
  '@lead-flow': ['/schedule-service'], // static for now
  '@service-pages': sitemapUrls.map(normalizePath),
  '@sitewide': Array.from(new Set([
    ...sitemapUrls,
    ...localSlugs.map(slug => `${auditConfig.domain}/${slug}`),
    ...auditConfig.extraAuditUrls.map(url => auditConfig.domain + url)
  ])).map(normalizePath),
  '@sitewide-except-lead': Array.from(new Set([
    ...sitemapUrls,
    ...localSlugs.map(slug => `${auditConfig.domain}/${slug}`),
    ...auditConfig.extraAuditUrls.map(url => auditConfig.domain + url)
  ]))
    .filter(url => !url.includes('/schedule-service') && !url.includes('/schedule-estimate'))
    .map(normalizePath),
};

// Final output object
const expandedTests = {};

for (const [testID, { name, urls, type }] of Object.entries(auditConfig.expectedTests)) {
  let resolvedUrls = [];

  for (const rawUrl of urls) {
    if (rawUrl.startsWith('@')) {
      const tokenUrls = urlTokenMap[rawUrl];
      if (!tokenUrls) {
        console.warn(`⚠️ Unknown token: ${rawUrl} for test: ${name}`);
        continue;
      }
      resolvedUrls.push(...tokenUrls);
    } else {
      resolvedUrls.push(normalizePath(rawUrl));
    }
  }

  // Deduplicate and sort for readability
  const uniqueUrls = Array.from(new Set(resolvedUrls)).sort();

  expandedTests[testID] = {
    name,
    type,
    urls: uniqueUrls
  };
}

// Optional: save to file for inspection/debugging
const outputPath = './results/expandedExpectedTests.json';
fs.writeFileSync(outputPath, JSON.stringify(expandedTests, null, 2));
console.log(`✅ Expanded tests saved to: ${outputPath}`);

export default expandedTests;
