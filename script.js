/* ============================================================
   RUTIK BAJIRAO PATIL — FULL STACK & DEVOPS PORTFOLIO SCRIPTS
   ============================================================ */

'use strict';

/* ===== 1. CUSTOM CURSOR ===== */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

if (cursorDot && cursorRing) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
}

/* ===== 2. HERO PARTICLES ===== */
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const count = window.innerWidth < 600 ? 10 : 22;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '0';
    p.style.animationDuration = (6 + Math.random() * 9) + 's';
    p.style.animationDelay = (Math.random() * 6) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 2.5) + 'px';
    container.appendChild(p);
  }
}
createParticles();

/* ===== 3. TYPING ANIMATION (Full Stack + DevOps Roles) ===== */
const typedEl = document.getElementById('typedText');
const words = [
  'Java Full Stack Engineer',
  'Cloud & DevOps Engineer',
  'Spring Boot + React.js',
  'Docker & CI/CD Pipelines',
  'OCI Certified Professional'
];
let wordIdx = 0, charIdx = 0, isDeleting = false, typingPaused = false;

function typeEffect() {
  if (!typedEl) return;
  const current = words[wordIdx];

  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      typingPaused = true;
      setTimeout(() => { typingPaused = false; }, 1600);
    }
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
    }
  }
  const speed = typingPaused ? 80 : isDeleting ? 45 : 95;
  setTimeout(typeEffect, speed);
}
setTimeout(typeEffect, 600);

/* ===== 4. HERO CODE WINDOW TABS ===== */
const codeTabs = document.querySelectorAll('.code-tab');
const codeBlocks = document.querySelectorAll('.code-block');

codeTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    codeTabs.forEach(t => t.classList.remove('active'));
    codeBlocks.forEach(b => b.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById('tab-' + tab.getAttribute('data-tab'));
    if (target) target.classList.add('active');
  });
});

/* ===== 5. INTERACTIVE CI/CD PIPELINE EXPLORER ===== */
const pipelineData = {
  code: {
    title: '01. Feature Branching & Clean Architecture',
    desc: 'Every feature begins with modular Java 17 / Spring Boot controller-service-repository layers and reusable React.js components managed via strict Git workflows.',
    checks: ['Git Feature Branches', 'SOLID Principles', 'REST API Contracts', 'Pull Request Reviews'],
    cmd: '$ git checkout -b feat/jwt-rbac-auth\n$ git commit -m "feat(security): add stateless JWT filter"\n$ git push origin feat/jwt-rbac-auth'
  },
  build: {
    title: '02. Automated Maven Build & API Verification',
    desc: 'Code pushes trigger automated Maven builds, Hibernate JPA schema validation, and Postman/JUnit test suites to ensure zero regressions before packaging.',
    checks: ['Maven Lifecycle', 'JUnit & Postman Tests', 'Hibernate ORM Validation', 'React Production Bundle'],
    cmd: '$ mvn clean verify -Dspring.profiles.active=test\n[INFO] Tests run: 28, Failures: 0, Errors: 0\n[INFO] BUILD SUCCESS — target/ems-service-1.0.jar'
  },
  docker: {
    title: '03. Multi-Stage Docker Containerization',
    desc: 'Applications are packaged into lightweight Alpine JRE Docker containers with non-root security users and actuator healthchecks for consistent parity across environments.',
    checks: ['Multi-Stage Dockerfile', 'Alpine Linux Base', 'Healthcheck Endpoints', 'Docker Compose'],
    cmd: '$ docker build -t rutikpatil/ems-api:latest .\n$ docker compose up -d --build\n✔ Container mysql-db       Healthy\n✔ Container spring-ems-api Started'
  },
  cloud: {
    title: '04. Oracle Cloud (OCI) DevOps Deployment',
    desc: 'Images are pushed to Oracle Cloud Infrastructure Registry (OCIR) and rolled out via automated OCI DevOps deployment pipelines with real-time log monitoring.',
    checks: ['OCI Container Registry', 'Automated Rollouts', 'Linux Server Ops', 'Zero-Downtime Releases'],
    cmd: '$ docker push ocir.ap-mumbai-1.oci.oraclecloud.com/rbp/app:v1.2\n$ oci devops deployment create --pipeline-id ocid1.devops...\n✔ Deployment Status: SUCCEEDED (ap-mumbai-1)'
  }
};

