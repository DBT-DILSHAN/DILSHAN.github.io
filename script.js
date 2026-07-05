const SITE_CONFIG = {
  EMAILJS_PUBLIC_KEY: "PD8Bxa0tEm1PbizPk",
  EMAILJS_SERVICE_ID: "service_in0migl",
  EMAILJS_TEMPLATE_ID: "template_rzqdow9",
  FORM_COOLDOWN_SECONDS: 30,
  WHATSAPP_NUMBER: "+94712308533"
};

const SKILLS = [
  { name: "Electrical Safety", level: 97 },
  { name: "Industrial Wiring", level: 92 },
  { name: "Troubleshooting", level: 92 },
  { name: "Motor Control", level: 90 },
  { name: "Control Panels", level: 90 },
  { name: "Preventive Maintenance", level: 90 },
  { name: "Power Distribution", level: 85 },
  { name: "PLC Basics", level: 75 }
];

const PROJECTS = [
  { title: "Distribution Panel Overhaul", desc: "Rewired and relabeled an aging distribution panel.", tags: ["Panel Boards", "Safety"], filter: "panel", icon: "fa-server" },
  { title: "Motor Control Center Maintenance", desc: "Routine and corrective maintenance on MCC units.", tags: ["Motor Control", "Maintenance"], filter: "motor", icon: "fa-gears" },
  { title: "Schneider Altivar VFD Commissioning", desc: "Parameterized and commissioned Altivar-series VFDs.", tags: ["VFD", "Automation"], filter: "vfd", icon: "fa-bolt" },
  { title: "Control Panel Wiring Build", desc: "Built and wired a control panel from schematic.", tags: ["Panel Boards", "Wiring"], filter: "panel", icon: "fa-diagram-project" },
  { title: "VFD Fault Diagnostics", desc: "Diagnosed and resolved recurring drive faults.", tags: ["VFD", "Troubleshooting"], filter: "vfd", icon: "fa-magnifying-glass-chart" },
  { title: "Motor Rewiring & Alignment Support", desc: "Supported motor rewiring and coupling alignment.", tags: ["Motor Control", "Field Work"], filter: "motor", icon: "fa-industry" }
];

const CERTS = [
  { title: "NVQ Level 4 — Power Electrical (Special)", org: "IETI Moratuwa" }
];

const SERVICES = [
  { icon: "fa-industry", title: "Industrial Electrical Installation", desc: "Wiring, panel setup and equipment installation for industrial facilities." },
  { icon: "fa-house-chimney-user", title: "Residential Electrical Services", desc: "Home wiring, fixture installation and safety upgrades for your home." },
  { icon: "fa-building", title: "Commercial Electrical Solutions", desc: "Wiring and power distribution for offices, shops and commercial premises." },
  { icon: "fa-screwdriver-wrench", title: "Electrical Maintenance", desc: "Scheduled maintenance to keep your electrical systems running smoothly." },
  { icon: "fa-server", title: "Panel Installation", desc: "Control panel and distribution board setup for industrial and commercial use." },
  { icon: "fa-gears", title: "Machine Wiring", desc: "Motor and machine wiring, including VFD systems and control circuits." },
  { icon: "fa-triangle-exclamation", title: "Emergency Repairs", desc: "Fast, safe response to electrical faults and emergency breakdowns." },
  { icon: "fa-magnifying-glass", title: "Fault Finding & Inspection", desc: "Systematic troubleshooting and preventive inspection of electrical systems." }
];

