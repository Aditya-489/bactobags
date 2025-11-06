// Basic interactivity: nav toggle, smooth scroll, counters, accordion, forms

document.addEventListener('DOMContentLoaded', function () {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav toggle (mobile)
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('show');
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navList) { navList.classList.remove('show'); navToggle && navToggle.setAttribute('aria-expanded', 'false'); }
      }
    });
  });

  // Counters (animate when visible)
  const counters = document.querySelectorAll('.count');
  const counterOptions = { root: null, rootMargin: '0px', threshold: 0.5 };

  function animateCounter(el, target) {
    const duration = 1800;
    const start = 0;
    const startTime = performance.now();
    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * (target - start) + start);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const t = parseInt(el.getAttribute('data-target'), 10) || 0;
        if (!el.dataset.started) {
          animateCounter(el, t);
          el.dataset.started = 'true';
        }
      }
    });
  }, counterOptions);

  counters.forEach(c => observer.observe(c));

  // Accordion FAQ
  const accs = document.querySelectorAll('.accordion');
  accs.forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      const open = panel.style.display === 'block';
      // close all
      document.querySelectorAll('.panel').forEach(p => p.style.display = 'none');
      if (!open) panel.style.display = 'block';
      window.scrollTo({ top: btn.offsetTop - 110, behavior: 'smooth' });
    });
  });

  
  // Contact sales (example)
  const contactBtn = document.getElementById('contact-team');
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      window.location.href = 'mailto:hello@earthbags.eco?subject=Sales%20Inquiry';
    });
  }

  // Datasheet download
  const dsBtn = document.getElementById('download-datasheet');
  if (dsBtn) {
    dsBtn.addEventListener('click', () => {
      // put your datasheet at images/datasheet.pdf or adjust path
      window.open('images/datasheet.pdf', '_blank');
    });
  }

  // Simple intersection reveal animations (fade-in)
  const reveals = document.querySelectorAll('.card, .metric, .case, .testimonial, .media-card, .solution-media');
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = 1;
        e.target.style.transform = 'translateY(0)';
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(r => {
    r.style.opacity = 0;
    r.style.transform = 'translateY(12px)';
    r.style.transition = 'opacity 650ms ease, transform 650ms ease';
    revObs.observe(r);
  });

});
function toggleCase(id) {
  const el = document.getElementById(id);
  el.classList.toggle('open');
}