const pipelineNodes = document.querySelectorAll('.pipeline-node');
const pipelineDetails = document.getElementById('pipelineDetails');

function renderPipelineStage(stageKey) {
  if (!pipelineDetails || !pipelineData[stageKey]) return;
  const data = pipelineData[stageKey];
  pipelineDetails.innerHTML = `
    <div class="pipe-info">
      <h4>${data.title}</h4>
      <p>${data.desc}</p>
      <div class="pipe-checks">
        ${data.checks.map(c => `<span><i class="fas fa-check"></i> ${c}</span>`).join('')}
      </div>
    </div>
    <pre class="pipe-cmd"><code>${data.cmd}</code></pre>
  `;
}

pipelineNodes.forEach(node => {
  node.addEventListener('click', () => {
    pipelineNodes.forEach(n => n.classList.remove('active'));
    node.classList.add('active');
    renderPipelineStage(node.getAttribute('data-stage'));
  });
});
renderPipelineStage('code');

/* ===== 6. PROJECT ARCHITECTURE MODAL ===== */
const archData = {
  ems: {
    title: 'Smart Employee Management System — Architecture',
    steps: [
      { layer: 'Frontend Presentation Layer', detail: 'React.js SPA consuming REST endpoints via Axios interceptors that attach Bearer JWT tokens.' },
      { layer: 'Security & API Gateway Layer', detail: 'Spring Security FilterChain validating stateless HMAC-SHA256 JWT signatures and Role-Based Access Control.' },
      { layer: 'Business & Persistence Layer', detail: 'Spring Boot 3 Services + Spring Data JPA (Hibernate) managing transactions and normalized MySQL entities.' },
      { layer: 'DevOps & Delivery', detail: 'Environment variables externalized for seamless Docker containerization and MySQL volume persistence.' }
    ]
  },
  chatbot: {
    title: 'Containerized AI Voice Chatbot — Architecture',
    steps: [
      { layer: 'Voice Capture & Audio I/O', detail: 'Browser Web Speech API & audio stream piped from React UI to backend REST endpoints.' },
      { layer: 'NLP & Speech Processing', detail: 'REST service orchestrating Voice-to-Text transcription, conversational response generation, and TTS synthesis.' },
      { layer: 'Docker Containerization', detail: 'Packaged with all runtime dependencies inside an isolated Docker container exposing port 8080.' }
    ]
  },
  face: {
    title: 'Real-Time Face Verification — Architecture',
    steps: [
      { layer: 'Frame Ingestion & Preprocessing', detail: 'OpenCV captures live video frames, applying grayscale conversion, histogram equalization, and bounding-box detection.' },
      { layer: 'Deep Feature Extraction', detail: 'TensorFlow neural network generates facial embeddings and computes cosine similarity against verified records.' }
    ]
  },
  todo: {
    title: 'Dynamic Task & Workflow Manager — Architecture',
    steps: [
      { layer: 'Reactive DOM & State Engine', detail: 'Modular ES6+ JavaScript managing task CRUD, priority sorting, and status transitions.' },
      { layer: 'Hybrid Persistence', detail: 'REST API synchronization paired with automatic browser LocalStorage caching for offline resilience.' }
    ]
  }
};

const archModal = document.getElementById('archModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.btn-arch').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-project');
    const info = archData[key];
    if (!info) return;
    modalTitle.textContent = info.title;
    modalBody.innerHTML = info.steps.map(s => `
      <div class="arch-flow-step">
        <strong>${s.layer}</strong>
        <span>${s.detail}</span>
      </div>
    `).join('');
    archModal.classList.add('open');
  });
});

if (modalClose) {
  modalClose.addEventListener('click', () => archModal.classList.remove('open'));
}
if (archModal) {
  archModal.addEventListener('click', (e) => {
    if (e.target === archModal) archModal.classList.remove('open');
  });
}

