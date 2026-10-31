# Manual cPanel upload

Build with `npm run build`. Upload the contents of `dist/` to the domain's
Document Root shown under cPanel → Domains (often `public_html`).
The hosting ZIP contains those files directly, without a parent folder.

1. Back up the existing site before replacing its files.
2. Upload `ZiyaraTour-TAYYOR.zip` into the domain's document root.
3. Extract it there and allow existing frontend files to be replaced.
4. Enable Show Hidden Files in File Manager and confirm `.htaccess` exists.
   If the host already has custom `.htaccess` rules, merge the SPA rules rather
   than discarding host-specific settings.
5. Remove the uploaded ZIP from the public folder after extraction.
6. Check `/`, `/gallery`, `/sweets`, and a direct reload of `/gallery`.

The archive excludes SSH keys, environment files, dependencies, and source code.
It includes the existing tour PDF and all public website media.

Booking submission requires the existing `/api/lead` backend. A static ZIP on
Apache does not run the Vercel Node function. Preserve any working API setup;
otherwise configure a compatible backend separately before accepting bookings.
Do not put Telegram tokens into frontend files or public folders.
