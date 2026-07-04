/* =========================================================
   CONFIG — update these with your real details
========================================================= */
const SITE_CONFIG = {
  WHATSAPP_NUMBER: "94770000000", // Sri Lanka format, no + or leading 0
  EMAIL: "hello.tharindudilshan@gmail.com",
  GITHUB_URL: "https://github.com/dbt-dilshan",
  FACEBOOK_URL: "#",
  INSTAGRAM_URL: "#",
  CV_PATH: "assets/Tharindu_Dilshan_CV.pdf"
};

/* =========================================================
   LOADER
========================================================= */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hidden"), 1300);
});

/* =========================================================
   NAVBAR
========================================================= */
const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("navLinks");
const hamburger = document.getElementById("hamburger");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
  backToTop.classList.toggle("visible", window.scrollY > 500);
  updateActiveLink();
});

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("active");
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  hamburger.classList.remove("active");
}));
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const sections = document.querySelectorAll("main .section, .hero");
function updateActiveLink() {
  let current = "home";
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.id;
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}

/* =========================================================
   THEME TOGGLE
========================================================= */
const themeSwitch = document.getElementById("themeSwitch");
const html = document.documentElement;
const savedTheme = localStorage.getItem("td-theme");
if (savedTheme) html.setAttribute("data-theme", savedTheme);

function setThemeIcon() {
  const isLight = html.getAttribute("data-theme") === "light";
  themeSwitch.querySelector(".switch-thumb i").className = isLight ? "fa-solid fa-sun" : "fa-solid fa-moon";
}
setThemeIcon();

themeSwitch.addEventListener("click", () => {
  const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
  html.setAttribute("data-theme", next);
  localStorage.setItem("td-theme", next);
  setThemeIcon();
  if (navigator.vibrate) navigator.vibrate(6);
});

/* =========================================================
   CIRCUIT BACKGROUND CANVAS (hero signature animation)
========================================================= */
const canvas = document.getElementById("circuitCanvas");
const ctx = canvas.getContext("2d");
let W, H, nodes = [], pulses = [];

function resizeCanvas() {
  W = canvas.width = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
  buildGrid();
}

function buildGrid() {
  nodes = [];
  const cols = Math.max(6, Math.floor(W / 130));
  const rows = Math.max(4, Math.floor(H / 130));
  const spacingX = W / cols, spacingY = H / rows;
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      if (Math.random() > 0.55) {
        nodes.push({
          x: i * spacingX + (Math.random() - 0.5) * 30,
          y: j * spacingY + (Math.random() - 0.5) * 30
        });
      }
    }
  }
  pulses = [];
  for (let i = 0; i < 10; i++) spawnPulse();
}

