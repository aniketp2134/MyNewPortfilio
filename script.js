/* ============================================================
   RUTIK BAJIRAO PATIL — PORTFOLIO SCRIPTS
   Features: Custom cursor, typing animation, scroll reveal,
             navbar, theme toggle, filter, form, particles
   ============================================================ */

'use strict';

/* ===== CUSTOM CURSOR ===== */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0,  ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Smooth ring follow
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Scale ring on hover over interactive elements
document.querySelectorAll('a, button, .project-card, .cert-card, .skill-tag').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorRing.style.width  = '56px';
    cursorRing.style.height = '56px';
    cursorRing.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.width  = '36px';
    cursorRing.style.height = '36px';
    cursorRing.style.opacity = '0.5';
  });
});


/* ===== HERO PARTICLES ===== */
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const count = window.innerWidth < 600 ? 12 : 24;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left     = Math.random() * 100 + '%';
    p.style.bottom   = '0';
    p.style.animationDuration  = (6 + Math.random() * 10) + 's';
    p.style.animationDelay     = (Math.random() * 8) + 's';
    p.style.width  = p.style.height = (1 + Math.random() * 3) + 'px';
    container.appendChild(p);
  }
}
createParticles();


/* ===== TYPING ANIMATION ===== */
const typedEl = document.getElementById('typedText');
const words   = ['Developer', 'Spring Boot', 'React.js', 'Microservices', 'Docker', 'Java 8/11/17'];
let wordIdx   = 0;
let charIdx   = 0;
let isDeleting = false;
let typingPaused = false;

function type() {
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

  const speed = typingPaused ? 80 : isDeleting ? 60 : 110;
  setTimeout(type, speed);
}
setTimeout(type, 800);


/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });


/* ===== HAMBURGER / MOBILE MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Highlight active section
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active-link', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });


/* ===== THEME TOGGLE ===== */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const body        = document.body;

// Persist theme
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
if (savedTheme === 'light') applyLight();

function applyLight() {
  body.classList.remove('dark-theme');
  body.classList.add('light-theme');
  themeIcon.className = 'fas fa-moon';
}
function applyDark() {
  body.classList.remove('light-theme');
  body.classList.add('dark-theme');
  themeIcon.className = 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
  const isLight = body.classList.contains('light-theme');
  if (isLight) { applyDark(); localStorage.setItem('portfolio-theme', 'dark'); }
  else          { applyLight(); localStorage.setItem('portfolio-theme', 'light'); }
});


/* ===== SCROLL REVEAL ===== */
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


/* ===== SKILL BARS ===== */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(fill => {
        const w = fill.getAttribute('data-width');
        fill.style.width = w + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const barsSection = document.querySelector('.proficiency-bars');
if (barsSection) barObserver.observe(barsSection);


/* ===== PROJECT FILTER ===== */
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const cats = card.getAttribute('data-category') || '';
      const matches = filter === 'all' || cats.split(' ').includes(filter);
      card.classList.toggle('hidden', !matches);
    });
  });
});


/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
const formNote    = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = contactForm.querySelector('#fname').value.trim();
    const email   = contactForm.querySelector('#femail').value.trim();
    const subject = contactForm.querySelector('#fsubject').value.trim();
    const message = contactForm.querySelector('#fmessage').value.trim();

    // Simple validation
    if (!name || !email || !subject || !message) {
      formNote.textContent = '⚠ Please fill in all fields.';
      formNote.classList.add('error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formNote.textContent = '⚠ Please enter a valid email address.';
      formNote.classList.add('error');
      return;
    }

    // Simulate send (replace with backend/EmailJS in production)
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    setTimeout(() => {
      formNote.textContent = '✓ Message sent! Rutik will get back to you shortly.';
      formNote.classList.remove('error');
      contactForm.reset();
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }, 1800);
  });
}


/* ===== BACK TO TOP ===== */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ===== RESUME DOWNLOAD (placeholder) ===== */
// const downloadBtn = document.getElementById('downloadResume');
// if (downloadBtn) {
//   downloadBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     // In production: replace '#' with actual resume PDF path, e.g. './assets/resume.pdf'
//     alert('Add your resume PDF as "resume.pdf" in the project folder and update the href to "./resume.pdf".');
//   });
// }


/* ===== SMOOTH SCROLL FOR ALL HASH LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target && this !== downloadBtn) {
      e.preventDefault();
      const offset = 70; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* ===== ACTIVE NAV LINK STYLE ===== */
const style = document.createElement('style');
style.textContent = `.nav-link.active-link { color: var(--accent); }
.nav-link.active-link::after { width: 100%; }`;
document.head.appendChild(style);


/* ===== TILT EFFECT ON PROJECT CARDS ===== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
    card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


/* ===== LAZY LOAD IMAGES (if any added later) ===== */
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
        imgObserver.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

console.log('%c👋 Hey there! Rutik Bajirao Patil — Java Full Stack Developer', 'color:#00f5d4;font-size:14px;font-weight:bold;');
console.log('%c📧 rutikp2134@gmail.com | 🔗 linkedin.com/in/rutik-patil', 'color:#8a9ec0;font-size:12px;');