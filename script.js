// 모바일 네비게이션 토글 기능
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 햄버거 메뉴 토글
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 네비게이션 링크 클릭시 메뉴 닫기
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 부드러운 스크롤 기능
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // 네비게이션 높이만큼 오프셋
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 스크롤에 따른 네비게이션 스타일 변경
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'var(--bg-color)';
            navbar.style.backdropFilter = 'none';
        }
    });

    // 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 애니메이션할 요소들 관찰
    const animatedElements = document.querySelectorAll('.overview-card, .evaluation-item, .tool-card, .table-row');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // 커리큘럼 테이블 행 클릭 이벤트
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach(row => {
        row.addEventListener('click', function(e) {
            // 버튼 클릭이 아닌 경우에만 실행
            if (!e.target.closest('.btn')) {
                const week = this.dataset.week;
                const weekLink = this.querySelector('.btn');
                if (weekLink) {
                    window.location.href = weekLink.getAttribute('href');
                }
            }
        });

        // 마우스 호버 효과
        row.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });

        row.addEventListener('mouseleave', function() {
            this.style.cursor = 'default';
        });
    });

    // 동적 콘텐츠 로딩 (필요시 확장 가능)
    function loadWeekContent(week) {
        // 추후 AJAX나 Fetch API를 사용하여 동적으로 콘텐츠 로딩 가능
        console.log(`Loading content for week ${week}`);
    }

    // 키보드 네비게이션 지원
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // 성능 최적화를 위한 디바운스 함수
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 윈도우 리사이즈 이벤트 처리
    const handleResize = debounce(function() {
        // 모바일에서 데스크톱으로 전환시 메뉴 상태 초기화
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }, 250);

    window.addEventListener('resize', handleResize);

    // 로딩 완료 후 초기 애니메이션 실행
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // 다크 모드 토글 (향후 확장 가능)
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    }

    // 로컬 스토리지에서 다크 모드 설정 확인
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // 현재 페이지 섹션 하이라이트
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // 스크롤 이벤트에 현재 섹션 하이라이트 추가
    const debouncedHighlight = debounce(highlightCurrentSection, 100);
    window.addEventListener('scroll', debouncedHighlight);

    // 페이지 로드 시 초기 하이라이트
    highlightCurrentSection();

    console.log('웹프로그래밍 강의 웹사이트가 성공적으로 로드되었습니다.');
});