/* =========================================================
   THEME TOGGLE - LIQUID GLASS SWITCH
========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('themeSwitch');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  html.setAttribute('data-theme', initialTheme);
  updateIcon(initialTheme);

  themeSwitch.addEventListener('click', function(e) {
    // Ripple effect on switch
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'switch-ripple';
    const size = Math.max(rect.width, rect.height) * 0.4;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    // Toggle theme
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcon(next);

    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate(18);
  });

  // Keyboard support
  themeSwitch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      themeSwitch.click();
    }
  });

  function updateIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }
});

/* =========================================================
   LOADER - ELECTRICAL BOLT CHARGING
========================================================= */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const percent = document.getElementById("loaderPercent");
  const loaderBar = document.getElementById("loaderBar");
  const boltFill = document.getElementById("boltFill");
  const boltSparks = document.getElementById("boltSparks");
  const boltFlash = document.getElementById("boltFlash");
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function spawnSpark(){
    if (reduceMotion || !boltSparks) return;
    const spark = document.createElement('span');
    spark.className = 'bolt-spark';
    const angle = Math.random() * Math.PI * 2;
    const dist = 30 + Math.random() * 30;
    spark.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
    spark.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
    boltSparks.appendChild(spark);
    setTimeout(() => spark.remove(), 650);
  }

  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 18;
    if (p >= 100) { p = 100; clearInterval(iv); }
    percent.textContent = Math.floor(p) + "%";
    loaderBar.style.width = p + "%";
    if (boltFill) boltFill.style.clipPath = `inset(${100 - p}% 0 0 0)`;
    spawnSpark();
  }, 120);

  setTimeout(() => {
    if (boltFlash) boltFlash.classList.add('active');
    if (navigator.vibrate) navigator.vibrate([15, 30, 15]);
  }, 1250);

  setTimeout(() => {
    loader.classList.add("hidden");
    document.body.style.overflow = "auto";
    initSparkLines();
    initLiquidGlass();
    initTouchVibration();
    initAmbientBlobParallax();
  }, 1400);
});

/* =========================================================
   LIQUID GLASS EFFECT
========================================================= */
function initLiquidGlass() {
  const canHover = window.matchMedia('(hover: hover)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.glass-card, .about-col, .service-card, .skill-card, .project-card, .cert-card, .timeline-card, .contact-item, .address-item').forEach(card => {
    const ripple = document.createElement('div');
    ripple.className = 'glass-ripple';
    card.appendChild(ripple);

    const shine = document.createElement('div');
    shine.className = 'glass-shine';
    card.appendChild(shine);

    const edge = document.createElement('div');
    edge.className = 'glass-edge';
    card.appendChild(edge);

    if (!canHover || reduceMotion) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
      ripple.style.left = x + '%';
      ripple.style.top = y + '%';

      /* subtle liquid tilt, capped to a gentle range */
      const tiltX = ((x - 50) / 50) * 5;
      const tiltY = ((y - 50) / 50) * -5;
      card.style.setProperty('--rx', tiltX.toFixed(2) + 'deg');
      card.style.setProperty('--ry', tiltY.toFixed(2) + 'deg');
    });

    card.addEventListener('mouseleave', () => {
      ripple.style.opacity = '0';
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      setTimeout(() => {
        ripple.style.opacity = '1';
      }, 100);
    });
  });
}

/* =========================================================
   TOUCH VIBRATION
========================================================= */
function initAmbientBlobParallax() {
  const blobs = document.querySelectorAll('.liquid-blobs .blob');
  if (!blobs.length) return;
  const canHover = window.matchMedia('(hover: hover)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canHover || reduceMotion) return;

  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function raf() {
    curX += (targetX - curX) * 0.04;
    curY += (targetY - curY) * 0.04;
    blobs.forEach((blob, i) => {
      const depth = (i + 1) * 10;
      blob.style.marginLeft = (curX * depth) + 'px';
      blob.style.marginTop = (curY * depth) + 'px';
    });
    requestAnimationFrame(raf);
  }
  raf();
}

function initTouchVibration() {
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'touch-ripple';
      const size = Math.max(rect.width, rect.height) * 0.35;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
      if (navigator.vibrate) navigator.vibrate(25);
    });
  });

  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'touch-ripple';
      const size = Math.max(rect.width, rect.height) * 0.35;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
      if (navigator.vibrate) navigator.vibrate(25);
    });
  });

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'touch-ripple';
      const size = Math.max(rect.width, rect.height) * 0.35;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
      if (navigator.vibrate) navigator.vibrate(25);
    });
  });

  document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'touch-ripple';
      const size = Math.max(rect.width, rect.height) * 0.35;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
      if (navigator.vibrate) navigator.vibrate(35);
    });
  });

  document.querySelectorAll('.address-item').forEach(item => {
    item.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'touch-ripple';
      const size = Math.max(rect.width, rect.height) * 0.35;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
      if (navigator.vibrate) navigator.vibrate(35);
    });
  });

  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'touch-ripple';
      const size = Math.max(rect.width, rect.height) * 0.35;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
      if (navigator.vibrate) navigator.vibrate(25);
    });
  });

  document.querySelectorAll('.about-col').forEach(col => {
    col.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'touch-ripple';
      const size = Math.max(rect.width, rect.height) * 0.35;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
      if (navigator.vibrate) navigator.vibrate(25);
    });
  });
}