/* ===== 7. NAVBAR & SMOOTH SCROLL (Fixed ReferenceError) ===== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active-link', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ===== 8. THEME TOGGLE ===== */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

if (localStorage.getItem('portfolio-theme') === 'light') {
  body.classList.replace('dark-theme', 'light-theme');
  if (themeIcon) themeIcon.className = 'fas fa-moon';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = body.classList.contains('light-theme');
    if (isLight) {
      body.classList.replace('light-theme', 'dark-theme');
      themeIcon.className = 'fas fa-sun';
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      body.classList.replace('dark-theme', 'light-theme');
      themeIcon.className = 'fas fa-moon';
      localStorage.setItem('portfolio-theme', 'light');
    }
  });
}

/* ===== 9. SCROLL REVEAL & PROJECT FILTER ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      const cats = (card.getAttribute('data-category') || '').split(' ');
      const matches = filter === 'all' || cats.includes(filter);
      card.classList.toggle('hidden', !matches);
    });
  });
});

/* ===== 10. ONE-CLICK EMAIL COPY & DIRECT MAILTO FORM ===== */
const copyEmailBtn = document.getElementById('copyEmailBtn');
const copyBtnText = document.getElementById('copyBtnText');

if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('rutikp2134@gmail.com').then(() => {
      copyBtnText.textContent = 'Copied!';
      setTimeout(() => { copyBtnText.textContent = 'Copy'; }, 2000);
    });
  });
}

const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('#fname').value.trim();
    const email = contactForm.querySelector('#femail').value.trim();
    const subject = contactForm.querySelector('#fsubject').value.trim();
    const message = contactForm.querySelector('#fmessage').value.trim();

    if (!name || !email || !subject || !message) {
      formNote.textContent = '⚠ Please complete all fields.';
      formNote.classList.add('error');
      return;
    }

    formNote.classList.remove('error');
    formNote.textContent = '✓ Opening your email client to send directly to Rutik...';

    const mailtoLink = `mailto:rutikp2134@gmail.com?subject=${encodeURIComponent(subject + ' — from ' + name)}&body=${encodeURIComponent(message + '\n\n---\nSender: ' + name + ' (' + email + ')')}`;
    window.location.href = mailtoLink;
    contactForm.reset();
  });
}

/* ===== 11. BACK TO TOP ===== */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ============================================================
   CONTINUATION OF script.js (Sections 12 – 17)
   Features: 3D Tilt Physics, Ctrl+K Command Palette,
             Live Pipeline Auto-Play, Keyboard Shortcuts
   ============================================================ */

/* ===== 12. 3D PERSPECTIVE TILT EFFECT ON CARDS ===== */
document.querySelectorAll('.project-card, .cert-card, .about-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return; // Disable tilt on touch devices
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -8;
    card.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ===== 13. CURSOR HOVER SCALING FOR NEW INTERACTIVE ELEMENTS ===== */
if (cursorRing) {
  const interactiveElements = document.querySelectorAll(
    'a, button, .project-card, .cert-card, .skill-tag, .pipeline-node, .code-tab'
  );
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.width   = '54px';
      cursorRing.style.height  = '54px';
      cursorRing.style.opacity = '0.85';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.width   = '36px';
      cursorRing.style.height  = '36px';
      cursorRing.style.opacity = '0.5';
    });
  });
}

/* ===== 14. AUTO-CYCLE DEVOPS PIPELINE (Pauses on Hover/Click) ===== */
const stageOrder = ['code', 'build', 'docker', 'cloud'];
let currentStageIdx = 0;
let pipelineTimer = null;
const pipelineContainer = document.querySelector('.pipeline-container');

function startPipelineAutoPlay() {
  pipelineTimer = setInterval(() => {
    currentStageIdx = (currentStageIdx + 1) % stageOrder.length;
    const nextStage = stageOrder[currentStageIdx];
    pipelineNodes.forEach(n => {
      n.classList.toggle('active', n.getAttribute('data-stage') === nextStage);
    });
    renderPipelineStage(nextStage);
  }, 4500);
}

