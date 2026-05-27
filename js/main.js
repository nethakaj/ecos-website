// ECoS Website - Modular JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initStatsCounter();
  initTabs();
  initScrollAnimations();
  initContactForm();
  setActiveNavLink();
  initScrollProgress();
  initHeroCanvas();
  initTiltCards();
  initSpotlights();
  initRevealOnScroll();
  initMarquee();
});

/* Sticky header shadow on scroll */
function initStickyHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;
  const toggle = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
}

/* Mobile menu toggle */
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav-links');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    const expanded = nav.classList.contains('open');
    btn.setAttribute('aria-expanded', expanded);
    btn.innerHTML = expanded ? '&times;' : '&#9776;';
  });
}

/* Animated stats counter */
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number[data-target]');
  if (!stats.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  stats.forEach((s) => observer.observe(s));
}

/* Tabbed UI panels (services page) */
function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tabs]');
  tabContainers.forEach((container) => {
    const buttons = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.tab-content');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.tab;
        buttons.forEach((b) => b.classList.remove('active'));
        contents.forEach((c) => c.classList.remove('active'));
        btn.classList.add('active');
        const target = container.querySelector(`#${targetId}`);
        if (target) target.classList.add('active');
      });
    });
  });
}

/* Scroll-triggered fade in animations */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach((el) => observer.observe(el));
}

/* Contact form handler */
function initContactForm() {
  const forms = document.querySelectorAll('form[data-contact-form]');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Validation
      if (!data.name || !data.email || !data.message) {
        showFormFeedback(form, 'Please fill out all required fields.', 'error');
        return;
      }

      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
      if (!emailValid) {
        showFormFeedback(form, 'Please enter a valid email address.', 'error');
        return;
      }

      // Simulate submission
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      setTimeout(() => {
        showFormFeedback(form, 'Thank you. A member of our team will contact you within one business day.', 'success');
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }, 900);
    });
  });
}

function showFormFeedback(form, message, type) {
  let feedback = form.querySelector('.form-feedback');
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.className = 'form-feedback';
    feedback.style.cssText = 'padding: 0.85rem 1rem; border-radius: 6px; margin-top: 1rem; font-weight: 500; font-size: 0.95rem;';
    form.appendChild(feedback);
  }
  feedback.textContent = message;
  if (type === 'success') {
    feedback.style.backgroundColor = '#d1fae5';
    feedback.style.color = '#047857';
    feedback.style.border = '1px solid #6ee7b7';
  } else {
    feedback.style.backgroundColor = '#fee2e2';
    feedback.style.color = '#b91c1c';
    feedback.style.border = '1px solid #fca5a5';
  }
}

/* Scroll progress bar */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  const update = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* Hero canvas — animated network of nodes */
function initHeroCanvas() {
  const canvas = document.querySelector('.hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = 0, height = 0, nodes = [], rafId = null;
  const NODE_COUNT = 55;
  const LINK_DISTANCE = 140;

  const resize = () => {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = rect.width * window.devicePixelRatio;
    height = canvas.height = rect.height * window.devicePixelRatio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
  };

  const seed = () => {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4 * window.devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.4 * window.devicePixelRatio,
        r: (Math.random() * 1.5 + 0.5) * window.devicePixelRatio,
      });
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    const linkDist = LINK_DISTANCE * window.devicePixelRatio;

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < linkDist) {
          const alpha = (1 - dist / linkDist) * 0.35;
          ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
          ctx.lineWidth = 1 * window.devicePixelRatio;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      ctx.fillStyle = 'rgba(165, 243, 252, 0.85)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    rafId = requestAnimationFrame(draw);
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  resize();
  seed();
  draw();

  window.addEventListener('resize', () => {
    if (rafId) cancelAnimationFrame(rafId);
    resize();
    seed();
    draw();
  });
}

/* 3D tilt effect on cards */
function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -6;
      const ry = ((x - cx) / cx) * 6;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* Cursor spotlight on dark sections */
function initSpotlights() {
  const sections = document.querySelectorAll('.spotlight');
  sections.forEach((s) => {
    s.addEventListener('mousemove', (e) => {
      const rect = s.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      s.style.setProperty('--mx', x + '%');
      s.style.setProperty('--my', y + '%');
    });
  });
}

/* Reveal elements on scroll (with stagger) */
function initRevealOnScroll() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => observer.observe(el));
}

/* Marquee — duplicate content for seamless loop */
function initMarquee() {
  const tracks = document.querySelectorAll('.marquee-track');
  tracks.forEach((track) => {
    if (track.dataset.cloned === 'true') return;
    const clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    while (clone.firstChild) {
      track.appendChild(clone.firstChild);
    }
    track.dataset.cloned = 'true';
  });
}

/* Highlight active page in nav */
function setActiveNavLink() {
  const links = document.querySelectorAll('.nav-link');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
