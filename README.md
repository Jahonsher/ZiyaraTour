# ZiyaraTour — Travel Booking Website

Modern, multilingual (uz / uzc / ru / en) travel booking site built with
**React + Vite + TailwindCSS**. Tour cards are JSON-driven, and booking
submissions go through `/api/lead` to your **Telegram group**. The bot
token stays on the server. Vite provides the same API in development.

---

## 1. Quick start

```bash
# 1. Install dependencies
npm install

# 2. Configure the Telegram bot (see below)
cp .env.example .env
# then edit .env with your token & chat_id

# 3. Run in dev mode
npm run dev
# → open http://localhost:5173

# 4. Production build
npm run build
npm run preview
```

---

## 2. Telegram bot setup (5 minutes)

1. Open [@BotFather](https://t.me/BotFather) → `/newbot` → follow the
   prompts. Copy the **HTTP API token** (looks like `1234567890:AAExxxxx`).
2. Create a **Telegram group** for incoming bookings, add your new bot
   to it, and promote it to **admin** (only needs "Send Messages" permission).
3. Get the group's `chat_id`:
   - Send any message in the group.
   - Open in a browser:
     `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
   - Look for `"chat":{"id":-1001234567890, ...}` — that negative number
     is the `chat_id`.
4. Paste both values into `.env`:

```env
TELEGRAM_BOT_TOKEN=1234567890:AAExxxxxxxx
TELEGRAM_CHAT_ID=-1001234567890
BRAND_NAME=ZiyaraTour
```

5. Restart the dev server (`npm run dev`) — that's it. Submissions from
   the site will now land in your Telegram group.

Existing Vercel deployments can keep their previous `VITE_TELEGRAM_*`
variables during migration: only the server reads them. New deployments
should use the names above. Booking shows success only after Telegram
confirms delivery; missing settings show a direct contact link instead.

---

## 3. Adding, editing, or removing tour cards

The catalog is exported by **[`src/data/tours.js`](src/data/tours.js)**,
combining the original `tours.json` and `instagram-tours.json` with
verified pricing corrections. To add a new tour, copy an existing object and
change the fields. Every text field supports all four languages:

```json
{
  "id": "my-new-tour",
  "slug": "my-new-tour",
  "featured": true,
  "category": "cultural",
  "duration": { "days": 5, "nights": 4 },
  "groupSize": { "min": 2, "max": 15 },
  "priceFrom": 599,
  "currency": "USD",
  "rating": 4.8,
  "reviews": 20,
  "cover":   "https://your-cdn.com/cover.jpg",
  "gallery": ["https://your-cdn.com/1.jpg", "https://your-cdn.com/2.jpg"],
  "destinations": ["samarkand", "bukhara"],
  "title":            { "en": "…", "ru": "…", "uz": "…", "uzc": "…" },
  "shortDescription": { "en": "…", "ru": "…", "uz": "…", "uzc": "…" },
  "description":      { "en": "…", "ru": "…", "uz": "…", "uzc": "…" },
  "highlights":       { "en": ["…"], "ru": ["…"], "uz": ["…"], "uzc": ["…"] },
  "included":         { "en": ["…"], "ru": ["…"], "uz": ["…"], "uzc": ["…"] },
  "excluded":         { "en": ["…"], "ru": ["…"], "uz": ["…"], "uzc": ["…"] },
  "itinerary": []
}
```

Categories: `cultural`, `pilgrimage`, `city`, `adventure`, `beach`.
Set `"featured": true` to show it on the homepage.
Use `null` for an unpublished price, duration or group size. The UI then
shows a request-based option. Instagram clips need `code`, `url`, `poster`
and a four-language `title`; embeds load when the visitor clicks Play.

## 4. Adding translations / editing site text

- UI strings → `src/data/translations/{en,ru,uz,uzc}.json`
- UI additions and corrections → `src/data/translations/features.json`
- Site-wide info (contacts, stats) → `src/data/site.json`
- Guest reviews → `src/data/testimonials.json`
- City tiles → `src/data/destinations.js` (counts derive from the catalog)

To add another language, drop a new JSON file into `translations/` and
register it in `src/i18n/I18nContext.jsx` (the `LANGS` array).

## 5. Images

Tour and Instagram preview images are served locally from `public/images`.
To swap in your own photos, replace the URLs in
`tours.json`, `destinations.json`, and `About.jsx`. Any CDN or hosted
folder works. If any URL fails, the `<Img>` component falls back to a
branded gradient card automatically.

## 6. Deploying to Vercel (recommended)

```bash
# 1. Push this folder to a GitHub repo
# 2. In Vercel: Add New Project → Import your repo
# 3. Settings → Environment Variables — add:
#      TELEGRAM_BOT_TOKEN
#      TELEGRAM_CHAT_ID
#      BRAND_NAME  (optional)
# 4. Deploy. That's it.
```

`vercel.json` already handles SPA routing (rewrites all paths to `/`).

### GitHub Pages

Since the app uses client-side routing, deploy with a hash-router
adapter or use the `dist/` folder from `npm run build`. Vercel or
Netlify are far easier for React SPAs and offer the same free tier.

## 7. Project structure

```
src/
├── App.jsx                # Router
├── main.jsx               # Entry
├── index.css              # Tailwind base + components
├── components/            # UI building blocks
├── pages/                 # Home, Tours, TourDetail, Book, About, Contact
├── data/
│   ├── tours.js           # Combined catalog and verified pricing
│   ├── tours.json         # Original tour programs
│   ├── instagram-tours.json
│   ├── destinations.js   # City tiles and derived tour counts
│   ├── testimonials.json # Guest reviews in all four languages
│   ├── site.json          # Contact info and stats
│   └── translations/      # en / ru / uz / uzc
├── i18n/I18nContext.jsx   # Language provider + <LanguageSwitcher>
└── lib/telegram.js        # Booking → /api/lead
```

## 8. Tech stack

- **React 18** + **React Router 6**
- **Vite 5** — dev server + build
- **TailwindCSS 3** — utility styling
- Vercel serverless booking API, without a database.

Run `npm test` for booking validation and delivery tests. Tour sources and
pricing decisions are recorded in `docs/tour-sources.md`.

Made with care in Uzbekistan.