/* =========================================================
   SCROLL PROGRESS + NAVBAR
========================================================= */
const scrollProgress = document.getElementById("scrollProgress");
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  scrollProgress.style.width = scrolled + "%";
  navbar.classList.toggle("scrolled", h.scrollTop > 40);
  backToTop.classList.toggle("visible", h.scrollTop > 500);
  updateActiveNav();
});
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* =========================================================
   NAV
========================================================= */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navClose = document.getElementById("navClose");

navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navClose.addEventListener("click", () => navLinks.classList.remove("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

function updateActiveNav(){
  const sections = document.querySelectorAll("section[id]");
  let current = "home";
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) current = sec.id;
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}

/* =========================================================
   PARTICLES
========================================================= */
if (window.particlesJS) {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!(isMobile && reduceMotion)) {
    particlesJS("particles-bg", {
      particles: {
        number: { value: isMobile ? 16 : 50, density: { enable: true, value_area: 800 } },
        color: { value: ["#22C55E", "#4ADE80", "#86EFAC"] },
        shape: { type: "circle" },
        opacity: { value: 0.15, random: true },
        size: { value: 2, random: true },
        line_linked: { enable: !isMobile, distance: 120, color: "#22C55E", opacity: 0.04, width: 1 },
        move: { enable: true, speed: isMobile ? 0.3 : 0.5, direction: "none", random: true, out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: !isMobile, mode: "grab" }, resize: true },
        modes: { grab: { distance: 120, line_linked: { opacity: 0.08 } } }
      },
      retina_detect: !isMobile
    });
  }
}

/* =========================================================
   TYPED
========================================================= */
if (window.Typed) {
  new Typed("#typedRole", {
    strings: ["Electrical Technician", "Industrial Electrician", "Electrical Installation Specialist"],
    typeSpeed: 40, backSpeed: 20, backDelay: 1600, loop: true, smartBackspace: true
  });
}

/* =========================================================
   SPARK LINES
========================================================= */
function initSparkLines(){
  const svg = document.getElementById("sparkSvg");
  if (!svg) return;
  const paths = [
    "M0,140 L220,140 L260,180 L520,180 L560,120 L900,120 L950,200 L1440,200",
    "M0,620 L180,620 L220,560 L480,560 L520,660 L860,660 L900,580 L1440,580",
    "M1440,320 L1200,320 L1160,380 L900,380 L860,300 L560,300"
  ];
  paths.forEach((d, i) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    svg.appendChild(path);
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    if (window.gsap) {
      gsap.to(path, {
        strokeDashoffset: 0, opacity: 1, duration: 2.2, delay: i * 0.5, ease: "power2.inOut",
        onComplete: () => { gsap.to(path, { opacity: 0.06, duration: 1 }); }
      });
    }
  });
}

/* =========================================================
   RENDER SKILLS
========================================================= */
const skillsGrid = document.getElementById("skillsGrid");
const skillPopup = document.getElementById("skillPopup");
const skillPopupClose = document.getElementById("skillPopupClose");
const skillRingFill = document.getElementById("skillRingFill");
const skillPopupLevel = document.getElementById("skillPopupLevel");
const RING_CIRC = 351.86;
let skillCountRAF = null;

function animateSkillPopup(level) {
  skillRingFill.style.transition = "none";
  skillRingFill.style.strokeDashoffset = RING_CIRC;
  skillPopupLevel.textContent = "0%";
  skillRingFill.getBoundingClientRect();
  skillRingFill.style.transition = "";

  requestAnimationFrame(() => {
    skillRingFill.style.strokeDashoffset = RING_CIRC - (RING_CIRC * level / 100);
  });

  if (skillCountRAF) cancelAnimationFrame(skillCountRAF);
  const duration = 1000;
  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    skillPopupLevel.textContent = Math.round(eased * level) + "%";
    if (t < 1) skillCountRAF = requestAnimationFrame(tick);
  }
  skillCountRAF = requestAnimationFrame(tick);
}

