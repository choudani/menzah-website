/* ═══════════════════════════════════════
   MENZAH YOUTH ASSOCIATION — JAVASCRIPT
   ═══════════════════════════════════════ */

/* ─── LOADER ─── */
function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.classList.add('hidden');
  initReveal();
}

// محاولة أولى بعد تحميل الـ DOM
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(hideLoader, 2200);
});

// fallback: إلا تأخر أكثر من 4 ثواني، نخبيه بالقوة
setTimeout(hideLoader, 4000);

/* ─── NAV SCROLL ─── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

/* ─── PAGES ─── */
const allPages = ['home', 'about', 'programs', 'schedule', 'team', 'register', 'donate', 'contact', 'partners'];

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
  window.open(`https://wa.me/212600000000?text=${msg}`, '_blank');
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

/* ─── REGISTRATION FORM — WEB3FORMS ─── */
async function handleRegSubmit(e) {
  e.preventDefault();
  const activities = document.querySelectorAll('.sport-check-item input:checked');
  if (activities.length === 0) {
    alert('الرجاء اختيار نشاط واحد على الأقل');
    return;
  }
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'جاري الإرسال...';
  btn.disabled = true;
  try {
    const formData = new FormData(e.target);
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (data.success) {
      document.getElementById('reg-form-wrap').style.display = 'none';
      document.getElementById('reg-success').style.display = 'block';
    } else {
      alert('حدث خطأ: ' + (data.message || 'الرجاء المحاولة مجدداً'));
      btn.textContent = 'إرسال طلب الانخراط ←';
      btn.disabled = false;
    }
  } catch {
    alert('تعذر الاتصال. تحقق من الإنترنت وأعد المحاولة.');
    btn.textContent = 'إرسال طلب الانخراط ←';
    btn.disabled = false;
  }
}

