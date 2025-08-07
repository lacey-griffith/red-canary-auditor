# scrapeLocalSlugs.js

This utility scrapes and saves all local location slugs from a brand’s `/locations` page, handling different selectors for production and staging environments.

## ✅ Features

- Supports dynamic scraping for Neighborly brand prod/stage sites
- Handles brand-specific DOM selectors
- Normalizes and deduplicates slugs
- Outputs to `results/mreLocalSlugs.json`
- Detects unexpected content (e.g., redirects or non-HTML)

## 🛠️ Tools Used

- `Node.js`
- `jsdom`
- `fs` (Node file system)
- `URL` API
- ES Module imports

## 🔧 Configuration

Ensure your audit config file (e.g., `configs/mreAuditConfig.js`) includes:

```js
locationLinkSelector: {
  prod: 'ul.location-list li.location-item .location-heading a',
  stage: 'ul.location-list li.location-item a.location-title'
}
```

## 🚀 Usage

Edit `utils/scrapeLocalSlugs.js` to toggle between environments:

```js
const useStaging = false; // true = stage, false = prod
```

Then run:

```bash
node utils/scrapeLocalSlugs.js
```

Check `results/mreLocalSlugs.json` for the output slugs.

## 🧩 Next Steps

- Integrate with `expandExpectedUrls.js` to map slugs to test tokens
- Add CLI flags for staging/prod toggle (optional)
- Auto-scrape offers or special paths in future iterations