SKILLS.forEach((skill, index) => {
  const card = document.createElement("div");
  card.className = "skill-card glass-card";
  card.style.transitionDelay = (index * 30) + "ms";
  card.innerHTML = `
    <div class="skill-top"><span>${skill.name}</span></div>
    <div class="skill-bar"><div class="skill-fill" data-level="${skill.level}"></div></div>
  `;

  card.addEventListener('click', function(e) {
    const fill = this.querySelector('.skill-fill');
    fill.style.width = '0%';
    fill.getBoundingClientRect();
    requestAnimationFrame(() => { fill.style.width = skill.level + '%'; });

    document.getElementById('skillPopupName').textContent = skill.name;
    document.getElementById('skillPopupDesc').textContent = 'Proficiency level for ' + skill.name;
    document.getElementById('skillPopupIcon').className = 'fa-solid fa-bolt';
    skillPopup.classList.add('active');
    animateSkillPopup(skill.level);
    if (navigator.vibrate) navigator.vibrate(25);
  });
  
  skillsGrid.appendChild(card);
});

skillPopupClose.addEventListener('click', () => skillPopup.classList.remove('active'));
skillPopup.addEventListener('click', (e) => { if (e.target === skillPopup) skillPopup.classList.remove('active'); });

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach((fill, index) => {
        setTimeout(() => { fill.style.width = fill.dataset.level + '%'; }, index * 50);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
skillObserver.observe(skillsGrid);

/* =========================================================
   RENDER SERVICES
========================================================= */
const servicesGrid = document.getElementById('servicesGrid');
const serviceModal = document.getElementById('serviceModal');

SERVICES.forEach((service, index) => {
  const card = document.createElement('div');
  card.className = 'service-card glass-card';
  card.setAttribute('data-aos', 'fade-up');
  card.setAttribute('data-aos-delay', index * 50);
  card.innerHTML = `<i class="fa-solid ${service.icon}"></i><h3>${service.title}</h3><p>${service.desc}</p>`;
  
  card.addEventListener('click', function() {
    document.getElementById('serviceModalIcon').className = 'fa-solid ' + service.icon;
    document.getElementById('serviceModalTitle').textContent = service.title;
    document.getElementById('serviceModalDesc').textContent = service.desc;
    serviceModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (navigator.vibrate) navigator.vibrate(25);
  });
  
  servicesGrid.appendChild(card);
});

// Close service modal handlers
function closeServiceModal() {
  serviceModal.classList.remove('active');
  document.body.style.overflow = '';
}

serviceModal.addEventListener('click', (e) => { 
  if (e.target === serviceModal) closeServiceModal(); 
});

// Close on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
    closeServiceModal();
  }
});

/* =========================================================
   RENDER PROJECTS
========================================================= */
const projectsGrid = document.getElementById("projectsGrid");
function renderProjects(filter = "all"){
  projectsGrid.innerHTML = "";
  PROJECTS.filter(p => filter === "all" || p.filter === filter).forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "project-card glass-card";
    card.setAttribute("data-aos", "zoom-in");
    card.setAttribute("data-aos-delay", (i%3)*80);
    card.innerHTML = `<div class="project-thumb"><i class="fa-solid ${p.icon}"></i></div><div class="project-body"><h3>${p.title}</h3><p>${p.desc}</p><div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div></div>`;
    card.addEventListener("click", () => openModal(p));
    projectsGrid.appendChild(card);
  });
  if (window.AOS) AOS.refreshHard();
}
renderProjects();

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
});

const projectModal = document.getElementById("projectModal");

function openModal(p){
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalTags").innerHTML = p.tags.map(t => `<span>${t}</span>`).join("");
  projectModal.classList.add("active");
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  projectModal.classList.remove("active");
  document.body.style.overflow = '';
}

projectModal.addEventListener("click", (e) => { 
  if (e.target === projectModal) closeModal(); 
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModal.classList.contains('active')) {
    closeModal();
  }
});

