# Museo Abreu · Art Experiences — prototype

Installable web app (PWA) for Museo Abreu in Bávaro, Punta Cana, built from the
"Propuesta de app para el Museo Abreu" (21 Oct 2026). It covers the three core
actions of the first version: **descubrir, reservar, leer**, in Spanish, English and French.

## Run it

Any static server works:

```sh
cd museo-abreu && python3 -m http.server 8000
# open http://localhost:8000
```

## What's in it

| Section | Route | Notes |
|---|---|---|
| Inicio | `#/` | CTAs for VIP Tour and the book; "Descubre a Oscar Abreu" highlights (work, manifestos, Top Ten, reviews) |
| Oscar Abreu | `#/artista` | Bio, timeline, video, catalogue with artwork detail and acquisition enquiry |
| Psico-Expresionismo | `#/psico` | "Descubre otra capa": a slider that lifts six of Oscar Abreu's paintings off a stack (from the family's photos of the gallery's display cubes, straightened; titles pending);  3-minute intro, interactive "discover another layer", first manifesto in full, list of all 23, guiding questions |
| Manifiestos | `#/manifiestos`, `#/manifiestos/:n` | The 23 manifestos from oscarabreu.com (ES/EN), each opening with its artwork, previous/next |
| Pinturas · Dibujos · Escultura · Fotos | `#/pinturas`, `#/dibujos`, `#/escultura`, `#/fotos` | The numbered galleries from oscarabreu.com (36 paintings, 36 drawings, 12 sculptures, 36 photos), lightbox with swipe; WhatsApp enquiry on artworks only |
| Reseñas | `#/resenas` | The 9 critics' excerpts from oscarabreu.com/reviews (ES/EN) |
| Exposiciones | `#/exposiciones` | The Huellas 2004 catalogue from oscarabreu.com/exhibits and the full exhibitions list |
| Contacto | `#/contacto` | Portrait, WhatsApp, Instagram and email from oscarabreu.com/contact |
| Prensa | `#/prensa` | The 10 press articles from oscarabreu.com/bibliography, with the site's summaries (ES/EN) |
| ART GABANGI | `#/gabangi`, `#/gabangi/fundador`, `/club`, `/revista`, `/2025` | 2026 edition from gabangi.com: artists, programme, tickets, exhibit spaces, sponsor packages, team; plus Oscar Abreu's "Quién soy", Club GABANGI, his magazine essay and the 2025 Top Ten press release |
| Visita y VIP Tour | `#/visita` | Booking: experience → date/time/guide language → guests → terms → payment (10-min hold) → QR ticket + calendar file. Private tour request form |
| Biblioteca | `#/biblioteca`, `#/leer/:lang/:chapter` | Editions per language, free sample, purchase, reader with text size, bookmarks, last position |
| Mi cuenta | `#/cuenta` | Tickets, purchases, reading progress, rating, support |
| Personal | `#/personal` | Staff search by code/name, mark ticket as used, today's guests |

Every page about the artist (Oscar Abreu, Psico-Expresionismo, Obra, Manifiestos, Reseñas, Prensa, Exposiciones,
Contacto) shows one section menu, added by the router (`sectionNav` and `ROUTE_SECTION` in `content.js`).

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
- **Gamal Michelén's essay** (`/gamalmichelen/`, linked from the biography but not from the reviews page):
  "Oscar Abreu, verdad o ilusión en su pintura?" in full, in the site's own Spanish, English and French, with its
  five works on paper (`/gallery4/56–60.JPG`, titles only; no year, technique or size on the page). In the app at
  `#/resenas/michelen`, featured at the top of the reviews page.
- **Press** (`/bibliography`): 10 articles with headlines as published and the site's summaries. The article links
  could not be checked from the build environment (news sites blocked there).
- **Photos** (`/photos`, `index2.html`, `index3.html`): 36 event photos (files 3–38, shown as 1–36) with no
  captions, dates or names on the site; the app does not name people or events.
