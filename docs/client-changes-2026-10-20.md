# Client requests, 20 October 2026

Source: Telegram screenshots supplied in `mijoz/`, including the full conversation screenshot.

- Ratings: 5 in the hero, statistics counter and shared statistics.
- Remove the complete partners logo section on About and in the footer.
- Remove Hotels and Flights from the service cards.
- Replace the camel hero with an actual Registan Square night photograph.
- Keep one copy of the selected Bukhara group photograph and put it first.
- Remove the gallery photographs marked for removal in the conversation, including their visually duplicate copies. The unused image files were deleted with the user's permission; `hidden` and `order` in `scripts/gallery-metadata.json` persist through gallery regeneration.
- Add a Sweets navigation item after About, with a lightweight empty page translated into Uzbek, Uzbek Cyrillic, Russian and English.
- Replace removed photographs in the tour detail gallery with the corresponding city landmark photographs.
- Destination images were checked: Tashkent shows Hazrati Imam, Samarkand shows Registan, and Bukhara shows Kalan Mosque. These existing local photographs already match the requested cities.

Pending clarification:

- The voice message cannot be transcribed with the tools available in this session. Its contents have not been inferred.
- A screenshot attachment mentioned in the conversation at 14:34 is not separately supplied; its image cannot be identified from its filename alone.

## Hero photograph credit

“Registan square Samarkand, Uzbekistan, at night.jpg”, Benjamin Goetzinger, Wikimedia Commons, 2016.
Source: https://commons.wikimedia.org/wiki/File:Registan_square_Samarkand,_Uzbekistan,_at_night.jpg
License: https://creativecommons.org/licenses/by-sa/4.0/
Local file: `public/images/hero-registan.jpg`.
A 1280 px Wikimedia thumbnail is used; the page crops it to the hero container and places gradients over it.
Credit and source link are visible in the hero.
