/* ═══ هسته سایت: چیدمان، i18n، تعامل‌ها و رندر صفحات ═══ */
import { CONFIG } from './config.js';
import { initI18n, t, getLang, setLang } from './i18n.js';
import { products, categories } from './data/products.js';
import { posts, postCats } from './data/posts.js';
import { initHero3D } from './three-hero.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const toFa = n => getLang() === 'fa' ? String(n).replace(/\d/g, d => FA_DIGITS[d]) : String(n);
const num = n => toFa(Number(n).toLocaleString('en-US'));
const waLink = msg => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
const isFA = () => getLang() === 'fa';
const img = (seed, w = 800, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

/* ─── آیکن‌های SVG خطی (سبک Lucide) ─── */
const P = {
    phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z',
    mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2 8 6 8-6',
    clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-16v6l4 2',
    search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm10 2-4.35-4.35',
    chevron: 'M6 9l6 6 6-6',
    arrow: 'M5 12h14m-6-6 6 6-6 6',
    check: 'M20 6 9 17l-5-5',
    menu: 'M4 6h16M4 12h16M4 18h16', x: 'M18 6 6 18M6 6l12 12',
    globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z',
    truck: 'M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm13 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    flask: 'M9 2h6M10 2v6.5L4.5 18A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3L14 8.5V2',
    shield: 'M12 22s8-3 8-10V5l-8-3-8 3v7c0 7 8 10 8 10z',
    droplet: 'M12 2.7 6.4 8.3a8 8 0 1 0 11.3 0z',
    layers: 'M12 2 2 7l10 5 10-5-10-5zM2 12l10 5 10-5M2 17l10 5 10-5',
    thread: 'M4 4c0 8 4 12 12 12m4 4c0-8-4-12-12-12', pill: 'M10.5 20.5 3.5 13.5a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7zM7 10l7 7',
    building: 'M4 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18m-12 0h16M9 7h2m-2 4h2m-2 4h2',
    drill: 'M12 8 4 2m8 6v5h8m-8-5H6a2 2 0 0 1-2-2V2m14 18h2M9 8v13M3 21h13',
    file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6',
    tag: 'M20.6 13.4 12 22 2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8zM7 7h.01',
    box: 'M21 8 12 3 3 8v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v9',
    headset: 'M4 13a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h4M4 13v3a2 2 0 0 0 2 2h1',
    target: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-4a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    handshake: 'M11 17 8 20a2.5 2.5 0 0 1-3.5-3.5L2 14l7-7 3 2 3-2 7 7-3 3.5A2.5 2.5 0 0 1 15 19l-3-3z',
    wrench: 'M14.7 6.3a4 4 0 0 0 5 5l-9.8 9.8a2.8 2.8 0 0 1-4-4l9.8-9.8a4 4 0 0 1-1-1z',
    whatsapp: 'M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm4.8 13.3c-.2.6-1.2 1.2-1.7 1.2-1.6.1-3.9-1.3-5.4-2.9S7.5 10.5 7.6 9c.1-.5.7-1.5 1.3-1.6.3-.1.7 0 .9.4l.8 1.5c.1.3 0 .6-.2.8l-.5.5c.5 1.2 1.5 2.2 2.7 2.7l.5-.5c.2-.2.5-.3.8-.2l1.5.8c.3.2.5.6.4.9z',
    telegram: 'M22 3 2 11l6 2.5L15 9l-5.5 7.5L16 21z', map: 'M1 6v14l6-3 6 3 6-3V3l-6 3-6-3-6 3zm6-3v14m6-11v14'
};
const ICONS = {};
Object.keys(P).forEach(k => ICONS[k] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${P[k]}"/></svg>`);
const icon = k => ICONS[k] || '';

/* اعمال آیکن روی عناصر [data-icon] */
function paintIcons(root = document) {
    $$('[data-icon]', root).forEach(el => { const k = el.dataset.icon; if (ICONS[k]) el.innerHTML = ICONS[k]; });
}

/* ─── چیدمان: اعلان، هدر، فوتر، نوار موبایل، FAB ─── */
function renderLayout() {
    const page = document.body.dataset.page;
    const navPath = { home: 'index.html', about: 'about.html', products: 'products.html', blog: 'blog.html', contact: 'contact.html' };
    const cur = page.startsWith('service') || page === 'product' || page === 'post'
        ? '' : (navPath[page] || '');

    const active = href => (href && href === cur) || (cur === 'index.html' && href === 'index.html');

    const header = `
  <div id="announce" class="bg-ink text-white/70 text-[11px] sm:text-xs"><div class="container-x py-1.5 flex items-center justify-between">
    <p>${t('announce.text')}</p>
    <button id="announce-x" aria-label="${t('common.close')}" class="opacity-60 hover:opacity-100">${icon('x')}</button>
  </div></div>
  <header id="site-header">
    <div class="container-x flex items-center gap-3 h-[64px]">
      <a href="index.html" class="flex items-center gap-2.5 font-black text-ink text-lg">
        <svg viewBox="0 0 24 24" class="w-8 h-8 text-aqua" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2.5 20 7v10l-8 4.5L4 17V7z"/><path d="M12 2.5V12m0 0 8-5m-8 5-8-5" stroke="#E8871E"/></svg>
        <span>${t('common.brand')}</span>
      </a>
      <nav class="hidden lg:flex items-center gap-1 ms-6" aria-label="main">
        ${Object.entries(navPath).map(([k, h]) => `
          <a href="${h}" class="px-3.5 py-2 rounded-lg font-bold text-[15px] ${active(h) ? 'text-aqua bg-aqua/8' : 'text-ink/75 hover:text-ink hover:bg-mist'}">${t('common.nav.' + k)}</a>`).join('')}
        <div class="relative" id="mega-wrap">
          <button id="mega-btn" aria-haspopup="true" aria-expanded="false" class="px-3.5 py-2 rounded-lg font-bold text-[15px] text-ink/75 hover:text-ink hover:bg-mist flex items-center gap-1">
            ${t('common.nav.services')} ${icon('chevron').replace('viewBox', 'class="w-4 h-4" viewBox')}
          </button>
        </div>
      </nav>
      <div class="ms-auto flex items-center gap-2">
        <a href="tel:${CONFIG.phonePrimary}" data-cta="header-phone" class="hidden md:flex items-center gap-2 text-sm font-bold text-ink/80 hover:text-aqua" dir="ltr">${icon('phone')} <span>${CONFIG.phones[0]}</span></a>
        <button id="lang-btn" class="h-10 px-3 rounded-lg border-[1.5px] border-ink/15 font-bold text-sm hover:border-ink" data-cta="lang-switch">${t('common.langSwitch')}</button>
        <a href="${waLink(t('common.waGeneral'))}" target="_blank" rel="noopener" class="btn btn-sun !min-h-[42px] !px-4 !text-sm hidden sm:inline-flex" data-cta="header-quote">${t('common.requestQuote')}</a>
        <button id="menu-open" class="lg:hidden w-11 h-11 grid place-items-center rounded-lg border-[1.5px] border-ink/15" aria-label="menu">${icon('menu')}</button>
      </div>
    </div>
    <div class="mega" id="mega">
      <div class="container-x py-8 grid lg:grid-cols-[1.4fr_1fr] gap-8">
        <div>
          <p class="text-xs font-black text-aqua tracking-widest uppercase">${t('mega.title')}</p>
          <div class="grid sm:grid-cols-2 gap-3 mt-4">
            ${t('mega.services').map(s => `
              <a href="${s.href}" class="flex gap-3 p-4 rounded-xl hover:bg-mist border border-transparent hover:border-ink/8 transition group">
                <span class="text-aqua shrink-0 mt-.5">${icon(s.icon)}</span>
                <span><span class="block font-extrabold group-hover:text-aqua">${s.t}</span><span class="block text-[13px] text-ink/60 mt-1 leading-6">${s.d}</span></span>
              </a>`).join('')}
          </div>
        </div>
        <div class="bg-ink text-white rounded-xl p-6 flex flex-col justify-between">
          <div><p class="font-extrabold !text-white text-lg">${t('common.freeConsult')}</p>
          <p class="text-sm text-white/60 mt-2 leading-7">${t('mega.sub')}</p></div>
          <a href="${waLink(t('common.waGeneral'))}" target="_blank" rel="noopener" class="btn btn-sun mt-5" data-cta="mega-consult">${t('common.requestQuote')}</a>
          <div class="mt-5 pt-5 border-t border-white/10">
            <p class="text-[11px] font-black text-aqua-400 uppercase tracking-widest">${t('common.popular')}</p>
            <div class="flex flex-wrap gap-2 mt-3">
              ${['sodium-metasilicate', 'pva', 'sulfonic-acid', 'xanthan-gum'].map(sl => {
        const p = products.find(x => x.slug === sl);
        return `<a href="product.html?slug=${sl}" class="text-[12px] bg-white/10 hover:bg-white/20 rounded-full px-3 py-1.5 transition">${p ? p.name[isFA() ? 'fa' : 'en'] : ''}</a>`;
    }).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>`;

    const mm = `
  <div id="mobile-menu" data-open="false" aria-hidden="true">
    <div class="flex items-center justify-between p-5 border-b border-white/10">
      <span class="font-black text-lg text-white">${t('common.brand')}</span>
      <button id="menu-close" class="w-11 h-11 grid place-items-center rounded-lg border border-white/20 text-white" aria-label="close">${icon('x')}</button>
    </div>
    <nav class="p-5 space-y-1.5" aria-label="mobile">
      ${Object.entries(navPath).map(([k, h]) => `<a href="${h}" class="block py-3 px-4 rounded-xl text-white/90 font-bold text-lg ${active(h) ? 'bg-white/10' : ''}">${t('common.nav.' + k)}</a>`).join('')}
      <div class="border border-white/15 rounded-xl overflow-hidden mt-3">
        <button class="acc-btn w-full !text-white" data-mob-acc aria-expanded="false"><span>${t('common.nav.services')}</span><svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>
        <div class="acc-panel"><div class="acc-panel-inner !text-white/70">
          ${t('mega.services').map(s => `<a href="${s.href}" class="block py-2.5 font-bold text-white/80">${s.t} — <span class="font-normal text-white/50">${s.d}</span></a>`).join('')}
        </div></div>
      </div>
    </nav>
    <div class="p-5 mt-auto space-y-3">
      <a href="tel:${CONFIG.phonePrimary}" class="btn btn-ghost !text-white !border-white/25 w-full" data-cta="mm-call">${icon('phone')} ${CONFIG.phones[0]}</a>
      <a href="${waLink(t('common.waGeneral'))}" target="_blank" rel="noopener" class="btn btn-wa w-full" data-cta="mm-wa">${t('common.whatsapp')}</a>
    </div>
  </div>`;

    const bar = `
  <div id="mobile-bar">
    <a href="tel:${CONFIG.phonePrimary}" class="mb-btn text-ink" data-cta="bar-call">${icon('phone')}<span>${t('common.callNow')}</span></a>
    <a href="${waLink(page === 'product' ? t('products.single.orderMsg', { p: window.__curProduct || '' }) : t('common.waGeneral'))}" target="_blank" rel="noopener" class="mb-btn ${page === 'product' ? 'mb-order' : 'text-wa'}" data-cta="${page === 'product' ? 'whatsapp-product' : 'bar-wa'}">${icon('whatsapp')}<span>${page === 'product' ? t('products.single.orderSticky') : t('common.whatsapp')}</span></a>
    <a href="https://t.me/${CONFIG.telegram}" target="_blank" rel="noopener" class="mb-btn text-aqua" data-cta="bar-tg">${icon('telegram')}<span>${t('common.telegram')}</span></a>
  </div>`;

    const fab = `
  <div id="fab" data-open="false" class="hidden lg:block">
    <div id="fab-items">
      <a href="tel:${CONFIG.phonePrimary}" data-cta="fab-call" class="w-12 h-12 grid place-items-center rounded-full bg-ink text-white shadow-soft" aria-label="call">${icon('phone')}</a>
      <a href="${waLink(t('common.waGeneral'))}" target="_blank" rel="noopener" data-cta="fab-wa" class="w-12 h-12 grid place-items-center rounded-full bg-wa text-white shadow-soft" aria-label="whatsapp">${icon('whatsapp')}</a>
      <a href="https://t.me/${CONFIG.telegram}" target="_blank" rel="noopener" data-cta="fab-tg" class="w-12 h-12 grid place-items-center rounded-full bg-aqua text-white shadow-soft" aria-label="telegram">${icon('telegram')}</a>
    </div>
    <button id="fab-btn" class="w-14 h-14 grid place-items-center rounded-full bg-sun text-white shadow-soft text-2xl font-black leading-none" aria-expanded="false">+</button>
  </div>`;

    const footer = `
  <footer id="site-footer">
    <div class="container-x py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        <div class="flex items-center gap-2.5 font-black text-white text-lg">
          <svg viewBox="0 0 24 24" class="w-8 h-8 text-aqua-400" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2.5 20 7v10l-8 4.5L4 17V7z"/><path d="M12 2.5V12m0 0 8-5m-8 5-8-5" stroke="#E8871E"/></svg>
          ${t('common.brand')}
        </div>
        <p class="text-sm leading-7 mt-4 text-white/55">${t('footer.about')}</p>
        <a href="${CONFIG.catalogUrl}" class="btn btn-ghost !text-white !border-white/25 mt-5 !text-sm" data-cta="catalog">${icon('file')} ${t('common.downloadCatalog')}</a>
      </div>
      <div>
        <p class="font-extrabold text-white mb-4">${t('footer.links')}</p>
        <ul class="space-y-2.5">
          ${['home', 'about', 'products', 'blog', 'contact'].map(k => `<li><a href="${navPath[k]}" class="f-link">${t('common.nav.' + k)}</a></li>`).join('')}
          ${t('mega.services').map(s => `<li><a href="${s.href}" class="f-link">${s.t}</a></li>`).join('')}
        </ul>
      </div>
      <div>
        <p class="font-extrabold text-white mb-4">${t('footer.contact')}</p>
        <ul class="space-y-3 text-sm text-white/60">
          <li class="flex gap-2.5 items-start">${icon('phone').replace('svg', 'svg class="w-4 h-4 mt-1 shrink-0 text-aqua-400"')}<span dir="ltr">${CONFIG.phones.join(' / ')}</span></li>
          <li class="flex gap-2.5 items-start">${icon('mail').replace('svg', 'svg class="w-4 h-4 mt-1 shrink-0 text-aqua-400"')}<span dir="ltr">${CONFIG.email}</span></li>
          <li class="flex gap-2.5 items-start">${icon('map').replace('svg', 'svg class="w-4 h-4 mt-1 shrink-0 text-aqua-400"')}<span>${CONFIG.address[isFA() ? 'fa' : 'en']}</span></li>
        </ul>
      </div>
      <div>
        <p class="font-extrabold text-white mb-4">${t('footer.hours')}</p>
        <p class="text-sm text-white/60">${CONFIG.hours[isFA() ? 'fa' : 'en']}</p>
        <p class="font-extrabold text-white mt-6 mb-3">${t('footer.follow')}</p>
        <div class="flex gap-2">
          ${Object.entries(CONFIG.social).map(([k, h]) => `<a href="${h}" target="_blank" rel="noopener" class="w-10 h-10 grid place-items-center rounded-lg bg-white/8 hover:bg-white/15 text-white/80 text-xs font-bold" aria-label="${k}">${k === 'linkedin' ? 'in' : k === 'instagram' ? 'ig' : 'ap'}</a>`).join('')}
        </div>
      </div>
    </div>
    <div class="border-t border-white/8"><div class="container-x py-5 text-[11px] text-white/35 flex flex-wrap gap-2 justify-between">
      <span>${t('footer.legal')}</span><span dir="ltr">ISO 9001 · ISO 14001 · Demo</span>
    </div></div>
  </footer>`;

    const existing = $('#layout-root'); // پاک‌سازی رندر قبلی (تعویض زبان)
    if (existing) existing.remove();
    const root = document.createElement('div');
    root.id = 'layout-root';
    root.innerHTML = header + mm + fab + bar + footer;
    document.body.prepend(root);

    paintIcons(root);
    bindLayout(root);
}

function bindLayout(root) {
    // اعلان قابل بستن
    const ax = $('#announce-x', root);
    if (ax) ax.onclick = () => { $('#announce').remove(); };

    // هدر کوچک‌شونده
    const header = $('#site-header', root);
    addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 8), { passive: true });

    // مگامنو: hover + focus + Esc + کلیک بیرون
    const wrap = $('#mega-wrap', root), mega = $('#mega', root), btn = $('#mega-btn', root);
    const open = v => { mega.dataset.open = v; btn.setAttribute('aria-expanded', v); };
    wrap.addEventListener('mouseenter', () => open('true'));
    wrap.addEventListener('mouseleave', () => open('false'));
    wrap.addEventListener('focusin', () => open('true'));
    document.addEventListener('focusin', e => { if (!wrap.contains(e.target)) open('false'); });
    btn.addEventListener('click', () => open(mega.dataset.open !== 'true'));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { open('false'); closeMobile(); } });
    document.addEventListener('click', e => { if (!wrap.contains(e.target)) open('false'); });

    // تعویض زبان
    $('#lang-btn', root).onclick = () => setLang(isFA() ? 'en' : 'fa');

    // منوی موبایل
    $('#menu-open', root).onclick = () => { const m = $('#mobile-menu', root); m.dataset.open = 'true'; m.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; };
    const closeMobile = () => { const m = $('#mobile-menu', root); if (!m) return; m.dataset.open = 'false'; m.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
    $('#menu-close', root).onclick = closeMobile;

    // آکاردئون عمومی
    bindAccordions(root);

    // FAB
    const fab = $('#fab', root), fabBtn = $('#fab-btn', root);
    if (fabBtn) fabBtn.onclick = () => {
        const open = fab.dataset.open !== 'true';
        fab.dataset.open = open; fabBtn.setAttribute('aria-expanded', open);
        fabBtn.textContent = open ? '×' : '+';
        if (window.anime && open) anime({ targets: '#fab-items a', scale: [0, 1], delay: anime.stagger(50), duration: 300, easing: 'easeOutBack' });
    };

    // CTA های داینامیک با شناسه ثابت
    const setWa = (sel, msg) => { const el = $(sel, root); if (el) el.href = waLink(msg); };
    setWa('#hero-wa', t('common.waGeneral'));
    setWa('#cta-band-wa', t('common.waGeneral'));
    setWa('#hero-tel', ''); const ht = $('#hero-tel', root); if (ht) { ht.href = `tel:${CONFIG.phonePrimary}`; ht.classList.add('btn-ghost'); ht.classList.remove('btn-sun'); }
}

