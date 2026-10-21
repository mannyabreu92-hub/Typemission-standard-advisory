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
