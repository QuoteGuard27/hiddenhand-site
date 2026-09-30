# Hidden Hand – marketing site (working name)

Pre-restyle backup: `/workspace/hiddenhand-site-backup-pre-restyle/`. Before/after screenshots: `screenshots/before/`, `screenshots/after/`.

Static one-page site: `index.html`, `styles.css`, `script.js`. No build step.
Open `index.html` in a browser to preview. **Not published anywhere.**

## Changing the business name (one place)

1. Open `script.js` and edit the config at the very top:

   ```js
   var SITE_CONFIG = {
     name: 'Hidden Hand',            // <- new name here
     domain: 'hiddenhand.com.au',    // candidate only, not bought, not shown on the page
     bookingUrl: '',                 // e.g. 'https://calendly.com/you/setup-call'
     contactEmail: ''                // e.g. 'hello@yourdomain.com.au'
   };
   ```

   That updates every element marked `data-brand` (header and footer wordmark,
   hero blurb, "Coming later" section, footer ©), the page `<title>`, the meta
   description, and the `{brand}` aria-labels (`data-brand-aria`).

2. **Also update the static fallback** so people/search engines without
   JavaScript see the right name. From this folder, one command does it:

   ```bash
   sed -i 's/Hidden Hand/New Name/g' index.html script.js
   ```

   (Running this alone is also enough: it updates the config *and* the fallback.)

**Convention:** any new place that shows the name should be written as
`<span data-brand>Hidden Hand</span>`. For attributes, use
`data-brand-aria="{brand} home"`.

**Heads-up:** the headline "The hidden hand behind your admin." is a pun on the
name and is deliberately *not* tied to the config (it's in `index.html` →
`<h1 id="hero-title">` and in `<title>`). Rewrite it by hand if the name changes.

## Placeholders still to fill

| What | Where |
|---|---|
| Booking link | `SITE_CONFIG.bookingUrl` in `script.js` (all "Book a setup call" buttons use `data-booking`) |
| Contact email | `SITE_CONFIG.contactEmail` in `script.js` (`data-contact-email`) |
| Logo | Done: `assets/brand/` (lockup, mark, wordmark, favicons, OG image). Header shows the lockup, mark only below 768px. Sources and rebuild script: `/workspace/hiddenhand-logo/v2/` |
| Domain | Not used on the page. Add canonical / Open Graph tags once a domain is bought |

## Colours & fonts (brand system v2, matches the Hidden Hand Admin logo)

All colours are CSS variables at the top of `styles.css`. Only three hues are used:
bone, carbon and oxide red; everything else is a tint/shade of bone or carbon.

| Token | Hex | Use |
|---|---|---|
| `--bone` | `#E8E4DA` | Page background, text on carbon |
| `--bone-2` | `#DDD8CC` | Tinted sections (Pricing, FAQ) |
| `--surface` | `#F3F0E9` | Cards, inbox/template mock, chips |
| `--rule` | `#C9C3B6` | Soft hairlines on bone |
| `--carbon` | `#111111` | Text, primary buttons, header rule, dark sections ("You're in charge", CTA, footer) |
| `--muted` | `#57534B` | Muted text on bone / bone-2 / surface |
| `--muted-dark` | `#A8A398` | Muted text on carbon |
| `--rule-dark` | `#34332F` | Hairlines on carbon |
| `--red` | `#B33A3A` | Oxide red: the single accent (caret, eyebrow squares, step numerals, "For you" tag, "Approved by you" stamp, focus outline) |

**Contrast rules** (WCAG 2.x AA, all verified; lowest pair on the page is 4.62:1):
- Carbon on bone 14.87:1. Muted on bone 6.03:1, on bone-2 5.38:1.
- Oxide red as **text** only on `--bone` (4.62:1) or `--surface` (5.15:1). Never on `--bone-2` (4.12:1, fails).
- Bone text on a red fill is 4.62:1 (passes). Used for the "For you" tag and the primary-button hover.
- Red on carbon is 3.22:1, so on carbon sections red is graphic only (rules, squares, icons, focus outline), never text.

**Fonts** (Google Fonts): **Outfit** 300/400/500/700 for headings, body and buttons
(the headline mixes 300 + 700 like the wordmark) and **JetBrains Mono** 500 for
labels: eyebrows, nav, chips, tags, step numbers, price meta, inbox mock details.

**Style rules:** flat, square (2px radius max), hairline rules, no gradients, glows or
soft shadows. The only shadow is a hard 6px carbon offset on the template card and
the featured price card. The grid behind the hero mock is a hairline pattern drawn with CSS `linear-gradient` lines (not a colour gradient). The footer uses `hh-lockup-on-dark.svg` because it sits on carbon.