/* آکاردئون‌های عمومی */
function bindAccordions(root = document) {
    $$('[data-acc]', root).forEach(group => {
        $$('.acc-item', group).forEach(item => {
            const b = $('.acc-btn', item);
            b.onclick = () => {
                const open = item.dataset.open === 'true';
                $$('.acc-item', group).forEach(i => { i.dataset.open = 'false'; $('.acc-panel', i).style.maxHeight = ''; $('.acc-btn', i).setAttribute('aria-expanded', 'false'); });
                if (!open) { item.dataset.open = 'true'; $('.acc-panel', item).style.maxHeight = $('.acc-panel-inner', item).offsetHeight + 'px'; b.setAttribute('aria-expanded', 'true'); }
            };
        });
    });
}

/* آیتم آکاردئون آماده */
function accItem(q, a) {
    return `<div class="acc-item" data-open="false">
    <button class="acc-btn" aria-expanded="false"><span>${q}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path d="M6 9l6 6 6-6"/></svg></button>
    <div class="acc-panel"><div class="acc-panel-inner">${a}</div></div></div>`;
}

/* ─── انیمیشن‌ها ─── */
function initAnimations() {
    if (!window.gsap) return;
    gsap.registerPlugin(ScrollTrigger);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.utils.toArray('[data-reveal]').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 26 }, {
            opacity: 1, y: 0, duration: .7, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
        });
    });

    // خط‌کشی SVGهای .draw
    $$('.draw').forEach(path => {
        gsap.fromTo(path, { strokeDashoffset: 400 }, {
            strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut',
            scrollTrigger: { trigger: path, start: 'top 90%' }
        });
    });
}

