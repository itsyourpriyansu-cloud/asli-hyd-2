// Asli Hyderabad, variant 2: vanilla JS, no libraries.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v) => Math.min(1, Math.max(0, v));

/* ---------- loader: once per session ---------- */
const pre = $('#pre');
let seen = true;
try { seen = sessionStorage.getItem('asli-pre') === '1'; sessionStorage.setItem('asli-pre', '1'); } catch (e) { /* storage blocked: skip loader */ }
if (reduce || seen) pre.remove();
else {
  setTimeout(() => pre.classList.add('open'), 1500);
  setTimeout(() => pre.remove(), 2500);
}

/* ---------- reveal on enter ---------- */
const io = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  io.unobserve(e.target);
}), { rootMargin: '0px 0px -15% 0px' });
$$('[data-reveal]').forEach((el) => io.observe(el));

/* ---------- scroll: header state + scrubbed --p for [data-scrub] ---------- */
// modes: "through" 0→1 while the element crosses the viewport; "out" 0→1 as it leaves the top; "pin" 0→1 across a sticky track
const hdr = $('#hdr');
const scrubs = $$('[data-scrub]');
let lastY = scrollY, ticking = false;
function progress(el) {
  const r = el.getBoundingClientRect(), vh = innerHeight, mode = el.dataset.scrub;
  if (mode === 'out') return clamp(-r.top / r.height);
  if (mode === 'pin') return clamp(-r.top / Math.max(1, r.height - vh));
  return clamp((vh - r.top) / (vh + r.height));
}
function onScroll() {
  ticking = false;
  const y = scrollY;
  hdr.classList.toggle('solid', y > 80);
  if (!document.body.classList.contains('nav-open')) hdr.classList.toggle('hide', y > lastY && y > 200);
  lastY = y;
  if (!reduce) scrubs.forEach((el) => el.style.setProperty('--p', progress(el).toFixed(4)));
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
addEventListener('resize', onScroll);
onScroll();

/* ---------- mobile menu ---------- */
const burger = $('#burger');
const menuOpen = () => document.body.classList.contains('nav-open');
function setMenu(open) {
  document.body.classList.toggle('nav-open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  [$('#main'), $('.ftr'), $('#wa')].forEach((el) => { el.inert = open; }); // keep Tab inside the open menu
  if (open) { hdr.classList.remove('hide'); $('#nav a').focus(); }
}
burger.addEventListener('click', () => setMenu(!menuOpen()));
hdr.addEventListener('click', (e) => { if (menuOpen() && e.target.closest('a')) setMenu(false); }); // nav, logo and Plan CTA
hdr.addEventListener('focusin', () => hdr.classList.remove('hide')); // never tab into an off-screen header
matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches && menuOpen()) setMenu(false); });
addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOpen()) { setMenu(false); burger.focus(); }
});

/* ---------- hero slider: the gold bar's CSS fill animation is the timer, so pausing it pauses the slider ---------- */
const hero = $('#hero');
const slides = $$('.slide', hero), titles = $$('.hero-t', hero), bars = $$('.bars button', hero);
let cur = 0;
const syncAria = () => bars.forEach((b, i) => {
  b.setAttribute('aria-selected', i === cur);
  slides[i].setAttribute('aria-hidden', i !== cur);
  titles[i].setAttribute('aria-hidden', i !== cur);
});
function go(n) {
  n = (n + slides.length) % slides.length;
  if (n === cur) return;
  [slides, titles, bars].forEach((list) => { list[cur].classList.remove('on'); list[n].classList.add('on'); });
  cur = n;
  syncAria();
}
syncAria();
bars.forEach((b, i) => b.addEventListener('click', () => go(i)));
if (!reduce) $('.bars', hero).addEventListener('animationend', () => go(cur + 1));
// one place decides "paused" from every reason at once, so no event can unpause while another reason still holds
const canHover = matchMedia('(hover: hover)').matches;
let offscreen = false;
const syncPause = () => hero.classList.toggle('paused', offscreen || document.hidden || (canHover && hero.matches(':hover')) || hero.matches(':has(:focus-visible)'));
['mouseenter', 'mouseleave', 'focusin', 'focusout'].forEach((t) => hero.addEventListener(t, () => setTimeout(syncPause)));
document.addEventListener('visibilitychange', syncPause);
new IntersectionObserver(([e]) => {
  offscreen = !e.isIntersecting;
  syncPause();
  $('#wa').classList.toggle('show', offscreen);
}).observe(hero);
hero.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') go(cur + 1);
  if (e.key === 'ArrowLeft') go(cur - 1);
});
let sx = null;
hero.addEventListener('pointerdown', (e) => { sx = e.clientX; });
hero.addEventListener('pointerup', (e) => {
  if (sx !== null && Math.abs(e.clientX - sx) > 50) go(cur + (e.clientX < sx ? 1 : -1));
  sx = null;
});
if (!reduce && canHover) {
  hero.addEventListener('mousemove', (e) => {
    hero.style.setProperty('--mx', (e.clientX / innerWidth * 2 - 1).toFixed(3));
    hero.style.setProperty('--my', (e.clientY / innerHeight * 2 - 1).toFixed(3));
  });
}

