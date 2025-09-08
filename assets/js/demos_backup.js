// Demo Gallery JavaScript
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
        };,
            animation: [
                {
                    id: 'css-animations',
                    title: 'CSS 애니메이션',
                    description: 'CSS만으로 구현한 다양한 애니메이션 효과들. 성능 최적화 포함.',
                    tech: ['CSS3', '키프레임', '성능 최적화'],
                    difficulty: '초급',
                    init: this.initCSSAnimations.bind(this)
                },
                {
                    id: 'web-animations-api',
                    title: 'Web Animations API',
                    description: '브라우저 네이티브 애니메이션 API를 활용한 고성능 애니메이션.',
                    tech: ['Web Animations API', 'JavaScript', '성능'],
                    difficulty: '중급',
                    init: this.initWebAnimations.bind(this)
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
                    <div class="preview-placeholder">${this.getCategoryIcon(this.currentCategory)}</div>
                </div>
                <div class="demo-info">
                    <h3>${demo.title}</h3>
                    <p>${demo.description}</p>
                    <div class="demo-tags">
                        <span class="demo-tag">${demo.difficulty}</span>
                        ${demo.tech.slice(0, 3).map(tech => `<span class="demo-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        // 데모 카드 클릭 이벤트
        grid.querySelectorAll('.demo-card').forEach(card => {
            card.addEventListener('click', () => {
                const demoId = card.dataset.demoId;
                this.openDemo(demoId);
            });
        });
    }

    getCategoryIcon(category) {
        const icons = {
            games: '🎮',
            '3d': '🎨',
            d3: '📊',
            canvas: '🎭',
            animation: '✨'
        };
        return icons[category] || '🎯';
    }

    openDemo(demoId) {
        const demo = this.findDemoById(demoId);
        if (!demo) return;

        // 모달 내용 설정
        document.getElementById('modal-title').textContent = demo.title;
        document.getElementById('demo-description').textContent = demo.description;

        const techStack = document.getElementById('demo-tech-stack');
        techStack.innerHTML = demo.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

        // 데모 컨테이너 초기화
        const container = document.getElementById('demo-container');
        container.innerHTML = '<div style="color: #666; font-size: 1.2rem;">데모를 로딩 중...</div>';

        // 모달 표시
        document.getElementById('demo-modal').classList.add('show');

        // 데모 초기화 (약간의 지연으로 모달 표시 후 실행)
        setTimeout(() => {
            demo.init(container);
        }, 100);
    }

    closeModal() {
        document.getElementById('demo-modal').classList.remove('show');

        // 데모 정리 (필요시)
        const container = document.getElementById('demo-container');
        container.innerHTML = '';
    }

    findDemoById(demoId) {
        for (const category in this.demos) {
            const demo = this.demos[category].find(d => d.id === demoId);
            if (demo) return demo;
        }
        return null;
    }

    // ===== 데모 구현 =====

    initTicTacToe(container) {
        container.innerHTML = `
            <div style="text-align: center; max-width: 400px; margin: 0 auto;">
                <div style="margin-bottom: 20px;">
                    <h3 style="margin: 0 0 10px; color: #333;">틱택토 게임</h3>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <div id="tic-tac-toe-status" style="font-weight: bold; font-size: 16px; color: #007bff;">X의 차례</div>
                        <div style="font-size: 14px; color: #666;">점수 - X: <span id="x-score">0</span> | O: <span id="o-score">0</span></div>
                    </div>
                </div>
                <div id="tic-tac-toe-board" style="display: inline-block; margin-bottom: 20px;"></div>
                <div style="margin-top: 20px;">
                    <button onclick="resetTicTacToe()" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; margin-right: 10px;">새 게임</button>
                    <button onclick="resetTicTacToeScore()" style="padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">점수 초기화</button>
                </div>
            </div>
        `;

        // 게임 상태 초기화
        this.ticTacToeGame = {
            board: Array(9).fill(null),
            currentPlayer: 'X',
            gameOver: false,
            scores: { X: 0, O: 0 }
        };

        this.createTicTacToeBoard();
        this.updateTicTacToeDisplay();
    }

    createTicTacToeBoard() {
        const board = document.getElementById('tic-tac-toe-board');
        board.innerHTML = '';

        // 3x3 그리드 생성
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const index = row * 3 + col;
                const cell = document.createElement('div');

                // 스타일 설정
                cell.style.width = '80px';
                cell.style.height = '80px';
                cell.style.border = '3px solid #333';
                cell.style.display = 'inline-block';
                cell.style.textAlign = 'center';
                cell.style.lineHeight = '74px'; // height - border
                cell.style.fontSize = '32px';
                cell.style.fontWeight = 'bold';
                cell.style.cursor = 'pointer';
                cell.style.background = '#fff';
                cell.style.margin = '1px';
                cell.style.transition = 'all 0.2s ease';
                cell.style.userSelect = 'none';

                // 테두리 설정 (크로스 라인 제거)
                if (row === 0) cell.style.borderTop = 'none';
                if (row === 2) cell.style.borderBottom = 'none';
                if (col === 0) cell.style.borderLeft = 'none';
                if (col === 2) cell.style.borderRight = 'none';

                cell.dataset.index = index;

                // 호버 효과
                cell.addEventListener('mouseenter', () => {
                    if (!this.ticTacToeGame.board[index] && !this.ticTacToeGame.gameOver) {
                        cell.style.background = '#f0f8ff';
                        cell.textContent = this.ticTacToeGame.currentPlayer;
                        cell.style.color = '#ccc';
                    }
                });

                cell.addEventListener('mouseleave', () => {
                    if (!this.ticTacToeGame.board[index]) {
                        cell.style.background = '#fff';
                        cell.textContent = '';
                    }
                });

                // 클릭 이벤트
                cell.addEventListener('click', () => this.makeTicTacToeMove(index));

                board.appendChild(cell);
            }
            board.appendChild(document.createElement('br'));
        }
    }

    makeTicTacToeMove(index) {
        if (this.ticTacToeGame.board[index] || this.ticTacToeGame.gameOver) return;

        // 이동 실행
        this.ticTacToeGame.board[index] = this.ticTacToeGame.currentPlayer;
        const cell = document.querySelector(`[data-index="${index}"]`);
        cell.textContent = this.ticTacToeGame.currentPlayer;
        cell.style.color = this.ticTacToeGame.currentPlayer === 'X' ? '#007bff' : '#dc3545';
        cell.style.background = '#fff';

        // 승리 체크
        const winner = this.checkTicTacToeWinner();
        if (winner) {
            this.ticTacToeGame.gameOver = true;
            this.ticTacToeGame.scores[winner]++;
            this.updateTicTacToeDisplay(`${winner} 승리! 🎉`);
            this.highlightWinningCells(winner);
        } else if (this.ticTacToeGame.board.every(cell => cell)) {
            this.ticTacToeGame.gameOver = true;
            this.updateTicTacToeDisplay('무승부! 🤝');
        } else {
            // 다음 플레이어로 전환
            this.ticTacToeGame.currentPlayer = this.ticTacToeGame.currentPlayer === 'X' ? 'O' : 'X';
            this.updateTicTacToeDisplay();
        }
    }

    checkTicTacToeWinner() {
        const board = this.ticTacToeGame.board;
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // 행
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // 열
            [0, 4, 8], [2, 4, 6] // 대각선
        ];

        for (const [a, b, c] of lines) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                this.ticTacToeGame.winningLine = [a, b, c];
                return board[a];
            }
        }
        return null;
    }

    highlightWinningCells(winner) {
        if (this.ticTacToeGame.winningLine) {
            this.ticTacToeGame.winningLine.forEach(index => {
                const cell = document.querySelector(`[data-index="${index}"]`);
                cell.style.background = winner === 'X' ? '#e3f2fd' : '#ffebee';
                cell.style.fontWeight = '900';
            });
        }
    }

    updateTicTacToeDisplay(message) {
        const status = document.getElementById('tic-tac-toe-status');
        const xScore = document.getElementById('x-score');
        const oScore = document.getElementById('o-score');

        if (message) {
            status.textContent = message;
            status.style.color = message.includes('승리') ? '#28a745' : message.includes('무승부') ? '#ffc107' : '#007bff';
        } else {
            status.textContent = `${this.ticTacToeGame.currentPlayer}의 차례`;
            status.style.color = '#007bff';
        }

        xScore.textContent = this.ticTacToeGame.scores.X;
        oScore.textContent = this.ticTacToeGame.scores.O;
    }

    resetTicTacToeGame() {
        this.ticTacToeGame.board = Array(9).fill(null);
        this.ticTacToeGame.currentPlayer = 'X';
        this.ticTacToeGame.gameOver = false;
        this.ticTacToeGame.winningLine = null;

        // 모든 셀 초기화
        for (let i = 0; i < 9; i++) {
            const cell = document.querySelector(`[data-index="${i}"]`);
            cell.textContent = '';
            cell.style.background = '#fff';
            cell.style.color = '#333';
            cell.style.fontWeight = 'bold';
        }

        this.updateTicTacToeDisplay();
    }

    resetTicTacToeScore() {
        this.ticTacToeGame.scores = { X: 0, O: 0 };
        this.updateTicTacToeDisplay();
    }

    initSnakeGame(container) {
        container.innerHTML = `
            <div style="text-align: center;">
                <canvas id="snake-canvas" width="400" height="400" style="border: 2px solid #333; background: #2d3748;"></canvas>
                <div style="margin-top: 20px;">
                    <div id="snake-score" style="color: #fff; font-size: 18px; margin-bottom: 10px;">점수: 0</div>
                    <button onclick="resetSnakeGame()" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">새 게임</button>
                </div>
            </div>
        `;

        // 스네이크 게임 로직 구현
        this.startSnakeGame();
    }

    startSnakeGame() {
        const canvas = document.getElementById('snake-canvas');
        const ctx = canvas.getContext('2d');

        // 게임 상태
        this.snake = [{x: 200, y: 200}];
        this.direction = {x: 0, y: 0};
        this.food = {x: 0, y: 0};
        this.score = 0;
        this.gameRunning = true;

        this.generateFood();
        this.gameLoop = setInterval(() => this.updateSnakeGame(ctx, canvas), 150);

        // 키보드 이벤트
        document.addEventListener('keydown', (e) => this.handleSnakeKeyPress(e));
    }

    updateSnakeGame(ctx, canvas) {
        if (!this.gameRunning) return;

        // 뱀 이동
        const head = {x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y};

        // 벽 충돌 체크
        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
            this.gameRunning = false;
            return;
        }

        // 자기 자신과 충돌 체크
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameRunning = false;
            return;
        }

        this.snake.unshift(head);

        // 먹이 먹기
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            document.getElementById('snake-score').textContent = `점수: ${this.score}`;
            this.generateFood();
        } else {
            this.snake.pop();
        }

        this.drawSnakeGame(ctx, canvas);
    }

    drawSnakeGame(ctx, canvas) {
        // 배경
        ctx.fillStyle = '#2d3748';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 뱀 그리기
        ctx.fillStyle = '#48bb78';
        this.snake.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, 20, 20);
        });

        // 먹이 그리기
        ctx.fillStyle = '#e53e3e';
        ctx.fillRect(this.food.x, this.food.y, 20, 20);
    }

    generateFood() {
        this.food = {
            x: Math.floor(Math.random() * 20) * 20,
            y: Math.floor(Math.random() * 20) * 20
        };
    }

    handleSnakeKeyPress(e) {
        if (!this.gameRunning) return;

        switch(e.key) {
            case 'ArrowUp':
                if (this.direction.y === 0) this.direction = {x: 0, y: -20};
                break;
            case 'ArrowDown':
                if (this.direction.y === 0) this.direction = {x: 0, y: 20};
                break;
            case 'ArrowLeft':
                if (this.direction.x === 0) this.direction = {x: -20, y: 0};
                break;
            case 'ArrowRight':
                if (this.direction.x === 0) this.direction = {x: 20, y: 0};
                break;
        }
    }

    initRotatingCube(container) {
        container.innerHTML = '<div id="three-container" style="width: 100%; height: 100%;"></div>';

        // Three.js 씬 설정
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.setSize(container.clientWidth, container.clientHeight);
        document.getElementById('three-container').appendChild(renderer.domElement);

        // 큐브 생성
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00ff88,
            shininess: 100
        });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // 조명 추가
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1);
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        camera.position.z = 3;

        // 애니메이션 루프
        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        // 창 크기 조정
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }

    initBarChart(container) {
        container.innerHTML = '<div id="d3-chart" style="width: 100%; height: 100%;"></div>';

        const data = [
            {name: 'HTML', value: 85},
            {name: 'CSS', value: 75},
            {name: 'JavaScript', value: 90},
            {name: 'React', value: 80},
            {name: 'Node.js', value: 70}
        ];

        const margin = {top: 20, right: 30, bottom: 40, left: 40};
        const width = container.clientWidth - margin.left - margin.right;
        const height = container.clientHeight - margin.top - margin.bottom;

        const svg = d3.select('#d3-chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // 스케일 설정
        const x = d3.scaleBand()
            .range([0, width])
            .domain(data.map(d => d.name))
            .padding(0.1);

        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, 100]);

        // 축 추가
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append('g')
            .call(d3.axisLeft(y));

        // 막대 추가
        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.name))
            .attr('y', d => y(d.value))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(d.value))
            .attr('fill', '#007bff')
            .attr('opacity', 0.8);

        // 값 레이블 추가
        svg.selectAll('.label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'label')
            .attr('x', d => x(d.name) + x.bandwidth() / 2)
            .attr('y', d => y(d.value) - 5)
            .attr('text-anchor', 'middle')
            .text(d => d.value + '%')
            .style('font-size', '12px')
            .style('fill', '#333');
    }

    // 나머지 데모들은 기본 구현으로 대체
    initSnakeGame(container) { this.initSnakeGame(container); }
    initPongGame(container) {
        container.innerHTML = `
            <div style="text-align: center;">
                <canvas id="pong-canvas" width="600" height="400" style="border: 2px solid #333; background: #1a1a1a;"></canvas>
                <div style="margin-top: 20px;">
                    <div id="pong-score" style="color: #fff; font-size: 18px; margin-bottom: 10px;">플레이어: 0 - 컴퓨터: 0</div>
                    <button onclick="resetPongGame()" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">새 게임</button>
                </div>
                <div style="color: #ccc; font-size: 14px; margin-top: 10px;">
                    키보드: W/S (플레이어), 방향키 ↑/↓ (컴퓨터) | 스페이스바: 일시정지
                </div>
            </div>
        `;

        this.startPongGame();
    }

    startPongGame() {
        const canvas = document.getElementById('pong-canvas');
        const ctx = canvas.getContext('2d');

        // 게임 상태
        this.pongGame = {
            playerScore: 0,
            computerScore: 0,
            playerY: canvas.height / 2 - 50,
            computerY: canvas.height / 2 - 50,
            ballX: canvas.width / 2,
            ballY: canvas.height / 2,
            ballSpeedX: 5,
            ballSpeedY: 3,
            paddleWidth: 10,
            paddleHeight: 100,
            paused: false
        };

        // 키보드 이벤트
        this.pongKeys = {};
        document.addEventListener('keydown', (e) => {
            this.pongKeys[e.key] = true;
            if (e.key === ' ') {
                e.preventDefault();
                this.pongGame.paused = !this.pongGame.paused;
            }
        });
        document.addEventListener('keyup', (e) => {
            this.pongKeys[e.key] = false;
        });

        this.pongGameLoop = setInterval(() => this.updatePongGame(ctx, canvas), 1000 / 60);
    }

    updatePongGame(ctx, canvas) {
        if (this.pongGame.paused) return;

        const game = this.pongGame;

        // 플레이어 패들 이동
        if (this.pongKeys['w'] || this.pongKeys['W']) {
            game.playerY = Math.max(0, game.playerY - 7);
        }
        if (this.pongKeys['s'] || this.pongKeys['S']) {
            game.playerY = Math.min(canvas.height - game.paddleHeight, game.playerY + 7);
        }

        // 컴퓨터 패들 이동 (간단한 AI)
        if (game.ballY < game.computerY + game.paddleHeight / 2) {
            game.computerY = Math.max(0, game.computerY - 4);
        } else if (game.ballY > game.computerY + game.paddleHeight / 2) {
            game.computerY = Math.min(canvas.height - game.paddleHeight, game.computerY + 4);
        }

        // 공 이동
        game.ballX += game.ballSpeedX;
        game.ballY += game.ballSpeedY;

        // 벽 충돌
        if (game.ballY <= 0 || game.ballY >= canvas.height) {
            game.ballSpeedY = -game.ballSpeedY;
        }

        // 패들 충돌
        if (game.ballX <= 20 && game.ballY >= game.playerY && game.ballY <= game.playerY + game.paddleHeight) {
            game.ballSpeedX = -game.ballSpeedX;
            game.ballSpeedY += (game.ballY - (game.playerY + game.paddleHeight / 2)) * 0.1;
        }

        if (game.ballX >= canvas.width - 30 && game.ballY >= game.computerY && game.ballY <= game.computerY + game.paddleHeight) {
            game.ballSpeedX = -game.ballSpeedX;
            game.ballSpeedY += (game.ballY - (game.computerY + game.paddleHeight / 2)) * 0.1;
        }

        // 득점
        if (game.ballX < 0) {
            game.computerScore++;
            this.resetPongBall();
        } else if (game.ballX > canvas.width) {
            game.playerScore++;
            this.resetPongBall();
        }

        this.drawPongGame(ctx, canvas);
    }

    resetPongBall() {
        const game = this.pongGame;
        game.ballX = game.ballX < 0 ? 100 : game.ballX > 600 ? 500 : game.ballX;
        game.ballY = 200;
        game.ballSpeedX = game.ballX < 300 ? 5 : -5;
        game.ballSpeedY = (Math.random() - 0.5) * 6;
        document.getElementById('pong-score').textContent = `플레이어: ${game.playerScore} - 컴퓨터: ${game.computerScore}`;
    }

    drawPongGame(ctx, canvas) {
        const game = this.pongGame;

        // 배경
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 중앙 선
        ctx.strokeStyle = '#666';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);

        // 패들
        ctx.fillStyle = '#fff';
        ctx.fillRect(10, game.playerY, game.paddleWidth, game.paddleHeight);
        ctx.fillRect(canvas.width - 20, game.computerY, game.paddleWidth, game.paddleHeight);

        // 공
        ctx.beginPath();
        ctx.arc(game.ballX, game.ballY, 8, 0, Math.PI * 2);
        ctx.fill();

        // 점수
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(game.playerScore, canvas.width / 4, 50);
        ctx.fillText(game.computerScore, 3 * canvas.width / 4, 50);
    }
    initParticleSystem(container) {
        container.innerHTML = '<div id="particle-container" style="width: 100%; height: 100%;"></div>';

        // Three.js 씬 설정
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.setSize(container.clientWidth, container.clientHeight);
        document.getElementById('particle-container').appendChild(renderer.domElement);

        // 파티클 시스템 생성
        const particleCount = 2000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // 위치 설정
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

            // 색상 설정
            colors[i * 3] = Math.random();
            colors[i * 3 + 1] = Math.random();
            colors[i * 3 + 2] = Math.random();
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        camera.position.z = 10;

        // 마우스 인터랙션
        const mouse = new THREE.Vector3();
        document.addEventListener('mousemove', (event) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        });

        // 애니메이션
        const animate = () => {
            requestAnimationFrame(animate);

            // 파티클 회전
            particles.rotation.x += 0.002;
            particles.rotation.y += 0.003;

            // 마우스에 따른 상호작용
            const positions = particles.geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                const x = positions[i * 3];
                const y = positions[i * 3 + 1];
                const z = positions[i * 3 + 2];

                // 마우스와의 거리에 따른 효과
                const distance = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y);
                const effect = Math.max(0, 1 - distance / 2);

                positions[i * 3 + 2] = z + Math.sin(Date.now() * 0.001 + i) * 0.1 * effect;
            }
            particles.geometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        };
        animate();

        // 창 크기 조정
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }
    initModelViewer(container) {
        container.innerHTML = `
            <div style="text-align: center;">
                <div id="model-viewer-container" style="width: 100%; height: 300px; background: linear-gradient(45deg, #f0f0f0, #e0e0e0); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                    <div style="text-align: center; color: #666;">
                        <div style="font-size: 48px; margin-bottom: 10px;">📦</div>
                        <div>3D 모델 뷰어</div>
                        <div style="font-size: 12px; margin-top: 10px;">GLTF/GLB 파일을 드래그하여 업로드하세요</div>
                    </div>
                </div>
                <div style="color: #666; font-size: 14px;">
                    Three.js를 활용한 3D 모델 로딩 및 조작 데모<br>
                    (실제 3D 모델 파일이 필요합니다)
                </div>
            </div>
        `;

        // 드래그 앤 드롭 기능 (기본 구현)
        const dropZone = document.getElementById('model-viewer-container');
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.background = 'linear-gradient(45deg, #e3f2fd, #bbdefb)';
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.style.background = 'linear-gradient(45deg, #f0f0f0, #e0e0e0)';
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.style.background = 'linear-gradient(45deg, #f0f0f0, #e0e0e0)';

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                dropZone.innerHTML = `
                    <div style="text-align: center; color: #666;">
                        <div style="font-size: 24px; margin-bottom: 10px;">📁</div>
                        <div>파일: ${files[0].name}</div>
                        <div style="font-size: 12px; margin-top: 10px;">3D 모델 로딩 중...</div>
                    </div>
                `;
            }
        });
    }
    initLineChart(container) {
        container.innerHTML = '<div id="line-chart" style="width: 100%; height: 100%;"></div>';

        // 샘플 데이터
        const data = [
            {date: '2023-01', value: 30, category: '웹 방문자'},
            {date: '2023-02', value: 45, category: '웹 방문자'},
            {date: '2023-03', value: 55, category: '웹 방문자'},
            {date: '2023-04', value: 70, category: '웹 방문자'},
            {date: '2023-05', value: 85, category: '웹 방문자'},
            {date: '2023-06', value: 95, category: '웹 방문자'},
            {date: '2023-07', value: 110, category: '웹 방문자'},
            {date: '2023-08', value: 125, category: '웹 방문자'},
            {date: '2023-09', value: 140, category: '웹 방문자'},
            {date: '2023-10', value: 155, category: '웹 방문자'},
            {date: '2023-11', value: 170, category: '웹 방문자'},
            {date: '2023-12', value: 185, category: '웹 방문자'}
        ];

        const margin = {top: 20, right: 30, bottom: 40, left: 50};
        const width = container.clientWidth - margin.left - margin.right;
        const height = container.clientHeight - margin.top - margin.bottom;

        const svg = d3.select('#line-chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // 스케일 설정
        const x = d3.scaleTime()
            .domain(d3.extent(data, d => new Date(d.date)))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value) * 1.1])
            .range([height, 0]);

        // 선 생성
        const line = d3.line()
            .x(d => x(new Date(d.date)))
            .y(d => y(d.value))
            .curve(d3.curveMonotoneX);

        // 영역 생성
        const area = d3.area()
            .x(d => x(new Date(d.date)))
            .y0(height)
            .y1(d => y(d.value))
            .curve(d3.curveMonotoneX);

        // 영역 추가
        svg.append('path')
            .datum(data)
            .attr('fill', 'url(#gradient)')
            .attr('d', area);

        // 선 추가
        const path = svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#007bff')
            .attr('stroke-width', 3)
            .attr('d', line);

        // 그라데이션 정의
        const defs = svg.append('defs');
        const gradient = defs.append('linearGradient')
            .attr('id', 'gradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '0%')
            .attr('y2', '100%');

        gradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#007bff')
            .attr('stop-opacity', 0.3);

        gradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#007bff')
            .attr('stop-opacity', 0.1);

        // 축 추가
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(d3.timeMonth.every(1)).tickFormat(d3.timeFormat('%m월')))
            .selectAll('text')
            .style('text-anchor', 'middle');

        svg.append('g')
            .call(d3.axisLeft(y));

        // 데이터 포인트 추가
        const points = svg.selectAll('.point')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'point')
            .attr('cx', d => x(new Date(d.date)))
            .attr('cy', d => y(d.value))
            .attr('r', 5)
            .attr('fill', '#007bff')
            .attr('stroke', '#fff')
            .attr('stroke-width', 2);

        // 툴팁 추가
        const tooltip = d3.select('#line-chart')
            .append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('visibility', 'hidden')
            .style('background', 'rgba(0,0,0,0.8)')
            .style('color', '#fff')
            .style('padding', '8px')
            .style('border-radius', '4px')
            .style('font-size', '12px')
            .style('pointer-events', 'none');

        // 인터랙션 추가
        points.on('mouseover', function(event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', 8);

                tooltip.style('visibility', 'visible')
                    .html(`<strong>${d.date}</strong><br/>${d.category}: ${d.value}명`);
            })
            .on('mousemove', function(event) {
                tooltip.style('top', (event.pageY - 10) + 'px')
                    .style('left', (event.pageX + 10) + 'px');
            })
            .on('mouseout', function() {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', 5);

                tooltip.style('visibility', 'hidden');
            });

        // 애니메이션 효과
        const totalLength = path.node().getTotalLength();

        path.attr('stroke-dasharray', totalLength + ' ' + totalLength)
            .attr('stroke-dashoffset', totalLength)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', 0);

        // 그리드 라인 추가
        svg.append('g')
            .attr('class', 'grid')
            .call(d3.axisLeft(y)
                .tickSize(-width)
                .tickFormat(''))
            .style('stroke-dasharray', '2,2')
            .style('stroke', '#e0e0e0')
            .style('opacity', 0.3);
    }
    initForceDirected(container) {
        container.innerHTML = '<div id="force-chart" style="width: 100%; height: 100%;"></div>';

        // 샘플 데이터
        const nodes = [
            {id: 'HTML', group: 1},
            {id: 'CSS', group: 1},
            {id: 'JavaScript', group: 2},
            {id: 'React', group: 2},
            {id: 'Node.js', group: 3},
            {id: 'Database', group: 3},
            {id: 'API', group: 4},
            {id: '웹 개발', group: 5}
        ];

        const links = [
            {source: 'HTML', target: 'CSS'},
            {source: 'HTML', target: 'JavaScript'},
            {source: 'CSS', target: 'JavaScript'},
            {source: 'JavaScript', target: 'React'},
            {source: 'JavaScript', target: 'Node.js'},
            {source: 'Node.js', target: 'Database'},
            {source: 'Node.js', target: 'API'},
            {source: 'React', target: 'API'},
            {source: 'HTML', target: '웹 개발'},
            {source: 'CSS', target: '웹 개발'},
            {source: 'JavaScript', target: '웹 개발'}
        ];

        const width = container.clientWidth;
        const height = container.clientHeight;

        const svg = d3.select('#force-chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        // 포스 시뮬레이션
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(100))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(30));

        // 링크 추가
        const link = svg.append('g')
            .selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)
            .attr('stroke-width', 2);

        // 노드 추가
        const node = svg.append('g')
            .selectAll('circle')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('r', 20)
            .attr('fill', d => d3.schemeCategory10[d.group % 10])
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .call(d3.drag()
                .on('start', (event, d) => {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                })
                .on('drag', (event, d) => {
                    d.fx = event.x;
                    d.fy = event.y;
                })
                .on('end', (event, d) => {
                    if (!event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                }));

        // 텍스트 레이블 추가
        const text = svg.append('g')
            .selectAll('text')
            .data(nodes)
            .enter()
            .append('text')
            .text(d => d.id)
            .attr('text-anchor', 'middle')
            .attr('dy', 5)
            .attr('font-size', '12px')
            .attr('fill', '#333')
            .attr('pointer-events', 'none');

        // 시뮬레이션 틱
        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);

            text
                .attr('x', d => d.x)
                .attr('y', d => d.y);
        });

        // 인터랙션
        node.on('mouseover', function(event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', 25);
            })
            .on('mouseout', function(event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', 20);
            });
    }
    initDrawingApp(container) {
        container.innerHTML = `
            <div style="text-align: center;">
                <div style="margin-bottom: 20px;">
                    <label style="margin-right: 10px;">색상:</label>
                    <input type="color" id="drawing-color" value="#000000" style="margin-right: 20px;">
                    <label style="margin-right: 10px;">선 굵기:</label>
                    <input type="range" id="drawing-size" min="1" max="20" value="5" style="margin-right: 20px;">
                    <span id="size-value" style="margin-right: 20px;">5px</span>
                    <button onclick="clearDrawing()" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">지우기</button>
                </div>
                <canvas id="drawing-canvas" width="600" height="400" style="border: 2px solid #333; background: #fff; cursor: crosshair;"></canvas>
                <div style="margin-top: 10px; color: #666; font-size: 14px;">
                    마우스로 드래그하여 그림을 그려보세요!
                </div>
            </div>
        `;

        this.startDrawingApp();
    }

    startDrawingApp() {
        const canvas = document.getElementById('drawing-canvas');
        const ctx = canvas.getContext('2d');
        const colorPicker = document.getElementById('drawing-color');
        const sizeSlider = document.getElementById('drawing-size');
        const sizeValue = document.getElementById('size-value');

        // 드로잉 상태
        this.drawing = {
            isDrawing: false,
            lastX: 0,
            lastY: 0,
            color: colorPicker.value,
            size: sizeSlider.value
        };

        // 캔버스 초기화
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 이벤트 리스너
        canvas.addEventListener('mousedown', (e) => this.startDrawing(e, canvas));
        canvas.addEventListener('mousemove', (e) => this.draw(e, canvas, ctx));
        canvas.addEventListener('mouseup', () => this.stopDrawing());
        canvas.addEventListener('mouseout', () => this.stopDrawing());

        // 터치 이벤트 (모바일 지원)
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        });

        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        });

        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            const mouseEvent = new MouseEvent('mouseup');
            canvas.dispatchEvent(mouseEvent);
        });

        // 컨트롤 이벤트
        colorPicker.addEventListener('change', (e) => {
            this.drawing.color = e.target.value;
        });

        sizeSlider.addEventListener('input', (e) => {
            this.drawing.size = e.target.value;
            sizeValue.textContent = e.target.value + 'px';
        });
    }

    startDrawing(e, canvas) {
        this.drawing.isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        this.drawing.lastX = e.clientX - rect.left;
        this.drawing.lastY = e.clientY - rect.top;
    }

    draw(e, canvas, ctx) {
        if (!this.drawing.isDrawing) return;

        const rect = canvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(this.drawing.lastX, this.drawing.lastY);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = this.drawing.color;
        ctx.lineWidth = this.drawing.size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        this.drawing.lastX = currentX;
        this.drawing.lastY = currentY;
    }

    stopDrawing() {
        this.drawing.isDrawing = false;
    }
    initImageManipulation(container) {
        container.innerHTML = `
            <div style="text-align: center;">
                <div style="margin-bottom: 20px;">
                    <input type="file" id="image-input" accept="image/*" style="margin-bottom: 10px;">
                    <div>
                        <button onclick="applyFilter('grayscale')" style="margin: 5px; padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">흑백</button>
                        <button onclick="applyFilter('sepia')" style="margin: 5px; padding: 8px 16px; background: #fd7e14; color: white; border: none; border-radius: 5px; cursor: pointer;">세피아</button>
                        <button onclick="applyFilter('blur')" style="margin: 5px; padding: 8px 16px; background: #20c997; color: white; border: none; border-radius: 5px; cursor: pointer;">블러</button>
                        <button onclick="applyFilter('brightness')" style="margin: 5px; padding: 8px 16px; background: #ffc107; color: black; border: none; border-radius: 5px; cursor: pointer;">밝기</button>
                        <button onclick="resetImage()" style="margin: 5px; padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">원본</button>
                    </div>
                </div>
                <canvas id="image-canvas" style="border: 2px solid #333; max-width: 100%; background: #f8f9fa;"></canvas>
                <div style="margin-top: 10px; color: #666; font-size: 14px;">
                    이미지를 업로드하여 Canvas 필터 효과를 체험해보세요!
                </div>
            </div>
        `;

        this.setupImageManipulation();
    }

    setupImageManipulation() {
        const canvas = document.getElementById('image-canvas');
        const ctx = canvas.getContext('2d');
        const input = document.getElementById('image-input');

        this.originalImageData = null;

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        // 캔버스 크기 조정
                        const maxWidth = 500;
                        const maxHeight = 400;
                        let { width, height } = img;

                        if (width > maxWidth) {
                            height = (height * maxWidth) / width;
                            width = maxWidth;
                        }
                        if (height > maxHeight) {
                            width = (width * maxHeight) / height;
                            height = maxHeight;
                        }

                        canvas.width = width;
                        canvas.height = height;

                        ctx.drawImage(img, 0, 0, width, height);
                        this.originalImageData = ctx.getImageData(0, 0, width, height);
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    initCSSAnimations(container) {
        container.innerHTML = `
            <div style="text-align: center;">
                <div style="margin-bottom: 30px;">
                    <button onclick="playAnimation('bounce')" style="margin: 5px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">바운스</button>
                    <button onclick="playAnimation('spin')" style="margin: 5px; padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">회전</button>
                    <button onclick="playAnimation('fade')" style="margin: 5px; padding: 10px 20px; background: #ffc107; color: black; border: none; border-radius: 5px; cursor: pointer;">페이드</button>
                    <button onclick="playAnimation('scale')" style="margin: 5px; padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">확대</button>
                    <button onclick="playAnimation('slide')" style="margin: 5px; padding: 10px 20px; background: #6f42c1; color: white; border: none; border-radius: 5px; cursor: pointer;">슬라이드</button>
                </div>
                <div id="animation-target" style="width: 100px; height: 100px; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 10px; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; position: relative;">
                    CSS
                </div>
                <div style="margin-top: 20px; color: #666; font-size: 14px;">
                    버튼을 클릭하여 다양한 CSS 애니메이션 효과를 체험해보세요!
                </div>
            </div>
        `;

        // CSS 애니메이션 스타일 추가
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-30px); }
                60% { transform: translateY(-15px); }
            }

            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            @keyframes fade {
                0% { opacity: 1; }
                50% { opacity: 0.3; }
                100% { opacity: 1; }
            }

            @keyframes scale {
                0% { transform: scale(1); }
                50% { transform: scale(1.5); }
                100% { transform: scale(1); }
            }

            @keyframes slide {
                0% { transform: translateX(-100px); }
                50% { transform: translateX(100px); }
                100% { transform: translateX(0); }
            }

            .bounce { animation: bounce 1s ease-in-out; }
            .spin { animation: spin 1s linear; }
            .fade { animation: fade 1s ease-in-out; }
            .scale { animation: scale 1s ease-in-out; }
            .slide { animation: slide 1s ease-in-out; }
        `;
        document.head.appendChild(style);
    }
    initWebAnimations(container) {
        container.innerHTML = `
            <div style="text-align: center;">
                <div style="margin-bottom: 30px;">
                    <button onclick="playWebAnimation('keyframes')" style="margin: 5px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">키프레임</button>
                    <button onclick="playWebAnimation('transform')" style="margin: 5px; padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">변형</button>
                    <button onclick="playWebAnimation('color')" style="margin: 5px; padding: 10px 20px; background: #ffc107; color: black; border: none; border-radius: 5px; cursor: pointer;">색상</button>
                    <button onclick="playWebAnimation('multiple')" style="margin: 5px; padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">복합</button>
                    <button onclick="stopWebAnimation()" style="margin: 5px; padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">정지</button>
                </div>
                <div id="web-animation-target" style="width: 100px; height: 100px; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 10px; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; position: relative;">
                    WAAPI
                </div>
                <div style="margin-top: 20px; color: #666; font-size: 14px;">
                    Web Animations API를 활용한 고성능 애니메이션 데모
                </div>
            </div>
        `;
    }
}

// 전역 함수들 (데모에서 사용)
function resetTicTacToe() {
    if (window.demoGallery) {
        window.demoGallery.resetTicTacToeGame();
    }
}

function resetTicTacToeScore() {
    if (window.demoGallery) {
        window.demoGallery.resetTicTacToeScore();
    }
}

function resetSnakeGame() {
    if (window.demoGallery) {
        window.demoGallery.startSnakeGame();
    }
}

function resetPongGame() {
    if (window.demoGallery) {
        window.demoGallery.startPongGame();
    }
}

function clearDrawing() {
    const canvas = document.getElementById('drawing-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function playWebAnimation(type) {
    const target = document.getElementById('web-animation-target');
    if (!target) return;

    // 기존 애니메이션 정지
    if (target.currentAnimation) {
        target.currentAnimation.cancel();
    }

    let keyframes, options;

    switch(type) {
        case 'keyframes':
            keyframes = [
                { transform: 'translateX(0) rotate(0deg)', opacity: 1 },
                { transform: 'translateX(200px) rotate(180deg)', opacity: 0.5 },
                { transform: 'translateX(0) rotate(360deg)', opacity: 1 }
            ];
            options = { duration: 2000, easing: 'ease-in-out' };
            break;

        case 'transform':
            keyframes = [
                { transform: 'scale(1) rotate(0deg)' },
                { transform: 'scale(1.5) rotate(180deg)' },
                { transform: 'scale(1) rotate(360deg)' }
            ];
            options = { duration: 1500, easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' };
            break;

        case 'color':
            keyframes = [
                { background: 'linear-gradient(45deg, #667eea, #764ba2)' },
                { background: 'linear-gradient(45deg, #f093fb, #f5576c)' },
                { background: 'linear-gradient(45deg, #4facfe, #00f2fe)' },
                { background: 'linear-gradient(45deg, #667eea, #764ba2)' }
            ];
            options = { duration: 3000, easing: 'ease-in-out' };
            break;

        case 'multiple':
            keyframes = [
                { transform: 'translateX(0) scale(1) rotate(0deg)', opacity: 1, borderRadius: '10px' },
                { transform: 'translateX(150px) scale(1.2) rotate(90deg)', opacity: 0.7, borderRadius: '50px' },
                { transform: 'translateX(-150px) scale(0.8) rotate(180deg)', opacity: 0.4, borderRadius: '0px' },
                { transform: 'translateX(0) scale(1) rotate(360deg)', opacity: 1, borderRadius: '10px' }
            ];
            options = { duration: 4000, easing: 'ease-in-out', iterations: 2 };
            break;
    }

    target.currentAnimation = target.animate(keyframes, options);
}

function applyFilter(type) {
    const canvas = document.getElementById('image-canvas');
    if (!canvas || !window.demoGallery.originalImageData) return;

    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // 원본 데이터 복사
    for (let i = 0; i < data.length; i++) {
        data[i] = window.demoGallery.originalImageData.data[i];
    }

    switch(type) {
        case 'grayscale':
            for (let i = 0; i < data.length; i += 4) {
                const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
                data[i] = gray;     // Red
                data[i + 1] = gray; // Green
                data[i + 2] = gray; // Blue
            }
            break;

        case 'sepia':
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));     // Red
                data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168)); // Green
                data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131)); // Blue
            }
            break;

        case 'blur':
            // 간단한 블러 효과 (박스 블러)
            const tempData = new Uint8ClampedArray(data);
            const radius = 2;

            for (let y = radius; y < canvas.height - radius; y++) {
                for (let x = radius; x < canvas.width - radius; x++) {
                    let r = 0, g = 0, b = 0, a = 0;
                    let count = 0;

                    for (let dy = -radius; dy <= radius; dy++) {
                        for (let dx = -radius; dx <= radius; dx++) {
                            const idx = ((y + dy) * canvas.width + (x + dx)) * 4;
                            r += tempData[idx];
                            g += tempData[idx + 1];
                            b += tempData[idx + 2];
                            a += tempData[idx + 3];
                            count++;
                        }
                    }

                    const idx = (y * canvas.width + x) * 4;
                    data[idx] = r / count;
                    data[idx + 1] = g / count;
                    data[idx + 2] = b / count;
                    data[idx + 3] = a / count;
                }
            }
            break;

        case 'brightness':
            for (let i = 0; i < data.length; i += 4) {
                data[i] = Math.min(255, data[i] * 1.5);     // Red
                data[i + 1] = Math.min(255, data[i + 1] * 1.5); // Green
                data[i + 2] = Math.min(255, data[i + 2] * 1.5); // Blue
            }
            break;
    }

    ctx.putImageData(imageData, 0, 0);
}

function resetImage() {
    const canvas = document.getElementById('image-canvas');
    if (!canvas || !window.demoGallery.originalImageData) return;

    const ctx = canvas.getContext('2d');
    ctx.putImageData(window.demoGallery.originalImageData, 0, 0);
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.demoGallery = new DemoGallery();
});