/* شمارنده با anime.js */
function initCounters() {
    $$('[data-count]').forEach(el => {
        if (el.__done) return;
        const obs = new IntersectionObserver(en => {
            if (!en[0].isIntersecting || el.__done) return;
            el.__done = true;
            const to = +el.dataset.count;
            const obj = { v: 0 };
            anime({
                targets: obj, v: to, duration: 1600, easing: 'easeOutCubic',
                update: () => { el.textContent = num(Math.round(obj.v)); }
            });
        }, { threshold: .4 });
        obs.observe(el);
    });
}

/* ─── پریلودر (فقط بار اول هر نشست) ─── */
function initPreloader() {
    if (sessionStorage.getItem('sadra-loaded')) return fastPath();
    sessionStorage.setItem('sadra-loaded', '1');
    const pl = document.createElement('div');
    pl.id = 'preloader';
    pl.innerHTML = `
    <svg viewBox="0 0 120 70" class="w-40 text-aqua-400" fill="none" stroke="currentColor" stroke-width="2">
      <path id="pl-line" d="M15 55 H50 L70 20 H105" stroke="#14A3B0"/>
      <path id="pl-line2" d="M15 55 V35 M105 20 V40" stroke="#E8871E"/>
    </svg>
    <div class="text-white/80 text-sm font-bold tracking-widest">${t('common.brandFull')}</div>
    <div class="w-44 h-[2px] bg-white/15 rounded-full overflow-hidden"><div id="pl-bar" class="h-full w-0 bg-sun"></div></div>
    <span class="text-white/50 text-xs font-bold" id="pl-pct">۰٪</span>`;
    document.body.appendChild(pl);

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const done = () => { pl.classList.add('leaving'); setTimeout(() => pl.remove(), 700); };
    if (reduced) { $('#pl-bar').style.width = '100%'; setTimeout(done, 400); return; }

    const obj = { v: 0 };
    anime({
        targets: obj, v: 100, duration: 1400, easing: 'easeInOutQuart',
        update: () => {
            const p = Math.round(obj.v);
            $('#pl-bar').style.width = p + '%';
            $('#pl-pct').textContent = toFa(p) + (isFA() ? '٪' : '%');
        },
        complete: () => setTimeout(done, 150)
    });
    anime({ targets: '#pl-line, #pl-line2', strokeDashoffset: [anime.setDashoffset, 0], duration: 1300, easing: 'easeInOutSine' });
}
function fastPath() { /* بدون پریلودر */ }

/* ─── breadcrumb ─── */
function renderCrumbs() {
    $$('[data-crumb]').forEach(el => {
        const spec = el.dataset.crumb.split(':');
        const key = spec[0], svc = spec[1];
        let html = `<a href="index.html" class="hover:text-aqua-400">${t('common.home')}</a>`;
        if (key === 'service') {
            const s = t('mega.services').find(x => x.href.includes(svc));
            html += `<span class="sep">/</span><span>${t('common.nav.services')}</span><span class="sep">/</span><span class="text-white/90">${s ? s.t : ''}</span>`;
        } else {
            html += `<span class="sep">/</span><span class="text-white/90">${t('common.crumbs.' + (key === 'product' || key === 'post' ? (key === 'product' ? 'products' : 'blog') : key))}</span>`;
        }
        el.innerHTML = html;
    });
}

