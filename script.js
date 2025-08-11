// 전역 기능들
document.addEventListener('DOMContentLoaded', function() {
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
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = 'var(--bg-color)';
                navbar.style.backdropFilter = 'none';
            }
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

    // 인라인 스크립트에서 이동: 파티클 애니메이션 및 카운터 초기화
    initParticleAnimation();
    animateCounters();
});

// 인라인 스크립트에서 이동: 파티클 애니메이션
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
            this.x += this.vx;
            this.y += this.vy;

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

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // 파티클 간 연결선 그리기
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

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

// 인라인 스크립트에서 이동: 카운터 애니메이션
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
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 50);
    });
}
