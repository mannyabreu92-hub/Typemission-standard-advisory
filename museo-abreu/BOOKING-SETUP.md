# Booking platform setup (Bókun)

Goal: take real bookings in 2–3 weeks by renting the booking system instead of building it.
The app already supports it: paste each product's Bókun link into `booking-config.js` and the
"Book" buttons go to Bókun's checkout. Until then, the app keeps its simulated booking.

## 1. Before signing up (museo)

- [ ] Ask Bókun sales, in writing, which payment provider works for a company registered in the
      Dominican Republic (PayPal, Rapyd or another). Stripe generally does not accept DR businesses.
- [ ] Have ready: company legal name and RNC, bank account, contact email, logo, 5–10 photos.
- [ ] Decide who owns the account (it must be in the museum's name).
- [ ] Confirm prices below and the cancellation policy.

## 2. Create the account

1. Sign up at bokun.io (free plan to start; START plan is about US$49/month + 1.5% per booking).
2. Connect the payment provider confirmed in step 1.
3. Set currency to USD and time zone to America/Santo_Domingo.
4. Create the products below (Bókun calls them "experiences").
5. Copy each product's booking/checkout link and send it to the developer (or paste it into
   `booking-config.js`).
6. Optional: connect Viator from Bókun's channel manager to sell on Viator and Tripadvisor.

## 3. Products to create

Prices are those currently in the app; illustrative ones still need the museum's approval.

| Key in `booking-config.js` | Product | Price (USD) | Capacity | Schedule (Punta Cana time) | Guide languages |
|---|---|---|---|---|---|
| `vip` | VIP Tour del museo | 100 per person (illustrative) | 10 | Tue–Sun 10:00, 12:30, 15:30 | 10:00 ES/EN · 12:30 EN/FR · 15:30 ES |
| `couple` | VIP Tour para parejas | 50 per couple | shares the VIP Tour's 10 places (2 per couple) | same as VIP Tour | same as VIP Tour |
| `artist` | Encuentro con Oscar Abreu | 250 per person (illustrative) | 8 | Saturdays 16:30, only confirmed dates | ES/EN |
| `combo` | Tour y libro digital | 115 per person (illustrative) | shares VIP Tour places | same as VIP Tour | same as VIP Tour |
| `painting-class` | Clase de pintura Psico-Expresionista | 45 per person (illustrative) | 12 | Tue, Thu, Sat 10:00 (2 h) | ES/EN |
| `sculpture-class` | Clase de escultura | 55 per person (illustrative) | 8 | Wed, Sat 15:00 (2 h 30) | ES |
| `gabangi-festival` | ART GABANGI · Festival Pass | 50 (approx.) | — | July 7–14, 10:00–20:00 (July 14 until 17:00) | — |
| `gabangi-vip` | ART GABANGI · VIP All-Access | 140 (approx.) | — | Gala July 6 (doors 18:00, main 20:00) + July 7–14 | — |
| `gabangi-dinner` | ART GABANGI · Auction & Awards Dinner | 200 (approx.) | — | July 14, 19:00 | — |
| `gabangi-gala` | ART GABANGI · Gala Premier | 100 (approx.) | — | July 6, doors 18:00 | — |
| `gabangi-regular` | ART GABANGI · Regular Day | 10 (approx.) | — | One day, July 7–14 | — |

Closed Mondays. Private tours stay as a request form in the app (quote on request).

## 4. What stays in the museum app (not in Bókun)

Pro membership, the book reader and book sales, auctions, the collection and private
meeting/dinner requests. These need the museum's own server later (phase 2).

## 5. Fastest option meanwhile: WhatsApp

Put the museum's WhatsApp number in `booking-config.js` (`whatsapp: '1809…'`). Every booking
and ticket button without a Bókun link then becomes "Book via WhatsApp" with the request
already written, like gabangi.com does today.

## Part 2 · Whop (memberships, clubs, digital book, donations)

Bókun keeps everything with a date and a time. Whop sells what has no date: the Pro membership,
the two monthly clubs, the digital editions of Ecce Homo and class sponsorships. See the Phase 2
plan for the reasons and costs.