/* ─── صفحه: HOME ─── */
function pageHome() {
    // چیپ‌های هیرو
    const chips = t('home.hero.chips');
    $('#hero-chips').innerHTML = chips.map(c => `<li class="flex items-center gap-2"><span class="text-aqua">${icon('check')}</span>${c}</li>`).join('');

    // شمارنده‌ها
    $('#stats-row').innerHTML = t('home.trust.stats').map(s => `
    <div class="card card-hover p-6 text-center" data-reveal>
      <p class="text-3xl lg:text-4xl font-black text-ink"><span data-count="${s.v}">۰</span><span class="text-aqua">${s.suffix}</span></p>
      <p class="text-sm text-ink/60 mt-2 font-bold">${s.label}</p>
    </div>`).join('');

    $('#client-industries').innerHTML = t('home.trust.industries').map(i => `<span>${i}</span>`).join('');

    // صنایع
    $('#industries-grid').innerHTML = t('home.industries.items').map(i => `
    <div class="card card-hover p-6" data-reveal>
      <span class="text-aqua block mb-4">${icon(i.icon)}</span>
      <h3 class="font-extrabold">${i.t}</h3>
      <p class="text-[13px] text-ink/60 mt-2 leading-6">${i.d}</p>
    </div>`).join('');

    // خدمات
    const svcs = t('mega.services');
    $('#services-grid').innerHTML = svcs.map(s => `
    <a href="${s.href}" class="card card-hover p-6 !bg-white/5 !border-white/10 hover:!border-aqua-400/40" data-reveal>
      <span class="text-aqua-400 block mb-4">${icon(s.icon)}</span>
      <h3 class="font-extrabold !text-white">${s.t}</h3>
      <p class="text-[13px] text-white/55 mt-2 leading-6">${s.d}</p>
      <span class="inline-flex items-center gap-1.5 text-aqua-400 text-sm font-bold mt-4">${t('common.details')} ${icon('arrow')}</span>
    </a>`).join('');

    // محصولات منتخب
    const feat = ['sodium-metasilicate', 'pva', 'xanthan-gum', 'sulfonic-acid'].map(sl => products.find(p => p.slug === sl)).filter(Boolean);
    $('#featured-grid').innerHTML = feat.map(p => productCard(p)).join('');

    // فرآیند
    $('#process-tl').innerHTML = t('home.process.steps').map((s, i) => `
    <div class="tl-item" data-reveal>
      <p class="text-xs font-black text-aqua">${toFa(i + 1)}</p>
      <h3 class="font-extrabold mt-1">${s.t}</h3>
      <p class="text-sm text-ink/60 mt-2 leading-7 max-w-lg">${s.d}</p>
    </div>`).join('');

    // چرا ما
    $('#why-grid').innerHTML = t('home.why.items').map(w => `
    <div class="card card-hover p-6" data-reveal>
      <span class="text-sun block mb-4">${icon(w.icon)}</span>
      <h3 class="font-extrabold">${w.t}</h3>
      <p class="text-[13px] text-ink/60 mt-2 leading-6">${w.d}</p>
    </div>`).join('');

    // بلاگ
    const bp = posts.slice(0, 3);
    $('#home-blog').innerHTML = bp.map(p => postCard(p)).join('');

    // فرم استعلام
    const sel = $('#qf-products');
    sel.innerHTML = `<option value="">${t('home.inquiry.f3')}…</option>` + products.map(p => `<option value="${p.slug}">${p.name[isFA() ? 'fa' : 'en']}</option>`).join('');
    $('#inquiry-points').innerHTML = t('home.inquiry.points').map(p => `<li class="flex gap-2.5 text-sm text-white/75"><span class="text-sun shrink-0 mt-0.5">${icon('check')}</span>${p}</li>`).join('');
    bindQuickForm();
    bindOrderButtons('#featured-grid');

    initHero3D();
}

function bindQuickForm() {
    const f = $('#quick-form');
    f.onsubmit = e => {
        e.preventDefault();
        const name = f.name.value.trim(), phone = f.phone.value.trim();
        if (!name || !phone) { $('#qf-err').textContent = t('home.inquiry.err'); $('#qf-err').classList.remove('hidden'); return; }
        const prod = f.product.value ? products.find(p => p.slug === f.product.value) : null;
        const msg = isFA()
            ? `استعلام قیمت\nنام: ${name}\nتماس: ${phone}\nمحصول: ${prod ? prod.name.fa : '—'}\nتوضیح: ${f.note.value.trim() || '—'}`
            : `Price inquiry\nName: ${name}\nPhone: ${phone}\nProduct: ${prod ? prod.name.en : '—'}\nNote: ${f.note.value.trim() || '—'}`;
        open(waLink(msg), '_blank');
    };
}

/* ─── کارت‌های مشترک ─── */
function productCard(p) {
    const L = isFA() ? 'fa' : 'en';
    const cat = categories.find(c => c.id === p.cat);
    return `
  <article class="card card-hover overflow-hidden flex flex-col" data-reveal>
    <a href="product.html?slug=${p.slug}" class="ratio-43 overflow-hidden block">
      <img src="${img(p.image, 640, 480)}" width="640" height="480" loading="lazy" alt="${p.name[L]}" class="img-tone">
    </a>
    <div class="p-5 flex flex-col flex-1">
      <p class="text-[11px] font-bold text-aqua">${cat ? cat[L] : ''}</p>
      <h3 class="font-extrabold mt-1 leading-7">${p.name[L]}</h3>
      <p class="text-xs text-ink/50 mt-1.5 flex gap-3" dir="ltr"><span>${p.formula}</span>·<span>CAS ${p.cas}</span></p>
      <p class="text-[13px] text-ink/60 mt-2.5 leading-6 line-clamp-2">${p.apps[L][0]}</p>
      <div class="flex gap-2 mt-4 pt-4 border-t border-ink/6 mt-auto">
        <a href="product.html?slug=${p.slug}" class="btn btn-ghost !min-h-[40px] !text-[13px] flex-1">${t('products.card.order') === t('products.card.order') ? t('common.details') : ''}</a>
        <a href="${waLink(orderMsg(p))}" target="_blank" rel="noopener" class="btn btn-wa !min-h-[40px] !text-[13px] flex-1" data-cta="whatsapp-product" data-slug="${p.slug}">${t('products.card.order')}</a>
      </div>
    </div>
  </article>`;
}
const orderMsg = p => isFA() ? `سلام، برای سفارش «${p.name.fa}» راهنمایی می‌خواهم:` : `Hello, I would like to order "${p.name.en}":`;

function bindOrderButtons(scope) {
    $$(`${scope} [data-cta="whatsapp-product"]`).forEach(b => {
        const p = products.find(x => x.slug === b.dataset.slug);
        if (p) b.href = waLink(orderMsg(p));
    });
}

function postCard(p) {
    const L = isFA() ? 'fa' : 'en';
    const cat = postCats.find(c => c.id === p.cat);
    const d = new Date(p.date);
    const dateStr = isFA()
        ? toFa(d.toLocaleDateString('fa-IR'))
        : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    return `
  <article class="card card-hover overflow-hidden" data-reveal>
    <a href="post.html?slug=${p.slug}" class="ratio-43 overflow-hidden block"><img src="${img(p.image, 640, 480)}" width="640" height="480" loading="lazy" alt="${p.title[L]}" class="img-tone"></a>
    <div class="p-5">
      <div class="flex items-center gap-3 text-[11px] font-bold">
        <span class="text-aqua">${cat ? cat[L] : ''}</span><span class="text-ink/30">${dateStr}</span><span class="text-ink/30">${toFa(p.mins)} ${t('common.minRead')}</span>
      </div>
      <h3 class="font-extrabold mt-2 leading-7"><a href="post.html?slug=${p.slug}" class="hover:text-aqua">${p.title[L]}</a></h3>
      <p class="text-[13px] text-ink/60 mt-2 leading-6 line-clamp-2">${p.excerpt[L]}</p>
    </div>
  </article>`;
}

/* ─── صفحه: ABOUT ─── */
function pageAbout() {
    $('[data-img="about-story"]').src = img('about-factory', 800, 600);
    $('#about-mv').innerHTML = t('about.mv').map(m => `
    <div class="card card-hover p-7 flex gap-5 items-start" data-reveal>
      <span class="text-aqua shrink-0">${icon(m.icon)}</span>
      <div><h3 class="font-extrabold text-lg">${m.t}</h3><p class="text-sm text-ink/65 mt-2 leading-8">${m.d}</p></div>
    </div>`).join('');
    $('#about-stats').innerHTML = t('about.stats').map(s => `
    <div class="text-center" data-reveal>
      <p class="text-3xl lg:text-4xl font-black"><span data-count="${s.v}">۰</span><span class="text-aqua">${s.suffix}</span></p>
      <p class="text-sm text-ink/60 mt-2 font-bold">${s.label}</p>
    </div>`).join('');
    $('#about-values').innerHTML = t('about.values.items').map(v => `
    <div class="card card-hover p-6" data-reveal><span class="text-sun block mb-4">${icon(v.icon)}</span>
    <h3 class="font-extrabold">${v.t}</h3><p class="text-[13px] text-ink/60 mt-2 leading-6">${v.d}</p></div>`).join('');
    $('#about-tl').innerHTML = t('about.tl.items').map(i => `
    <div class="tl-item" data-reveal><p class="text-sm font-black text-aqua-400">${i.y}</p>
    <h3 class="font-extrabold !text-white mt-1">${i.t}</h3><p class="text-sm text-white/55 mt-1.5 leading-7 max-w-lg">${i.d}</p></div>`).join('');
    $('#about-certs').innerHTML = t('about.certs.items').map(c => `
    <div class="card p-6 text-center" data-reveal>
      <span class="inline-grid place-items-center w-12 h-12 rounded-full bg-aqua/10 text-aqua mb-4">${icon('shield')}</span>
      <h3 class="font-extrabold">${c.t}</h3><p class="text-[12px] text-ink/55 mt-1.5">${c.d}</p></div>`).join('');
    $('#about-team').innerHTML = t('about.team.items').map(m => `
    <div class="card card-hover p-6 text-center" data-reveal>
      <div class="w-20 h-20 rounded-full overflow-hidden mx-auto ring-2 ring-aqua/25"><img src="${img('team-' + m.n, 160, 160)}" width="160" height="160" loading="lazy" alt="${m.n}" class="img-tone"></div>
      <h3 class="font-extrabold mt-4">${m.n}</h3><p class="text-[12px] text-ink/55 mt-1">${m.r}</p></div>`).join('');
}

