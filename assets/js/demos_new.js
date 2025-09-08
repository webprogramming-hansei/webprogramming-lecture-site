// Demo Gallery JavaScript - 모듈화된 버전
import { GameDemos } from './demos/games.js';
import { ThreeDemos } from './demos/3d.js';
import { D3Demos } from './demos/d3.js';
import { CanvasDemos } from './demos/canvas.js';
import { AnimationDemos } from './demos/animation.js';

class DemoGallery {
    constructor() {
        this.currentCategory = 'games';
        this.demos = {
            games: [
                {
                    id: 'tic-tac-toe',
                    title: '틱택토 게임',
                    description: '클래식 틱택토 게임. JavaScript로 구현된 간단한 턴 기반 게임입니다.',
                    tech: ['JavaScript', 'HTML5', 'CSS3'],
                    difficulty: '초급',
                    init: (container) => GameDemos.initTicTacToe(container)
                },
                {
                    id: 'snake-game',
                    title: '스네이크 게임',
                    description: 'Canvas를 활용한 고전적인 스네이크 게임. 키보드 컨트롤로 뱀을 조종하세요.',
                    tech: ['Canvas', 'JavaScript', '게임 루프'],
                    difficulty: '중급',
                    init: (container) => GameDemos.initSnakeGame(container)
                },
                {
                    id: 'pong-game',
                    title: '퐁 게임',
                    description: '두 명이서 즐기는 클래식 퐁 게임. 패들과 공의 물리 엔진 구현.',
                    tech: ['Canvas', '물리 엔진', '실시간 게임'],
                    difficulty: '중급',
                    init: (container) => GameDemos.initPongGame(container)
                }
            ],
            '3d': [
                {
                    id: 'rotating-cube',
                    title: '회전하는 큐브',
                    description: 'Three.js를 활용한 3D 큐브 애니메이션. WebGL 기반 3D 그래픽스.',
                    tech: ['Three.js', 'WebGL', '3D 그래픽스'],
                    difficulty: '중급',
                    init: (container) => ThreeDemos.initRotatingCube(container)
                },
                {
                    id: 'particle-system',
                    title: '파티클 시스템',
                    description: '수천 개의 파티클로 구성된 입자 효과. GPU 가속 3D 렌더링.',
                    tech: ['Three.js', 'Shaders', 'GPU 컴퓨팅'],
                    difficulty: '고급',
                    init: (container) => ThreeDemos.initParticleSystem(container)
                },
                {
                    id: '3d-model-viewer',
                    title: '3D 모델 뷰어',
                    description: 'GLTF 포맷의 3D 모델을 로드하고 조작할 수 있는 뷰어.',
                    tech: ['Three.js', 'GLTF', '3D 모델링'],
                    difficulty: '고급',
                    init: (container) => ThreeDemos.initModelViewer(container)
                }
            ],
            d3: [
                {
                    id: 'bar-chart',
                    title: '막대 차트',
                    description: 'D3.js를 활용한 인터랙티브 막대 차트. 데이터 시각화의 기초.',
                    tech: ['D3.js', 'SVG', '데이터 시각화'],
                    difficulty: '초급',
                    init: (container) => D3Demos.initBarChart(container)
                },
                {
                    id: 'line-chart',
                    title: '선 그래프',
                    description: '시간에 따른 데이터 변화를 보여주는 선 그래프. 애니메이션 효과 포함.',
                    tech: ['D3.js', 'SVG', '애니메이션'],
                    difficulty: '중급',
                    init: (container) => D3Demos.initLineChart(container)
                },
                {
                    id: 'force-directed',
                    title: '포스 다이어그램',
                    description: '노드와 링크로 구성된 네트워크 그래프. 물리 시뮬레이션 기반.',
                    tech: ['D3.js', '포스 레이아웃', '네트워크 그래프'],
                    difficulty: '고급',
                    init: (container) => D3Demos.initForceDirected(container)
                }
            ],
            canvas: [
                {
                    id: 'drawing-app',
                    title: '드로잉 앱',
                    description: '마우스로 그림을 그릴 수 있는 캔버스 기반 드로잉 애플리케이션.',
                    tech: ['Canvas 2D', '마우스 이벤트', '색상 피커'],
                    difficulty: '초급',
                    init: (container) => CanvasDemos.initDrawingApp(container)
                },
                {
                    id: 'image-manipulation',
                    title: '이미지 조작',
                    description: 'Canvas를 활용한 이미지 필터와 효과 적용. 픽셀 단위 조작.',
                    tech: ['Canvas 2D', '이미지 프로세싱', '필터'],
                    difficulty: '중급',
                    init: (container) => CanvasDemos.initImageManipulation(container)
                }
            ],
            animation: [
                {
                    id: 'css-animations',
                    title: 'CSS 애니메이션',
                    description: 'CSS keyframes를 활용한 다양한 애니메이션 효과들.',
                    tech: ['CSS3', 'Keyframes', '애니메이션'],
                    difficulty: '초급',
                    init: (container) => AnimationDemos.initCssAnimations(container)
                },
                {
                    id: 'web-animations',
                    title: 'Web Animations API',
                    description: 'JavaScript Web Animations API를 활용한 고성능 애니메이션.',
                    tech: ['Web Animations API', 'JavaScript', '성능 최적화'],
                    difficulty: '중급',
                    init: (container) => AnimationDemos.initWebAnimations(container)
                },
                {
                    id: 'particle-animation',
                    title: '파티클 애니메이션',
                    description: 'Canvas 기반 파티클 시스템으로 생성되는 동적 애니메이션 효과.',
                    tech: ['Canvas 2D', '파티클 시스템', '물리 시뮬레이션'],
                    difficulty: '고급',
                    init: (container) => AnimationDemos.initParticleSystem(container)
                }
            ]
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderDemos();
    }

    setupEventListeners() {
        // 카테고리 탭 이벤트
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchCategory(e.target.dataset.category);
            });
        });

        // 모달 닫기 이벤트
        document.querySelector('.close-btn').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('demo-modal').addEventListener('click', (e) => {
            if (e.target.id === 'demo-modal') {
                this.closeModal();
            }
        });
    }

    switchCategory(category) {
        this.currentCategory = category;

        // 탭 활성화 상태 변경
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });

        this.renderDemos();
    }

    renderDemos() {
        const grid = document.getElementById('demos-grid');
        const categoryDemos = this.demos[this.currentCategory];

        grid.innerHTML = categoryDemos.map(demo => `
            <div class="demo-card" data-demo-id="${demo.id}">
                <div class="demo-preview">
                    <div class="demo-icon">${this.getCategoryIcon(this.currentCategory)}</div>
                </div>
                <div class="demo-info">
                    <h3 class="demo-title">${demo.title}</h3>
                    <p class="demo-description">${demo.description}</p>
                    <div class="demo-meta">
                        <div class="demo-tech">
                            ${demo.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <div class="demo-difficulty ${demo.difficulty.toLowerCase()}">
                            ${demo.difficulty}
                        </div>
                    </div>
                </div>
                <div class="demo-actions">
                    <button class="demo-btn primary" onclick="window.demoGallery.openDemo('${demo.id}')">
                        체험하기
                    </button>
                </div>
            </div>
        `).join('');
    }

    getCategoryIcon(category) {
        const icons = {
            games: '🎮',
            '3d': '🎲',
            d3: '📊',
            canvas: '🎨',
            animation: '✨'
        };
        return icons[category] || '📁';
    }

    openDemo(demoId) {
        const demo = this.findDemoById(demoId);
        if (!demo) return;

        const modal = document.getElementById('demo-modal');
        const title = document.getElementById('demo-title');
        const container = document.getElementById('demo-container');

        title.textContent = demo.title;
        container.innerHTML = '';

        // 데모 초기화
        demo.init(container);

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('demo-modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';

        // 데모 정리 (필요한 경우)
        const container = document.getElementById('demo-container');
        // 여기에 데모 정리 로직 추가 가능
    }

    findDemoById(demoId) {
        for (const category in this.demos) {
            const demo = this.demos[category].find(d => d.id === demoId);
            if (demo) return demo;
        }
        return null;
    }
}

// 전역 함수들 (모달에서 호출하기 위해)
window.startBounce = () => AnimationDemos.startBounceAnimation();
window.startRotate = () => AnimationDemos.startRotateAnimation();
window.startPulse = () => AnimationDemos.startPulseAnimation();
window.startShake = () => AnimationDemos.startShakeAnimation();
window.stopAnimation = () => AnimationDemos.stopCssAnimation();

window.startKeyframe = () => AnimationDemos.startKeyframeAnimation();
window.startSequence = () => AnimationDemos.startSequenceAnimation();
window.startParallel = () => AnimationDemos.startParallelAnimation();
window.startMorph = () => AnimationDemos.startMorphAnimation();
window.stopWebAnimation = () => AnimationDemos.stopWebAnimation();

window.startParticles = () => AnimationDemos.startParticleAnimation();
window.stopParticles = () => AnimationDemos.stopParticleAnimation();
window.clearParticles = () => AnimationDemos.clearParticleCanvas();

window.clearDrawing = () => CanvasDemos.clearDrawing();
window.applyFilter = (filter) => CanvasDemos.applyFilter(filter);
window.resetImage = () => CanvasDemos.resetImage();

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.demoGallery = new DemoGallery();
});
