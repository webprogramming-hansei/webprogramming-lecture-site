// Navbar 모듈
export async function loadNavbar() {
  try {
  // Resolve correct navbar path based on current page location
  const pageType = getCurrentPageType();
  const navbarPath = pageType === 'week' ? '../navbar.html' : 'navbar.html';
  const response = await fetch(navbarPath);
    const navbarHTML = await response.text();
    const header = document.querySelector('header');
    if (header) {
      header.innerHTML = navbarHTML;
  // After injecting HTML, normalize logo paths based on page depth
  updateNavLogoForPage();
      customizeNavbarForPage();
      initializeNavbar();
    }
  } catch (error) {
    console.error('Navbar 로드 실패:', error);
  }
}

export function getCurrentPageType() {
  const path = window.location.pathname;
  const filename = path.substring(path.lastIndexOf('/') + 1);
  if (filename.startsWith('week') && filename.endsWith('.html')) return 'week';
  if (filename === 'index.html' || filename === '') return 'index';
  return 'other';
}

function customizeNavbarForPage() {
  const navMenu = document.getElementById('nav-menu');
  const currentPage = getCurrentPageType();
  if (navMenu && currentPage === 'week') {
    navMenu.innerHTML = `
      <a href="../index.html" class="nav-link">홈</a>
      <a href="../index.html#curriculum" class="nav-link">커리큘럼</a>
      <a href="#objectives" class="nav-link">학습 목표</a>
      <a href="#content" class="nav-link">강의 내용</a>
      <a href="#activities" class="nav-link">실습 활동</a>
    `;
  }
}

function updateNavLogoForPage() {
  const pageType = getCurrentPageType();
  const logoLink = document.querySelector('.nav-logo a');
  const logoImg = document.querySelector('.nav-logo img');
  if (!logoLink || !logoImg) return;

  if (pageType === 'week') {
    logoLink.setAttribute('href', '../index.html');
    logoImg.setAttribute('src', '../logo.svg');
  } else {
    logoLink.setAttribute('href', 'index.html');
    logoImg.setAttribute('src', 'logo.svg');
  }
}

function initializeNavbar() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }
}