/* ---------- rails: mouse drag, arrow buttons, progress, autoplay ---------- */
$$('.rail').forEach((rail) => {
  const bar = rail.nextElementSibling?.classList.contains('rail-bar') ? rail.nextElementSibling : null;
  if (bar) rail.addEventListener('scroll', () => bar.style.setProperty('--rp', Math.max(.2, rail.scrollLeft / Math.max(1, rail.scrollWidth - rail.clientWidth))), { passive: true });

  if (rail.classList.contains('drag')) {
    let x0 = 0, s0 = 0, down = false, moved = false;
    rail.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return; // touch keeps native momentum scrolling
      down = true; moved = false; x0 = e.clientX; s0 = rail.scrollLeft;
    });
    const end = () => {
      if (!down) return;
      down = false;
      rail.classList.remove('dragging');
      if (moved) rail.scrollBy({ left: 1 }); // nudge so scroll-snap settles on a card
    };
    addEventListener('pointermove', (e) => {
      if (!down) return;
      if (!e.buttons) return end(); // button was released where we never got pointerup
      if (Math.abs(e.clientX - x0) > 5) { moved = true; rail.classList.add('dragging'); }
      rail.scrollLeft = s0 - (e.clientX - x0);
    });
    addEventListener('pointerup', end);
  }

  const step = (dir) => {
    const card = rail.firstElementChild;
    const w = card.getBoundingClientRect().width + (parseFloat(getComputedStyle(rail).columnGap) || 20);
    const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
    if (dir > 0 && atEnd) rail.scrollTo({ left: 0, behavior: 'smooth' });
    else rail.scrollBy({ left: dir * w, behavior: 'smooth' });
  };
  $$(`[data-rail="${rail.id}"]`).forEach((b) => b.addEventListener('click', () => step(b.classList.contains('next') ? 1 : -1)));

  const ms = +rail.dataset.auto;
  if (ms && !reduce) {
    let touched = 0; // last swipe/drag/wheel, so autoplay never fights the visitor
    ['pointerdown', 'touchstart', 'wheel'].forEach((t) => rail.addEventListener(t, () => { touched = Date.now(); }, { passive: true }));
    setInterval(() => {
      if (document.hidden || !rail.classList.contains('in') || rail.matches(':hover, :focus-within') || Date.now() - touched < ms) return;
      step(1);
    }, ms);
  }
});

/* ---------- numbers count up ---------- */
const counter = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (!e.isIntersecting) return;
  counter.unobserve(e.target);
  const end = +e.target.dataset.count;
  if (reduce) return;
  const t0 = performance.now();
  const tick = (t) => {
    const k = clamp((t - t0) / 1600);
    e.target.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}), { threshold: .5 });
$$('[data-count]').forEach((el) => { if (!reduce) el.textContent = '0'; counter.observe(el); });

