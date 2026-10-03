# ZiyaraTour

A multilingual travel website focused on collecting enquiries. Visitors explore tours, leave their contact details, and the team receives the enquiry in Telegram. Submitting a form does not reserve a place or take a payment.

## Local development

Requires Node.js 20.19+ (Node.js 22 or 24 recommended).

```sh
npm install
```

Copy `.env.example` to `.env` and fill in the server-only variables:

```env
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-group-chat-id
BRAND_NAME=ZiyaraTour
```

Create a bot with Telegram's BotFather, add it to the target group, and allow it to send messages. Restart the development server after editing environment variables.

```sh
npm run dev
```

Vite serves both the website and the local `/api/lead` endpoint. Without Telegram credentials, the website still runs; sending the form displays an honest configuration error and direct phone/Telegram links. It never simulates successful delivery.

## Lead flow

1. The visitor supplies a name, international phone number and consent to be contacted. Tour, travel date, group size and a message are optional.
2. The browser sends JSON to `/api/lead` on the same origin.
3. The server validates field types and lengths, rejects the hidden spam field, and sends the enquiry to Telegram with a 10-second timeout.
4. A confirmation appears only after Telegram returns `ok: true`. Failed submissions keep the form contents so the visitor can retry or contact the team directly.

Messages include the selected tour, preferred date, party size, interface language, source page and `utm_source` when present on the submission page. Leads are delivered to Telegram; there is no separate CRM or database in this implementation.

The endpoint has an in-memory limit of five attempts per address per ten minutes. This is best-effort per server instance, not a shared global limiter. For larger campaigns, configure deployment-level WAF/rate limits or a shared store. The `x-vercel-forwarded-for` address is trusted only in the intended Vercel deployment; the local server uses the socket address.

**Credentials must never use a `VITE_` prefix.** If a previous deployment exposed `VITE_TELEGRAM_BOT_TOKEN`, revoke that token in BotFather, create a replacement, and remove the old variable. See [Vite's environment variable documentation](https://vite.dev/guide/env-and-mode.html).

## Deployment

Deploy the repository to Vercel with the Vite preset. Add the three server variables above in project settings, then deploy. `api/lead.js` becomes a Vercel Function, while `vercel.json` handles client-side routes separately from the API. This follows [Vercel's Vite integration](https://vercel.com/docs/frameworks/frontend/vite).

```sh
npm run build
npm run preview
```

The local preview also mounts the lead endpoint. Uploading only `dist/` to a static host will **not** deploy the lead endpoint; such hosting needs a separately implemented server endpoint.

## Editing content

- `src/data/tours.json`: tour descriptions, photos, prices and itineraries.
- `src/data/destinations.json`: destination names and photographs.
- `src/data/site.json`: contact information and company information.
- `src/data/translations/*.json`: existing interface copy.
- `src/data/experience.js`: new hero, enquiry, process and FAQ copy in Uzbek Latin, Uzbek Cyrillic, Russian and English.
- `src/experience.css`: the new visual system and responsive layouts.

The home page uses existing local photographs. Replace the tour collage images with clean, text-free destination photographs when those assets are available.

## Motion and accessibility

The hero includes a real Three.js globe with procedural dotted continents and an orbiting marker. The library is loaded in a separate asynchronous chunk. Canvas resolution is capped, rendering pauses off-screen and in hidden tabs, and reduced-motion users see a static scene. A CSS globe remains if WebGL cannot initialise. See [Three.js responsive rendering](https://threejs.org/manual/pages/responsive.html).

Photo layers and tour cards respond to desktop pointer movement with CSS perspective. Touch devices retain scrolling without drag handlers. The redesign includes labelled inputs, keyboard focus indicators, error announcements, a keyboard-dismissable mobile menu, and reduced-motion support.

## Verification

```sh
npm test
npm run test:ui
npm run build
```

Server tests use mocked Telegram responses and send no real messages. Browser tests use an installed Chrome (`channel: 'chrome'` in `playwright.config.js`) and a local Vite server. They cover desktop/mobile rendering, four languages, 320/768/1440px widths, a WebGL scene, catalogue filtering, form validation, pending/success/failure states, and reduced motion. Browser delivery is mocked, so these tests do not contact Telegram.

Screenshots are written to the ignored `artifacts/` directory. To use Playwright's bundled Chromium instead, install its browser and remove the `channel` setting.
