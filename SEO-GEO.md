# CBB — SEO / GEO plan

Status as of Nov 12, 2026. "Done" means built into the mockup in this repo; it goes live at launch.

## Baseline: current Squarespace site (crawled Nov 12)

| Issue | Pages affected |
|---|---|
| Same `<title>` ("Chiropractic Treatments & pain relief / Center For bette…") | 9 of 10 |
| No meta description | 9 of 10 |
| No H1 | 7 of 10 (Home has 8 H1s) |
| Structured data: only Squarespace's generic `WebSite` | All |
| Images missing alt text | 31 of 71 |
| Opening hours published anywhere | None |
| AI crawlers | Allowed (robots.txt `*` group). Keep it that way. |

## Done in the mockup

- **Unique titles + descriptions** led by the money query: `Chiropractor in Colorado Springs | Center for Better Balance`; About leads with Dr. Mike's name; Appointments targets booking intent.
- **One H1 per page with the location in it.** The eyebrow ("Chiropractic & whole-body care in Colorado Springs") is now part of the H1; the design is unchanged.
- **JSON-LD**
  - Home: `Chiropractor` + `MedicalClinic` entity (`@id` `/#clinic`) with NAP, `areaServed`, founder/employees, services as `makesOffer`, `sameAs` (Instagram, Facebook), `ReserveAction` to booking.
  - About: `AboutPage` + `Person` for Dr. Mike Valier, DC and Kevin Feldman, DPT, ATC (credentials, alma maters, `knowsAbout`), linked to the clinic `@id`. Breadcrumbs.
  - Appointments: `FAQPage` mirroring six visible Q&As, written answer-first. Breadcrumbs.
- **Canonicals** to `https://www.cbbchiro.com/...`, Open Graph/Twitter cards, a 1200×630 share image and a favicon.
- **Performance:** hero image gets `fetchpriority="high"` plus preload; every other image lazy-loads with `decoding="async"`.
- **Crawl files:** `robots.txt` (allows all), `sitemap.xml`, `_redirects` (301s for `/home`, `/services-1`, `/contact`, `/new-patient-intake-form`, `/cart`).
- **NAP** is the same in the footer, the visit blocks and the schema.

## Must do before launch

1. ~~ZIP~~ Confirmed 80918. ~~Hours~~ Mon–Fri 9 AM–5 PM, now in schema and on the page. Make Google Business Profile, Bing Places and Apple match exactly.
2. **Build the service pages** at their existing URLs: `/chiropractic-care`, `/dry-needling`, `/physical-therapy`, `/personal-training`, `/additional-therapies`, `/massage` (if still offered), plus a GyroStim page. These rank for "dry needling Colorado Springs" and similar searches; Home cannot. Each needs:
   - an answer-first opening paragraph saying what it is, who it helps and what a session involves;
   - the clinician who delivers it (`Person` link);
   - local FAQs;
   - real photos;
   - `MedicalTherapy` / `Service` schema.
3. **Remove `noindex`** from all pages (marked in each `<head>`).
4. **Convert images to WebP/AVIF** and serve responsive sizes (`srcset`). The JPGs are 200–850 KB.
5. **Review cards stay as placeholders for now** (client decision). Fill them with real quotes before launch or remove the section. Don't mark reviews up as `AggregateRating` on our own site: Google ignores self-serving review stars for LocalBusiness.

## GEO / AI search: what moves the needle (sourced)

- **Listings feed a large share of local AI answers.** Yext data, via a vendor summary: about 42% of local citations come from listings, and nearly half of ChatGPT's. Priorities:
  - **Google Business Profile:** primary category Chiropractor; add Physical therapist; services list; hours; photos of the rooms; booking link to `/appointments`.
  - **Bing Places:** ChatGPT search leans on Bing.
  - **Apple Business Connect.**
  - **Healthgrades, Yelp, Vitals:** for Dr. Mike and Kevin as individual providers.
- **Schema is entity hygiene, not a citation lever.** Google's May 15, 2026 AI-search guide says no special markup is needed for AI Overviews or AI Mode. Ahrefs' 1,885-page test (reported second-hand) found no lift in AI citations from adding JSON-LD. We keep schema for the local and knowledge-panel entity, not for AI citations.
- **Skip llms.txt.** Google says Search doesn't use it, and SE Ranking's study of about 300k domains found it doesn't predict citations.
- **What gets cited:** specific, answer-first passages carrying named experts and verifiable facts. Credentials and alma maters, years in practice, what a first visit involves, and who each service suits all count. The service pages are where this lands.
- **Reviews:** steady new Google reviews that mention the service and the city, e.g. "dry needling … Colorado Springs". These feed both the local pack and AI answers.
- **Expect noise:** about 65% of cited sources for a query change day to day (April 2026 study). Measure trends, not snapshots.

## Measure

- **Google Search Console and Bing Webmaster Tools:** verify on launch day and submit the sitemap.
- **GA4:** track AI referrers as their own channel (chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com), plus booking-click events (the PromptEMR frame, `tel:` links).
- **Prompt panel, run monthly:** "best chiropractor Colorado Springs", "dry needling near me Colorado Springs", "GyroStim Colorado Springs", "concussion balance therapy Colorado Springs". Log whether CBB is cited across ChatGPT, Perplexity, Gemini and AI Mode. Ahrefs Brand Radar can automate this.