/* ─── صفحه: CONTACT ─── */
function pageContact() {
    const chans = t('contact.channels');
    $('#contact-channels').innerHTML = chans.map(c => {
        let href = '#', val = '';
        if (c.type === 'phone') { href = `tel:${CONFIG.phonePrimary}`; val = CONFIG.phones[0]; }
        if (c.type === 'wa') { href = waLink(t('common.waGeneral')); val = '+' + CONFIG.whatsapp; }
        if (c.type === 'tg') { href = `https://t.me/${CONFIG.telegram}`; val = '@' + CONFIG.telegram; }
        if (c.type === 'mail') { href = `mailto:${CONFIG.email}`; val = CONFIG.email; }
        const color = c.type === 'wa' ? 'text-wa' : c.type === 'tg' ? 'text-aqua' : 'text-ink';
        return `<a href="${href}" ${c.type !== 'phone' && c.type !== 'mail' ? 'target="_blank" rel="noopener"' : ''} class="card card-hover p-6" data-cta="channel-${c.type}" data-reveal>
      <span class="${color} block mb-4">${icon(c.icon)}</span>
      <h3 class="font-extrabold">${c.t}</h3>
      <p class="text-sm text-ink/65 mt-2 font-bold" dir="ltr">${val}</p></a>`;
    }).join('');

    $('#cf-topics').innerHTML = t('contact.form.topics').map(tp => `<option>${tp}</option>`).join('');
    $('#contact-hours').textContent = CONFIG.hours[isFA() ? 'fa' : 'en'];
    $('#contact-map').innerHTML = `
    <iframe src="${CONFIG.mapEmbed}" width="100%" height="320" style="border:0;filter:saturate(.4) contrast(1.05)" loading="lazy" title="map"></iframe>
    <a href="${CONFIG.mapsLink}" target="_blank" rel="noopener" class="flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-aqua border-t border-ink/8">${icon('map')} <span>${CONFIG.address[isFA() ? 'fa' : 'en']}</span></a>`;

    $('#contact-faq').innerHTML = t('contact.faq.items').map(f => accItem(f.q, f.a)).join('');
    bindAccordions($('#contact-faq'));

    // فرم تماس
    const f = $('#contact-form');
    const validate = () => {
        const ok = f.name.value.trim() && f.phone.value.trim() && f.msg.value.trim();
        [f.name, f.phone, f.msg].forEach(i => i.classList.toggle('inp-invalid', !i.value.trim()));
        $('#cf-err').classList.toggle('hidden', !!ok);
        if (!ok) $('#cf-err').textContent = t('contact.form.err');
        return ok;
    };
    f.onsubmit = e => {
        e.preventDefault();
        if (!validate()) return;
        $('#cf-ok').textContent = t('contact.form.ok');
        $('#cf-ok').classList.remove('hidden');
        f.reset();
        setTimeout(() => $('#cf-ok').classList.add('hidden'), 6000);
    };
    $('#cf-wa').onclick = () => {
        if (!validate()) return;
        const msg = isFA()
            ? `پیام از سایت\nنام: ${f.name.value}\nتماس: ${f.phone.value}\nموضوع: ${f.topic.value}\n${f.msg.value}`
            : `Website message\nName: ${f.name.value}\nPhone: ${f.phone.value}\nTopic: ${f.topic.value}\n${f.msg.value}`;
        open(waLink(msg), '_blank');
    };
}

/* ─── صفحه: PRODUCTS ─── */
const pState = { q: new URLSearchParams(location.search).get('q') || '', cat: 'all', sort: 'default' };

function pageProducts() {
    renderCatChips();
    const s = $('#p-search');
    s.value = pState.q;
    s.oninput = e => { pState.q = e.target.value; renderProducts(); };
    $('#p-sort').onchange = e => { pState.sort = e.target.value; renderProducts(); };

    if (pState.q) s.dispatchEvent(new Event('input'));
    renderProducts();
}

function renderCatChips() {
    const all = [{ id: 'all', fa: t('products.all'), en: t('products.all') }, ...categories];
    $('#p-cats').innerHTML = all.map(c => `
    <button role="tab" aria-selected="${pState.cat === c.id}" class="tab-btn ${pState.cat === c.id ? '!bg-ink !text-white' : ''}" data-cat="${c.id}">${c[isFA() ? 'fa' : 'en']}</button>`).join('');
    $$('#p-cats [data-cat]').forEach(b => b.onclick = () => {
        pState.cat = b.dataset.cat;
        renderCatChips(); renderProducts();
    });
}

function renderProducts() {
    const L = isFA() ? 'fa' : 'en';
    let list = products.filter(p => {
        const okCat = pState.cat === 'all' || p.cat === pState.cat;
        const q = pState.q.trim().toLowerCase();
        const okQ = !q || p.name.fa.includes(pState.q.trim()) || p.name.en.toLowerCase().includes(q) ||
            p.formula.toLowerCase().includes(q) || p.cas.includes(q);
        return okCat && okQ;
    });
    if (pState.sort === 'name') list.sort((a, b) => a.name[L].localeCompare(b.name[L], isFA() ? 'fa' : 'en'));
    if (pState.sort === 'cat') list.sort((a, b) => a.cat.localeCompare(b.cat));

    $('#p-count').textContent = t('products.count').replace('{n}', toFa(list.length));
    $('#products-grid').innerHTML = list.map(p => productCard(p)).join('');
    $('#p-empty').classList.toggle('hidden', list.length > 0);
    bindOrderButtons('#products-grid');
    paintIcons();
    if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.fromTo('#products-grid > *', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .45, stagger: .04, ease: 'power2.out' });
    }
}

