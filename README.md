# Travel Trails — Website Project Guide

**Brand Mantra:** *Experience the world better.*  
**Locations:** Bangalore, Karnataka & Payangadi, Kerala, India

---

## Project Structure (Visual Studio Code Friendly)

```text
├── index.html                  # Fonts (Playfair Display & DM Sans) and SEO metadata
├── src/
│   ├── index.css               # Global Tailwind CSS theme tokens & brand colours
│   ├── App.tsx                 # Main 4-page router (About, Destinations, Reviews, Contact)
│   ├── config/
│   │   └── brand.ts            # Phone numbers, email, WhatsApp helper, logo & image paths
│   ├── data/
│   │   └── destinations.ts     # All 29 destinations across 3 categories
│   ├── components/
│   │   ├── BrandLogo.tsx       # Logo component (supports custom logo.png)
│   │   ├── TravelImage.tsx     # Resilient photography container
│   │   ├── Navbar.tsx          # Sticky top navigation bar
│   │   └── Footer.tsx          # Footer with links, categories & copyright
│   └── pages/
│       ├── AboutPage.tsx       # Page 1: Hero, Brand Intro, Founders' Story, Services & CTA
│       ├── DestinationsPage.tsx# Page 2: Resort, Domestic & International packages + Search
│       ├── ReviewsPage.tsx     # Page 3: Placeholder traveller stories & Share modal
│       └── ContactPage.tsx     # Page 4: WhatsApp enquiry form, phone/email & locations
└── src/assets/images/          # Local destination & hero photographs
```

---

## Quick Customisation Guide

1. **Using Your Uploaded Travel Trails Logo**
   - Save your `logo.png` file inside `public/assets/logo.png`.
   - Open `src/config/brand.ts` and set `customLogoPath: '/assets/logo.png'`.

2. **Updating Brand Colours**
   - Open `src/index.css` and adjust `--color-navy` (`#102F50`), `--color-teal` (`#087B68`), or `--color-gold` (`#EAB52A`).

3. **Editing Destinations or Images**
   - Open `src/data/destinations.ts` to add destinations, update descriptions, or point any destination to a new image inside `src/assets/images/`.

4. **Adding Google Maps Embeds**
   - Open `src/pages/ContactPage.tsx` and replace the map placeholder box inside the *Where to Find Us* section with your Google Maps `<iframe>` embed code.

5. **Running Locally**
   ```bash
   npm install
   npm run dev
   ```
