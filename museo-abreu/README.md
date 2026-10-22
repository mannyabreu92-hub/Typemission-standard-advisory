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
| Psico-Expresionismo | `#/psico` | 3-minute intro, interactive "discover another layer", first manifesto in full, list of all 23, guiding questions |
| Manifiestos | `#/manifiestos`, `#/manifiestos/:n` | The 23 manifestos from oscarabreu.com (ES/EN), each opening with its artwork, previous/next |
| Pinturas · Dibujos · Escultura · Fotos | `#/pinturas`, `#/dibujos`, `#/escultura`, `#/fotos` | The numbered galleries from oscarabreu.com (36 paintings, 36 drawings, 12 sculptures, 36 photos), lightbox with swipe; WhatsApp enquiry on artworks only |
| Reseñas | `#/resenas` | The 9 critics' excerpts from oscarabreu.com/reviews (ES/EN) |
| Contacto | `#/contacto` | Portrait, WhatsApp, Instagram and email from oscarabreu.com/contact |
| Prensa | `#/prensa` | The 10 press articles from oscarabreu.com/bibliography, with the site's summaries (ES/EN) |
| ART GABANGI | `#/gabangi` | 2026 edition from gabangi.com: artists, programme, tickets, exhibit spaces, sponsors, team |
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
- **From oscarabreu.com** (copied verbatim, Spanish and English as published): biography and exhibitions
  (`/biography`), manifestos "La urgencia de crear / The Urgency to Create" (`/statement`) and
  "El trazo como origen / The Stroke as Origin" (`/manifiesto/2.html`, artwork "Time on My Face"),
  manifestos 3–23 (`/manifiesto/N.html`, in `manifestos.js`, generated from the pages' own text objects;
  the images for 16–23 are missing on the site itself, so the app shows only their titles),
  paintings 1–36, drawings 1–36 and sculptures (`/paintings`, `/drawings`, `/sculpture`; numbers only, the
  site's sculpture files 37–48 are shown as 1–12; drawings 16–18 and 33 repeat 3, 2, 1 and 6 on the site), original images of the 6 works (miniatures series
  `/museo/N.JPG`, 8×8 in, MDF, 2021; manifesto works `/gallery4/N.JPG`, 24×24 in, paper, 2019).
  The site marks *Pasión* as sold, so it is out of the collection list.
- **Reviews** (`/reviews`): the 9 excerpts in Spanish and English. Only Cándido Gerón's full review is
  online (`/candidogeron/`); the site's links for the other six critics return 404, so the app does not link them.
- **Press** (`/bibliography`): 10 articles with headlines as published and the site's summaries. The article links
  could not be checked from the build environment (news sites blocked there).
- **Photos** (`/photos`, `index2.html`, `index3.html`): 36 event photos (files 3–38, shown as 1–36) with no
  captions, dates or names on the site; the app does not name people or events.
- **Contact** (`/contact`): WhatsApp, Instagram `@oscarabreu_aertist` (spelled so on the site, not verified from
  here), info@oscarabreu.com and the portrait. The site's placeholder line "xxxxxxx" is left out.
- **Not included:** `/sociales` is linked in the site's menu but returns 404. `/news` is a 2008 page that only lists Centro Abreu (Curazao No. 61, Ensanche Ozama) as a
  permanent exhibition with old phone numbers; left out until confirmed current.
- **From gabangi.com:** ART GABANGI 2026 programme, ticket tiers, artists with Oscar Abreu's quotes
  (English only on the site), exhibit spaces, sponsor entry price, team names and roles.

## Live site

- **https://museo-abreu.vercel.app** (Vercel project `museo-abreu`, deployed from branch
  `claude/new-app-build-37j8di`, root directory `museo-abreu`). Redeploy after each change.
- `booking-config.js`: `live: true` hides all simulation; every booking, purchase and request
  opens WhatsApp **+1 (809) 840-9588** with the message written. Paste Bókun links there when
  the account exists (see `BOOKING-SETUP.md`).

## Open items

- Paintings, drawings and sculptures: titles, year, technique, size (the site publishes numbers only).
- Full reviews for Marianne de Tolentino, Abil Peralta, Odalís G. Pérez, José Saldaña, Fernando Morbán Laucer
  and Myrna Guerrero (their pages on oscarabreu.com return 404).
- Drawings 16, 17, 18 and 33 are duplicates of 3, 2, 1 and 6 on oscarabreu.com.
- "Ecos de la memoria": year, technique, size (not published on the site).
- Images of the works that open manifestos 16–23 (oscarabreu.com/gallery4/161…231.JPG return 404).
- Spanish versions of the ART GABANGI artist quotes; ART GABANGI 2027 dates.
- Pro membership price; class, tour and club prices (several are illustrative).
- Nov 17 anniversary and June 13 group exhibition: ticket prices and times.
- Museum hours (WhatsApp profile says "by appointment only"), address, accessibility.
- Spanish edition text of Ecce Homo; editorial notes to remove before chapters V, XIV, XVI.
- Phase 2: server for real payments, accounts, book access, auctions and admin panel.

## Files

`index.html` shell · `booking-config.js` (WhatsApp, Bókun links, live mode) · `features.js` (classes, events, collection, Pro, daily reading) · `manifestos.js` (manifestos 3–23) · `content.js` (galleries, manifestos, ART GABANGI) · `styles.css` · `i18n.js` (ES/EN strings) · `sample-en.js` (book sample + TOC) · `data.js` (experiences, schedule,
works, editions, timeline, quotes, placeholder art) · `app.js` (router, pages, booking, reader) · `sw.js` (offline) ·
`manifest.webmanifest` · `qrcode.js` (MIT, Kazuhiko Arase).
