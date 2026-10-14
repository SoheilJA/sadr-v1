/* ═══ سیستم دوزبانه — تعویض زبان بدون reload ═══ */
import FA from './i18n-fa.js';
import EN from './i18n-en.js';

const DICTS = { fa: FA, en: EN };
let current = 'fa';

export function getLang(){ return current; }

/* استخراج متن با مسیر نقطه‌ای: t('home.hero.title') */
export function t(path){
  return path.split('.').reduce((o,k)=> (o && o[k] !== undefined) ? o[k] : '', DICTS[current]) ?? '';
}

/* اعمال زبان روی <html> و متن‌های استاتیک data-i18n */
export function applyStatic(){
  const html = document.documentElement;
  html.lang = current;
  html.dir = current === 'fa' ? 'rtl' : 'ltr';
  html.classList.toggle('font-fa', current === 'fa');
  html.classList.toggle('font-en', current === 'en');
  document.body.classList.toggle('font-fa', current === 'fa');
  document.body.classList.toggle('font-en', current === 'en');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t(el.dataset.i18n);
    if (typeof v === 'string') el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(',').forEach(pair => {
      const [attr, path] = pair.split(':');
      el.setAttribute(attr.trim(), t(path.trim()));
    });
  });
  document.title = t('common.brandFull') + ' — ' + (current === 'fa' ? 'تأمین مواد شیمیایی صنعتی' : 'Industrial Chemical Supply');
}

/* تغییر زبان: ذخیره، اعمال، و رویداد برای رندر مجدد اجزای پویا */
export function setLang(lang, { silent } = {}){
  current = lang;
  localStorage.setItem('sadra-lang', lang);
  applyStatic();
  if (!silent) window.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
}

/* مقداردهی اولیه: URL > localStorage > fa */
export function initI18n(){
  const url = new URLSearchParams(location.search).get('lang');
  const saved = localStorage.getItem('sadra-lang');
  setLang(url === 'en' || url === 'fa' ? url : (saved === 'en' ? 'en' : 'fa'), { silent: true });
}