/* =========================================================
   Classmate — shared front-end behaviour
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- nav shadow on scroll ---------- */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(el => el.classList.add('is-visible'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(el => io.observe(el));
    }

    // stagger index for children of .reveal-stagger groups
    document.querySelectorAll('.reveal-stagger').forEach(group => {
      Array.from(group.children).forEach((child, i) => {
        child.style.setProperty('--i', i);
      });
    });
  }

  /* ---------- split-flap hero ticker ---------- */
  const flap = document.getElementById('flap');
  if (flap && !reducedMotion) {
    const words = flap.dataset.words
      ? flap.dataset.words.split('|')
      : ['WhatsApp groups', 'Random PDFs', 'That 2014 college site', 'Classmate'];

    let i = 0;
    const finalWord = words[words.length - 1];

    const renderWord = (word, isFinal) => {
      flap.innerHTML = '';
      const span = document.createElement('span');
      span.className = 'flap-word flap-enter' + (isFinal ? ' is-classmate' : ' flap-strike');
      span.textContent = word;
      flap.appendChild(span);
    };

    renderWord(words[0], false);

    const tick = () => {
      i++;
      if (i >= words.length) i = 0;
      const isFinal = words[i] === finalWord;
      renderWord(words[i], isFinal);

      // pause longer on the final "Classmate" frame
      const delay = isFinal ? 2600 : 1400;
      setTimeout(tick, delay);
    };

    setTimeout(tick, 1400);
  } else if (flap) {
    // reduced motion: just show the final word, no animation
    const words = flap.dataset.words ? flap.dataset.words.split('|') : ['Classmate'];
    flap.innerHTML = `<span class="flap-word is-classmate">${words[words.length - 1]}</span>`;
  }

  /* ---------- phone parallax tilt ---------- */
  const stage = document.querySelector('.hero-stage');
  const phone = document.querySelector('.phone');
  if (stage && phone && !reducedMotion && window.matchMedia('(hover: hover)').matches) {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotY = -10 + x * 14;
      const rotX = 4 - y * 10;
      phone.style.transform = `perspective(1000px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    });
    stage.addEventListener('mouseleave', () => {
      phone.style.transform = 'perspective(1000px) rotateY(-10deg) rotateX(4deg)';
    });
  }

  /* ---------- graceful fallback for missing screenshot images ---------- */
  document.querySelectorAll('img[data-fallback-label]').forEach(img => {
    img.addEventListener('error', () => {
      const wrap = img.parentElement;
      img.remove();
      const label = document.createElement('div');
      label.className = 'img-fallback';
      label.style.cssText = `
        width:100%; height:100%; display:flex; align-items:center; justify-content:center;
        text-align:center; padding:20px; font-family:'Space Mono',monospace; font-size:12px;
        color:#5D6170; background:
          linear-gradient(135deg, rgba(255,106,69,0.10), rgba(140,124,255,0.10));
      `;
      label.textContent = img.dataset.fallbackLabel;
      wrap.appendChild(label);
    }, { once: true });
  });

});