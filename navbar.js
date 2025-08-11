// navbar 로드 및 초기화 함수
async function loadNavbar() {
    try {
        const response = await fetch('navbar.html');
        const navbarHTML = await response.text();
        
        // header 요소를 찾아서 navbar를 삽입
        const header = document.querySelector('header');
        if (header) {
            header.innerHTML = navbarHTML;
            customizeNavbarForPage();
            initializeNavbar();
        }
    } catch (error) {
        console.error('Navbar 로드 실패:', error);
    }
}

// 페이지별로 navbar 메뉴를 커스터마이징하는 함수
function customizeNavbarForPage() {
    const navMenu = document.getElementById('nav-menu');
    const currentPage = getCurrentPageType();
    
    if (navMenu && currentPage === 'week') {
        // 주차별 페이지에 대한 메뉴 구성
        navMenu.innerHTML = `
            <a href="index.html" class="nav-link">홈</a>
            <a href="index.html#curriculum" class="nav-link">커리큘럼</a>
            <a href="#objectives" class="nav-link">학습 목표</a>
            <a href="#content" class="nav-link">강의 내용</a>
            <a href="#activities" class="nav-link">실습 활동</a>
        `;
    }
    // index.html의 경우 기본 navbar.html 내용을 그대로 사용
}

// 현재 페이지 타입을 판별하는 함수
function getCurrentPageType() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    
    if (filename.startsWith('week') && filename.endsWith('.html')) {
        return 'week';
    } else if (filename === 'index.html' || filename === '') {
        return 'index';
    }
    return 'other';
}

// navbar 이벤트 초기화 함수
function initializeNavbar() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // 네비게이션 링크 클릭 시 모바일 메뉴 닫기
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// DOM이 로드되면 navbar 로드
document.addEventListener('DOMContentLoaded', loadNavbar);