/* =========================================================
   RENDER CERTIFICATES
========================================================= */
const certGallery = document.getElementById("certGallery");
CERTS.forEach((c, i) => {
  const card = document.createElement("div");
  card.className = "cert-card glass-card";
  card.setAttribute("data-aos", "fade-up");
  card.setAttribute("data-aos-delay", i*60);
  card.innerHTML = `<i class="fa-solid fa-award"></i><span>${c.title}</span><div class="cert-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i>&nbsp; View</div>`;
  card.addEventListener("click", () => openLightbox(c));
  certGallery.appendChild(card);
});

const lightbox = document.getElementById("lightbox");
document.querySelectorAll('.timeline-card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h3').textContent;
    const org = card.querySelector('.timeline-org').textContent;
    const desc = card.querySelector('p:last-child').textContent;
    const icon = card.getAttribute('data-icon') || 'fa-briefcase';
    document.getElementById("lightboxContent").innerHTML = `<div class="lock-badge"><i class="fa-solid ${icon}"></i></div><h3>${title}</h3><p class="timeline-org" style="margin-bottom:10px;">${org}</p><p>${desc}</p>`;
    lightbox.classList.add("active");
    document.body.style.overflow = 'hidden';
    if (navigator.vibrate) navigator.vibrate(20);
  });
});

function openLightbox(c){
  document.getElementById("lightboxContent").innerHTML = `<div class="lock-badge"><i class="fa-solid fa-lock-open"></i></div><h3>${c.title}</h3><p>${c.org}</p><span class="verified-tag"><i class="fa-solid fa-shield-halved"></i>VERIFIED CREDENTIAL</span>`;
  lightbox.classList.add("active");
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = '';
}

lightbox.addEventListener("click", (e) => { 
  if (e.target === lightbox) closeLightbox(); 
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    closeLightbox();
  }
});

/* =========================================================
   MAGNETIC BUTTONS
========================================================= */
document.querySelectorAll(".magnetic").forEach(btn => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    btn.style.transform = `translate(${x*0.18}px, ${y*0.35}px)`;
  });
  btn.addEventListener("mouseleave", () => { btn.style.transform = "translate(0,0)"; });
});

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", function(e){
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = (e.clientX - rect.left) + "px";
    ripple.style.top = (e.clientY - rect.top) + "px";
    ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + "px";
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});

/* =========================================================
   CONTACT FORM
========================================================= */
if (window.emailjs && SITE_CONFIG.EMAILJS_PUBLIC_KEY && !SITE_CONFIG.EMAILJS_PUBLIC_KEY.startsWith("YOUR_")) {
  emailjs.init(SITE_CONFIG.EMAILJS_PUBLIC_KEY);
}

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");
let lastSubmit = 0;

function showError(fieldId, message){
  const input = document.getElementById(fieldId);
  const group = input.closest(".form-group");
  const errKey = "err-" + fieldId.replace("f","").toLowerCase();
  const errorEl = document.getElementById(errKey);
  if (message){
    group.classList.add("invalid");
    if (errorEl) errorEl.textContent = message;
  } else {
    group.classList.remove("invalid");
    if (errorEl) errorEl.textContent = "";
  }
}

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  formStatus.textContent = "";
  formStatus.className = "form-status";

  const name = document.getElementById("fName").value.trim();
  const email = document.getElementById("fEmail").value.trim();
  const message = document.getElementById("fMessage").value.trim();
  const phone = document.getElementById("fPhone").value.trim();

  let valid = true;
  showError("fName", name.length < 2 ? (valid = false, "Enter your name") : "");
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  showError("fEmail", !emailOk ? (valid = false, "Enter a valid email") : "");
  showError("fMessage", message.length < 10 ? (valid = false, "Message should be at least 10 characters") : "");

  if (!valid) return;

  const now = Date.now();
  if (now - lastSubmit < SITE_CONFIG.FORM_COOLDOWN_SECONDS * 1000) {
    formStatus.textContent = "Please wait a few seconds.";
    formStatus.className = "form-status error";
    return;
  }

  const configured = window.emailjs && !SITE_CONFIG.EMAILJS_PUBLIC_KEY.startsWith("YOUR_");
  if (!configured) {
    formStatus.textContent = "Please reach out via WhatsApp or email directly.";
    formStatus.className = "form-status error";
    return;
  }

  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  try {
    await emailjs.send(SITE_CONFIG.EMAILJS_SERVICE_ID, SITE_CONFIG.EMAILJS_TEMPLATE_ID, {
      from_name: name, from_email: email, reply_to: email, phone: phone, message: message, to_name: "Tharindu Dilshan"
    });
    formStatus.textContent = "✅ Message sent! I'll get back to you soon.";
    formStatus.className = "form-status success";
    contactForm.reset();
    lastSubmit = now;
  } catch (err) {
    formStatus.textContent = "❌ Something went wrong. Please try WhatsApp.";
    formStatus.className = "form-status error";
  } finally {
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;
  }
});