/* ─── صفحه: PRODUCT ─── */
function pageProduct() {
    const slug = new URLSearchParams(location.search).get('slug');
    const p = products.find(x => x.slug === slug);
    const L = isFA() ? 'fa' : 'en';
    const root = $('#product-root');

    if (!p) {
        root.innerHTML = `<div class="container-x py-24 text-center">
      <p class="font-black text-2xl">${t('products.single.notFound')}</p>
      <a href="products.html" class="btn btn-navy mt-6 inline-flex">${t('products.single.backToCat')}</a></div>`;
        return;
    }
    window.__curProduct = p.name[L];
    const cat = categories.find(c => c.id === p.cat);
    document.title = `${p.name[L]} | ${t('common.brandFull')}`;
    const related = products.filter(x => x.cat === p.cat && x.slug !== p.slug).slice(0, 4);
    const oMsg = orderMsg(p);

    root.innerHTML = `
  <div class="container-x pt-8 pb-16">
    <div class="grid lg:grid-cols-2 gap-10 items-start">
      <div data-reveal>
        <div class="ratio-43 rounded-xl overflow-hidden shadow-soft bg-mist">
          <img src="${img(p.image, 900, 675)}" width="900" height="675" alt="${p.name[L]}" id="p-main" class="img-tone">
        </div>
        <div class="grid grid-cols-4 gap-3 mt-4">
          ${[1, 2, 3, 4].map(i => `<button class="ratio-43 rounded-lg overflow-hidden border-2 border-transparent hover:border-aqua transition thumb" data-src="${img(p.image + '-' + i, 900, 675)}"><img src="${img(p.image + '-' + i, 200, 150)}" width="200" height="150" loading="lazy" alt="" class="img-tone"></button>`).join('')}
        </div>
      </div>
      <div data-reveal>
        <p class="text-xs font-bold text-aqua">${cat ? cat[L] : ''} · ${p.grade}</p>
        <h1 class="text-2xl lg:text-3xl font-black mt-2">${p.name[L]}</h1>
        <p class="text-sm text-ink/50 mt-3 flex flex-wrap gap-x-5 gap-y-1" dir="ltr">
          <span><b>${t('products.single.formula')}:</b> ${p.formula}</span>
          <span><b>${t('products.single.cas')}:</b> ${p.cas}</span>
        </p>
        <p class="body-p !mt-4">${p.desc[L]}</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          ${[['purity', p.purity[L]], ['origin', p.origin[L]], ['grade', p.grade], ['pkg', p.pack[L]]].map(([k, v]) => `
            <div class="card p-3.5 !bg-mist !shadow-none"><p class="text-[10px] font-bold text-ink/45 uppercase">${t('products.single.' + k)}</p><p class="text-[13px] font-extrabold mt-1 leading-5">${v}</p></div>`).join('')}
        </div>
        <div class="flex flex-wrap gap-3 mt-7">
          <a href="${waLink(oMsg + ' ' + location.href)}" target="_blank" rel="noopener" class="btn btn-wa" data-cta="whatsapp-product">${icon('whatsapp')} ${t('common.orderProduct')}</a>
          <a href="tel:${CONFIG.phonePrimary}" class="btn btn-navy" data-cta="product-call">${icon('phone')} ${t('common.callNow')}</a>
          <a href="https://t.me/${CONFIG.telegram}" target="_blank" rel="noopener" class="btn btn-ghost" data-cta="product-telegram">${icon('telegram')} ${t('common.telegram')}</a>
        </div>
        <a href="#" class="link-arrow text-sm mt-5 inline-flex" id="p-sds" data-cta="sds-download">${icon('file')} <span>${t('products.single.sds')} (PDF)</span></a>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-8 mt-16">
      <div class="lg:col-span-2 space-y-12">
        <section data-reveal>
          <h2 class="h2 !text-xl">${t('products.single.specs')}</h2>
          <div class="card mt-4 overflow-x-auto"><table class="w-full text-sm">
            <tbody>${p.specs.map(r => `<tr class="border-b border-ink/6 last:border-0"><td class="ps-5 py-3.5 font-bold text-ink/70">${r.k[L]}</td><td class="py-3.5 text-end pe-5">${r.v[L]}</td></tr>`).join('')}</tbody>
          </table></div>
          <p class="text-[11px] text-ink/40 mt-2">${t('products.disclaimer')}</p>
        </section>
        <section data-reveal>
          <h2 class="h2 !text-xl">${t('products.single.apps')}</h2>
          <ul class="grid sm:grid-cols-2 gap-3 mt-4">${p.apps[L].map(a => `<li class="card p-4 flex gap-2.5 items-center text-sm"><span class="text-aqua shrink-0">${icon('check')}</span>${a}</li>`).join('')}</ul>
        </section>
        <section data-reveal>
          <h2 class="h2 !text-xl">${t('products.single.pack')}</h2>
          <div class="card p-5 mt-4 flex gap-4 items-start"><span class="text-aqua shrink-0">${icon('box')}</span>
          <p class="text-sm leading-8 text-ink/70">${p.pack[L]} — ${t('sv.quality.pack.items')[0].d}</p></div>
        </section>
        <section data-reveal>
          <h2 class="h2 !text-xl">${t('products.single.safety')}</h2>
          <div class="card p-5 mt-4 !border-sun/40 flex gap-4 items-start !bg-sun/5"><span class="text-sun shrink-0">${icon('shield')}</span>
          <p class="text-sm leading-8 text-ink/75">${p.safety[L]}</p></div>
        </section>
        ${p.faq.length ? `<section data-reveal><h2 class="h2 !text-xl">${t('products.single.faq')}</h2>
          <div class="mt-4 space-y-3" data-acc>${p.faq.map(f => accItem(f.q[L], f.a[L])).join('')}</div></section>` : ''}
      </div>
      <aside class="lg:sticky lg:top-28 self-start">
        <div class="card p-6 !bg-ink !text-white" data-reveal>
          <h3 class="font-extrabold !text-white">${t('common.requestQuote')}</h3>
          <p class="text-sm text-white/60 mt-2 leading-7">${t('home.inquiry.sub')}</p>
          <a href="${waLink(oMsg + ' ' + location.href)}" target="_blank" rel="noopener" class="btn btn-wa w-full mt-5" data-cta="whatsapp-product-side">${t('common.orderProduct')}</a>
          <a href="tel:${CONFIG.phonePrimary}" class="btn btn-ghost !text-white !border-white/25 w-full mt-3" data-cta="product-call-side">${icon('phone')} ${CONFIG.phones[0]}</a>
        </div>
      </aside>
    </div>

    <section class="mt-16">
      <h2 class="h2 !text-xl" data-reveal>${t('products.single.related')}</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">${related.map(r => productCard(r)).join('')}</div>
    </section>
  </div>`;

    $$('.thumb').forEach(b => b.onclick = () => $('#p-main').src = b.dataset.src);
    bindAccordions(root);
    bindOrderButtons(root);

    // schema.org Product + Breadcrumb
    const schema = {
        '@context': 'https://schema.org', '@type': 'Product', name: p.name.en, description: p.desc.en, sku: p.cas,
        brand: { '@type': 'Brand', name: 'Khavar Sadra' }, offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'IRR', price: '0' }
    };
    injectSchema(schema);
    injectSchema({
        '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: location.origin + '/index.html' },
            { '@type': 'ListItem', position: 2, name: 'Products', item: location.origin + '/products.html' },
            { '@type': 'ListItem', position: 3, name: p.name.en }]
    });
}
function injectSchema(obj) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
}

/* ─── صفحه: BLOG ─── */
const bState = { q: '', cat: 'all', page: 1, perPage: 4 };

function pageBlog() {
    const cats = [{ id: 'all', fa: t('blog.all'), en: t('blog.all') }, ...postCats];
    $('#b-cats').innerHTML = cats.map(c => `
    <button role="tab" aria-selected="${bState.cat === c.id}" class="tab-btn ${bState.cat === c.id ? '!bg-ink !text-white' : ''}" data-cat="${c.id}">${c[isFA() ? 'fa' : 'en']}</button>`).join('');
    $$('#b-cats [data-cat]').forEach(b => b.onclick = () => {
        bState.cat = b.dataset.cat; bState.page = 1;
        $('#b-cats').innerHTML = cats.map(c => `<button role="tab" aria-selected="${bState.cat === c.id}" class="tab-btn ${bState.cat === c.id ? '!bg-ink !text-white' : ''}" data-cat="${c.id}">${c[isFA() ? 'fa' : 'en']}</button>`).join('');
        $$('#b-cats [data-cat]').forEach(x => x.onclick = () => x.click()); bindBlogCats(); renderBlog();
    });

    const s = $('#b-search');
    s.oninput = e => { bState.q = e.target.value; bState.page = 1; renderBlog(); };
    renderBlog();
}
function bindBlogCats() { $$('#b-cats [data-cat]').forEach(b => b.onclick = () => { bState.cat = b.dataset.cat; bState.page = 1; pageBlogRerender(); }); }
function pageBlogRerender() { pageBlog(); }

function renderBlog() {
    const L = isFA() ? 'fa' : 'en';
    let list = posts.filter(p => (bState.cat === 'all' || p.cat === bState.cat) &&
        (!bState.q.trim() || p.title.fa.includes(bState.q.trim()) || p.title.en.toLowerCase().includes(bState.q.trim().toLowerCase())));
    const pages = Math.max(1, Math.ceil(list.length / bState.perPage));
    bState.page = Math.min(bState.page, pages);

    const featured = list[0];
    $('#blog-featured').innerHTML = (featured && bState.page === 1 && !bState.q && bState.cat === 'all') ? `
    <a href="post.html?slug=${featured.slug}" class="card card-hover grid lg:grid-cols-2 overflow-hidden" data-reveal>
      <div class="ratio-43 lg:!aspect-auto lg:min-h-[280px]"><img src="${img(featured.image, 900, 620)}" width="900" height="620" alt="${featured.title[L]}" class="img-tone"></div>
      <div class="p-7 flex flex-col justify-center">
        <p class="text-[11px] font-black text-sun uppercase tracking-widest">${t('blog.featured')}</p>
        <h2 class="font-extrabold text-xl mt-2.5 leading-8">${featured.title[L]}</h2>
        <p class="text-sm text-ink/60 mt-3 leading-7">${featured.excerpt[L]}</p>
        <span class="link-arrow text-sm mt-4">${t('common.readMore')} ${icon('arrow')}</span>
      </div></a>` : '';

    const pageItems = list.slice((bState.page - 1) * bState.perPage, bState.page * bState.perPage);
    const grid = pageItems.slice(featured && bState.page === 1 && !bState.q && bState.cat === 'all' ? 1 : 0);
    $('#blog-grid').innerHTML = grid.map(p => postCard(p)).join('');
    $('#b-empty').classList.toggle('hidden', list.length > 0);

    $('#b-pager').innerHTML = pages > 1 ? `
    <button class="tab-btn" ${bState.page === 1 ? 'disabled' : ''} id="b-prev">${t('blog.prev')}</button>
    <span class="tab-btn pointer-events-none">${t('blog.page')} ${toFa(bState.page)} / ${toFa(pages)}</span>
    <button class="tab-btn" ${bState.page === pages ? 'disabled' : ''} id="b-next">${t('blog.next')}</button>` : '';
    const pv = $('#b-prev'), nx = $('#b-next');
    if (pv) pv.onclick = () => { bState.page--; renderBlog(); scrollTo({ top: 0, behavior: 'smooth' }); };
    if (nx) nx.onclick = () => { bState.page++; renderBlog(); scrollTo({ top: 0, behavior: 'smooth' }); };
}