- **Exhibits** (`/exhibits`, a 2008 page): one catalogue, Huellas "La invención de lo visible" (Museo del
  Hombre Dominicano, Nov 4–20, 2004; 64 pp.; essays by Marianne de Tolentino, Odalís G. Perez, Abil Peralta
  Aguero), original English text kept. Its 48-image gallery (`/exhibits/VII/`) is byte-for-byte the same images
  as paintings 1–36 and sculptures 1–12 (two of its files, 10 and 35, are corrupt on the server), so the app
  links to those galleries. "Upcoming Exhibitions" is empty on the site.
- **Contact** (`/contact`): WhatsApp, Instagram `@oscarabreu_aertist` (spelled so on the site, not verified from
  here), info@oscarabreu.com and the portrait. The site's placeholder line "xxxxxxx" is left out.
- **Not included:** `/sociales` is linked in the site's menu but returns 404. `/news` is a 2008 page that only lists Centro Abreu (Curazao No. 61, Ensanche Ozama) as a
  permanent exhibition with old phone numbers; left out until confirmed current.
- **gabangi.com beyond the 2026 menu** (`gabangi.js`, generated from the pages' own text objects): Oscar Abreu's
  "Quién soy" (`/artistas/oscar-abreu/`), his essay "El desafío de recuperar la confianza en las artes visuales"
  (`/magazine/`), the GABANGI 2025 Top Ten press release (`/nota/`, without its closing RSVP/press contact for the
  past gala) and Club GABANGI (`/club/`). Left out: `/festival/`, `/convocatorias/`, `/eventos/`, `/patrocinios/`
  and `/registro/` are 2025-edition prices, calls and sign-up forms for dates now past (they also give two venues,
  Museo Abreu and "Campus GABANGI, Suero"); `/artistas/` shows 0 profiles; `/revista/` lists articles that all
  return 404; `/contacto/` duplicates the contacts (adds gabangiclub@gmail.com, Instagram @gabangi_club);
  `/tienda/` returns 404.
- **From gabangi.com:** ART GABANGI 2026 programme, ticket tiers, artists with Oscar Abreu's quotes
  (English only on the site), exhibit spaces, sponsor entry price, team names and roles.

## Live site

- **https://museo-abreu.vercel.app** (Vercel project `museo-abreu`, deployed from branch
  `claude/new-app-build-37j8di`, root directory `museo-abreu`). Redeploy after each change.
- `booking-config.js`: `live: true` hides all simulation; every booking, purchase and request
  opens WhatsApp **+1 (809) 840-9588** with the message written. Paste Bókun links there when
  the account exists (see `BOOKING-SETUP.md`).

## Quote of the day

The home page opens with a different quote from Ecce Homo each day (Punta Cana date), cycling through
`DAILY_QUOTES` in `data.js`: 78 passages in Oscar Abreu's words, copied exactly from the updated English
manuscript (`New_11_Ecce_Homo_English_presentation`), each credited to its chapter. Spanish visitors get
`DAILY_QUOTES_ES`: 74 sentences copied exactly from the Spanish edition (`Ecce Homo Español`, Ediciones ARTFORO,
2026), checked word for word against its text. Other languages see the English quote, marked "English edition".
The English manuscript
updated the table of contents (chapters XX–LXX were renumbered and retitled), the free Chapter I in `sample-en.js`
and the timeline (`TIMELINE`, 22 milestones from its Biographical Chronology 1978–2026; Spanish, French, German,
Italian and Arabic wording is the app's, pending the Spanish edition).

## Look

Ink, ivory and gold (`styles.css`, "Luxury pass" at the end): the house accent is an antique gold
(`--accent: #75602f`, readable as text), champagne (`--champagne`) for buttons and labels on dark surfaces, and
`--gold` for hairlines. Buttons are squared and letterspaced; tickets, the Pro member card, the Collectors' Circle
panel, the event banner and the RSVP invitation carry a fine gold rule. Terracotta is no longer used.

## RSVP (`rsvp.js`, `#/rsvp/<event>`)

The museum's own yearly invitations without a ticket price (the anniversary on November 17, the group
exhibition on June 13) take a formal RSVP instead of tickets: an engraved-style invitation (event, date, time,
Bávaro), then the reply (accepts with pleasure or declines with regret, up to three guests by name, a note for
the hosts). Live mode sends it to the museum by WhatsApp as a formal RSVP; the reply stays on the visitor's
device, where they can change it or add the evening to their calendar. Linked from the events page and from the
home banner when one of these is the next yearly event. ART GABANGI keeps its tickets.
The anniversary invitation includes the launch of Ecce Homo: the Spanish edition's credits say it is "Publicado en
conmemoración del aniversario del Museo Abreu". Its official Spanish title, *Ecce Homo: El arte me salvó la vida*,
is used throughout (the 2018 Listín Diario headline keeps its own wording).