/* ─── CONTACT FORM — WEB3FORMS ─── */
async function handleContactSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'جاري الإرسال...';
  btn.disabled = true;
  try {
    const formData = new FormData(e.target);
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (data.success) {
      e.target.reset();
      btn.textContent = '✓ تم الإرسال بنجاح!';
      btn.style.background = 'var(--forest)';
      setTimeout(() => {
        btn.textContent = 'إرسال الرسالة ←';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    } else {
      alert('حدث خطأ: ' + (data.message || 'الرجاء المحاولة مجدداً'));
      btn.textContent = 'إرسال الرسالة ←';
      btn.disabled = false;
    }
  } catch {
    alert('تعذر الاتصال. تحقق من الإنترنت وأعد المحاولة.');
    btn.textContent = 'إرسال الرسالة ←';
    btn.disabled = false;
  }
}

/* ─── DARK MODE ─── */
function toggleDark() {
  document.body.classList.toggle('dark');
  const btn = document.getElementById('dark-btn');
  btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('darkMode', document.body.classList.contains('dark') ? '1' : '0');
}

// Apply saved preference on load
if (localStorage.getItem('darkMode') === '1') {
  document.body.classList.add('dark');
  const btn = document.getElementById('dark-btn');
  if (btn) btn.textContent = '☀️';
}

/* ─── LANG ─── */
const T = {
  ar: {
    /* Nav */
    'nl-home':'الرئيسية','nl-about':'عن الجمعية','nl-programs':'البرامج',
    'nl-schedule':'البرنامج الأسبوعي','nl-team':'الفريق',
    'nl-donate':'💚 تبرع','nl-contact':'تواصل','nl-register':'انخرط الآن',
    /* Hero */
    'h-eyebrow':'رياضة · ثقافة · تكنولوجيا',
    'h-title-ar':'جمعية شباب المنزه',
    'h-desc':'نرسم مستقبل الشباب بالرياضة والثقافة والتكنولوجيا. جمعية تؤمن بأن كل شاب يستحق فضاءً يُعبّر فيه عن طاقته ويبني قدراته.',
    'h-btn1':'انخرط الآن','h-btn2-text':'اكتشف برامجنا',
    /* Stats */
    'hs1':'عضو نشيط','hs2':'تخصصات','hs3':'سنوات خبرة','hs4':'نشاط/أسبوع',
    'scroll-label':'اكتشف',
    /* Home programs section */
    'qp-eyebrow':'برامجنا','qp-title':'ما نقدمه لشبابنا',
    'qp-sub':'من الفنون القتالية إلى الروبوتيك، نوفر بيئة متكاملة لتطوير الشباب في حي بساتين المنزه.',
    /* Program cards */
    'pc1-title':'الفنون القتالية','pc1-sub':'MARTIAL ARTS',
    'pc1-desc':'كراطي، تايكواندو، وMMA — تدريب احترافي لجميع المستويات بقاعة الرياضة بدار الشباب.',
    'pc2-title':'كارديو للسيدات','pc2-sub':'LADIES FITNESS',
    'pc2-desc':'فضاء خاص للسيدات بملعب القرب: برامج لياقة بدنية في أجواء مريحة وآمنة.',
    'pc3-title':'روبوتيك وإعلاميات','pc3-sub':'ROBOTICS & IT',
    'pc3-desc':'دروس برمجة وروبوتيك لإعداد جيل متمكن من التكنولوجيا ومستعد لمستقبل رقمي.',
    'pc4-title':'دروس الدعم','pc4-sub':'LANGUAGE SUPPORT',
    'pc4-desc':'دعم مدرسي في اللغة العربية والإنجليزية لمساعدة التلاميذ على التفوق الدراسي.',
    'pc5-title':'الثقافة والفنون','pc5-sub':'CULTURE & ARTS',
    'pc5-desc':'مسرح، موسيقى، وفنون تشكيلية — فضاء إبداعي لاكتشاف وتطوير المواهب الفنية.',
    'pc6-title':'أنشطة ترفيهية','pc6-sub':'RECREATIONAL',
    'pc6-desc':'رحلات، ألعاب جماعية، ومهرجانات موسمية لتقوية الروابط الاجتماعية والانتماء.',
    /* About */
    'about-eyebrow':'من نحن','about-title':'جمعية تصنع الفارق',
    'about-p1':'جمعية شباب المنزه للرياضة والثقافة جمعية مغربية غير ربحية تأسست بهدف تقديم فضاءات عالية الجودة للشباب في حي بساتين المنزه بالرباط.',
    'about-p2':'نؤمن إيماناً راسخاً بأن الشباب هم ركيزة المستقبل، ولذلك نعمل على تقديم برامج متنوعة تمتد من الفنون القتالية إلى الروبوتيك، مروراً بالفنون والثقافة ودعم الدراسة.',
    'about-p3':'نسعى إلى بناء جيل متوازن جسدياً وفكرياً، متمسك بهويته، ومنفتح على العالم.',
    /* Schedule */
    'sch-eyebrow':'التوقيت','sch-title':'البرنامج الأسبوعي',
    'sch-sub':'استعمال الزمن التفصيلي لجميع الأنشطة والبرامج.',
    /* Team */
    'team-eyebrow':'الفريق','team-title':'الأشخاص خلف الجمعية',
    'team-sub':'فريق متخصص ومتحمس يعمل بشغف من أجل شباب المنزه كل يوم.',
    /* Donate */
    'donate-eyebrow':'ادعمنا','donate-title':'ساهم في بناء مستقبل شبابنا',
    'donate-sub':'تبرعك يساعدنا على توفير معدات أفضل، تنظيم أنشطة أكثر، ومنح الشباب فرصاً حقيقية للتطور.',
    /* Register */
    'reg-eyebrow':'الانخراط','reg-title':'انضم إلى عائلة شباب المنزه',
    'reg-sub':'سجّل الآن واستفد من جميع برامجنا. الأبواب مفتوحة للجميع!',
    /* Contact */
    'con-eyebrow':'تواصل','con-title':'نحن هنا من أجلك',
    'con-sub':'لأي استفسار أو معلومة، لا تتردد في التواصل معنا.',
    'con-hours':'على مدى الأسبوع: 16:00 – 19:00',
    'con-wa-btn':'تواصل معنا عبر واتساب',
    'con-form-title':'راسلنا مباشرة',
    'con-send-btn':'إرسال الرسالة ←',
  },
  en: {
    /* Nav */
    'nl-home':'Home','nl-about':'About','nl-programs':'Programs',
    'nl-schedule':'Schedule','nl-team':'Team',
    'nl-donate':'💚 Donate','nl-contact':'Contact','nl-register':'Join Now',
    /* Hero */
    'h-eyebrow':'Sport · Culture · Technology',
    'h-title-ar':'Menzah Youth Association',
    'h-desc':'We shape the future of youth through sports, culture and technology. A community that believes every young person deserves a space to grow.',
    'h-btn1':'Join Now','h-btn2-text':'Explore our programs',
    /* Stats */
    'hs1':'Active Members','hs2':'Disciplines','hs3':'Years of Experience','hs4':'Activities/week',
    'scroll-label':'Discover',
    /* Home programs section */
    'qp-eyebrow':'Programs','qp-title':'What We Offer Our Youth',
    'qp-sub':'From martial arts to robotics, we provide a complete environment for youth development in Bassatine Menzah.',
    /* Program cards */
    'pc1-title':'Martial Arts','pc1-sub':'MARTIAL ARTS',
    'pc1-desc':'Karate, Taekwondo & MMA — professional training for all levels at the Youth House sports hall.',
    'pc2-title':'Ladies Cardio','pc2-sub':'LADIES FITNESS',
    'pc2-desc':'Exclusive space for women at the neighborhood gym: cardio & aerobics in a safe, comfortable environment.',
    'pc3-title':'Robotics & IT','pc3-sub':'ROBOTICS & IT',
    'pc3-desc':'Programming and robotics courses to prepare a tech-savvy generation ready for the digital future.',
    'pc4-title':'Language Support','pc4-sub':'LANGUAGE SUPPORT',
    'pc4-desc':'Academic support in Arabic and English to help students excel in their studies.',
    'pc5-title':'Culture & Arts','pc5-sub':'CULTURE & ARTS',
    'pc5-desc':'Theater, music, and visual arts — a creative space to discover and develop artistic talents.',
    'pc6-title':'Recreational Activities','pc6-sub':'RECREATIONAL',
    'pc6-desc':'Trips, group games, and seasonal festivals to strengthen social bonds and a sense of belonging.',
    /* About */
    'about-eyebrow':'About Us','about-title':'An Association That Makes a Difference',
    'about-p1':'Menzah Youth Association for Sports and Culture is a Moroccan non-profit founded to offer high-quality spaces for youth in the Bassatine Menzah neighborhood of Rabat.',
    'about-p2':'We firmly believe that youth are the cornerstone of the future, which is why we offer diverse programs spanning from martial arts to robotics, arts and culture to academic support.',
    'about-p3':'We strive to build a generation that is physically and intellectually balanced, rooted in its identity, and open to the world.',
    /* Schedule */
    'sch-eyebrow':'Schedule','sch-title':'Weekly Program',
    'sch-sub':'Detailed timetable for all activities and programs.',
    /* Team */
    'team-eyebrow':'Team','team-title':'The People Behind the Association',
    'team-sub':'A passionate and specialized team working every day for the youth of Menzah.',
    /* Donate */
    'donate-eyebrow':'Support Us','donate-title':'Help Build Our Youth\'s Future',
    'donate-sub':'Your donation helps us provide better equipment, organize more activities, and give young people real opportunities to grow.',
    /* Register */
    'reg-eyebrow':'Registration','reg-title':'Join the Menzah Youth Family',
    'reg-sub':'Register now and benefit from all our programs. Our doors are open to everyone!',
    /* Contact */
    'con-eyebrow':'Contact','con-title':'We Are Here For You',
    'con-sub':'For any inquiry or information, don\'t hesitate to reach out.',
    'con-hours':'Every day of the week: 4:00 PM – 7:00 PM',
    'con-wa-btn':'Contact us via WhatsApp',
    'con-form-title':'Message Us Directly',
    'con-send-btn':'Send Message ←',
  }
};

function setLang(lang, btn) {
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  const t = T[lang] || T.ar;
  // Translate all registered IDs
  Object.keys(t).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = t[id];
  });
  // Translate data-ar / data-en elements
  document.querySelectorAll('[data-ar]').forEach(el => {
    el.textContent = lang === 'ar' ? el.dataset.ar : (el.dataset.en || el.dataset.ar);
  });
}

