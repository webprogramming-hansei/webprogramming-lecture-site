// 홈(index) 전용 초기화 모듈
import { debounce, smoothScrollInit, highlightCurrentSection } from './utils.js';

function initNavbarScrollStyle() {
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.backgroundColor = 'var(--bg-color)';
      navbar.style.backdropFilter = 'none';
    }
  });
}

function initObserverAnimations() {
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-on-scroll');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  const animatedElements = document.querySelectorAll('.overview-card, .evaluation-item, .tool-card, .table-row');
  animatedElements.forEach(el => observer.observe(el));
}

function initCurriculumRowClicks() {
  const rows = document.querySelectorAll('.table-row');
  rows.forEach(row => {
    row.addEventListener('click', e => {
      if (!e.target.closest('.btn')) {
        const link = row.querySelector('.btn');
        if (link) window.location.href = link.getAttribute('href');
      }
    });
    row.addEventListener('mouseenter', () => row.style.cursor = 'pointer');
    row.addEventListener('mouseleave', () => row.style.cursor = 'default');
  });
}

function initHighlightOnScroll() {
  const debouncedHighlight = debounce(highlightCurrentSection, 100);
  window.addEventListener('scroll', debouncedHighlight);
  highlightCurrentSection();
}

// 인덱스 페이지 전용: 파티클 & 카운터
function initParticleAnimation() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  const particles = [];
  const particleCount = 150;
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.radius = Math.random() * 2 + 1;
      this.opacity = Math.random();
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(79, 172, 254, ${this.opacity})`;
      ctx.fill();
    }
  }
  for (let i = 0; i < particleCount; i++) particles.push(new Particle());
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.hypot(dx, dy);
        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(79, 172, 254, ${0.3 - distance / 300})`;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

function animateCounters() {
  const counters = [
    { element: document.getElementById('students-counter'), target: 0, suffix: '+' },
    { element: document.getElementById('projects-counter'), target: 0, suffix: '+' },
    { element: document.getElementById('hours-counter'), target: 0, suffix: 'h' }
  ];
  counters.forEach(({ element, target, suffix }) => {
    if (!element) return;
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { current = target; clearInterval(timer); }
      element.textContent = Math.floor(current) + suffix;
    }, 50);
  });
}

function initDarkModeFromStorage() {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
}

export function initIndexPage() {
  smoothScrollInit(70);
  initNavbarScrollStyle();
  initObserverAnimations();
  initCurriculumRowClicks();
  initHighlightOnScroll();
  initDarkModeFromStorage();
  // 초기 애니메이션
  setTimeout(() => { document.body.style.opacity = '1'; }, 100);
  // 홈 전용
  initParticleAnimation();
  animateCounters();
}

// 자동 실행(모듈을 직접 script type="module"로 불러올 때)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initIndexPage());
} else {
  initIndexPage();
}
