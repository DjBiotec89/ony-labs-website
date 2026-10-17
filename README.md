# Ony-Labs Website

Source for the public one-pager at [www.ony-labs.com](https://www.ony-labs.com/).

The live site is still served from `DjBiotec89/DjBiotec89.github.io` (built files only). This repository did not contain that source. The React app here follows the live page — same copy, sections, and scroll story — and adds packages, legal pages, a contact form, and SEO files. Nothing in this branch is deployed.

## Preview locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173/).

Production build and preview:

```bash
npm run build
npm run preview
```

Routes: `/`, `/impressum/`, `/datenschutz/`.

## Contact form

The form is not wired to a server. Submit opens an email to hello@ony-labs.com.

To use the included `public/kontakt.php` later on Infomaniak, set one of:

- `VITE_CONTACT_ENDPOINT=/kontakt.php` at build time (see `.env.example`)
- `window.ONY_LABS_CONTACT_ENDPOINT = "/kontakt.php"` in `index.html`

Leave both empty until that host is live. Do not change DNS or the GitHub Pages workflow from this branch.
