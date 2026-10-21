# Museo Abreu · Art Experiences — prototype

Installable web app (PWA) for Museo Abreu in Bávaro, Punta Cana, built from the
"Propuesta de app para el Museo Abreu" (21 Oct 2026). It covers the three core
actions of the first version: **descubrir, reservar, leer**, in Spanish and English.

## Run it

Any static server works:

```sh
cd museo-abreu && python3 -m http.server 8000
# open http://localhost:8000
```

## What's in it

| Section | Route | Notes |
|---|---|---|
| Inicio | `#/` | CTAs for VIP Tour and the book |
| Oscar Abreu | `#/artista` | Bio, timeline, video, catalogue with artwork detail and acquisition enquiry |
| Psico-Expresionismo | `#/psico` | 3-minute intro, interactive "discover another layer", guiding questions |
| Visita y VIP Tour | `#/visita` | Booking: experience → date/time/guide language → guests → terms → payment (10-min hold) → QR ticket + calendar file. Private tour request form |
| Biblioteca | `#/biblioteca`, `#/leer/:lang/:chapter` | Editions per language, free sample, purchase, reader with text size, bookmarks, last position |
| Mi cuenta | `#/cuenta` | Tickets, purchases, reading progress, rating, support |
| Personal | `#/personal` | Staff search by code/name, mark ticket as used, today's guests |

## Content sources

- **Book:** *ECCE HOMO: Art Saved My Life — The Birth of Psycho-Expressionism* (© 2026 Oscar Abreu,
  English translation by Reed Newhall). The app contains only the table of contents and the free sample
  (Introduction and Chapter I, English) in `sample-en.js`. **The paid chapters are deliberately not in
  the repository**: in production they must be served from the server only to readers who bought access.
- **Biography, timeline, exhibitions, critics' quotes:** taken from the book's front matter and
  Biographical Chronology. They still need the artist's final approval.

## Still placeholder — replace before launch

- Artwork photos and data (title, year, technique, dimensions); the welcome video.
- Spanish edition text and Spanish chapter titles (the Spanish sample shows a "pending" note).
- Prices (proposal's illustrative US$100 / 250 / 115, US$25 per edition), terms draft, sample schedule in `data.js`.
- Address, hours, accessibility, contact details.
- **Payments, accounts and access control are simulated** in the browser (localStorage).
  Production needs a server for: payment provider + webhook confirmation, seat holds and concurrency,
  idempotent ticket creation, refunds, verified email accounts, server-side book access,
  transactional email, admin panel, and staff authentication.

## Files

`index.html` shell · `styles.css` · `i18n.js` (ES/EN strings) · `sample-en.js` (book sample + TOC) · `data.js` (experiences, schedule,
works, editions, timeline, quotes, placeholder art) · `app.js` (router, pages, booking, reader) · `sw.js` (offline) ·
`manifest.webmanifest` · `qrcode.js` (MIT, Kazuhiko Arase).
