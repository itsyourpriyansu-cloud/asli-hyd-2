# Asli Hyderabad — Variant 2 ("Golden Hour") plan

Built from the 11 section screenshots + 4 slider images in this folder, `context.md` (variant 1 content flow) and the live site aslihyd.in (logo, colours, fonts, real content), 2 Nov 2026.

---

## 1. What variant 2 is

Variant 1 is an editorial, cream/ink, 15-section page that alternates light and dark. Variant 2 is **one continuous golden-hour evening**: every image is shot at sunset through a carved Deccani arch, the page runs warm (cream → amber → dusk → night) and ends at a sunset-skyline footer. It is shorter (11 sections), more hospitality-led ("privately curated", "hosted"), and aims at premium leisure guests and delegates.

**Signature motif:** the cusped (scalloped) Qutb Shahi arch. It appears in every reference image, so it becomes the UI's shape language: image masks, the loader, the section dividers and hover states all use it.

## 2. Brand: what we take from aslihyd.in and what we change

| Item | Source | Decision |
|---|---|---|
| Logo | `aslihyd.in/images/asli_logo.png` (200×60 PNG: script "Asli", multicolour gradient "HYDERABAD", "VISITOR EXPERIENCES") | **Use the real logo.** The screenshots use an invented gold Charminar mark, which we drop. The colour logo works on cream; the dark header and footer bar need a **white knock-out version** (ask the client for SVG/AI; a CSS `filter: brightness(0) invert(1)` is the stopgap). The small Charminar line icon may stay as a **decorative ornament** only (eyebrows, dividers), never next to the wordmark as if it were the logo. |
| Colours | live CSS | `--ink #171614`, `--teal #173f38` (deep) / `#102f2a` (darkest), `--gold #c59a5b`, `--bronze #a97835`, `--gold-soft #d8b77d`, `--cream #fbf8f2`, `--sand #f7f2ea`, `--line #d8d0c4`. These match the screenshots almost exactly. |
| Fonts | live (Google Fonts) | **Cormorant Garamond** 300/400 + italic 300 for headings (the italic bronze half-line in every heading), **Manrope** 500/600 for body, nav, buttons, and letter-spaced eyebrows. |
| Contact | live footer | Phone/WhatsApp **+91 93921 49872**, email **sahana@aslihyd.in**. The screenshots' `hello@aslihyderabad.com` / `+91 98765 43210` are placeholders; never ship them. |
| Testimonials | live site + context.md | The 4 real, verbatim quotes (Zev Siegl, Nick Ut, Barbara Davidson, Isabelle Duceller) with **their real photos** from the live site. The screenshots' "James T. / Sarah M. / Lucas R." and AI faces are fake reviews: not used. |
| Numbers | context.md | 45+ conferences & events · 275+ curated experiences · 30+ partners & local businesses · 55+ cities & countries. (The live site currently shows "0+", which is a bug there.) |
| Routes | live + context.md | `/tours`, `/conventions`, `/conventions/<slug>`, `/experiences/<theme>`, `/originals`, `/originals/<slug>`, `/services`, `/gallery`, `/partners`, `/contact`, `/book-now`. |
| Copy voice | context.md §9 | Two-half headings with italic bronze second half; specific names (Irani chai, Laad Bazaar, Bidri); "hosted, not toured"; "Price on request". |

## 3. Page structure (screenshot → section → real content)

