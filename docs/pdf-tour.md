# PDF tour catalogue

The only tour offered by the site is `uzbekistan-8-days`. The catalogue, booking
options, destination filters, homepage tour cards and deal banner use
`src/data/tours.js` and `src/data/tours.json`.

Source: `public/manba/DOC-20261007-WA0016.pdf` (3 pages).
The Word draft is retained as a supplied file but does not contribute tour offers.

- Duration: 8 days, 7 nights. Route: Tashkent → Samarkand → Bukhara → Tashkent.
- Hotels: Silk Way Hotel, Tashkent (3 nights); Hilton Garden Inn Afrosiyob,
  Hilton Garden Inn Sogd or Wellness Park Bactria, Samarkand (2 nights);
  Ramada Encore by Wyndham, 47 Gijduvan Street, Bukhara (2 nights).
- BB accommodation, guide throughout, airport/station/city transfers,
  three Afrosiyob tickets and listed entrance tickets are included.
- Single occupancy: $858 for groups of 18–25; $820 for 26–35.
- Double/twin occupancy: $663 for groups of 18–25; $625 for 26–35.
- Rates are per person and apply from 24 October to 10 March. The PDF does not
  specify years. Availability must be confirmed; no year or departure time is invented.
- The Center of Islamic Civilization is an exterior visit only. Optional entry
  inside is paid separately. Ichan Qala and Pahlavon Mahmud are excluded.
- The eight itinerary entries translate the programme on pages 1–3, including
  all listed entrance-ticket places. Hotel nights total 3 + 2 + 2 = 7.
- Unsupported reviews, ratings, old prices and discount percentages are omitted.
- Photos come from the existing local gallery. No external images were downloaded.

The original tour URLs are no longer catalogue entries; the existing detail-page
fallback sends unknown tour slugs to `/tours`.