/* ─── صفحه: POST ─── */
function pagePost() {
    const slug = new URLSearchParams(location.search).get('slug');
    const p = posts.find(x => x.slug === slug);
    const L = isFA() ? 'fa' : 'en';
    const root = $('#post-root');

    if (!p) {
        root.innerHTML = `<div class="container-x py-24 text-center"><p class="font-black text-2xl">404</p>
      <a href="blog.html" class="btn btn-navy mt-6 inline-flex">${t('blog.hero.title')}</a></div>`;
        return;
    }
    document.title = `${p.title[L]} | ${t('common.brandFull')}`;
    const blocks = p.body[L];
    const heads = blocks.filter(b => b.h);
    let hIdx = 0;

    root.innerHTML = `
  <div class="container-x pt-6 pb-20 grid lg:grid-cols-[1fr_260px] gap-10">
    <article>
      <div class="ratio-43 rounded-xl overflow-hidden shadow-soft" data-reveal>
        <img src="${img(p.image, 1000, 750)}" width="1000" height="750" alt="${p.title[L]}" class="img-tone">
      </div>
      <div class="flex items-center gap-3 text-xs font-bold mt-6" data-reveal>
        <span class="text-aqua">${(postCats.find(c => c.id === p.cat) || {})[L] || ''}</span>
        <span class="text-ink/35">${new Date(p.date).toLocaleDateString(isFA() ? 'fa-IR' : 'en-US')}</span>
        <span class="text-ink/35">${toFa(p.mins)} ${t('common.minRead')}</span>
      </div>
      <h1 class="text-2xl lg:text-3xl font-black leading-relaxed mt-3" data-reveal>${p.title[L]}</h1>
      <p class="text-ink/65 leading-8 mt-4" data-reveal>${p.excerpt[L]}</p>
      <div class="post-body mt-8">
        ${blocks.map(b => {
        if (b.h) { hIdx++; return `<h2 id="h-${hIdx}" class="text-xl font-extrabold mt-10 mb-3 scroll-mt-28">${b.h}</h2>`; }
        if (b.p) return `<p class="text-[15px] text-ink/75 leading-9 mb-4">${b.p}</p>`;
        if (b.ul) return `<ul class="card p-5 space-y-2.5 my-5">${b.ul.map(li => `<li class="flex gap-2.5 text-sm leading-7 text-ink/75"><span class="text-aqua shrink-0 mt-1">${icon('check')}</span>${li}</li>`).join('')}</ul>`;
        return '';
    }).join('')}
      </div>
      <div class="cta-band mt-12" data-reveal>
        <div><h2 class="font-extrabold">${t('common.ctaBand.title')}</h2>
        <p class="text-sm text-ink/65 mt-1.5">${t('common.ctaBand.sub')}</p></div>
        <a href="${waLink(t('common.waGeneral'))}" target="_blank" rel="noopener" class="btn btn-sun" data-cta="post-cta">${t('common.ctaBand.btn')}</a>
      </div>
    </article>
    <aside class="hidden lg:block">
      <div class="sticky top-28 space-y-5">
        <div class="card p-5">
          <p class="text-xs font-black text-aqua uppercase tracking-widest">${t('blog.single.toc')}</p>
          <nav class="mt-3 space-y-1.5" id="post-toc">
            ${heads.map((h, i) => `<a href="#h-${i + 1}" class="block text-[13px] font-bold text-ink/60 hover:text-aqua py-1 toc-link" data-target="h-${i + 1}">${h.h}</a>`).join('')}
          </nav>
        </div>
        <div class="card p-5">
          <p class="text-xs font-black text-aqua uppercase tracking-widest">${t('blog.single.share')}</p>
          <div class="flex gap-2 mt-3">
            <a href="${waLink(p.title[L] + ' — ' + location.href)}" target="_blank" rel="noopener" class="w-10 h-10 grid place-items-center rounded-lg bg-wa/10 text-wa" data-cta="share-wa">${icon('whatsapp')}</a>
            <a href="https://t.me/share/url?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent(p.title[L])}" target="_blank" rel="noopener" class="w-10 h-10 grid place-items-center rounded-lg bg-aqua/10 text-aqua" data-cta="share-tg">${icon('telegram')}</a>
          </div>
        </div>
      </div>
    </aside>
  </div>`;

    // نوار پیشرفت + scrollspy
    const bar = $('#read-progress');
    const spy = new IntersectionObserver(ents => {
        ents.forEach(e => { if (e.isIntersecting) $$('.toc-link').forEach(a => a.classList.toggle('text-aqua', a.dataset.target === e.target.id)); });
    }, { rootMargin: '-20% 0px -70% 0px' });
    $$('[id^="h-"]', root).forEach(h => spy.observe(h));
    addEventListener('scroll', () => {
        const h = document.documentElement;
        bar.style.width = (scrollY / (h.scrollHeight - h.clientHeight) * 100) + '%';
    }, { passive: true });

    // مقالات مرتبط
    const rel = posts.filter(x => x.cat === p.cat && x.slug !== p.slug).slice(0, 3);
    if (rel.length) {
        const sec = document.createElement('section');
        sec.className = 'container-x pb-16';
        sec.innerHTML = `<h2 class="h2 !text-xl" data-reveal>${t('blog.single.related')}</h2>
      <div class="grid sm:grid-cols-3 gap-5 mt-6">${rel.map(r => postCard(r)).join('')}</div>`;
        root.after(sec);
    }

    injectSchema({
        '@context': 'https://schema.org', '@type': 'Article', headline: p.title.en, datePublished: p.date,
        author: { '@type': 'Organization', name: 'Khavar Sadra' }, inLanguage: ['fa', 'en']
    });
}

/* ─── صفحات خدمات ─── */
function pageServiceSupply() {
    $('#supply-steps').innerHTML = t('sv.supply.steps').map((s, i) => `
    <div class="flex gap-5 items-start" data-reveal>
      <span class="shrink-0 w-11 h-11 grid place-items-center rounded-xl bg-ink text-white font-black">${toFa(i + 1)}</span>
      <div><h3 class="font-extrabold text-lg">${s.t}</h3><p class="text-sm text-ink/65 mt-2 leading-8">${s.d}</p></div>
    </div>`).join('');
    $('#supply-faq').innerHTML = t('sv.supply.faq.items').map(f => accItem(f.q, f.a)).join('');
    bindAccordions($('#supply-faq'));
    $('#supply-side-cta').href = waLink(t('common.waGeneral'));
    $('#supply-cta').href = waLink(isFA() ? 'سلام، لیست مواد موردنیاز را برای استعلام قیمت ارسال می‌کنم:' : 'Hello, sending my required materials list for a quote:');
}

function pageServiceTrade() {
    $('#trade-track').innerHTML = t('sv.trade.steps').map((s, i) => `
    <div class="card !bg-white/5 !border-white/10 p-6 pt-7 relative">
      <span class="absolute -top-3.5 start-6 bg-sun text-white text-xs font-black px-3 py-1.5 rounded-full">${toFa(i + 1)}</span>
      <h3 class="font-extrabold !text-white">${s.t}</h3>
      <p class="text-sm text-white/60 mt-2 leading-7">${s.d}</p>
    </div>`).join('');
    $('#trade-points').innerHTML = t('sv.trade.points').map(pt => `
    <div class="card p-6" data-reveal><span class="text-aqua block mb-3.5">${icon('check')}</span>
    <h3 class="font-extrabold">${pt.t}</h3><p class="text-[13px] text-ink/60 mt-2 leading-6">${pt.d}</p></div>`).join('');
    $('#trade-cta').href = waLink(isFA() ? 'سلام، برای ثبت درخواست واردات راهنمایی می‌خواهم.' : 'Hello, I need guidance on submitting an import request.');

    // تایم‌لاین افقی pin شده (فقط دسکتاپ)
    if (window.gsap && window.ScrollTrigger && !matchMedia('(prefers-reduced-motion: reduce)').matches && innerWidth >= 1024) {
        const track = $('#trade-track');
        gsap.to(track, {
            x: () => -(track.scrollWidth - document.documentElement.clientWidth + 96) * (isFA() ? 1 : -1),
            ease: 'none',
            scrollTrigger: {
                trigger: '#trade-pin', pin: true, scrub: 1, end: () => '+=' + (track.scrollWidth - innerWidth + 200),
                invalidateOnRefresh: true
            }
        });
    }
}