1. **Sign up** at whop.com in the museum's name and create the business ("Museo Abreu").
2. **Payouts first:** start Whop's payout setup and check that the Dominican Republic appears in the
   country list. Whop pays only to a bank account in the country the account is registered in, in
   that country's currency. Complete identity verification (KYC) with the account holder's ID.
3. **Products** (Dashboard › Products › Add product): one per row below. Name, short description,
   an image (a painting works), price; "Recurring" with a monthly billing cycle for Pro and the
   clubs, "One-time" for the book and sponsorships.
4. **Checkout links** (Dashboard › Checkout links › Create checkout link): pick the product, check
   the price and billing interval, create, and copy the link.
5. Paste each link into `BOOKING.whop` in `booking-config.js` (or send them to the developer). The
   app's checkout sheet then shows "Pay USD … by card" for that product; empty keys stay on WhatsApp.
6. **Redirect after purchase:** in each product's settings, set the redirect / success URL to
   `https://museo-abreu.vercel.app/?gracias=<key>`, with the product's key from the table below
   (e.g. `?gracias=painting-club`, `?gracias=gabangi-vip`). Buyers land on the app's thank-you page.
7. Make one test purchase with a real card and refund it from the dashboard.

Fees as reported in October 2026 (check docs.whop.com/fees before launch): about 2.7% + US$0.30 per
card payment, more for international cards with currency conversion; payouts are charged
separately (bank transfer, instant or wire, each with its own fee). No monthly fee.

| Key in `BOOKING.whop` | Product | Price (USD) | Billing |
|---|---|---|---|
| `pro` | Pro membership | 25 | monthly |
| `painting-club` | Painting club | 80 | monthly |
| `art-club` | Art club | 30 | monthly |
| `book-en` | Ecce Homo, English digital edition | 60 | one-time |
| `book-es` | Ecce Homo, Spanish digital edition | 60 | one-time |
| `sponsor-25`, `sponsor-50`, `sponsor-100` | Sponsor a painting class | 25 / 50 / 100 | one-time |
| `gabangi-festival` | ART GABANGI · Festival Pass | 50 | one-time |
| `gabangi-vip` | ART GABANGI · VIP All-Access | 140 | one-time |
| `gabangi-dinner` | ART GABANGI · Auction & Awards Dinner | 200 | one-time |
| `gabangi-gala` | ART GABANGI · Gala Premier | 100 | one-time |
| `gabangi-regular` | ART GABANGI · Regular Day | 10 | one-time |

ART GABANGI tickets have fixed dates and no time slots, so they are sold on Whop (a Whop link wins over a
Bókun link for the same ticket). Bókun stays for tours and classes.

### Unlocking purchases automatically (webhook)

The app has a small server (`api/`, Vercel Functions) that Whop notifies after each payment:
1. Whop › **Developer › Webhooks › Create webhook**. URL: `https://museo-abreu.vercel.app/api/whop-webhook`.
   Events: payments succeeded and memberships becoming valid / invalid (cancelled, refunded).
2. Copy the webhook's **secret** and add it in Vercel › museo-abreu › Settings › Environment Variables as
   `WHOP_WEBHOOK_SECRET` (Production), then redeploy.
3. Buyers enter the email they paid with on the thank-you page or in Account ("Purchases made on Whop"),
   and the app unlocks what that email owns: book editions, Pro, clubs. Cancelled or refunded
   memberships stop unlocking.

Storage: the private Vercel Blob store `museo-abreu-purchases` (`BLOB_READ_WRITE_TOKEN`, already set).
`purchases/` holds one file per buyer (named by a hash of the email); `events/` keeps every Whop event
as received, the museum's own record of sales. Products are matched by the last part of each checkout
link in `BOOKING.whop`; an event for an unknown product is kept in `events/` but unlocks nothing.

Limit: anyone who knows a buyer's email could unlock the same items in their own copy of the app.
Pro members and passes should still be checked against Whop's customer list at the door. A code sent by
email would close this gap later (needs an email service).
