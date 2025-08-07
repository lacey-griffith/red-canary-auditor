// === Supported URL Tokens ===
// @national-homepage             → Root domain (/)
// @local-homepages               → All slugs scraped from /locations
// @lead-flow                     → Lead flow url (/schedule-service)
// @service-pages                 → URLs scraped from sitemap
// @sitewide                      → all urls on domain
// @sitewide-except-lead          → all urls on domain except lead flow
// @local-homepages-with-offers   → scraped slugs from /locations narrowed down by offer link existing

const auditConfig = {
  brand: "MRE",
  prod: 'https://www.mrelectric.com',
  staging: 'https://dig-www-nei-mre2-stage.nblytest.com',
  locationLinkSelector: {
    prod: 'ul.location-list li.location-item .location-heading a',
    stage: 'ul.location-list li.location-item a.location-title'
  },

  // Whether to fetch URLs from the sitemap.xml
  useSitemap: true,
  sitemapUrl: "https://www.mrelectric.com/sitemap",
  
  // Expected Convert test or deploy IDs and where they should run
  expectedTests: {
    1004112646: {
      name: "CF 17 - [M,P] Sitewide: Remove Search Bar from Header",
      urls: ["@sitewide"],
      type: 'deploy'
    },    
    1004136417: {
      name: "[P] MRE CF 28 Helper - Adding Offer Data to API Notes",
      urls: ["@lead-flow"],
      type: 'deploy'
    },    
    1004139473: {
      name: "MRE 02 - [P] Lead Form: Add Merchandising- V1: Yellow",
      urls: ["@lead-flow"],
      type: 'deploy'
    },    
    1004141639: {
      name: "MRE 09 - [D,P] Sitewide: Improve Nav Dropdown Functionality",
      urls: ["@sitewide-except-lead"],
      type: 'deploy'
    },    
    1004141640: {
      name: "CF 32 - [D,P] National and Local Homepages: Shrink Hero Image",
      urls: ["@national-homepage","@local-homepages"],
      type: 'deploy'
    },    
    1004144785: {
      name: "CF 31 - [P] Local Homepages: Component Ordering 2 | Lead with Testimonials",
      urls: ["@local-homepages"],
      type: 'deploy'
    },    
    1004144786: {
      name: "CF 30 - [P] National Homepage: Component Ordering 2 | Lead with Testimonials- V1",
      urls: ["@national-homepage"],
      type: 'deploy'
    },    
    1004149682: {
      name: "CF 20 - [P] Sitewide: Change Header Color- V2 - Yellow",
      urls: ["@sitewide"],
      type: 'deploy'
    },    
    1004153629: {
      name: "MRE 16 - [P] National and Local Homepage: Redesign Testimonials-V1 - Scrolling animation",
      urls: ["@national-homepage", "@local-homepages"],
      type: 'deploy'
    },    
    1004155213: {
      name: "MRE 18 - [P] Sitewide: Add $ to Offers Link in Header",
      urls: ["@sitewide"],
      type: 'deploy'
    },    
    1004156045: {
      name: "MRE 00 - Goals Trigger",
      urls: ["@sitewide"],
      type: 'deploy'
    },    
    1004162637: {
      name: "MRE - Site Area Audit",
      urls: ["@sitewide"],
      type: 'deploy'
    },
    1004161316: {
      name: "MRE 12 - Lead Form: Step 2 Add Merchandising Box",
      urls: ["@lead-flow"],
      type: 'ab'
    },    
    1004133437: {
      name: "MRE - Site CF 28 - [Live QA] Local Homepage w/ Special Offers: Elevate Special Offers Audit",
      urls: ["@local-homepages-with-offers"],
      type: 'ab'
    },    
    1004152528: {
      name: "CF 07.2 - Sitewide: Submit and Continue From Short Form",
      urls: ["@sitewide"],
      type: 'ab'
    },    
    1004158192: {
      name: "MRE 19 - [D] Service Pages: Invert Photo Background",
      urls: ["@service-pages"],
      type: 'ab'
    },
    1004160657: {
      name: "MRE 19 - [M] Service Pages: Invert Photo Background",
      urls: ["@sitewide"],
      type: 'ab'
    },
    1004161305: {
      name: "MRE 23 - [M, Live QA] Sitewide: Move Sticky CTAs to Bottom",
      urls: ["@sitewide"],
      type: 'ab'
    },
  },

  // Manually added URLs we care about auditing
  extraAuditUrls: [
    "/services",
    "/about-us",
    "/our-team",
    "/locations",
    "/contact-us",
    "/why-us",
    "/testimonials",
    "/a-neighborly-company",
    "/download-our-app",
    "/neighborly-done-right-promise"
  ],
};

export default auditConfig;