function pageServiceConsult() {
    // بنتو
    const b = t('sv.consult.bento');
    const spans = { lg: 'md:col-span-2 lg:row-span-2', sm: '' };
    $('#consult-bento').innerHTML = b.map((c, i) => `
    <div class="card card-hover p-7 ${spans[c.size] || ''} ${i === 0 ? '!bg-ink !text-white' : ''}" data-reveal>
      <span class="${i === 0 ? 'text-sun' : 'text-aqua'} block mb-4">${icon(c.icon)}</span>
      <h3 class="font-extrabold ${i === 0 ? '!text-white text-lg' : ''}">${c.t}</h3>
      <p class="text-[13px] ${i === 0 ? 'text-white/60' : 'text-ink/60'} mt-2 leading-7">${c.d}</p>
    </div>`).join('');

    // تب‌های صنعت
    const panels = t('sv.consult.tabs.panels');
    const renderTabs = (active = 0) => {
        $('#consult-tabs').innerHTML = panels.map((p, i) => `
      <button class="tab-btn" role="tab" aria-selected="${i === active}" data-i="${i}">${p.t}</button>`).join('');
        $$('#consult-tabs [data-i]').forEach(btn => btn.onclick = () => renderTabs(+btn.dataset.i));
        $('#consult-tab-panels').innerHTML = `<div class="card p-6 mt-4" data-reveal>
      <ul class="space-y-3">${panels[active].recs.map(r => `<li class="flex gap-3 items-center text-sm font-bold"><span class="text-sun shrink-0">${icon('arrow')}</span>${r}</li>`).join('')}</ul></div>`;
    };
    renderTabs();

    $('#consult-cta').href = waLink(t('common.waGeneral'));

    // ماژول «کدام محصول؟»
    const quiz = t('sv.consult.quiz');
    const steps = [[quiz.q1, quiz.opts1, 'ind'], [quiz.q2, quiz.opts2, 'app'], [quiz.q3, quiz.opts3, 'form']];
    const ans = {};
    let step = 0;

    const renderQuiz = () => {
        $('#quiz-dots').innerHTML = steps.map((_, i) => `<i class="${i <= step ? 'on' : ''}"></i>`).join('');
        if (step < steps.length) {
            const [q, opts, key] = steps[step];
            $('#quiz-body').innerHTML = `
        <p class="font-extrabold">${q}</p>
        <div class="grid sm:grid-cols-2 gap-3 mt-5">${opts.map(o => `<button class="btn btn-ghost !justify-start" data-v="${o.v}">${o.t}</button>`).join('')}</div>`;
            $$('#quiz-body [data-v]').forEach(b => b.onclick = () => {
                ans[key] = b.dataset.v; step++; renderQuiz();
            });
        } else {
            const slug = quiz.result[ans.ind + '_' + ans.app] || 'sodium-metasilicate';
            const p = products.find(x => x.slug === slug);
            const L = isFA() ? 'fa' : 'en';
            $('#quiz-body').innerHTML = `
        <p class="text-sm font-bold text-ink/50">${quiz.resultPre}</p>
        <div class="card !bg-mist !shadow-none p-5 mt-3 flex items-center gap-4">
          <img src="${img(p.image, 120, 120)}" width="120" height="120" alt="${p.name[L]}" class="w-16 h-16 rounded-lg object-cover img-tone">
          <div><p class="font-extrabold text-lg">${p.name[L]}</p>
          <p class="text-xs text-ink/55 mt-1" dir="ltr">${p.formula} · CAS ${p.cas}</p></div>
        </div>
        <div class="flex flex-wrap gap-3 mt-5">
          <a href="${waLink(orderMsg(p))}" target="_blank" rel="noopener" class="btn btn-wa" data-cta="quiz-wa">${icon('whatsapp')} ${quiz.ask}</a>
          <a href="product.html?slug=${slug}" class="btn btn-ghost">${t('common.details')}</a>
          <button class="btn btn-ghost !px-4" id="quiz-again">${quiz.again}</button>
        </div>`;
            $('#quiz-again').onclick = () => { step = 0; Object.keys(ans).forEach(k => delete ans[k]); renderQuiz(); };
        }
    };
    renderQuiz();
}

function pageServiceQuality() {
    $('#quality-metrics').innerHTML = t('sv.quality.metrics').map(m => `
    <div><p class="text-4xl font-black text-sun">${m.v}</p><p class="text-sm text-white/60 mt-1">${m.label}</p></div>`).join('');
    $('#quality-checklist').innerHTML = t('sv.quality.checklist.items').map((c, i) => `
    <li class="flex gap-4 items-start py-3.5 border-b border-ink/6 last:border-0" data-reveal>
      <span class="shrink-0 w-8 h-8 grid place-items-center rounded-lg bg-aqua/10 text-aqua text-sm font-black">${toFa(i + 1)}</span>
      <span class="text-sm text-ink/75 leading-7 pt-1">${c}</span></li>`).join('');

    // تب مقایسه گریدها
    const tabs = t('sv.quality.grades.tabs');
    const renderTabs = (active = 0) => {
        $('#quality-tabs').innerHTML = tabs.map((tb, i) => `
      <button class="tab-btn" role="tab" aria-selected="${i === active}" data-i="${i}">${tb.t}</button>`).join('');
        $$('#quality-tabs [data-i]').forEach(btn => btn.onclick = () => renderTabs(+btn.dataset.i));
        $('#quality-table').innerHTML = `<table class="w-full text-sm min-w-[420px]">
      <thead><tr class="bg-ink text-white"><th class="text-start ps-5 py-3.5 font-bold">${t('products.single.grade')}</th><th class="text-start py-3.5 font-bold">${t('products.single.apps')}</th></tr></thead>
      <tbody>${tabs[active].rows.map(r => `<tr class="border-b border-ink/6 last:border-0"><td class="ps-5 py-3.5 font-extrabold" dir="ltr">${r[0]}</td><td class="py-3.5 text-ink/65">${r[1]}</td></tr>`).join('')}</tbody></table>`;
    };
    renderTabs();

    $('#quality-pack').innerHTML = t('sv.quality.pack.items').map(p => `
    <div class="card card-hover p-5" data-reveal>
      <div class="ratio-43 rounded-lg overflow-hidden mb-4"><img src="${img('pack-' + p.t, 400, 300)}" width="400" height="300" loading="lazy" alt="${p.t}" class="img-tone"></div>
      <h3 class="font-extrabold text-[15px]">${p.t}</h3><p class="text-[12px] text-ink/55 mt-1.5 leading-6">${p.d}</p></div>`).join('');
    $('#quality-faq').innerHTML = t('sv.quality.faq.items').map(f => accItem(f.q, f.a)).join('');
    bindAccordions($('#quality-faq'));
    $('#quality-cta').href = waLink(isFA() ? 'سلام، CoA آخرین محموله محصولات را درخواست دارم.' : 'Hello, I would like the latest CoA for your products.');
}

/* ─── صفحه ۴۰۴ ─── */
function page404() {
    if (window.anime && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        anime({ targets: '#nf-molecule .draw', strokeDashoffset: [anime.setDashoffset, 0], duration: 1400, easing: 'easeInOutSine', delay: anime.stagger(200) });
        anime({ targets: '#nf-molecule', translateY: [-8, 8], duration: 2400, direction: 'alternate', loop: true, easing: 'easeInOutSine' });
    }
    $('#nf-search').onsubmit = e => {
        e.preventDefault();
        location.href = 'products.html?q=' + encodeURIComponent(e.target.q.value.trim());
    };
}

/* ─── راه‌اندازی ─── */
const PAGES = {
    home: pageHome, about: pageAbout, contact: pageContact,
    products: pageProducts, product: pageProduct, blog: pageBlog, post: pagePost,
    'service-supply': pageServiceSupply, 'service-trade': pageServiceTrade,
    'service-consult': pageServiceConsult, 'service-quality': pageServiceQuality,
    '404': page404
};

function renderPage() {
    const fn = PAGES[document.body.dataset.page];
    if (fn) fn();
    paintIcons();
    renderCrumbs();
    initAnimations();
    initCounters();
    initPreloader();
}

initI18n();
renderLayout();
renderPage();

// رندر مجدد کامل هنگام تعویض زبان (بدون reload)
addEventListener('langchange', () => {
    renderLayout();
    if (PAGES[document.body.dataset.page]) PAGES[document.body.dataset.page]();
    paintIcons();
    renderCrumbs();
    initAnimations();
    initCounters();
});