function nearestNodes(node, count) {
  return nodes
    .filter(n => n !== node)
    .map(n => ({ n, d: Math.hypot(n.x - node.x, n.y - node.y) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, count)
    .map(o => o.n);
}

function spawnPulse() {
  if (nodes.length < 2) return;
  const start = nodes[Math.floor(Math.random() * nodes.length)];
  const targets = nearestNodes(start, 3);
  const end = targets[Math.floor(Math.random() * targets.length)];
  if (!end) return;
  pulses.push({ start, end, t: 0, speed: 0.006 + Math.random() * 0.006 });
}

const isLight = () => document.documentElement.getAttribute("data-theme") === "light";

function drawCircuit() {
  ctx.clearRect(0, 0, W, H);
  const lineColor = isLight() ? "rgba(15,20,32,0.08)" : "rgba(255,255,255,0.06)";
  const nodeColor = isLight() ? "rgba(15,20,32,0.18)" : "rgba(255,255,255,0.18)";

  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 1;
  nodes.forEach(node => {
    nearestNodes(node, 2).forEach(other => {
      ctx.beginPath();
      ctx.moveTo(node.x, node.y);
      ctx.lineTo(other.x, node.y);
      ctx.lineTo(other.x, other.y);
      ctx.stroke();
    });
  });

  ctx.fillStyle = nodeColor;
  nodes.forEach(n => {
    ctx.beginPath();
    ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  pulses.forEach((p, idx) => {
    p.t += p.speed;
    if (p.t >= 1) { pulses.splice(idx, 1); spawnPulse(); return; }
    const x = p.start.x + (p.end.x - p.start.x) * p.t;
    const y = p.start.y === p.end.y ? p.start.y : p.start.y + (p.end.y - p.start.y) * p.t;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, 7);
    grad.addColorStop(0, "#ff8a3d");
    grad.addColorStop(1, "rgba(255,138,61,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#4fd1ff";
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  while (pulses.length < 10) spawnPulse();
  requestAnimationFrame(drawCircuit);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
requestAnimationFrame(drawCircuit);

/* =========================================================
   DATA — SERVICES
========================================================= */
const SERVICES = [
  { icon: "fa-code", title: "Web Development", desc: "Fast, responsive, modern websites built with clean HTML, CSS and JavaScript — from single landing pages to full multi-section sites." },
  { icon: "fa-swatchbook", title: "Business Branding Design", desc: "Logos, color systems and visual identity that make a small business look established from day one." },
  { icon: "fa-bolt", title: "Electrical Business Digital Solutions", desc: "Websites and digital presence for electrical & technical service businesses, built through REVO TECH SOLUTION." },
  { icon: "fa-mobile-screen-button", title: "Mobile Shop Branding & Marketing", desc: "Storefront branding, product showcases and social media assets for mobile phone retailers, built through NEXA MOBILE." }
];

const servicesGrid = document.getElementById("servicesGrid");
SERVICES.forEach((s, i) => {
  const card = document.createElement("div");
  card.className = "service-card glass-card";
  card.setAttribute("data-aos", "fade-up");
  card.setAttribute("data-aos-delay", i * 80);
  card.innerHTML = `<div class="service-icon"><i class="fa-solid ${s.icon}"></i></div><h3>${s.title}</h3><p>${s.desc}</p>`;
  servicesGrid.appendChild(card);
});

/* =========================================================
   DATA — PROJECTS
========================================================= */
const PROJECTS = [
  {
    title: "REVO TECH SOLUTION", filter: "brand", thumb: "thumb-revo", icon: "fa-bolt",
    desc: "Brand identity and web presence for my electrical & technology services business — built to turn visitors into service enquiries.",
    tags: ["Branding", "Web Design", "Business"], demo: "#", github: "#"
  },
  {
    title: "NEXA MOBILE", filter: "brand", thumb: "thumb-nexa", icon: "fa-mobile-screen-button",
    desc: "Branding and digital marketing assets for my mobile phone sales & service shop, including product showcase pages.",
    tags: ["Branding", "Marketing", "Business"], demo: "#", github: "#"
  },
  {
    title: "Personal Portfolio", filter: "web", thumb: "thumb-folio", icon: "fa-user-astronaut",
    desc: "This site — a single-file, dependency-light portfolio deployed on GitHub Pages with a dark/light theme system.",
    tags: ["HTML/CSS/JS", "GitHub Pages"], demo: "#", github: "#"
  },
  {
    title: "Landing Page Template", filter: "web", thumb: "thumb-land", icon: "fa-layer-group",
    desc: "A reusable, responsive landing page template built for small businesses that need to launch quickly.",
    tags: ["Template", "Responsive"], demo: "#", github: "#"
  }
];

const projectsGrid = document.getElementById("projectsGrid");
function renderProjects(filter = "all") {
  projectsGrid.innerHTML = "";
  PROJECTS.filter(p => filter === "all" || p.filter === filter).forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "project-card glass-card";
    card.setAttribute("data-aos", "zoom-in");
    card.setAttribute("data-aos-delay", (i % 2) * 100);
    card.innerHTML = `
      <div class="project-thumb ${p.thumb}"><i class="fa-solid ${p.icon}"></i></div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
        <div class="project-links">
          <a href="${p.demo}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>
          <a href="${p.github}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> GitHub</a>
        </div>
      </div>`;
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

/* =========================================================
   DATA — SKILLS
========================================================= */
const SKILLS = [
  { name: "Frontend Development", level: 88 },
  { name: "UI/UX Design", level: 78 },
  { name: "GitHub & Deployment", level: 90 },
  { name: "Business Branding", level: 82 },
  { name: "Responsive Design", level: 92 },
  { name: "Digital Marketing", level: 74 }
];

const skillsGrid = document.getElementById("skillsGrid");
SKILLS.forEach((s, i) => {
  const item = document.createElement("div");
  item.className = "skill-item";
  item.setAttribute("data-aos", "fade-up");
  item.setAttribute("data-aos-delay", i * 60);
  item.innerHTML = `
    <div class="skill-top"><span>${s.name}</span><span class="skill-pct">${s.level}%</span></div>
    <div class="skill-bar"><div class="skill-fill" data-level="${s.level}"></div></div>`;
  skillsGrid.appendChild(item);
});

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".skill-fill").forEach((fill, i) => {
        setTimeout(() => { fill.style.width = fill.dataset.level + "%"; }, i * 60);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillObserver.observe(skillsGrid);

/* =========================================================
   DATA — EXPERIENCE / TIMELINE
========================================================= */
const TIMELINE = [
  { title: "Founder, REVO TECH SOLUTION", meta: "Ongoing", desc: "Running and marketing an electrical & technology services brand, from client outreach to digital presence." },
  { title: "Founder, NEXA MOBILE", meta: "Ongoing", desc: "Operating a mobile phone sales & service business with a branded storefront and social media presence." },
  { title: "Freelance Web Developer", meta: "Ongoing", desc: "Designing and building responsive websites and landing pages for individuals and small businesses." },
  { title: "GitHub Pages Deployment", meta: "Ongoing", desc: "Hosting and maintaining production websites directly through GitHub Pages, including custom domains and asset optimization." }
];

const timeline = document.getElementById("timeline");
TIMELINE.forEach((t, i) => {
  const item = document.createElement("div");
  item.className = "timeline-item";
  item.setAttribute("data-aos", "fade-up");
  item.setAttribute("data-aos-delay", i * 80);
  item.innerHTML = `<span class="timeline-meta">${t.meta}</span><h3>${t.title}</h3><p>${t.desc}</p>`;
  timeline.appendChild(item);
});

/* =========================================================
   MAGNETIC BUTTONS + RIPPLE
========================================================= */
document.querySelectorAll(".magnetic").forEach(btn => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.3}px)`;
  });
  btn.addEventListener("mouseleave", () => { btn.style.transform = "translate(0,0)"; });
});

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", function (e) {
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
   CONTACT FORM VALIDATION
   No backend configured — shows a friendly message and points
   to WhatsApp/email. Wire up EmailJS or your own endpoint by
   replacing the try block below.
========================================================= */
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

function showError(id, message) {
  const input = document.getElementById(id);
  const group = input.closest(".form-group");
  const errorEl = document.getElementById("err-" + id.replace("f", "").toLowerCase());
  if (message) {
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
  const subject = document.getElementById("fSubject").value.trim();
  const message = document.getElementById("fMessage").value.trim();

  let valid = true;
  if (name.length < 2) { showError("fName", "Please enter your name"); valid = false; } else showError("fName", "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError("fEmail", "Enter a valid email address"); valid = false; } else showError("fEmail", "");
  if (subject.length < 2) { showError("fSubject", "Please add a short subject"); valid = false; } else showError("fSubject", "");
  if (message.length < 10) { showError("fMessage", "Message should be at least 10 characters"); valid = false; } else showError("fMessage", "");

  if (!valid) return;

  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  await new Promise(res => setTimeout(res, 900));

  const mailBody = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:${SITE_CONFIG.EMAIL}?subject=${encodeURIComponent(subject)}&body=${mailBody}`;

  formStatus.textContent = "✅ Opening your email app to send this message.";
  formStatus.className = "form-status success";
  submitBtn.classList.remove("loading");
  submitBtn.disabled = false;
  contactForm.reset();
});

/* =========================================================
   AOS INIT + YEAR
========================================================= */
if (window.AOS) AOS.init({ duration: 700, once: true, offset: 40, easing: "ease-out-cubic" });
document.getElementById("year").textContent = new Date().getFullYear();