| # | Screenshot | Section | Heading (from screenshot) | Real content mapped in | Ground |
|---|---|---|---|---|---|
| — | — | Loader | — | Arch draws, logo, opens into hero | teal |
| 1 | `1 10.png` + `slider-2..5` | **Hero slider** | "Hyderabad, *beyond* the expected." | 5 slides; CTAs Explore Experiences → `/tours`, Design My Visit → `/book-now` | photo |
| 2 | `2 10.png` | **Our story / why Asli** | "A city of many stories. A *more personal* way to discover them." | 4 pillars: Curated Experiences, Local Hosts, Luxury Hotel Connections, Personalised Itineraries; Our Story → `/contact` (no `/about` yet) | cream |
| 3 | `3 11.png` | **Asli Originals** | "Extraordinary Hyderabad, *curated for you.*" eyebrow "Signature Experiences" | The 4 strongest Originals: Dawn (Sun 6:30 AM), The Hyderabad Table, After Dark, Festival Hyderabad → `/originals/<slug>`; View All → `/originals` | cream + etched skyline |
| 4 | `4 6.png` | **Six themes** | "Journeys for *every interest.*" | The real six: Heritage, Culture, Cinema, Business, Wellness, Learning, with live one-liners ("Walk through centuries." …) → `/experiences/<theme>` | cream |
| 5 | `5 3.png` | **Delegates / conventions** | "Make more of your time in *Hyderabad.*" | Before / Between / After; Explore Delegate Experiences → `/conventions`; Find your conference → opens event finder (live list) | split photo / cream |
| 6 | `6 2.png` | **Private Access** | "Some experiences begin where the *guidebook ends.*" | Enquire for Private Access → `/contact` | teal + doors |
| 7 | `7 1.png` | **Workshops (Quick Experiences)** | "Learn. Create. *Take a piece* of Hyderabad with you." | Lac bangles, Bidri, Cheriyal masks, Pochampally ikat, pearls, Deccani calligraphy, Sufi evening… (duration + "Artisan-led") ; View All Workshops → `/services` | dark photo |
| 8 | `8 1.png` | **Partners / hosted** | "Thoughtfully connected. *Seamlessly* hosted." | Partner logos (see decision D4), 3 service pillars; Explore Partner Experiences → `/partners` | dark photo |
| 9 | `9 1.png` | **Proof: numbers + voices** | "Personal stories. *Lasting* impressions." | Numbers band (4 figures) + 4 real testimonials | dusk photo |
| 10 | `10 1.png` | **Plan your visit (form)** | "Let's design your *Hyderabad* experience." | Enquiry form → `/book-now` handler; email/WhatsApp direct | cream + sunset |
| — | `11.png` | **Footer** | "More than a destination · A deeper connection" | Real columns (Experiences / Delegate Services / About / Contact), newsletter, real contacts | sunset skyline + teal bar |

**Story arc:** Arrive (1) → who we are (2) → what only we do (3) → pick your interest (4) → here for work? (5) → doors others can't open (6) → make something (7) → we handle everything (8) → others loved it (9) → plan (10).

