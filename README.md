# ZiyaraTour — Travel Booking Website

Modern, multilingual (uz / uzc / ru / en) travel booking site built with
**React + Vite + TailwindCSS**. Tour cards are JSON-driven, and booking
submissions go directly from the browser to your **Telegram group** via
the Bot API — no backend server required.

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
VITE_TELEGRAM_BOT_TOKEN=1234567890:AAExxxxxxxx
VITE_TELEGRAM_CHAT_ID=-1001234567890
VITE_BRAND_NAME=ZiyaraTour
```

5. Restart the dev server (`npm run dev`) — that's it. Submissions from
   the site will now land in your Telegram group.

> **Security note.** Since there is no backend, the bot token is
> embedded in the frontend bundle. That is fine for a booking-only bot
> that just sends leads to a private group — but do **not** grant this
> bot any admin powers beyond sending messages. If you ever want to
> hide the token, move the `sendBookingToTelegram` call to a Vercel /
> Cloudflare serverless function (30 lines).

---

## 3. Adding, editing, or removing tour cards

All tours live in **[`src/data/tours.json`](src/data/tours.json)** — a
plain JSON array. To add a new tour, copy an existing object and
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

Categories: `cultural`, `pilgrimage`, `city`, `adventure`.
Set `"featured": true` to show it on the homepage.

## 4. Adding translations / editing site text

- UI strings → `src/data/translations/{en,ru,uz,uzc}.json`
- Site-wide info (contacts, testimonials, stats) → `src/data/site.json`
- City tiles → `src/data/destinations.json`

To add another language, drop a new JSON file into `translations/` and
register it in `src/i18n/I18nContext.jsx` (the `LANGS` array).

## 5. Images

Placeholder images are served from **picsum.photos** so the site works
out of the box. To swap in your own photos, just replace the URLs in
`tours.json`, `destinations.json`, and `About.jsx`. Any CDN or hosted
folder works. If any URL fails, the `<Img>` component falls back to a
branded gradient card automatically.

## 6. Deploying to Vercel (recommended)

```bash
# 1. Push this folder to a GitHub repo
# 2. In Vercel: Add New Project → Import your repo
# 3. Settings → Environment Variables — add:
#      VITE_TELEGRAM_BOT_TOKEN
#      VITE_TELEGRAM_CHAT_ID
#      VITE_BRAND_NAME  (optional)
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
│   ├── tours.json         # ⭐ Edit tours here
│   ├── destinations.json
│   ├── site.json          # Contact info, testimonials, stats
│   └── translations/      # en / ru / uz / uzc
├── i18n/I18nContext.jsx   # Language provider + <LanguageSwitcher>
└── lib/telegram.js        # Booking → Telegram Bot API
```

## 8. Tech stack

- **React 18** + **React Router 6**
- **Vite 5** — dev server + build
- **TailwindCSS 3** — utility styling
- Zero backend, zero database.

Made with care in Uzbekistan.