/* ---------- conventions drawer ---------- */
// shortcut: events copied from aslihyd.in on 2 Nov 2026, fetch them from the CMS when this page is wired to it
const EVENTS = [
  { name: 'Hyderabad Tech Summit 2026', dates: '15–17 Jan 2026', end: '2026-01-17', venue: 'HICC, Hyderabad', slug: 'hyderabad-tech-summit-2026' },
  { name: 'Global Bio-India 2026', dates: '17–19 Feb 2026', end: '2026-02-19', venue: 'HICC, Hyderabad', slug: 'global-bio-india-2026' },
  { name: 'India Sustainability Conclave 2026', dates: '10–12 Mar 2026', end: '2026-03-12', venue: 'Novotel, HICC', slug: 'india-sustainability-conclave-2026' },
  { name: 'World Pharma Summit 2026', dates: '25–26 Apr 2026', end: '2026-04-26', venue: 'HICC, Hyderabad', slug: 'world-pharma-summit-2026' },
];
const today = new Date().toLocaleDateString('en-CA'); // visitor's local YYYY-MM-DD; toISOString() is UTC and blocks "today" west of UTC in the evening
console.assert(/^\d{4}-\d{2}-\d{2}$/.test(today), 'today format');
const upcoming = (list, q, day) => list.filter((ev) => ev.end >= day && `${ev.name} ${ev.venue}`.toLowerCase().includes(q.trim().toLowerCase()));
console.assert(upcoming(EVENTS, 'pharma', '2026-04-01').length === 1 && upcoming(EVENTS, '', '2026-11-02').length === 0, 'upcoming() filter');

const drawer = $('#drawer'), evQ = $('#ev-q'), evList = $('#ev-list');
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
function renderEvents() {
  const list = upcoming(EVENTS, evQ.value, today);
  evList.innerHTML = list.length
    ? list.map((ev) => `<li><a href="#plan"><b>${esc(ev.name)}</b><small>${ev.dates} · ${esc(ev.venue)}</small></a></li>`).join('')
    : `<li class="ev-empty">${evQ.value ? 'No upcoming event matches that search.' : 'No upcoming conventions are listed yet.'} See all conventions, or tell us your event in the form below and we'll plan around it.</li>`;
}
evQ.addEventListener('input', renderEvents);
$('#find-event').addEventListener('click', () => { renderEvents(); drawer.showModal(); });
$('#drawer-x').addEventListener('click', () => drawer.close());
drawer.addEventListener('click', (e) => { if (e.target === drawer || e.target.closest('a')) drawer.close(); });
// placeholder links (Privacy, Terms) stay idle instead of jumping to the top
document.addEventListener('click', (e) => { if (e.target.closest('a[href="#"]')) e.preventDefault(); });

/* ---------- plan form: validate, then hand off to WhatsApp or email (no backend yet) ---------- */
const form = $('#plan-form');
const from = form.elements.from, to = form.elements.to;
from.min = today;
to.min = today;
from.addEventListener('change', () => { to.min = from.value || today; if (to.value) check(to); });

function check(input) {
  const field = input.closest('.field'), err = field && $('.err', field);
  if (!err) return true;
  let msg = input.validationMessage;
  if (input === to && from.value && to.value && to.value < from.value) msg = 'Leaving date must be after arriving.';
  err.textContent = msg;
  field.classList.toggle('bad', !!msg);
  input.setAttribute('aria-invalid', !!msg);
  return !msg;
}
$$('input', form).forEach((i) => {
  i.addEventListener('blur', () => check(i));
  i.addEventListener('input', () => { if (i.closest('.bad')) check(i); }); // clear an error as soon as it's fixed
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const bad = $$('input', form).filter((i) => !check(i));
  if (bad.length) { bad[0].focus(); return; }
  const d = new FormData(form);
  const lines = [
    `Hello Asli Hyderabad, I'd like to plan a visit.`,
    `Name: ${d.get('name')}`,
    `Email: ${d.get('email')}`,
    `Dates: ${d.get('from')} to ${d.get('to')}`,
    d.get('stay') && `Hotel / event: ${d.get('stay')}`,
    d.get('guests') && `Guests: ${d.get('guests')}`,
    d.getAll('interest').length && `Interests: ${d.getAll('interest').join(', ')}`,
    d.get('msg') && `Message: ${d.get('msg')}`,
  ].filter(Boolean).join('\n');
  // shortcut: no enquiry endpoint yet, so the visitor sends it themselves; switch to a POST once /book-now's handler is confirmed
  $('#send-wa').href = `https://wa.me/919392149872?text=${encodeURIComponent(lines)}`;
  $('#send-mail').href = `mailto:sahana@aslihyd.in?subject=${encodeURIComponent('Plan my Hyderabad visit')}&body=${encodeURIComponent(lines)}`;
  form.hidden = true;
  sent.hidden = false;
  sent.focus();
});
const sent = $('#sent');
$('#edit-enquiry').addEventListener('click', () => { sent.hidden = true; form.hidden = false; form.elements.name.focus(); });