**Dropped from variant 1** (on purpose, to keep variant 2 shorter): Statement, Two Paths, Rooted skyline, Reels, Co-curated bento. Numbers move into §9 so proof reads as one idea (fixes context.md observation #2). Two CTAs to `/book-now` stay (hero + §10), matching the standing "no extra CTAs" rule.

## 4. Interaction spec

### 4.1 Global system

- **Stack:** static `index.html` + `css/` + `js/motion.js`, same as variant 1. GSAP 3.12.5 + ScrollTrigger + Lenis 1.1.x from cdnjs/jsdelivr. No framework.
- **Smooth scroll:** Lenis, `lerp: 0.09`, `wheelMultiplier: 1`; disabled on touch (native momentum).
- **Easing tokens:** `--ease-out: cubic-bezier(.22,1,.36,1)` (reveals), `--ease-io: cubic-bezier(.65,0,.35,1)` (slides, doors), `--ease-soft: cubic-bezier(.33,1,.68,1)` (hover).
- **Duration tokens:** hover 0.35s · reveal 0.9s · image 1.2s · hero slide 1.6s.
- **Default reveal** (any `[data-reveal]`): from `y: 32, opacity: 0` to rest, 0.9s ease-out, starts when the element's top hits 85% of the viewport, plays once. Children stagger 0.08s.
- **Heading reveal:** split by line (wrap each line in an overflow-hidden span); lines rise `yPercent 110 → 0`, 1s, stagger 0.1s. The italic bronze half starts 0.15s later and also fades `letter-spacing 0.04em → 0`.
- **Gold rules / ornaments** (the ── ◆ ── dividers): `scaleX 0 → 1` from centre, 0.8s, as the heading lands; the diamond rotates 45° → 0.
- **Arch image mask:** images marked `data-arch` sit in an SVG `clipPath` shaped like the cusped arch. On reveal, the clip scales `0.85 → 1` while the image scales `1.15 → 1` (1.2s). This is the one signature move; use it on §2, §5, §6 images only (not every card).
- **Buttons:** pill. Bronze fill buttons: hover darkens to `--bronze`, arrow moves `x +4px`, 0.35s. Outline buttons: hover fills from left (pseudo-element `scaleX 0→1`, origin left). Press: `scale .98`.
- **Text links ("Explore →"):** underline is a 1px bar, `scaleX 0.3 → 1` on hover; arrow `x +4px`.
- **Reduced motion** (`prefers-reduced-motion: reduce`): no Lenis, no parallax, no pinning, no autoplay; reveals become a 0.3s opacity fade; hero shows slide 1 static with manual dots; doors show open.
- **Header:** transparent over the hero with the **white** logo; after 80px scroll it becomes `--teal` at 92% opacity with `backdrop-filter: blur(12px)` and a 1px gold bottom line (0.4s). Scrolling down >200px hides it (`yPercent -100`); any scroll up shows it. Nav links: gold underline grows from centre on hover. "Plan Your Visit" pill always visible.
- **Mobile menu (<1024px):** hamburger → full-screen teal panel; links rise in with 0.06s stagger; WhatsApp + phone at the bottom; body scroll locked; Esc / close button returns focus to the trigger.
- **Floating WhatsApp** button (live site has one): bottom-right, appears after the hero, links `https://wa.me/919392149872`.

### 4.2 Section by section

**Loader (max 2.2s, once per session via `sessionStorage`)**
1. Teal screen; a gold cusped arch outline draws with `stroke-dashoffset` (1.0s, ease-io).
2. Logo (white) fades and rises 12px inside the arch (0.5s).
3. The arch's clip-path expands to cover the viewport, revealing hero slide 1 through it (0.9s, ease-io); the loader is removed. Skip if the page was cached / reduced motion.

**1 · Hero slider**
- 5 slides: `1 10.png` composition (terrace + Charminar), `slider-2` (balcony sunset), `slider-3` (Falaknuma-style palace steps), `slider-4` (fountain terrace), `slider-5` (Golconda). Each slide has its own headline pair, e.g. "Hyderabad, *beyond* the expected." / "Palaces that *still* remember." / "Evenings *made* for you." / "Four centuries, *one* city."
- Left-side gradient `teal 85% → transparent 55%` so text always reads.
- Autoplay 7s. Transition: incoming image crossfades (1.6s) and scales `1.08 → 1` over its full 7s (slow Ken Burns); outgoing headline lines drop out `yPercent 0 → -110` (0.5s) before the new ones rise.
- Progress: 5 thin gold bars bottom-left, each fills over 7s; click a bar to jump. Arrow keys work when the hero is focused. Swipe on touch. Pauses on hover, on tab hidden, and when scrolled out of view.
- Pointer parallax (desktop only): image shifts ±12px opposite to the cursor, 0.8s lag.
- On scroll out: image `yPercent 0 → 15`, content fades out by 60% of the hero height.
- Scroll cue: small "Scroll" label with a 1px line that loops downward.

**2 · Our story**
- Desktop: two columns; the right image is **pinned** while the left column scrolls past (pin length = left column height). The image uses the arch mask reveal, then drifts `scale 1.05 → 1` across the pin.
- Eyebrow line draws, heading line-reveals.
- 4 pillar icons are line SVGs: strokes draw in (`stroke-dashoffset`, 0.8s, stagger 0.12s); the short gold underline under each title grows after its icon.
- Mobile: image first (4:5, arch-masked), then text, no pin.

**3 · Asli Originals (4 cards)**
- The etched Hyderabad skylines left and right are SVG line art; their paths draw as the section enters (scrubbed to scroll, 0 → 100% over the first 60% of the section).
- Small Charminar ornament under the eyebrow fades in and rises.
- Cards rise with stagger 0.1s. Hover: image `scale 1 → 1.06` (1.2s ease-soft), card lifts `y -6px` with a soft warm shadow, the "Explore" underline grows. Each card shows its schedule tag (e.g. "Sundays · 6:30 AM") as a small pill over the image.
- <1024px: horizontal snap rail (`scroll-snap-type: x mandatory`, cards 82vw), with a thin progress bar under it.

**4 · Six themes ("Journeys for every interest")**
- Desktop: 6 tall portrait cards in one row, an **expanding accordion**: the hovered/focused card grows `flex 1 → 1.9` (0.6s ease-io), the others shrink; its description and arrow circle fade in. Default state: the first card is expanded. Arrow circle fills gold on hover; whole card is the link to `/experiences/<theme>`.
- Keyboard: Tab moves through cards and expands each on focus.
- Entering: cards rise in a wave (stagger 0.07s) and their images de-blur `blur 8px → 0`.
- <1024px: no accordion; 2-column grid on tablet, horizontal snap rail on phone with all descriptions visible.

**5 · Delegates**
- Left photo (delegates on a terrace) is half the viewport, pinned while the right column scrolls; subtle `yPercent -8` parallax inside.
- The 3 phase cards (Before / Between / After) are joined by a gold line that **fills left → right**, scrubbed to scroll; each card's number dot turns gold as the line reaches it.
- "Find your conference →" opens a **side drawer** (right, 420px, `x 100% → 0`, 0.5s ease-io) with a search field and the upcoming conventions list (name, dates, venue → `/conventions/<slug>`); past events are filtered out by date, as in variant 1. Esc / overlay click closes; focus is trapped while open.
- The 4 service icons at the bottom draw in like §2.

**6 · Private Access (the signature moment)**
- Section is **pinned for ~120vh** of scroll.
- Layers: (a) palace courtyard at dusk, (b) left door panel, (c) right door panel (generated as separate images with transparent edges), (d) teal text panel on the left.
- Scrubbed timeline: doors rotate open in 3D (`perspective 1600px`, left `rotateY 0 → -78°` around its left edge, right `0 → 78°` around its right edge); the courtyard scales `1.12 → 1`; the chandelier glow fades up; lantern flicker loops subtly (opacity 0.85↔1, 2.4s).
- Text panel: heading line-reveals at 30% progress, body at 45%, CTA at 60%.
- Mobile / reduced motion: no pin; doors shown already open, the image uses the standard arch reveal.

**7 · Workshops**
- Full-bleed dark backdrop (Charminar through arches) with slow parallax `yPercent -10`.
- Cards in a **draggable horizontal rail** (desktop: drag with mouse, cursor becomes a small gold "Drag" circle; wheel scrolls vertically as normal). Prev/next arrows on the right of the heading. Cards show title, one line, duration, "Artisan-led / Home Chef-led / Renowned Artists", "Price on request".
- Hover: thin gold border glows (`box-shadow 0 0 0 1px gold, 0 20px 40px -20px gold/40`), image zooms 1.05, a "Book now" link slides up from the card bottom (→ `/book-now?experience=<slug>`), fixing variant 1's inert cards.

**8 · Partners / hosted**
- Background image (porter at the car under the arcade) with slow pan `x -2% → 2%` scrubbed through the section.
- Partner logos sit in a row, monochrome gold-white at 70% opacity; hover → 100% and a thin gold underline. If more than 5 logos, the row becomes a slow marquee (40s loop, pauses on hover).
- 3 service icons (bell, car, Charminar) draw in.

**9 · Proof: numbers + testimonials**
- Numbers band at the top: 4 figures **count up** from 0 (1.6s, ease-out, once) when 50% visible; separators are thin gold rules.
- Testimonials: 3 cards visible on desktop, a carousel of 4 (one slides in). Auto-advance 6s, pause on hover/focus, drag/swipe, dots + arrows. Active card is full opacity; side cards 0.6. Quote marks scale in. Real photo on top of each card (cropped 16:10).

**10 · Plan your visit (form)**
- Left: heading + 4 benefit icons over a sunset terrace image that slowly rises `yPercent 10 → 0`.
- Right: form card on cream with ornament top/bottom.
- Fields: Full name*, Email*, Travel dates* (two native date inputs: arrive / depart, depart ≥ arrive), Hotel or event, Number of guests (number, min 1), Interests (**multi-select chips**: Heritage, Culture, Cinema, Business, Wellness, Learning; chip toggles bronze fill), Message.
- Floating labels; focus ring 1px gold + soft glow. Inline validation on blur, error text under the field, `aria-describedby` linked.
- Submit: button shows a spinner, then the card flips to a success state ("Thank you. We'll reply within 24 hours.") with a WhatsApp button pre-filled with their dates and interests. On network error: message + "Email us instead" link. Posts to the same handler `/book-now` uses (to confirm with dev; see D6).

**Footer**
- **Curtain reveal:** the footer is `position: sticky; bottom: 0` under the main content, so the page scrolls away to uncover it.
- Sunset skyline image rises `yPercent 15 → 0`; the "More than a destination ◆ A deeper connection" rule draws from centre.
- Newsletter: email field + Subscribe; success replaces the field with "You're on the list."
- Bottom teal bar with ornamental corner tiles; © 2026, Privacy, Terms, Site map.

### 4.3 Breakpoints

| Width | Changes |
|---|---|
| ≥1280 | Full layout as above |
| 1024–1279 | Same, tighter gutters; §4 accordion keeps working |
| 768–1023 | No pinning in §2/§5/§6; §3/§4/§7/§9 become snap rails; hamburger menu |
| <768 | Single column; hero headline 40px; form fields stack; 16px side gutter; no horizontal page scroll |

## 5. Image generation plan

All images are new and generated; the screenshots are **style references only** (we don't ship them). The 4 slider PNGs and `1 10.png` are close to final; regenerate them at full resolution in the same style.

**Shared style block** (append to every prompt):
> golden hour, warm amber and rose sky, ivory marble and sandstone, cusped Qutb Shahi arches with fine stucco, brass Moroccan-style lanterns lit, white jasmine, deep teal velvet accents, Persian carpet, cinematic 35mm, shallow depth of field, soft haze, photorealistic, no text, no logos, no watermark

**Negative:** distorted architecture, extra minarets, wrong Charminar (it has exactly 4 minarets and a 4-arch square base), plastic skin, extra fingers, modern signage, cars in heritage scenes (except §8), oversaturated orange.

| ID | Section | Ratio / size | Prompt (subject) |
|---|---|---|---|
| H1 | Hero 1 | 16:9, 2880×1620 | Palace terrace lounge, ivory sofa with teal cushions, brass tea service, view of Charminar and lit old-city bazaar at sunset through a cusped arch; left 40% darker for text |
| H2–H5 | Hero 2–5 | 16:9, 2880×1620 | Re-renders of `slider-2..5`: balcony sunset over old city; palace grand staircase with fountains (Falaknuma mood); fountain courtyard terrace; Golconda Fort ramparts from a carved balcony |
| S2 | Our story | 4:5, 1600×2000 | Woman in ivory and teal dupatta walking a marble arcade toward a Charminar view, back to camera (no identifiable face) |
| O1–O4 | Originals | 4:3, 1200×900 | Dawn: Irani chai and Osmania biscuits at a café counter at sunrise, Charminar soft in the background · Hyderabad Table: long candle-lit dinner table, biryani in a copper deg · After Dark: lantern-lit Laad Bazaar lane with bangle stalls at night · Festival: Bonalu procession with decorated pots and marigolds (dusk) |
| T1–T6 | Themes | 2:3, 1000×1500 | Heritage: Golconda Fort walls · Culture: hands holding a Bidri vase with pearls on teal velvet · Cinema: vintage film camera and director's chair on a palace terrace · Business: HITEC City glass towers at dusk seen from a heritage terrace · Wellness: yoga mat and brass bowl on a quiet terrace at sunrise · Learning: a host talking with a small group under arches (faces soft) |
| D1 | Delegates | 3:4, 1600×2100 | Four business guests in suits and saree laughing over chai on a terrace, Charminar at sunset; diverse, natural, faces generic |
| D2–D4 | Before/Between/After | 4:3, 900×675 | Golconda at golden hour · palace dining hall set for lunch · Buddha statue on Hussain Sagar at sunset |
| P1 | Private Access courtyard | 16:9, 2880×1620 | Palace courtyard at dusk, fountain, lit arcades, chandelier hanging in the foreground arch |
| P2/P3 | Doors | 2 × (1440×1620), PNG with alpha | Left and right carved teak doors with brass studs, closed, lit warm from the front; isolated on transparent background, matched perspective |
| W1–W8 | Workshops | 4:3, 900×675 | Hands making lac bangles · Bidri inlay with a stylus · Cheriyal mask painting · Pochampally ikat loom · pearl stringing · Deccani calligraphy · copper-pot cooking · Sufi qawwali trio in a heritage hall |
| W0 | Workshops backdrop | 16:9 | Dim arcade interior, Charminar through arches at dusk, deep shadows for text |
| B1 | Partners | 16:9 | Palace hotel porte-cochère at dusk, liveried doorman opening a black car door, Charminar far right |
| R1 | Testimonials backdrop | 16:9 | Dusk terrace with lanterns and jasmine, Charminar soft-focus; (photos of the 4 guests are their real ones) |
| F1 | Form | 4:3 | Terrace sofa with tea tray, Charminar sunset (variant of H1, wider) |
| F2 | Footer | 21:9, 2880×1234 | Panoramic old-city skyline with Charminar, sun on the horizon, carved balustrade and lantern in the foreground left; top 50% plain sky for footer text |
| SVG | Ornaments | vector | Cusped arch mask, Charminar line icon, ◆ divider, etched skyline left/right (line art traced, not generated) |

**Output:** export WebP (q 80) + AVIF, 3 sizes each (`srcset` 800/1600/2880), LQIP blur placeholders; hero ≤ 350 KB at 1600w. Doors as WebP with alpha.

**Who generates:** prompts above are tool-agnostic (Midjourney v7, Imagen 4, Flux, or the image model behind the `media-use` skill). Every Charminar image needs a human check for architecture accuracy before use.

## 6. Build order

1. Tokens + fonts + header/footer shell with the real logo (white and colour).
2. Static sections 1–10 with placeholder images (use the screenshots' crops temporarily).
3. Global motion system (Lenis, reveal, line split, arch mask, reduced motion).
4. Section interactions in this order: hero slider → Private Access doors → §4 accordion → §5 drawer → rails → form.
5. Generate and drop in final images; tune crops per breakpoint.
6. QA: 375 / 768 / 1280 / 1920 widths, keyboard only, reduced motion, Lighthouse (LCP < 2.5s on 4G with hero WebP), Safari 3D doors.

## 7. Decisions needed from you / the client

- **D1 Logo on dark:** get a white (or gold) SVG of the Asli wordmark from the client? Until then: CSS white knock-out.
- **D2 Where it lives:** a new `variant-2/` folder next to variant 1's `index.html` (not in this folder: the variant 1 code and `PROJECT-CONTEXT.md` referenced by `context.md` aren't here). Point me to that repo.
- **D3 Nav labels:** screenshots say Experiences / Private Access / Delegates / Our Story / Journal; the live site says Tours / Conventions / Originals / Services / Gallery / Contact. Proposed: **Experiences · Originals · Delegates · Private Access · Our Story** + Plan Your Visit, mapped to live routes. "Journal" has no page; drop it unless one is planned.
- **D4 Partner logos (§8):** the screenshot shows Taj, ITC, Park Hyatt, Le Méridien. Only show hotels the client actually partners with and has permission to display (context.md lists Taj Falaknuma among featured brands).
- **D5 Originals shown in §3:** proposed Dawn, The Hyderabad Table, After Dark, Festival Hyderabad.
- **D6 Form backend:** which endpoint receives enquiries (the live Next.js `/book-now` handler, email service, or WhatsApp only)?
- **D7 Image tool:** which generator to use, and who signs off the Charminar renders.
