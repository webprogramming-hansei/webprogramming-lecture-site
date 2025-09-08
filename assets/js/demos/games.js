// 게임 데모 모듈
export class GameDemos {
    // 틱택토 게임
    static initTicTacToe(container) {
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

    static createTicTacToeBoard() {
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
                cell.style.paddingTop = '19px'; // (80px - 3px*2 - 32px) / 2
                cell.style.verticalAlign = 'top';
                cell.style.fontSize = '32px';
                cell.style.fontWeight = 'bold';
                cell.style.cursor = 'pointer';
                cell.style.background = '#fff';
                cell.style.margin = '1px';
                cell.style.transition = 'all 0.2s ease';
                cell.style.userSelect = 'none';
                cell.style.boxSizing = 'border-box';

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
                    }
                });

                cell.addEventListener('mouseleave', () => {
                    if (!this.ticTacToeGame.board[index]) {
                        cell.style.background = '#fff';
                    }
                });

                // 클릭 이벤트
                cell.addEventListener('click', () => this.makeTicTacToeMove(index));

                board.appendChild(cell);
            }
            board.appendChild(document.createElement('br'));
        }
    }

    static makeTicTacToeMove(index) {
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

    static checkTicTacToeWinner() {
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

    static highlightWinningCells(winner) {
        if (this.ticTacToeGame.winningLine) {
            this.ticTacToeGame.winningLine.forEach(index => {
                const cell = document.querySelector(`[data-index="${index}"]`);
                cell.style.background = winner === 'X' ? '#e3f2fd' : '#ffebee';
                cell.style.fontWeight = '900';
            });
        }
    }

    static updateTicTacToeDisplay(message) {
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

    static resetTicTacToeGame() {
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

    static resetTicTacToeScore() {
        this.ticTacToeGame.scores = { X: 0, O: 0 };
        this.updateTicTacToeDisplay();
    }

    // 스네이크 게임
    static initSnakeGame(container) {
        container.innerHTML = `
            <div style="text-align: center;">
                <canvas id="snake-canvas" width="400" height="400" style="border: 2px solid #333; background: #2d3748;"></canvas>
                <div style="margin-top: 20px;">
                    <div id="snake-score" style="color: #fff; font-size: 18px; margin-bottom: 10px;">점수: 0</div>
                    <button onclick="resetSnakeGame()" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">새 게임</button>
                </div>
                <div style="color: #ccc; font-size: 14px; margin-top: 10px;">
                    방향키로 뱀을 조종하세요!
                </div>
            </div>
        `;

        this.startSnakeGame();
    }

    static startSnakeGame() {
        const canvas = document.getElementById('snake-canvas');
        const ctx = canvas.getContext('2d');

        // 게임 상태
        this.snakeGame = {
            snake: [{x: 200, y: 200}],
            direction: {x: 0, y: 0},
            food: {x: 0, y: 0},
            score: 0,
            gameRunning: true,
            gameLoop: null
        };

        this.generateSnakeFood();
        this.snakeGame.gameLoop = setInterval(() => this.updateSnakeGame(ctx, canvas), 150);

        // 키보드 이벤트
        document.addEventListener('keydown', (e) => this.handleSnakeKeyPress(e));
    }

    static updateSnakeGame(ctx, canvas) {
        if (!this.snakeGame.gameRunning) {
            this.drawSnakeGame(ctx, canvas);
            // 게임 오버 메시지 표시
            ctx.fillStyle = '#fff';
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('게임 오버!', canvas.width / 2, canvas.height / 2 - 20);
            ctx.font = '16px Arial';
            ctx.fillText(`최종 점수: ${this.snakeGame.score}`, canvas.width / 2, canvas.height / 2 + 20);
            ctx.fillText('새 게임 버튼을 눌러 다시 시작하세요', canvas.width / 2, canvas.height / 2 + 50);
            return;
        }

        const game = this.snakeGame;

        // 방향이 설정되지 않은 경우 (게임 시작 전) 건너뛰기
        if (game.direction.x === 0 && game.direction.y === 0) {
            this.drawSnakeGame(ctx, canvas);
            // 시작 안내 메시지 표시
            ctx.fillStyle = '#fff';
            ctx.font = '18px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('방향키를 눌러 게임을 시작하세요!', canvas.width / 2, canvas.height / 2 - 20);
            ctx.font = '14px Arial';
            ctx.fillText('↑↓←→ 키로 뱀을 조종하세요', canvas.width / 2, canvas.height / 2 + 10);
            return;
        }

        // 뱀 이동
        const head = {x: game.snake[0].x + game.direction.x, y: game.snake[0].y + game.direction.y};

        // 벽 충돌 체크
        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
            this.snakeGame.gameRunning = false;
            return;
        }

        // 자기 자신과 충돌 체크
        if (game.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.snakeGame.gameRunning = false;
            return;
        }

        game.snake.unshift(head);

        // 먹이 먹기
        if (head.x === game.food.x && head.y === game.food.y) {
            game.score += 10;
            document.getElementById('snake-score').textContent = `점수: ${game.score}`;
            this.generateSnakeFood();
        } else {
            game.snake.pop();
        }

        this.drawSnakeGame(ctx, canvas);
    }

    static drawSnakeGame(ctx, canvas) {
        const game = this.snakeGame;

        // 배경
        ctx.fillStyle = '#2d3748';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 뱀 그리기
        ctx.fillStyle = '#48bb78';
        game.snake.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, 20, 20);
        });

        // 먹이 그리기
        ctx.fillStyle = '#e53e3e';
        ctx.fillRect(game.food.x, game.food.y, 20, 20);
    }

    static generateSnakeFood() {
        this.snakeGame.food = {
            x: Math.floor(Math.random() * 20) * 20,
            y: Math.floor(Math.random() * 20) * 20
        };
    }

    static handleSnakeKeyPress(e) {
        if (!this.snakeGame.gameRunning) return;

        switch(e.key) {
            case 'ArrowUp':
                if (this.snakeGame.direction.y === 0) this.snakeGame.direction = {x: 0, y: -20};
                break;
            case 'ArrowDown':
                if (this.snakeGame.direction.y === 0) this.snakeGame.direction = {x: 0, y: 20};
                break;
            case 'ArrowLeft':
                if (this.snakeGame.direction.x === 0) this.snakeGame.direction = {x: -20, y: 0};
                break;
            case 'ArrowRight':
                if (this.snakeGame.direction.x === 0) this.snakeGame.direction = {x: 20, y: 0};
                break;
        }
    }

    static resetSnakeGame() {
        // 기존 게임 루프 정리
        if (this.snakeGame && this.snakeGame.gameLoop) {
            clearInterval(this.snakeGame.gameLoop);
        }

        // 게임 재시작
        this.startSnakeGame();
    }

    // 퐁 게임
    static initPongGame(container) {
        container.innerHTML = `
            <div style="text-align: center;">
                <canvas id="pong-canvas" width="600" height="400" style="border: 2px solid #333; background: #1a1a1a;"></canvas>
                <div style="margin-top: 20px;">
                    <div id="pong-score" style="color: #fff; font-size: 18px; margin-bottom: 10px;">플레이어: 0 - 컴퓨터: 0</div>
                    <button onclick="resetPongGame()" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">새 게임</button>
                </div>
                <div style="color: #ccc; font-size: 14px; margin-top: 10px;">
                    W/S (플레이어), 방향키 ↑/↓ (컴퓨터) | 스페이스바: 일시정지
                </div>
            </div>
        `;

        this.startPongGame();
    }

    static startPongGame() {
        const canvas = document.getElementById('pong-canvas');
        const ctx = canvas.getContext('2d');

        // 기존 이벤트 리스너 제거 (중복 방지)
        if (this.pongKeyDownHandler) {
            document.removeEventListener('keydown', this.pongKeyDownHandler);
        }
        if (this.pongKeyUpHandler) {
            document.removeEventListener('keyup', this.pongKeyUpHandler);
        }

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
            paused: false,
            gameLoop: null
        };

        // 키보드 이벤트 핸들러 저장
        this.pongKeys = {};
        this.pongKeyDownHandler = (e) => {
            this.pongKeys[e.key] = true;
            if (e.key === ' ') {
                e.preventDefault();
                this.pongGame.paused = !this.pongGame.paused;
            }
        };

        this.pongKeyUpHandler = (e) => {
            this.pongKeys[e.key] = false;
        };

        document.addEventListener('keydown', this.pongKeyDownHandler);
        document.addEventListener('keyup', this.pongKeyUpHandler);

        this.pongGame.gameLoop = setInterval(() => this.updatePongGame(ctx, canvas), 1000 / 60);
    }

    static updatePongGame(ctx, canvas) {
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

    static resetPongBall() {
        const game = this.pongGame;
        game.ballX = game.ballX < 300 ? 100 : 500;
        game.ballY = 200;
        game.ballSpeedX = game.ballX < 300 ? 5 : -5;
        game.ballSpeedY = (Math.random() - 0.5) * 6;
        document.getElementById('pong-score').textContent = `플레이어: ${game.playerScore} - 컴퓨터: ${game.computerScore}`;
    }

    static drawPongGame(ctx, canvas) {
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

    static resetPongGame() {
        // 기존 게임 루프 정리
        if (this.pongGame && this.pongGame.gameLoop) {
            clearInterval(this.pongGame.gameLoop);
        }

        // 게임 재시작
        this.startPongGame();
    }
}
