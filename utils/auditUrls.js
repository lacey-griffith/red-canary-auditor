import puppeteer from 'puppeteer';

async function auditUrl(url, expectedTestIds) {
  const fullUrl = `${STAGING_BASE}${url.replace(/\/$/, '')}`;
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  try {
    await page.goto(fullUrl, { waitUntil: 'networkidle2', timeout: 20000 });

    // Wait up to 5s for Convert to load and register experiments
    await page.waitForFunction(() => {
      return window.convert && window.convert.experiments;
    }, { timeout: 5000 }).catch(() => {}); // Ignore timeout, we'll handle fallback

    const foundTests = await page.evaluate(() => {
      if (window.convert && window.convert.experiments) {
        return Object.keys(window.convert.experiments);
      }
      return [];
    });

    const result = {
      url: fullUrl,
      expected: expectedTestIds,
      found: foundTests,
      match: expectedTestIds.every(id => foundTests.includes(id)),
      missing: expectedTestIds.filter(id => !foundTests.includes(id)),
      extra: foundTests.filter(id => !expectedTestIds.includes(id)),
    };

    await browser.close();
    return result;
  } catch (err) {
    await browser.close();
    return {
      url: fullUrl,
      error: err.message,
    };
  }
}
