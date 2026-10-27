// The museum's events as a calendar people subscribe to (/calendar.ics, webcal://): every yearly event in its next
// two occurrences, from seo/pages.json (tools/seo-build.js). Phones and Google Calendar re-read it on their own, so
// a subscriber sees new dates without doing anything. ?lang= picks the language of the titles.
const fs = require('fs'), path = require('path');
const { nextDate } = require('./page.js');
const LANGS = ['es', 'en', 'fr', 'de', 'it', 'ar', 'ru'];
const SITE = (process.env.SITE_URL || 'https://museo-abreu.vercel.app').replace(/\/$/, '');
const icsText = s => String(s || '').replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
// Lines longer than 75 octets are folded, as the format requires.
const fold = line => { const out = []; let cur = ''; for (const ch of line) { if (Buffer.byteLength(cur + ch) > 74) { out.push(cur); cur = ' ' + ch; } else cur += ch; } return out.concat(cur).join('\r\n'); };

module.exports = (req, res) => {
  const l = LANGS.includes(String(req.query.lang)) ? String(req.query.lang) : 'en';
  const { events } = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'seo/pages.json'), 'utf8'));
  const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Museo Abreu//Events//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'X-WR-CALNAME:Museo Abreu', 'X-WR-TIMEZONE:America/Santo_Domingo', 'REFRESH-INTERVAL;VALUE=DURATION:P1D', 'X-PUBLISHED-TTL:P1D'];
  for (const e of events) {
    let from = new Date();
    for (let k = 0; k < 2; k++) {
      const d = nextDate(e, from); if (!d) break;
      const day = d.start.replace(/-/g, ''), [h, m] = e.time.split(':');
      const link = e.id === 'art-gabangi' ? `${SITE}/art-gabangi` : `${SITE}/events/${e.id}`;
      lines.push('BEGIN:VEVENT', `UID:${e.id}-${d.start}@museoabreu`, `DTSTAMP:${stamp}`,
        // A one-evening event at its hour; one over several days (ART GABANGI) as whole days.
        ...(e.days ? [`DTSTART;VALUE=DATE:${day}`, `DTEND;VALUE=DATE:${new Date(Date.parse(d.end) + 864e5).toISOString().slice(0, 10).replace(/-/g, '')}`]
          : [`DTSTART;TZID=America/Santo_Domingo:${day}T${h}${m}00`, 'DURATION:PT3H']),
        `SUMMARY:${icsText((n => /Museo Abreu/.test(n) ? n : n + ' · Museo Abreu')(e.name[l] || e.name.en))}`, `DESCRIPTION:${icsText((e.desc[l] || e.desc.en) + '\n' + link + (l !== 'en' ? '?lang=' + l : ''))}`,
        'LOCATION:Museo Abreu\\, Bávaro\\, Punta Cana\\, República Dominicana', `URL:${link}`, 'END:VEVENT');
      from = new Date(Date.parse(d.end) + 2 * 864e5);
    }
  }
  lines.push('BEGIN:VTIMEZONE', 'TZID:America/Santo_Domingo', 'BEGIN:STANDARD', 'DTSTART:19700101T000000', 'TZOFFSETFROM:-0400', 'TZOFFSETTO:-0400', 'TZNAME:AST', 'END:STANDARD', 'END:VTIMEZONE', 'END:VCALENDAR');
  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.setHeader('Content-Disposition', 'inline; filename="museo-abreu.ics"');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600');
  res.status(200).send(lines.map(fold).join('\r\n') + '\r\n');
};