## Abreu Fine Art and Top 100 Artists

- `#/galeria`: Abreu Fine Art, reopened on October 17, 2026 at Greenfit Wellness Club (Edificio Gardenia, Los
  Corales, Bávaro) with *El ritmo de lo invisible* by Julieta Prissell; its 2011 history at 4394 Broadway. From the
  book's chapters XXXV and LXIX; quotes in Oscar Abreu's English words. Hours pending.
- Library (`#/biblioteca/top100`): *Top 100 Artists: ART GABANGI 2026*, from chapters LXV and LXVII and the chronology.
  "Request a copy" opens WhatsApp; price and cover image pending.
- Both linked from the home page ("More of Museo Abreu") and the footer.

## Link previews

`index.html` carries Open Graph / Twitter tags so shared links show `img/og-image.jpg` (1200 × 630, Oscar Abreu's
*Escaping Being* with the museum name) and a one-line description.

## Languages

Spanish, English and French are built in (`i18n.js` and the `es`/`en`/`fr` fields of the content). German, Italian
and Arabic load only when a visitor picks them from the language menu:
- `lang/<code>.js`: interface text (`I18N.<code>`) and content as English text → translation (`TR.<code>`).
- `lang/<code>-manifestos.js`: manifestos 3–23, loaded with `manifestos-text.js` the first time one is opened.
- **From oscarabreu.com** (the site's own versions): biography, exhibitions' places, manifestos 1–23, work titles,
  reviews, press summaries and Gamal Michelén's essay. Manifesto 15 has one English paragraph ("In my painting,
  dreams take on body, form, and color.") that the site's German, Italian and Arabic versions lack; the app
  translates it.
- **Translated for the app, pending review by a native speaker:** the interface, tours and classes, events,
  the Collectors' Circle, the book's chapter list and chronology, and the gabangi.com texts (Oscar Abreu's
  "Quién soy", his magazine essay, the 2025 press release and Club GABANGI), which gabangi.com publishes only
  in Spanish, English and French.
- Arabic switches the page to right-to-left (`dir="rtl"`, logical CSS properties, mirrored arrows) and loads the
  Noto Naskh Arabic and Noto Sans Arabic fonts.
- Book quotes and the reader stay in the language of an edition: Spanish visitors read the Spanish edition, the
  others the English one.

## Spanish edition (`sample-es.js`)

From `Ecce Homo Español` (Ediciones ARTFORO, 2026, published for the museum's anniversary):
- `SAMPLE_ES`: the free Introduction and Chapter I, exact text. The library's free sample and the Pro daily
  reading use it in Spanish.
- `TOC_ES`: the 70 Spanish chapter titles ("Capítulo I — La tierra fue mi primer lienzo").
- `CREDITS_ES`: the credits page as printed, shown in the library (Spanish) under "Créditos de la edición".
  The short credits line reads: Primera edición, 2026 · Ediciones ARTFORO · Dirección conceptual y editorial:
  Cándido Gerón · Impreso por Amigo del Hogar, Santo Domingo.

## Círculo de Coleccionistas (`#/coleccion`)

Works are acquired by introduction, not bought from a list:
- **No prices anywhere.** A museum advisor discloses availability and price privately.
- Visitors **request an introduction** (name, email, phone, city, how they found the work, interest, optional
  work and referral). In live mode the request opens WhatsApp with the message written; the museum reviews it and
  answers there. Until Phase 2 accounts exist, approval happens outside the app.
- Approved members see new works first, can register interest in a work, request a private viewing, video call
  or dinner with the artist, and ask for an invitation to private evenings.
- Discounts and open auctions are removed; auctions are by invitation only. Pro benefits no longer include
  collecting perks.
- Demo mode only (`live: false`): buttons to simulate approval and reset the request.
- No advisor name, response time or extra services are stated; add them when the museum confirms them.

## Quality checks (22 Oct 2026, second pass)

- Accessibility: axe-core (WCAG 2 A/AA + best practice) on 32 pages × 6 languages (ES, EN, FR, DE, IT, AR) at
  phone width: no violations, no sideways scrolling, no broken images, no script errors, one main heading per page
  (the reader's chapter title became the page heading). All 54 internal links lead to existing pages.
- Slow 4G (1.6 Mbps, 150 ms) from a local server without compression: home ~700 KB, first paint ~1.1 s.
  German, Italian and Arabic add one language file (~105–130 KB) only for visitors who choose them.
- Offline: after one visit the app, tickets and all manifestos open without a connection.
- Install: PNG icons 180/192/512 and a maskable 512 (`img/icon-*.png`), rendered from `icon.svg`.

## Visitor statistics

Vercel Web Analytics (no cookies, no consent banner). Turn it on once in the Vercel dashboard: project
`museo-abreu` → Analytics → Enable. The app loads `/_vercel/insights/script.js` only on the live site and reports:
- a page view per app page (`/visita`, `/coleccion`, `/manifiestos/12`…), since its pages are hash routes;
- events `WhatsApp` (with the page and button label, never the message, which can hold a visitor's name,
  email or phone), `Checkout` (Bókun or Whop link) and `Language`. Custom events show on plans that include them.

## Open items

- Paintings, drawings and sculptures: titles, year, technique, size (the site publishes numbers only).
- Titles and details of the six cube paintings in "Descubre otra capa" (`img/layers/`); better photos, taken
  straight on without reflections, would improve them.
- Full reviews for Marianne de Tolentino, Abil Peralta, Odalís G. Pérez, José Saldaña, Fernando Morbán Laucer
  and Myrna Guerrero (their pages on oscarabreu.com return 404).
- Drawings 16, 17, 18 and 33 are smaller copies of 3, 2, 1 and 6 on oscarabreu.com.
- Gamal Michelén's essay: year of publication, and year, technique and size of its five works (not on the page).
- Translation review (German, Italian, Arabic; 699 texts, reviews saved with the page): https://claude.ai/artifact/RPe9zs7kgDfzFdfSENpSjq
- Phase 2 plan (Bókun, Whop, Collectors' Circle, server): https://claude.ai/artifact/URy8r3Lf2nb9iTt5vMFS1f
- Website fixes for the site owners: https://claude.ai/artifact/M65zq23L1QYti11tFVpqcL
- Questions for the family (answers stored with the page): https://claude.ai/artifact/MaKd21KM2Z39nyuLCK37Ph
- "Ecos de la memoria": year, technique, size (not published on the site).
- Images of the works that open manifestos 16–23 (oscarabreu.com/gallery4/161…231.JPG return 404).
- Spanish versions of the ART GABANGI artist quotes; ART GABANGI 2027 dates.
- Pro membership price; class, tour and club prices (several are illustrative).
- Nov 17 anniversary and June 13 group exhibition: ticket prices and times.
- Museum hours (WhatsApp profile says "by appointment only"), address, accessibility.
- Spanish edition text of Ecce Homo; editorial notes to remove before chapters V, XIV, XVI.
- Phase 2: server for real payments, accounts (Collectors' Circle approval), book access, invitation auctions and admin panel.

## Files

`index.html` shell · `booking-config.js` (WhatsApp, Bókun links, live mode) · `features.js` (classes, events, Collectors' Circle, Pro, daily reading) · `manifestos.js` (manifestos 3–23: titles and images) · `manifestos-text.js` (their text, loaded on demand) · `content.js` (galleries, manifestos, ART GABANGI) · `styles.css` · `i18n.js` (ES/EN/FR strings) · `lang/` (DE/IT/AR, loaded on demand) · `sample-en.js` (book sample + TOC) · `data.js` (experiences, schedule,
works, editions, timeline, quotes, placeholder art) · `app.js` (router, pages, booking, reader) · `sw.js` (offline) ·
`manifest.webmanifest` · `qrcode.js` (MIT, Kazuhiko Arase).
