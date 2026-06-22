// ─── SCROLL REVEAL ───
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = parseInt(entry.target.dataset.delay || '0');
    setTimeout(() => entry.target.classList.add('revealed'), delay);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Trigger hero reveals immediately
document.querySelectorAll('#hero [data-reveal]').forEach(el => {
  const delay = parseInt(el.dataset.delay || '0') + 300;
  setTimeout(() => el.classList.add('revealed'), delay);
});

// ─── PARALLAX (hero portrait) ───
const portrait = document.getElementById('heroPortrait');
if (portrait) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const rect = portrait.getBoundingClientRect();
      const vpCenter = window.innerHeight / 2;
      const elCenter = rect.top + rect.height / 2;
      const offset = (elCenter - vpCenter) * 0.16;
      portrait.style.transform = `translateY(calc(-50% + ${offset}px))`;
      ticking = false;
    });
  }, { passive: true });
}

// ─── MAGNETIC BUTTON ───
const magneticBtn = document.getElementById('magneticBtn');
if (magneticBtn) {
  magneticBtn.addEventListener('mousemove', (e) => {
    const rect = magneticBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    magneticBtn.style.transform = `translate(${dx * 0.28}px, ${dy * 0.4}px)`;
  });
  magneticBtn.addEventListener('mouseleave', () => {
    magneticBtn.style.transform = 'translate(0, 0)';
    magneticBtn.style.transition = 'transform 0.5s cubic-bezier(.16,1,.3,1), box-shadow 0.3s ease';
    setTimeout(() => { magneticBtn.style.transition = ''; }, 500);
  });
}