/* =========================================================
   NVQ PROGRESS
========================================================= */
(function(){
  const fill = document.getElementById('nvqProgressFill');
  const label = document.getElementById('nvqProgressLabel');
  if (!fill || !label) return;
  const start = new Date('2024-01-01').getTime();
  const end = new Date('2027-12-31').getTime();
  const now = Date.now();
  let pct = ((now - start) / (end - start)) * 100;
  pct = Math.max(0, Math.min(100, pct));
  fill.style.width = pct.toFixed(0) + '%';
  label.textContent = pct >= 100 ? 'Completed' : pct.toFixed(0) + '% through the program';
})();

/* =========================================================
   STAR RATING BAR
========================================================= */
(function(){
  const bar = document.getElementById('starRatingBar');
  if (!bar) return;
  const stars = bar.querySelectorAll('.star-rating-icon');
  const hiddenInput = document.getElementById('fbRating');
  const label = document.getElementById('starRatingLabel');
  const labels = { 1: 'Poor', 2: 'Below Average', 3: 'Average', 4: 'Good', 5: 'Excellent' };

  function paint(value){
    stars.forEach(s => s.classList.toggle('active', Number(s.dataset.value) <= value));
  }
  function setValue(value){
    hiddenInput.value = value;
    paint(value);
    label.textContent = labels[value] || 'Tap to rate';
  }

  stars.forEach(star => {
    star.addEventListener('click', () => setValue(Number(star.dataset.value)));
    star.addEventListener('mouseenter', () => paint(Number(star.dataset.value)));
    star.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setValue(Number(star.dataset.value)); }
    });
  });
  bar.addEventListener('mouseleave', () => paint(Number(hiddenInput.value)));

  setValue(5);
})();

/* =========================================================
   FEEDBACK FORM
========================================================= */
const feedbackForm = document.getElementById("feedbackForm");
if (feedbackForm) {
  const fbSubmitBtn = document.getElementById("fbSubmitBtn");
  const fbFormStatus = document.getElementById("fbFormStatus");
  let fbLastSubmit = 0;

  function showFbError(fieldId, message){
    const input = document.getElementById(fieldId);
    const group = input.closest(".form-group");
    const errKey = "err-" + fieldId.replace("fb","fb").toLowerCase();
    const errorEl = document.getElementById(errKey);
    if (message){
      group.classList.add("invalid");
      if (errorEl) errorEl.textContent = message;
    } else {
      group.classList.remove("invalid");
      if (errorEl) errorEl.textContent = "";
    }
  }

  feedbackForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    fbFormStatus.textContent = "";
    fbFormStatus.className = "form-status";

    const name = document.getElementById("fbName").value.trim();
    const rating = document.getElementById("fbRating").value;
    const message = document.getElementById("fbMessage").value.trim();

    let valid = true;
    showFbError("fbName", name.length < 2 ? (valid = false, "Enter your name") : "");
    showFbError("fbMessage", message.length < 5 ? (valid = false, "Please write your feedback") : "");
    if (!valid) return;

    const now = Date.now();
    if (now - fbLastSubmit < SITE_CONFIG.FORM_COOLDOWN_SECONDS * 1000) {
      fbFormStatus.textContent = "Please wait a few seconds.";
      fbFormStatus.className = "form-status error";
      return;
    }

    const configured = window.emailjs && !SITE_CONFIG.EMAILJS_PUBLIC_KEY.startsWith("YOUR_");
    if (!configured) {
      fbFormStatus.textContent = "Feedback form isn't connected yet.";
      fbFormStatus.className = "form-status error";
      return;
    }

    fbSubmitBtn.classList.add("loading");
    fbSubmitBtn.disabled = true;

    try {
      await emailjs.send(SITE_CONFIG.EMAILJS_SERVICE_ID, SITE_CONFIG.EMAILJS_TEMPLATE_ID, {
        from_name: name,
        from_email: "no-reply@feedback.form",
        reply_to: "no-reply@feedback.form",
        phone: "",
        message: "⭐".repeat(Number(rating)) + " Rating\n\n" + message,
        to_name: "Tharindu Dilshan"
      });
      fbFormStatus.textContent = "✅ Thanks for your feedback!";
      fbFormStatus.className = "form-status success";
      feedbackForm.reset();
      fbLastSubmit = now;
    } catch (err) {
      fbFormStatus.textContent = "❌ Something went wrong. Please try again.";
      fbFormStatus.className = "form-status error";
    } finally {
      fbSubmitBtn.classList.remove("loading");
      fbSubmitBtn.disabled = false;
    }
  });
}

