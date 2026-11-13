# Casa D' Vans Mountain Resort website

Marketing site for Casa D' Vans Mountain Resort (est. 2021), Maasim, Sarangani.
React 19 + TypeScript + Vite + Tailwind CSS 4, with Framer Motion and Lucide icons.

```bash
npm install
npm run dev       # local development
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build
```

## Before going live

1. **Photos.** Eight photos from the resort's Facebook page are in `public/photos/` as WebP at 800px and 1600px wide.
   To add more, export the same two sizes and register them in `src/content/photos.ts`. There are no photos yet of the casitas,
   the food or the school outreach, so those appear as text only.
2. **Set environment variables** (copy `.env.example` to `.env`):
   - `VITE_SITE_URL`: the public URL. Used for canonical URLs and the absolute `og:image`/`og:url` that Facebook needs.
   - `VITE_INQUIRY_ENDPOINT` (optional): any endpoint that accepts a JSON POST, e.g. Formspree. With it set, the form sends
     directly and shows sending/sent/error states. Without it, the form validates and then opens the visitor's email app
     with the inquiry addressed to the resort, plus a copy-and-Messenger fallback.
3. **Have the owners confirm the copy** in `src/content/site.ts` and `src/pages/About.tsx` (values and story wording).
4. Confirm with the owners that the function hall shown in the photos is on the resort grounds, since the copy describes it as such.

## Content sources

Nothing about rates, hours or history was invented. Facts came from:

- Facebook page `facebook.com/CasaDVansEst.2021` (page title, phone, email, the June 2025 Kyumad Integrated School outreach).
  The page's posts and photos require login and could not be read.
- Photos supplied from the Facebook page (pools, pavilions, poolside wedding, function hall, night pools).
- Public Google reviews, as listed on LookPH (amenities: infinity pool, kiddie/adult pools with lifeguard, wooden casitas,
  food, clean restrooms, plus code VX8C+HX). The quoted reviews are verbatim.

## Structure

- `src/content/`: all business facts, amenities, reviews and the photo registry. Edit content here.
- `src/components/`: layout, header/footer, the `Landscape` illustration, `PhotoFrame`, `Lightbox`, `InquiryForm`, `Seo`.
- `src/pages/`: Home, Services (shown as "Amenities"), Gallery, About, Contact, NotFound. All routes except Home and 404 are lazy-loaded.
- `src/lib/inquiry.ts`: form validation and delivery (endpoint or email).

SPA fallbacks for deep links are included for Netlify (`public/_redirects`) and Vercel (`vercel.json`).
