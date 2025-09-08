// Canvas 데모 모듈
export class CanvasDemos {
    // 드로잉 앱
    static initDrawingApp(container) {
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
                <canvas id="drawing-canvas" width="600" height="400" style="border: 2px solid #333; background: #fff; cursor: crosshair; display: block; margin: 0 auto;"></canvas>
                <div style="margin-top: 10px; color: #666; font-size: 14px;">
                    마우스로 드래그하여 그림을 그려보세요!
                </div>
            </div>
        `;

        this.startDrawingApp();
    }

    static startDrawingApp() {
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
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            // 터치 좌표를 Canvas 좌표계로 변환
            const canvasX = (touch.clientX - rect.left) * scaleX;
            const canvasY = (touch.clientY - rect.top) * scaleY;

            // 직접 드로잉 시작 (마우스 이벤트 시뮬레이션 대신)
            this.drawing.isDrawing = true;
            this.drawing.lastX = canvasX;
            this.drawing.lastY = canvasY;
        });

        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (!this.drawing.isDrawing) return;

            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            // 터치 좌표를 Canvas 좌표계로 변환
            const currentX = (touch.clientX - rect.left) * scaleX;
            const currentY = (touch.clientY - rect.top) * scaleY;

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
        });

        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.drawing.isDrawing = false;
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

    static clearDrawing() {
        const canvas = document.getElementById('drawing-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    static startDrawing(e, canvas) {
        this.drawing.isDrawing = true;
        const rect = canvas.getBoundingClientRect();

        // Canvas의 실제 크기와 표시 크기의 비율 계산
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        // 마우스 좌표를 Canvas 좌표계로 변환
        this.drawing.lastX = (e.clientX - rect.left) * scaleX;
        this.drawing.lastY = (e.clientY - rect.top) * scaleY;
    }

    static draw(e, canvas, ctx) {
        if (!this.drawing.isDrawing) return;

        const rect = canvas.getBoundingClientRect();

        // Canvas의 실제 크기와 표시 크기의 비율 계산
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        // 마우스 좌표를 Canvas 좌표계로 변환
        const currentX = (e.clientX - rect.left) * scaleX;
        const currentY = (e.clientY - rect.top) * scaleY;

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

    static stopDrawing() {
        this.drawing.isDrawing = false;
    }

    // 이미지 조작
    static initImageManipulation(container) {
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

    static setupImageManipulation() {
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

    static applyFilter(filterType) {
        const canvas = document.getElementById('image-canvas');
        if (!canvas || !this.originalImageData) return;

        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        switch (filterType) {
            case 'grayscale':
                for (let i = 0; i < data.length; i += 4) {
                    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
                    data[i] = gray;
                    data[i + 1] = gray;
                    data[i + 2] = gray;
                }
                break;
            case 'sepia':
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
                    data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
                    data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
                }
                break;
            case 'blur':
                // 간단한 블러 효과
                const tempData = new Uint8ClampedArray(data);
                for (let y = 1; y < canvas.height - 1; y++) {
                    for (let x = 1; x < canvas.width - 1; x++) {
                        const idx = (y * canvas.width + x) * 4;
                        for (let c = 0; c < 3; c++) {
                            const sum = tempData[idx - 4 + c] + tempData[idx + 4 + c] +
                                       tempData[idx - canvas.width * 4 + c] + tempData[idx + canvas.width * 4 + c];
                            data[idx + c] = sum / 4;
                        }
                    }
                }
                break;
            case 'brightness':
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = Math.min(255, data[i] * 1.2);
                    data[i + 1] = Math.min(255, data[i + 1] * 1.2);
                    data[i + 2] = Math.min(255, data[i + 2] * 1.2);
                }
                break;
        }

        ctx.putImageData(imageData, 0, 0);
    }

    static resetImage() {
        const canvas = document.getElementById('image-canvas');
        if (!canvas || !this.originalImageData) return;

        const ctx = canvas.getContext('2d');
        ctx.putImageData(this.originalImageData, 0, 0);
    }
}
