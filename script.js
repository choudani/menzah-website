/* ═══════════════════════════════════════
   MENZAH YOUTH ASSOCIATION — JAVASCRIPT
   ═══════════════════════════════════════ */

/* ─── LOADER ─── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    initReveal();
  }, 2200);
});

/* ─── NAV SCROLL ─── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

/* ─── PAGES ─── */
const allPages = ['home', 'about', 'programs', 'schedule', 'team', 'register', 'donate', 'contact'];

function showPage(id) {
  allPages.forEach(p => {
    document.getElementById('page-' + p).classList.remove('active');
    const n = document.getElementById('nl-' + p);
    if (n) n.classList.remove('active');
  });
  document.getElementById('page-' + id).classList.add('active');
  const n = document.getElementById('nl-' + id);
  if (n) n.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeMobile();
  setTimeout(initReveal, 100);
}

/* ─── MOBILE MENU ─── */
function toggleMobile() {
  document.getElementById('mobile-nav').classList.toggle('open');
}
function closeMobile() {
  document.getElementById('mobile-nav').classList.remove('open');
}

/* ─── REVEAL ON SCROLL ─── */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('visible');
    obs.observe(el);
  });
}

/* ─── SCHEDULE FILTER ─── */
function filterSch(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#schedule-body tr').forEach(row => {
    row.style.display = (cat === 'all' || row.dataset.cat === cat) ? '' : 'none';
  });
}

/* ─── DONATION AMOUNTS ─── */
function selectAmount(btn) {
  document.querySelectorAll('.donation-amount-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function copyRIB() {
  const rib = '230810272879621100550096';
  navigator.clipboard.writeText(rib).then(() => {
    const btn = document.getElementById('copy-btn');
    btn.classList.add('copied');
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> تم النسخ!';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> نسخ الرقم';
    }, 2500);
  });
}

function copyRIB2() {
  const rib = '350810000000001372164986';
  navigator.clipboard.writeText(rib).then(() => {
    const btn = document.getElementById('copy-btn-barid');
    btn.classList.add('copied');
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> تم النسخ!';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> نسخ الرقم';
    }, 2500);
  });
}

function donateWhatsApp() {
  const selected = document.querySelector('.donation-amount-btn.selected');
  const amount = selected ? selected.dataset.amount : '...';
  const msg = encodeURIComponent(`السلام عليكم، أرغب في التبرع لجمعية شباب المنزه بمبلغ ${amount} درهم. شكراً جزيلاً! 🙏`);
  window.open(`https://wa.me/212650188600?text=${msg}`, '_blank');
}

/* ─── MINOR CHECK ─── */
function checkAge() {
  const dob = document.getElementById('reg-dob').value;
  if (!dob) return;
  const age = Math.floor((new Date() - new Date(dob)) / (365.25 * 24 * 3600 * 1000));
  const guardian = document.getElementById('guardian-section');
  if (age < 18) {
    guardian.classList.add('visible');
  } else {
    guardian.classList.remove('visible');
  }
}

/* ─── REGISTRATION FORM ─── */
function submitReg() {
  const required = document.querySelectorAll('#reg-form-wrap [required]');
  let valid = true;
  required.forEach(f => {
    if (!f.value.trim()) { f.style.borderColor = 'var(--crimson)'; valid = false; }
    else f.style.borderColor = '';
  });
  const activities = document.querySelectorAll('.sport-check-item input:checked');
  if (activities.length === 0) {
    alert('الرجاء اختيار نشاط واحد على الأقل');
    return;
  }
  if (!valid) { alert('الرجاء ملء جميع الحقول الإلزامية'); return; }
  document.getElementById('reg-form-wrap').style.display = 'none';
  document.getElementById('reg-success').style.display = 'block';
}

/* ─── CONTACT FORM ─── */
function submitContact() {
  alert('شكراً! تم إرسال رسالتك. سنتواصل معك قريباً 🙏');
}

/* ─── LANG ─── */
const T = {
  ar: {
    'nl-home': 'الرئيسية', 'nl-about': 'عن الجمعية', 'nl-programs': 'البرامج',
    'nl-schedule': 'البرنامج الأسبوعي', 'nl-team': 'الفريق',
    'nl-donate': 'تبرع', 'nl-contact': 'تواصل', 'nl-register': 'انخرط الآن',
    'h-eyebrow': 'رياضة · ثقافة · تكنولوجيا',
    'h-title-ar': 'جمعية شباب المنزه',
    'h-desc': 'نرسم مستقبل الشباب بالرياضة والثقافة والتكنولوجيا. جمعية تؤمن بأن كل شاب يستحق فضاءً يُعبّر فيه عن طاقته ويبني قدراته.',
    'h-btn1': 'انخرط الآن', 'h-btn2-text': 'اكتشف برامجنا',
    'hs1': 'عضو نشيط', 'hs2': 'تخصصات', 'hs3': 'سنوات خبرة', 'hs4': 'نشاط/أسبوع',
    'scroll-label': 'اكتشف',
  },
  en: {
    'nl-home': 'Home', 'nl-about': 'About', 'nl-programs': 'Programs',
    'nl-schedule': 'Schedule', 'nl-team': 'Team',
    'nl-donate': 'Donate', 'nl-contact': 'Contact', 'nl-register': 'Join Now',
    'h-eyebrow': 'Sport · Culture · Technology',
    'h-title-ar': 'Menzah Youth Association',
    'h-desc': 'We shape the future of youth through sports, culture and technology.',
    'h-btn1': 'Join Now', 'h-btn2-text': 'Explore our programs',
    'hs1': 'Active Members', 'hs2': 'Disciplines', 'hs3': 'Years of Experience', 'hs4': 'Activities/week',
    'scroll-label': 'Discover',
  }
};

function setLang(lang, btn) {
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  const t = T[lang] || T.ar;
  Object.keys(t).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = t[id];
  });
}

/* ─── INIT ─── */
initReveal();
