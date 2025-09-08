// 애니메이션 데모 모듈
export class AnimationDemos {
    // CSS 애니메이션 데모
    static initCssAnimations(container) {
        container.innerHTML = `
            <div style="text-align: center;">
                <div style="margin-bottom: 20px;">
                    <button onclick="startBounce()" style="margin: 5px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">바운스</button>
                    <button onclick="startRotate()" style="margin: 5px; padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">회전</button>
                    <button onclick="startPulse()" style="margin: 5px; padding: 10px 20px; background: #ffc107; color: black; border: none; border-radius: 5px; cursor: pointer;">펄스</button>
                    <button onclick="startShake()" style="margin: 5px; padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">흔들기</button>
                    <button onclick="stopAnimation()" style="margin: 5px; padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">정지</button>
                </div>
                <div id="animation-box" style="width: 100px; height: 100px; background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); margin: 50px auto; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                    CSS
                </div>
                <div style="margin-top: 20px; color: #666; font-size: 14px;">
                    다양한 CSS 애니메이션 효과를 체험해보세요!
                </div>
            </div>
        `;

        this.setupCssAnimations();
    }

    static setupCssAnimations() {
        const box = document.getElementById('animation-box');
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-30px); }
                60% { transform: translateY(-15px); }
            }

            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                20%, 40%, 60%, 80% { transform: translateX(10px); }
            }

            .bounce { animation: bounce 2s infinite; }
            .rotate { animation: rotate 2s linear infinite; }
            .pulse { animation: pulse 1s ease-in-out infinite; }
            .shake { animation: shake 0.5s ease-in-out infinite; }
        `;
        document.head.appendChild(style);
    }

    // CSS 애니메이션 제어 메서드들
    static startBounceAnimation() {
        const box = document.getElementById('animation-box');
        if (box) {
            this.stopCssAnimation();
            box.classList.add('bounce');
        }
    }

    static startRotateAnimation() {
        const box = document.getElementById('animation-box');
        if (box) {
            this.stopCssAnimation();
            box.classList.add('rotate');
        }
    }

    static startPulseAnimation() {
        const box = document.getElementById('animation-box');
        if (box) {
            this.stopCssAnimation();
            box.classList.add('pulse');
        }
    }

    static startShakeAnimation() {
        const box = document.getElementById('animation-box');
        if (box) {
            this.stopCssAnimation();
            box.classList.add('shake');
        }
    }

    static stopCssAnimation() {
        const box = document.getElementById('animation-box');
        if (box) {
            box.className = ''; // 모든 클래스 제거
        }
    }

    // Web Animations API 데모
    static initWebAnimations(container) {
        container.innerHTML = `
            <div style="text-align: center;">
                <div style="margin-bottom: 20px;">
                    <button onclick="startKeyframe()" style="margin: 5px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">키프레임</button>
                    <button onclick="startSequence()" style="margin: 5px; padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">시퀀스</button>
                    <button onclick="startParallel()" style="margin: 5px; padding: 10px 20px; background: #ffc107; color: black; border: none; border-radius: 5px; cursor: pointer;">병렬</button>
                    <button onclick="startMorph()" style="margin: 5px; padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">모핑</button>
                    <button onclick="stopWebAnimation()" style="margin: 5px; padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">정지</button>
                </div>
                <div id="web-animation-container" style="position: relative; width: 400px; height: 300px; margin: 0 auto; border: 2px solid #333; background: #f8f9fa; overflow: hidden;">
                    <div id="web-animation-box" style="width: 50px; height: 50px; background: linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 100%); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                        WA
                    </div>
                </div>
                <div style="margin-top: 20px; color: #666; font-size: 14px;">
                    Web Animations API를 활용한 고성능 애니메이션을 체험해보세요!
                </div>
            </div>
        `;

        this.setupWebAnimations();
    }

    static setupWebAnimations() {
        this.webAnimationBox = document.getElementById('web-animation-box');
        this.currentAnimation = null;
    }

    static startKeyframeAnimation() {
        if (this.currentAnimation) this.currentAnimation.cancel();

        this.currentAnimation = this.webAnimationBox.animate([
            { transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', background: 'linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 100%)' },
            { transform: 'translate(-50%, -50%) scale(1.5) rotate(180deg)', background: 'linear-gradient(45deg, #4ecdc4 0%, #ff6b6b 100%)' },
            { transform: 'translate(-50%, -50%) scale(1) rotate(360deg)', background: 'linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 100%)' }
        ], {
            duration: 2000,
            iterations: Infinity,
            easing: 'ease-in-out'
        });
    }

    static startSequenceAnimation() {
        if (this.currentAnimation) this.currentAnimation.cancel();

        const container = document.getElementById('web-animation-container');

        // 순차 애니메이션
        this.currentAnimation = this.webAnimationBox.animate([
            { transform: 'translate(0, 125px) scale(1)', offset: 0 },
            { transform: 'translate(175px, 125px) scale(1.2)', offset: 0.25 },
            { transform: 'translate(175px, 0) scale(0.8)', offset: 0.5 },
            { transform: 'translate(0, 0) scale(1)', offset: 0.75 },
            { transform: 'translate(0, 125px) scale(1)', offset: 1 }
        ], {
            duration: 4000,
            iterations: Infinity,
            easing: 'ease-in-out'
        });
    }

    static startParallelAnimation() {
        if (this.currentAnimation) this.currentAnimation.cancel();

        // 병렬 애니메이션들
        const animations = [
            this.webAnimationBox.animate([
                { transform: 'translate(-50%, -50%) rotate(0deg)' },
                { transform: 'translate(-50%, -50%) rotate(360deg)' }
            ], {
                duration: 2000,
                iterations: Infinity,
                easing: 'linear'
            }),
            this.webAnimationBox.animate([
                { background: 'linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 100%)' },
                { background: 'linear-gradient(45deg, #4ecdc4 0%, #ff6b6b 100%)' },
                { background: 'linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 100%)' }
            ], {
                duration: 3000,
                iterations: Infinity,
                easing: 'ease-in-out'
            })
        ];

        this.currentAnimation = animations[0]; // 첫 번째 애니메이션을 참조로 저장
    }

    static startMorphAnimation() {
        if (this.currentAnimation) this.currentAnimation.cancel();

        this.currentAnimation = this.webAnimationBox.animate([
            { borderRadius: '50%', width: '50px', height: '50px' },
            { borderRadius: '0%', width: '100px', height: '30px' },
            { borderRadius: '50%', width: '50px', height: '50px' }
        ], {
            duration: 2000,
            iterations: Infinity,
            easing: 'ease-in-out'
        });
    }

    static stopWebAnimation() {
        if (this.currentAnimation) {
            this.currentAnimation.cancel();
            this.currentAnimation = null;
        }
    }

    // 파티클 시스템 데모
    static initParticleSystem(container) {
        container.innerHTML = `
            <div style="text-align: center;">
                <div style="margin-bottom: 20px;">
                    <button onclick="startParticles()" style="margin: 5px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">파티클 시작</button>
                    <button onclick="stopParticles()" style="margin: 5px; padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">정지</button>
                    <button onclick="clearParticles()" style="margin: 5px; padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">지우기</button>
                </div>
                <canvas id="particle-canvas" width="600" height="400" style="border: 2px solid #333; background: #000; cursor: pointer; display: block; margin: 0 auto;"></canvas>
                <div style="margin-top: 10px; color: #666; font-size: 14px;">
                    캔버스를 클릭하여 파티클을 생성해보세요!
                </div>
            </div>
        `;

        this.setupParticleSystem();
    }

    static setupParticleSystem() {
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');

        // 파티클 시스템 상태 초기화
        this.particles = [];
        this.animationId = null;
        this.isRunning = false;

        canvas.addEventListener('click', (e) => {
            if (!this.isRunning) return;

            const rect = canvas.getBoundingClientRect();

            // Canvas의 실제 크기와 표시 크기의 비율 계산
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            // 마우스 좌표를 Canvas 좌표계로 변환
            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;

            // 클릭 위치에 파티클 생성
            for (let i = 0; i < 20; i++) {
                this.particles.push({
                    x: x,
                    y: y,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    life: 100,
                    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
                    size: Math.random() * 5 + 2
                });
            }
        });
    }

    static startParticleAnimation() {
        if (this.animationId) return;

        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        this.isRunning = true;

        const animate = () => {
            if (!this.isRunning) return;

            // 반투명 검은색으로 이전 프레임 fade out
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 파티클 업데이트 및 그리기
            this.particles = this.particles.filter(particle => {
                // 파티클 위치 업데이트
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.1; // 중력 효과
                particle.life--;

                // 파티클 그리기
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.life / 100; // 생명에 따른 투명도
                ctx.fill();
                ctx.globalAlpha = 1;

                // 화면 밖으로 나가거나 생명이 다한 파티클 제거
                return particle.life > 0 &&
                       particle.x > -particle.size &&
                       particle.x < canvas.width + particle.size &&
                       particle.y > -particle.size &&
                       particle.y < canvas.height + particle.size;
            });

            // 다음 프레임 요청
            if (this.isRunning && this.particles.length > 0) {
                this.animationId = requestAnimationFrame(animate);
            } else {
                this.animationId = null;
            }
        };

        // 애니메이션 시작
        animate();
    }

    static stopParticleAnimation() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    static clearParticleCanvas() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.particles = [];
    }
}