/* ─── HERO IMAGE SLIDER ─── */
(function() {
  var slides, dots, progress, current = 0, timer, total = 4;

  function init() {
    slides = document.querySelectorAll('.hero-slide');
    var dotsWrap = document.getElementById('heroSliderDots');
    progress = document.getElementById('heroSliderProgress');
    if (!slides.length || !dotsWrap) return;
    total = slides.length;

    for (var i = 0; i < total; i++) {
      var d = document.createElement('button');
      d.className = 'hero-slider-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('data-i', i);
      d.onclick = (function(idx){ return function(){ goTo(idx); }; })(i);
      dotsWrap.appendChild(d);
    }
    dots = dotsWrap.querySelectorAll('.hero-slider-dot');
    startAuto();
  }

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + total) % total;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    resetProgress();
    clearInterval(timer);
    startAuto();
  }

  function resetProgress() {
    if (!progress) return;
    progress.style.transition = 'none';
    progress.style.width = '0%';
    setTimeout(function(){
      progress.style.transition = 'width 5s linear';
      progress.style.width = '100%';
    }, 30);
  }

  function startAuto() {
    resetProgress();
    timer = setInterval(function(){ goTo(current + 1); }, 5000);
  }

  window.heroSliderNav = function(dir) { goTo(current + dir); };

  // Touch swipe
  var sx = 0;
  document.addEventListener('touchstart', function(e){
    var hero = e.target.closest('.hero');
    if (hero) sx = e.touches[0].clientX;
  }, {passive:true});
  document.addEventListener('touchend', function(e){
    var hero = e.target.closest('.hero');
    if (!hero) return;
    var dx = sx - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) goTo(current + (dx > 0 ? 1 : -1));
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ─── INIT ─── */
initReveal();
