/* ═══ داده مقالات بلاگ (۶ مقاله دمو).
   body: آرایه بلوک‌ها {h:} عنوان، {p:} پاراگراف، {ul:[]} فهرست ═══ */

export const posts = [
  {
    slug: 'metasilicate-in-detergents', cat: 'detergent', date: '2024-11-18', mins: 6, image: 'blog-meta',
    title: { fa: 'چرا متاسیلیکات سدیم قلب فرمولاسیون شوینده‌های صنعتی است؟', en: 'Why Sodium Metasilicate Is the Heart of Industrial Detergent Formulas' },
    excerpt: { fa: 'از بافر قلیایی تا امولسیون چربی — نگاهی فنی به نقش متاسیلیکات در شوینده‌ها و معیارهای انتخاب گرید.', en: 'From alkaline buffering to grease emulsification — a technical look at metasilicate’s role and grade selection criteria.' },
    body: {
      fa: [ { p: 'در فرمولاسیون هر شوینده صنعتی، سه وظیفه اصلی باید پوشش داده شود: قلیائیت، بافر و عملکرد روی چربی. متاسیلیکات سدیم به‌طور خاص به‌دلیل ترکیب این سه ویژگی در یک ترکیب ارزان و پایدار، جایگاهی جدایی‌ناپذیر در این صنعت پیدا کرده است.' },
           { h: 'نقش بافر' }, { p: 'pH محلول شوینده در طول زمان استفاده افت می‌کند؛ متاسیلیکات با ظرفیت بافرینگ بالا، pH را در محدوده بهینه ۱۰ تا ۱۲ تثبیت می‌کند تا آنزیم‌ها و سورفکتانت‌ها بیشترین بازدهی را داشته باشند.' },
           { h: 'امولسیون‌کنندگی چربی' }, { p: 'سیلیکات‌های قلیایی سطح چربی را انرژی‌بخش می‌کنند و جداسازی آن از سطح فلز یا سرامیک را برای سورفکتانت آسان می‌سازند. به همین دلیل در شوینده‌های CIP خطوط غذایی تقریباً همیشه حضور دارند.' },
           { h: 'معیار انتخاب گرید' }, { ul: ['پنتاهیدرات: حلولیت سریع‌تر، مناسب مایعات و پیش‌محلول‌ها', 'انیدروس: قدرت قلیایی بیشتر به واحد وزن، مناسب پودرها', 'پارامتر کلیدی QC: pH محلول ۱٪ و درصد رطوبت'] } ],
      en: [ { p: 'Every industrial detergent formulation must cover three core functions: alkalinity, buffering and fat action. Sodium metasilicate specifically combines all three in one inexpensive, stable compound.' },
           { h: 'The buffering role' }, { p: 'Detergent pH drifts down during use; metasilicate’s high buffering capacity keeps it in the optimal 10–12 range so enzymes and surfactants stay efficient.' },
           { h: 'Grease emulsification' }, { p: 'Alkaline silicates lower the interfacial energy of grease, letting surfactants lift it off metal or ceramic. That’s why they are nearly always present in CIP cleaners for food lines.' },
           { h: 'Grade selection criteria' }, { ul: ['Pentahydrate: faster dissolution, suits liquids', 'Anhydrous: higher alkalinity per unit weight, suits powders', 'Key QC parameters: 1% solution pH and moisture content'] } ]
    }
  },
  {
    slug: 'pva-grades-explained', cat: 'textile', date: '2024-10-02', mins: 7, image: 'blog-pva',
    title: { fa: 'تفاوت گریدهای PVA: عدد پشت نام پلیمر چه می‌گوید؟', en: 'PVA Grades Explained: What the Numbers Mean' },
    excerpt: { fa: '۱۷۹۹، ۲۴۸۸، ۰۵۸۸ — این اعداد رمز درجه هیدرولیز و ویسکوزیته هستند. راهنمای انتخاب برای نساجی، چسب و کاغذ.', en: '1799, 2488, 0588 — these digits encode hydrolysis degree and viscosity. A selection guide for textile, adhesive and paper.' },
    body: {
      fa: [ { p: 'نام گریدهای PVA (مثلاً ۲۴-۸۸) در نگاه اول رمزآلود است؛ اما دو عدد ساده آن، تقریباً همه‌چیز را درباره رفتار پلیمر مشخص می‌کند.' },
           { h: 'عدد دوم: درجه هیدرولیز' }, { p: 'عدد ۸۸ یعنی ۸۸ مول‌درصد گروه‌های استات هیدرولیز شده‌اند. هیدرولیز بالاتر (۹۸-۹۹) مقاومت به آب و قدرت فیلم را زیاد می‌کند؛ هیدرولیز ۸۷-۸۸ حلولیت در آب سرد را بهتر می‌سازد.' },
           { h: 'عدد اول: ویسکوزیته' }, { p: 'بیانگر وزن مولکولی نسبی است. ویسکوزیته بالا (۲۴) برای آهار‌زنی نخ که فیلم مقاوم می‌خواهد؛ ویسکوزیته پایین (۰۵) برای تغلیظ‌هایی که باید با سرعت پخش شوند.' },
           { h: 'جدول انتخاب سریع' }, { ul: ['آهار‌زنی نساجی: 1799', 'چسب سفید بسته‌بندی: 2488', 'امولسیون و تغلیظ: 0588', 'پوشش کاغذ مقاوم به روغن: 1799 یا 2688'] } ],
      en: [ { p: 'PVA grade names (e.g. 24-88) look cryptic at first, but their two simple digits reveal nearly everything about the polymer’s behavior.' },
           { h: 'Second digit: hydrolysis degree' }, { p: '88 means 88 mol% of acetate groups are hydrolyzed. Higher hydrolysis (98–99) raises water resistance and film strength; 87–88 improves cold-water solubility.' },
           { h: 'First digit: viscosity' }, { p: 'It represents relative molecular weight. High viscosity (24) suits yarn sizing that needs a strong film; low (05) suits fast-spreading thickeners.' },
           { h: 'Quick selection table' }, { ul: ['Textile sizing: 1799', 'Packaging white glue: 2488', 'Emulsion thickening: 0588', 'Oil-resistant paper coating: 1799 or 2688'] } ]
    }
  },
  {
    slug: 'acid-storage-safety', cat: 'safety', date: '2024-09-11', mins: 5, image: 'blog-acid',
    title: { fa: 'نگهداری ایمن اسیدهای معدنی: چک‌لیست انبارش مهندسی‌شده', en: 'Safe Storage of Mineral Acids: An Engineered Checklist' },
    excerpt: { fa: 'تفکیک سازگاری، سیستم مهار نشت و انتخاب ظرف مناسب — سه ستون ایمنی انبار اسید که در بازرسی‌های ما بیشتر رعایت نمی‌شوند.', en: 'Compatibility segregation, spill containment and container choice — the three pillars of acid-warehouse safety most often missed.' },
    body: {
      fa: [ { p: 'بخش قابل‌توجهی از حوادث صنعتی در انبار رخ می‌دهد، نه در خط تولید. برای اسیدها، سه اصل باید بدون استثنا رعایت شود.' },
           { h: 'تفکیک سازگاری' }, { p: 'اسید و قلیا در یک چیدمان انبار، بمب ساعتی است. جدول سازگاری هر جفت ماده باید روی دیوار انبار نصب شده باشد و مسیر حمل‌ونقل آن‌ها تلاقی نداشته باشد.' },
           { h: 'مهار نشت' }, { ul: ['سینی/دیگ مهار با حجم ≥ ۱۱۰٪ بزرگ‌ترین ظرف', 'کف مقاوم به اسید (اپوکسی فنولی)', 'کیت خنثی‌سازی و PPE در دسترس نزدیک خروجی'] },
           { h: 'انتخاب ظرف' }, { p: 'HCl فقط در HDPE یا ظروف روکش‌دار؛ در ظروف فلزی بدون روکش، خوردگی و نفوذ کلراید فقط مسأله زمان است.' } ],
      en: [ { p: 'A large share of industrial incidents happens in the warehouse, not on the line. For acids, three rules are non-negotiable.' },
           { h: 'Compatibility segregation' }, { p: 'Acids and alkalis in one layout are a ticking bomb. A pairwise compatibility chart must hang on the wall and transfer routes must not cross.' },
           { h: 'Spill containment' }, { ul: ['Containment pallets ≥ 110% of the largest container', 'Acid-resistant flooring (phenolic epoxy)', 'Neutralization kit and PPE near the exit'] },
           { h: 'Container selection' }, { p: 'HCl only in HDPE or lined vessels; in unlined metal, chloride attack is merely a matter of time.' } ]
    }
  },
  {
    slug: 'xanthan-food-and-drilling', cat: 'food', date: '2024-08-20', mins: 6, image: 'blog-xanthan',
    title: { fa: 'زانتان: یک صمغ، دو دنیای متفاوت — غذایی و حفاری', en: 'Xanthan: One Gum, Two Worlds — Food and Drilling' },
    excerpt: { fa: 'چرا یک هیدروکلوئید در نوشیدنی و در چاه نفت هر دو کار می‌کند؟ نگاهی به سازوکار تixonotropic و معیار گرید.', en: 'Why does one hydrocolloid work in both beverages and oil wells? The thixotropic mechanism and grade criteria.' },
    body: {
      fa: [ { p: 'زانتان گام شاید تنها ماده‌ای باشد که هم در لیست E415 نوشیدنی‌ها و هم در گزارش‌های LBM چاه‌های نفت دیده می‌شود. رمز این همه‌کاره بودن، رفتار شبه‌پلاستیک آن است.' },
           { h: 'رفتار تixonotropic' }, { p: 'در حالت سکون ویسکوزیته بالا (تعلیق ذرات) و تحت تنش برشی، ویسکوزیته افت می‌کند (پمپ‌شدن آسان). این دقیقاً همان چیزی است که هم سس و هم گل حفاری نیاز دارند.' },
           { h: 'تفاوت گریدها' }, { ul: ['گرید غذایی: شمارش میکروبی محدود و مطابق FCC', 'گرید صنعتی: تمرکز بر ویسکوزیته و پایداری دما/شوری بالا', 'قیمت گرید حفاری معمولاً پایین‌تر است — هرگز در فرمول غذایی استفاده نشود'] },
           { h: 'نکته QC' }, { p: 'ویسکوزیته باید در محلول KCl ۱٪ (نه آب خالص) اندازه‌گیری شود تا با شرایط واقعی میدان قابل مقایسه باشد.' } ],
      en: [ { p: 'Xanthan gum may be the only material on both the E415 beverage lists and oil-well LBM reports. Its secret is shear-thinning behavior.' },
           { h: 'Thixotropic behavior' }, { p: 'High viscosity at rest (particle suspension) and a drop under shear (easy pumping) — exactly what both sauces and drilling mud need.' },
           { h: 'Grade differences' }, { ul: ['Food grade: controlled micro counts per FCC', 'Industrial grade: focus on viscosity and high temp/salinity stability', 'Drilling grade is usually cheaper — never use it in food formulas'] },
           { h: 'QC note' }, { p: 'Viscosity should be measured in 1% KCl solution (not pure water) to be comparable to real field conditions.' } ]
    }
  },
  {
    slug: 'stpp-vs-zeolite', cat: 'detergent', date: '2024-07-05', mins: 5, image: 'blog-stpp',
    title: { fa: 'STPP یا زئولیت؟ انتخاب بیلدر در پودر شوینده', en: 'STPP or Zeolite? Builder Choice in Detergent Powder' },
    excerpt: { fa: 'مقایسه فنی-اقتصادی دو بیلدر اصلی از منظر کلات‌کنندگی، حلالیت و محدودیت‌های زیست‌محیطی.', en: 'A technical-economic comparison of the two main builders: chelation power, solubility and environmental constraints.' },
    body: {
      fa: [ { p: 'قلب هر پودر شوینده «بیلدر» است؛ ماده‌ای که سختی آب را می‌گیرد تا سورفکتانت برای کثیفی آزاد بماند. دو گزینه اصلی بازار، STPP و زئولیت ۴A هستند.' },
           { h: 'STPP' }, { ul: ['کلات‌کننده عالی کلسیم و منیزیم', 'کاملاً محلول — بدون رسوب روی پارچه', 'نگرانی: фосفات و رشد جلبکی در آب‌های سطحی'] },
           { h: 'زئولیت ۴A' }, { ul: ['مبادله‌کننده یونی سریع کلسیم (منیزیم ضعیف‌تر)', 'نامحلول — نیاز به کو-بیلدر (کربوکسیلات/PAA)', 'قیمت پایدارتر و بدون محدودیت زیست‌محیطی'] },
           { h: 'جمع‌بندی انتخاب' }, { p: 'در مناطق با آب کم‌سخت و خطوط تولید اروپایی، فرمول بدون فسفات منطقی است؛ در ایران با سختی بالای آب، STPP هنوز برنده عملکرد است — مگر آنکه هزینه زیست‌محیطی در اولویت استراتژیک شما باشد.' } ],
      en: [ { p: 'The heart of every detergent powder is the “builder” — the material that removes water hardness so the surfactant stays free for soil. The two market leaders are STPP and zeolite 4A.' },
           { h: 'STPP' }, { ul: ['Excellent Ca/Mg chelation', 'Fully soluble — no fabric deposition', 'Concern: phosphate and algal growth in surface waters'] },
           { h: 'Zeolite 4A' }, { ul: ['Fast calcium ion exchange (weaker for Mg)', 'Insoluble — needs a co-builder (carboxylate/PAA)', 'Stable pricing and no environmental restrictions'] },
           { h: 'Bottom line' }, { p: 'In low-hardness regions and EU-style plants, phosphate-free makes sense; in Iran’s high-hardness water, STPP still wins on performance — unless environmental cost is your strategic priority.' } ]
    }
  },
  {
    slug: 'choosing-chemical-supplier', cat: 'supply', date: '2024-06-12', mins: 4, image: 'blog-supply',
    title: { fa: 'پنج پرسشی که پیش از انتخاب تأمین‌کننده مواد شیمیایی باید بپرسید', en: 'Five Questions to Ask Before Choosing a Chemical Supplier' },
    excerpt: { fa: 'اختلاف قیمت‌ها در بازار مواد شیمیایی بزرگ است؛ این پنج سوال، تأمین‌کننده‌های واقعی را از واسطه‌ها جدا می‌کند.', en: 'Price spreads in the chemical market are huge; these five questions separate real suppliers from middlemen.' },
    body: {
      fa: [ { p: 'وقتی چند پیش‌فاکتور با اختلاف قیمت ۲۰ درصدی دریافت می‌کنید، تفاوت معمولاً در قیمت نیست — در ریسک است.' },
           { h: 'پنج سوال کلیدی' }, { ul: ['CoA و MSDS آخرین محموله را همین الان نشان می‌دهید؟', 'انبار فیزیکی دارید یا فقط واسطه هستید؟', ' اگر کیفیت مطابقت نداشت، فرآیند مرجوعی چیست؟', 'زمان تأمین اگر موجود نبود را کتبی می‌دهید؟', 'نمونه کوچک قبل از خرید حجمی ممکن است؟'] },
           { h: 'نشانه‌های خطر' }, { p: 'امتناع از ارائه شماره ثابت شرکت، عدم ارائه CoA با بهانه «محرمانگی»، و قیمت‌هایی که از میانگین بازار خیلی پایین‌ترند — هر سه یعنی جایی از زنجیره شفاف نیست.' } ],
      en: [ { p: 'When you receive several proformas with a 20% price spread, the difference is usually not price — it’s risk.' },
           { h: 'Five key questions' }, { ul: ['Can you show the CoA/MSDS of your latest shipment right now?', 'Do you hold physical stock or are you a pure middleman?', 'What is the rejection process if quality mismatches?', 'Will you guarantee lead time in writing if out of stock?', 'Is a small pre-purchase sample possible?'] },
           { h: 'Red flags' }, { p: 'Refusing to give a fixed office line, “confidentiality” excuses for missing CoAs, and prices far below market — all three mean some link in the chain is not transparent.' } ]
    }
  }
];

export const postCats = [
  { id: 'detergent', fa: 'شوینده', en: 'Detergents' },
  { id: 'textile',   fa: 'نساجی',  en: 'Textile' },
  { id: 'safety',    fa: 'ایمنی',  en: 'Safety' },
  { id: 'food',      fa: 'غذایی',  en: 'Food' },
  { id: 'supply',    fa: 'زنجیره تأمین', en: 'Supply Chain' }
];