/* =========================================================
   VISIT COUNTER (device cookie based)
========================================================= */
(function(){
  function getCookie(name){
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
  function setCookie(name, value, days){
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/';
  }
  let count = parseInt(getCookie('td_visit_count') || '0', 10);
  count += 1;
  setCookie('td_visit_count', count, 365);
  const el = document.getElementById('visitCount');
  if (el) el.textContent = count;
})();

/* =========================================================
   ABOUT POPUP - TOUCH & CLICK HANDLERS
========================================================= */
(function(){
  const aboutPopup = document.getElementById('aboutPopup');
  const aboutPopupBox = document.querySelector('.about-popup-box');
  const aboutTriggers = document.querySelectorAll('.about-popup-trigger');
  
  // About section content
  const aboutData = {
    'Mission': {
      icon: 'fa-bullseye',
      text: 'Deliver electrical work that is safe, precise and built to last. Every installation reflects my commitment to quality and reliability.'
    },
    'Vision': {
      icon: 'fa-eye',
      text: 'Grow from field electrician into industrial automation. I\'m building expertise in modern automation systems and advanced electrical control technologies.'
    },
    'Safety-First': {
      icon: 'fa-shield-halved',
      text: 'Every task starts with isolation, testing and procedure. Safety isn\'t negotiable — it\'s the foundation of professional electrical work.'
    },
    'Continuous Learning': {
      icon: 'fa-arrows-spin',
      text: 'Formal NVQ training paired with on-the-job experience. I\'m committed to staying current with industry standards and emerging technologies.'
    }
  };
  
  // Open popup
  function openAboutPopup(title) {
    const data = aboutData[title];
    if (!data) return;
    
    const titleEl = document.getElementById('aboutPopupTitle');
    const textEl = document.getElementById('aboutPopupText');
    const iconEl = document.getElementById('aboutPopupIcon');
    
    titleEl.textContent = title;
    textEl.textContent = data.text;
    iconEl.className = 'fa-solid ' + data.icon;
    
    aboutPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  // Close popup
  function closeAboutPopup() {
    aboutPopup.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Event listeners - touch and click
  aboutTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const title = this.getAttribute('data-title');
      openAboutPopup(title);
    });
    
    trigger.addEventListener('touchend', function(e) {
      e.preventDefault();
      const title = this.getAttribute('data-title');
      openAboutPopup(title);
    });
  });
  
  // Close on overlay click
  aboutPopup.addEventListener('click', function(e) {
    if (e.target === this) {
      closeAboutPopup();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && aboutPopup.classList.contains('active')) {
      closeAboutPopup();
    }
  });
})();

/* =========================================================
   AOS + YEAR
========================================================= */
if (window.AOS) {
  const isMobileAOS = window.matchMedia('(max-width: 768px)').matches;
  AOS.init({ duration: isMobileAOS ? 450 : 700, once: true, offset: 50, easing: "ease-out-cubic" });
}
document.getElementById("year").textContent = new Date().getFullYear();
