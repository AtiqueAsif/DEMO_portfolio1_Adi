// ===== main.js – all functionality merged =====

document.addEventListener('DOMContentLoaded', function () {
  // ---------- 1. LOADING SCREEN (fast sequential reveal) ----------
  const loadingScreen = document.getElementById('loading-screen');
  const elements = [
    document.querySelector('.main-icon'),
    document.querySelector('#loading-text'),
    ...document.querySelectorAll('.sub-icons i'),
    document.querySelector('#designer-text')
  ];

  elements.forEach((el, index) => {
    setTimeout(() => {
      if (el) el.classList.remove('hidden');
      if (index === 1 && el) {
        setTimeout(() => {
          el.style.animation = 'glitch 0.8s steps(2) infinite';
        }, 300);
      }
    }, index * 150);
  });

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 3000);

  // ---------- 2. DARK MODE TOGGLE ----------
  const themeToggle = document.getElementById('themeToggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  let currentTheme = localStorage.getItem('theme');

  if (!currentTheme) {
    currentTheme = prefersDarkScheme.matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', currentTheme);

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => { document.body.style.transition = ''; }, 300);
  }

  themeToggle.addEventListener('click', toggleTheme);

  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });

  // ---------- 3. NAVIGATION (smooth scroll + active class) ----------
  const navLinks = document.querySelectorAll('.ul-list li a');
  const sections = document.querySelectorAll('section');

  function removeActive() {
    navLinks.forEach(link => link.parentElement.classList.remove('active'));
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
      removeActive();
      link.parentElement.classList.add('active');
    });
  });

  // ---------- 4. SCROLL ACTIVE + REVEAL + BACK TO TOP ----------
  const revealElements = document.querySelectorAll(
    '.home-container, .about-container, .projects-container, .services-container, .contact-content'
  );
  revealElements.forEach(el => el.classList.add('reveal'));

  const backToTop = document.createElement('div');
  backToTop.id = 'back-to-top';
  backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
  document.body.appendChild(backToTop);

  backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
  backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        removeActive();
        const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
        if (activeLink) activeLink.parentElement.classList.add('active');
      }
    });

    if (window.scrollY > 500) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }

    revealElements.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 150;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('active-reveal');
      }
    });
  });

  // ---------- 5. CARD HOVER EFFECTS ----------
  const cards = document.querySelectorAll('.project-card, .c1, .service-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ---------- 6. TYPING ANIMATION ----------
  const typingElement = document.querySelector('.info-home h3');
  if (typingElement) {
    const words = ['UI/UX Designer', 'SEO Content Writer', 'AI Handling', 'Web Developer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;

    function type() {
      const currentWord = words[wordIndex];
      let displayedText = currentWord.substring(0, charIndex);
      typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

      if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, typingSpeed / 2);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
          wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
      }
    }
    type();
  }

  // ---------- 7. FALLBACK cleanup ----------
  setTimeout(() => {
    document.querySelectorAll('.hidden').forEach(el => el.classList.remove('hidden'));
  }, 3500);
});