if (pipelineContainer) {
  startPipelineAutoPlay();
  // Stop auto-cycling once the recruiter interacts with the pipeline
  pipelineContainer.addEventListener('mouseenter', () => clearInterval(pipelineTimer));
  pipelineContainer.addEventListener('mouseleave', () => startPipelineAutoPlay());
}

/* ===== 15. RECRUITER COMMAND PALETTE (Ctrl+K / Cmd+K) ===== */
function initCommandPalette() {
  // Inject Command Palette HTML & Styles dynamically so index.html stays clean
  const paletteStyle = document.createElement('style');
  paletteStyle.textContent = `
    .cmd-overlay {
      position: fixed; inset: 0; background: rgba(3, 6, 12, 0.8);
      backdrop-filter: blur(6px); z-index: 3000;
      display: flex; align-items: flex-start; justify-content: center;
      padding-top: 14vh; opacity: 0; visibility: hidden;
      transition: all 0.2s ease;
    }
    .cmd-overlay.open { opacity: 1; visibility: visible; }
    .cmd-box {
      width: 100%; max-width: 520px; background: var(--bg-secondary);
      border: 1px solid var(--accent); border-radius: var(--radius-md);
      box-shadow: var(--shadow-float), 0 0 40px rgba(0, 245, 212, 0.18);
      overflow: hidden; margin: 0 1rem;
    }
    .cmd-header {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 0.9rem 1.2rem; border-bottom: 1px solid var(--border-subtle);
    }
    .cmd-header i { color: var(--accent); }
    .cmd-input {
      width: 100%; background: transparent; border: none; outline: none;
      color: var(--text-primary); font-family: var(--font-mono); font-size: 0.88rem;
    }
    .cmd-list { max-height: 280px; overflow-y: auto; padding: 0.5rem; }
    .cmd-item {
      width: 100%; display: flex; align-items: center; justify-content: space-between;
      padding: 0.7rem 0.95rem; border-radius: var(--radius-sm);
      color: var(--text-secondary); font-family: var(--font-body); font-size: 0.88rem;
      text-align: left; transition: all 0.15s ease;
    }
    .cmd-item:hover { background: var(--accent-glow); color: var(--accent); }
    .cmd-item span i { width: 22px; color: var(--accent); }
    .cmd-shortcut {
      font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted);
      border: 1px solid var(--border-subtle); padding: 0.15rem 0.45rem; border-radius: 4px;
    }
    .cmd-hint-pill {
      position: fixed; bottom: 2rem; left: 2rem; z-index: 490;
      background: var(--bg-secondary); border: 1px solid var(--border-glass);
      padding: 0.45rem 0.9rem; border-radius: 100px;
      font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-secondary);
      display: flex; align-items: center; gap: 0.5rem;
      box-shadow: var(--shadow-card); cursor: pointer; transition: all 0.25s ease;
    }
    .cmd-hint-pill:hover { border-color: var(--accent); color: var(--accent); }
    .cmd-hint-pill kbd {
      background: var(--accent-glow); color: var(--accent);
      padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.68rem;
    }
    @media (max-width: 768px) { .cmd-hint-pill { display: none; } }
  `;
  document.head.appendChild(paletteStyle);

  const cmdOverlay = document.createElement('div');
  cmdOverlay.className = 'cmd-overlay';
  cmdOverlay.id = 'cmdOverlay';
  cmdOverlay.innerHTML = `
    <div class="cmd-box">
      <div class="cmd-header">
        <i class="fas fa-terminal"></i>
        <input type="text" class="cmd-input" id="cmdInput" placeholder="Type a command or jump to section..." autocomplete="off" />
        <span class="cmd-shortcut">ESC</span>
      </div>
      <div class="cmd-list" id="cmdList">
        <button class="cmd-item" data-action="resume">
          <span><i class="fas fa-file-download"></i> Download Resume (PDF)</span>
          <span class="cmd-shortcut">PDF</span>
        </button>
        <button class="cmd-item" data-action="copy-email">
          <span><i class="fas fa-copy"></i> Copy Email (rutikp2134@gmail.com)</span>
          <span class="cmd-shortcut">Copy</span>
        </button>
        <button class="cmd-item" data-action="goto" data-target="#architecture">
          <span><i class="fas fa-infinity"></i> Inspect CI/CD & DevOps Pipeline</span>
          <span class="cmd-shortcut">Jump</span>
        </button>
        <button class="cmd-item" data-action="goto" data-target="#projects">
          <span><i class="fas fa-cubes"></i> View Full Stack & Docker Projects</span>
          <span class="cmd-shortcut">Jump</span>
        </button>
        <button class="cmd-item" data-action="goto" data-target="#certifications">
          <span><i class="fas fa-certificate"></i> View Oracle Cloud (OCI) Certifications</span>
          <span class="cmd-shortcut">Jump</span>
        </button>
        <button class="cmd-item" data-action="theme">
          <span><i class="fas fa-adjust"></i> Toggle Dark / Light Theme</span>
          <span class="cmd-shortcut">Theme</span>
        </button>
        <button class="cmd-item" data-action="github">
          <span><i class="fab fa-github"></i> Open GitHub Profile</span>
          <span class="cmd-shortcut">External</span>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(cmdOverlay);

  // Floating shortcut pill in bottom-left corner for recruiters
  const hintPill = document.createElement('button');
  hintPill.className = 'cmd-hint-pill';
  hintPill.innerHTML = `<i class="fas fa-terminal"></i> Quick Actions <kbd>Ctrl K</kbd>`;
  hintPill.addEventListener('click', openCmdPalette);
  document.body.appendChild(hintPill);

  const cmdInput = document.getElementById('cmdInput');
  const cmdItems = cmdOverlay.querySelectorAll('.cmd-item');

  function openCmdPalette() {
    cmdOverlay.classList.add('open');
    cmdInput.value = '';
    cmdItems.forEach(item => item.style.display = 'flex');
    setTimeout(() => cmdInput.focus(), 50);
  }

  function closeCmdPalette() {
    cmdOverlay.classList.remove('open');
  }

  // Filter items on input
  cmdInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    cmdItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(q) ? 'flex' : 'none';
    });
  });

  // Execute actions
  cmdItems.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      closeCmdPalette();

      if (action === 'resume') {
        const link = document.getElementById('downloadResume');
        if (link) link.click();
      } else if (action === 'copy-email') {
        navigator.clipboard.writeText('rutikp2134@gmail.com');
        if (copyBtnText) {
          copyBtnText.textContent = 'Copied!';
          setTimeout(() => { copyBtnText.textContent = 'Copy'; }, 2000);
        }
      } else if (action === 'goto') {
        const target = document.querySelector(item.getAttribute('data-target'));
        if (target) {
          window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
        }
      } else if (action === 'theme' && themeToggle) {
        themeToggle.click();
      } else if (action === 'github') {
        window.open('https://github.com/rutikpatil', '_blank', 'noopener');
      }
    });
  });

  cmdOverlay.addEventListener('click', (e) => {
    if (e.target === cmdOverlay) closeCmdPalette();
  });

  // Global Keyboard Shortcuts (Ctrl+K / Cmd+K and Escape)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      cmdOverlay.classList.contains('open') ? closeCmdPalette() : openCmdPalette();
    }
    if (e.key === 'Escape') {
      closeCmdPalette();
      if (archModal) archModal.classList.remove('open');
    }
  });
}
initCommandPalette();

/* ===== 16. LAZY LOAD IMAGES ===== */
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imgObserver.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

/* ===== 17. DEVELOPER CONSOLE SIGNATURE ===== */
console.log(
  '%c⚡ Rutik Bajirao Patil — Full Stack & Cloud DevOps Engineer',
  'color:#00f5d4;background:#060a12;padding:6px 12px;border-radius:6px;font-size:13px;font-weight:bold;border:1px solid #00f5d4;'
);
console.log(
  '%c🛠 Stack: Java 17 · Spring Boot · React.js · MySQL · Docker · OCI DevOps\n📧 Contact: rutikp2134@gmail.com | Press Ctrl+K anywhere on the page for Quick Actions.',
  'color:#94a7c6;font-size:12px;line-height:1.6;'
);