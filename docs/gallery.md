# Gallery media

The `/gallery` page reads `src/data/gallery.json`. Run `npm run gallery:sync`
after adding photos or videos to `public/Galery`. Development startup and
production builds also run this command automatically. If the dev server is
already running, run the sync command once to refresh its media list.

Supported images: JPG, JPEG, PNG, WebP, AVIF. Supported video files: MP4,
WebM, M4V, MOV. Browser playback depends on the codec; MP4 with H.264/AAC
is recommended for broad compatibility. Subfolders are scanned automatically.
Videos with generated posters load only the poster image in the grid. The MP4
loads when the viewer opens, with native playback controls.

Redundant initial photo originals and duplicate variants have been removed.
Initial uploads have smaller gallery thumbnails in `public/Galery/optimized`;
the full viewer uses a separate larger version. The sync command discovers
these optimized pairs directly, so deleted originals are not required.
New photos without optimized variants use their original files. Dimensions and
categories for the initial photos are in `scripts/gallery-metadata.json`.
Exact duplicate photos are omitted from the manifest.

## Video optimization

The initial 11 recordings are served as 720 × 1280 H.264/AAC MP4 videos with
fast-start playback and JPG posters. Original MOV recordings are retained
locally in `artifacts/gallery-original-videos`, outside public deployment assets.
That backup directory is ignored by Git; retain it separately if originals
need to be shared or archived elsewhere.

For future MOV uploads in `public/Galery/video`, install FFmpeg and run
`node scripts/optimize-gallery-videos.mjs`, then `npm run gallery:sync`.
Set `GALLERY_FFMPEG` to the FFmpeg executable path if it is not on PATH.
The optimizer refuses to overwrite existing MP4 outputs or original backups.
Posters in `video/posters` are excluded from the photo collection.

Categories: `heritage`, `culture`, `moments`. Unknown media defaults to `moments`.
Translations are in `src/data/translations/gallery.json` for all four site languages.
