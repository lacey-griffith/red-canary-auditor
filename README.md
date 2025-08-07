# Red Canary Auditor

> Catch misfiring tests and targeting leaks before they gas the whole mine and harm the miners.  
> A Node.js-based audit tool for validating Convert test deployments across production and staging.

---

## 🔍 What It Does

This tool checks whether expected A/B tests or deployments are running correctly across different site areas for supported brands.

It:
- Scrapes for local slugs from `/locations` pages
- Scrapes all URLs from sitemap
- Resolves expected test areas from token-based config
- Checks each page for presence of Convert tests
- Outputs a clean JSON audit report

---

## 🧱 Tech Stack

- **Node.js** (v18+)
- **jsdom** – For parsing client-side rendered HTML
- **node-fetch** – For HTML requests
- **fast-xml-parser** – For scraping sitemap XML
- **Modular config files** – Per-brand targeting and selectors

---

## 📁 File Structure

```bash
.
├── configs/
│   └── mreAuditConfig.js       # Brand-specific audit config
├── results/
│   ├── mreLocalSlugs.json      # Scraped local slugs
│   ├── mreSitemapUrls.json     # Scraped sitemap URLs
│   └── auditReport.json        # Final audit results
├── utils/
│   ├── scrapeLocalSlugs.js     # Scrapes local slugs
│   ├── scrapeSitemap.js        # Scrapes all site URLs from sitemap
│   ├── expandExpectedUrls.js   # Converts token-based config into real URL targets
│   └── auditUrls.js            # Runs audit and outputs match/mismatch logs
└── scripts/
    └── runAudit.js             # Entry point for running everything
