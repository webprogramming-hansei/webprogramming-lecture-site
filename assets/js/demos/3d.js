// 3D 데모 모듈
export class ThreeDemos {
    // 회전하는 큐브
    static initRotatingCube(container) {
        try {
            console.log('Initializing rotating cube...');
            container.innerHTML = '<div id="three-container" style="width: 100%; height: 400px; position: relative; background: #f0f0f0; border: 1px solid #ccc;"></div>';

            // DOM이 완전히 로드될 때까지 대기
            setTimeout(() => {
                const containerDiv = document.getElementById('three-container');
                if (!containerDiv) {
                    console.error('Container div not found');
                    return;
                }

                // 컨테이너 크기 재확인
                const width = Math.max(container.clientWidth, 600); // 최소 너비 600px
                const height = 400;

                console.log('Container dimensions:', width, 'x', height);

                // Three.js 씬 설정
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ antialias: true });

                renderer.setSize(width, height);
                renderer.setClearColor(0xf0f0f0, 1);

                containerDiv.appendChild(renderer.domElement);
                console.log('Renderer canvas added to container');

                // 큐브 생성
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshPhongMaterial({
                    color: 0x00ff88,
                    shininess: 100
                });
                const cube = new THREE.Mesh(geometry, material);
                scene.add(cube);
                console.log('Cube added to scene');

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
                console.log('Animation started');

                // 창 크기 조정
                window.addEventListener('resize', () => {
                    const newWidth = Math.max(container.clientWidth, 600);
                    camera.aspect = newWidth / height;
                    camera.updateProjectionMatrix();
                    renderer.setSize(newWidth, height);
                });
            }, 100); // 100ms 대기

        } catch (error) {
            console.error('Error initializing rotating cube:', error);
            container.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #666;">
                    <div style="font-size: 48px; margin-bottom: 10px;">⚠️</div>
                    <div>3D 큐브 로딩 중 오류가 발생했습니다.</div>
                    <div style="font-size: 12px; margin-top: 10px;">브라우저가 WebGL을 지원하지 않거나 Three.js 라이브러리가 제대로 로드되지 않았습니다.</div>
                </div>
            `;
        }
    }

        // 파티클 시스템
    static initParticleSystem(container) {
        try {
            container.innerHTML = '<div id="particle-container" style="width: 100%; height: 400px; position: relative;"></div>';

            setTimeout(() => {
                const containerDiv = document.getElementById('particle-container');
                if (!containerDiv) return;

                const width = Math.max(container.clientWidth, 600);
                const height = 400;

                // Three.js 씬 설정
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ antialias: true });

                renderer.setSize(width, height);
                renderer.setClearColor(0x000000, 0);
                containerDiv.appendChild(renderer.domElement);

                camera.position.z = 5;

                // 간단한 파티클 시스템 생성
                const particleCount = 500;
                const positions = new Float32Array(particleCount * 3);
                const colors = new Float32Array(particleCount * 3);

                // 파티클 초기화
                for (let i = 0; i < particleCount; i++) {
                    const i3 = i * 3;

                    // 랜덤 위치
                    positions[i3] = (Math.random() - 0.5) * 10;
                    positions[i3 + 1] = (Math.random() - 0.5) * 10;
                    positions[i3 + 2] = (Math.random() - 0.5) * 10;

                    // 랜덤 색상
                    colors[i3] = Math.random();
                    colors[i3 + 1] = Math.random();
                    colors[i3 + 2] = Math.random();
                }

                // 파티클 지오메트리
                const geometry = new THREE.BufferGeometry();
                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

                // 파티클 머티리얼 (매우 간단한 버전)
                const material = new THREE.PointsMaterial({
                    size: 0.05,
                    vertexColors: true,
                    transparent: true,
                    opacity: 0.6
                });

                const particles = new THREE.Points(geometry, material);
                scene.add(particles);

                // 마우스 위치 추적
                const mouse = new THREE.Vector2();
                let mouseX = 0, mouseY = 0;

                const canvas = renderer.domElement;
                canvas.addEventListener('mousemove', (event) => {
                    const rect = canvas.getBoundingClientRect();
                    mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                    mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
                });

                // 클릭으로 파티클 생성
                canvas.addEventListener('click', (event) => {
                    const rect = canvas.getBoundingClientRect();
                    const clickX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                    const clickY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

                    // 클릭 위치에 새로운 파티클 추가
                    for (let i = 0; i < 50; i++) {
                        const index = Math.floor(Math.random() * particleCount);
                        const i3 = index * 3;

                        positions[i3] = clickX * 5 + (Math.random() - 0.5) * 2;
                        positions[i3 + 1] = clickY * 5 + (Math.random() - 0.5) * 2;
                        positions[i3 + 2] = (Math.random() - 0.5) * 2;
                    }
                    geometry.attributes.position.needsUpdate = true;
                });

                // 애니메이션 루프
                const animate = () => {
                    requestAnimationFrame(animate);

                    // 파티클 애니메이션
                    const time = Date.now() * 0.001;
                    for (let i = 0; i < particleCount; i++) {
                        const i3 = i * 3;
                        const x = positions[i3];
                        const y = positions[i3 + 1];

                        // 파티클 움직임 (간단한 버전)
                        positions[i3 + 2] = Math.sin(time + i * 0.1) * 0.5;
                    }
                    geometry.attributes.position.needsUpdate = true;

                    // 파티클 회전
                    particles.rotation.x += 0.001;
                    particles.rotation.y += 0.002;

                    renderer.render(scene, camera);
                };
                animate();

                // 창 크기 조정
                window.addEventListener('resize', () => {
                    const newWidth = Math.max(container.clientWidth, 600);
                    camera.aspect = newWidth / height;
                    camera.updateProjectionMatrix();
                    renderer.setSize(newWidth, height);
                });
            }, 100);

        } catch (error) {
            console.error('Error initializing particle system:', error);
            container.innerHTML = '<div style="text-align: center; padding: 20px;">파티클 시스템 로딩 중 오류가 발생했습니다.</div>';
        }
    }

    // 3D 기하학적 도형 갤러리
    static initModelViewer(container) {
        try {
            container.innerHTML = '<div id="geometry-gallery" style="width: 100%; height: 400px; position: relative;"></div>';

            setTimeout(() => {
                const containerDiv = document.getElementById('geometry-gallery');
                if (!containerDiv) return;

                const width = Math.max(container.clientWidth, 600);
                const height = 400;

                // Three.js 씬 설정
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ antialias: true });

                renderer.setSize(width, height);
                renderer.setClearColor(0xf0f0f0, 1);
                containerDiv.appendChild(renderer.domElement);

                // 조명 설정
                const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
                scene.add(ambientLight);

                const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
                directionalLight.position.set(1, 1, 1);
                scene.add(directionalLight);

                camera.position.set(0, 0, 8);

                // 다양한 기하학적 도형들 생성
                const geometries = [
                    {
                        name: '큐브',
                        geometry: new THREE.BoxGeometry(1, 1, 1),
                        material: new THREE.MeshPhongMaterial({ color: 0xff6b6b }),
                        position: [-3, 1, 0]
                    },
                    {
                        name: '구',
                        geometry: new THREE.SphereGeometry(0.8, 32, 32),
                        material: new THREE.MeshPhongMaterial({ color: 0x4ecdc4 }),
                        position: [0, 1, 0]
                    },
                    {
                        name: '원통',
                        geometry: new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32),
                        material: new THREE.MeshPhongMaterial({ color: 0x45b7d1 }),
                        position: [3, 1, 0]
                    },
                    {
                        name: '원뿔',
                        geometry: new THREE.ConeGeometry(0.8, 1.5, 32),
                        material: new THREE.MeshPhongMaterial({ color: 0xf9ca24 }),
                        position: [-3, -1, 0]
                    },
                    {
                        name: '도넛',
                        geometry: new THREE.TorusGeometry(0.6, 0.3, 16, 100),
                        material: new THREE.MeshPhongMaterial({ color: 0xf0932b }),
                        position: [0, -1, 0]
                    },
                    {
                        name: '옥타헤드론',
                        geometry: new THREE.OctahedronGeometry(0.8),
                        material: new THREE.MeshPhongMaterial({ color: 0xeb4d4b }),
                        position: [3, -1, 0]
                    }
                ];

                const meshes = [];

                // 각 도형 생성 및 추가
                geometries.forEach((item, index) => {
                    const mesh = new THREE.Mesh(item.geometry, item.material);
                    mesh.position.set(...item.position);
                    mesh.userData = { name: item.name, originalScale: 1, index: index };
                    scene.add(mesh);
                    meshes.push(mesh);
                });

                // 마우스 인터랙션
                const raycaster = new THREE.Raycaster();
                const mouse = new THREE.Vector2();
                let selectedMesh = null;

                const canvas = renderer.domElement;
                canvas.addEventListener('mousemove', (event) => {
                    const rect = canvas.getBoundingClientRect();
                    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

                    raycaster.setFromCamera(mouse, camera);
                    const intersects = raycaster.intersectObjects(meshes);

                    // 이전 선택 해제
                    if (selectedMesh) {
                        selectedMesh.scale.setScalar(1);
                        selectedMesh = null;
                    }

                    // 새로운 선택
                    if (intersects.length > 0) {
                        selectedMesh = intersects[0].object;
                        selectedMesh.scale.setScalar(1.2);
                        canvas.style.cursor = 'pointer';
                    } else {
                        canvas.style.cursor = 'default';
                    }
                });

                canvas.addEventListener('click', (event) => {
                    const rect = canvas.getBoundingClientRect();
                    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

                    raycaster.setFromCamera(mouse, camera);
                    const intersects = raycaster.intersectObjects(meshes);

                    if (intersects.length > 0) {
                        const clickedMesh = intersects[0].object;
                        // 클릭된 도형을 앞으로 가져오기
                        clickedMesh.position.z = 2;
                        setTimeout(() => {
                            clickedMesh.position.z = geometries[clickedMesh.userData.index].position[2];
                        }, 1000);
                    }
                });

                // 애니메이션 루프
                const animate = () => {
                    requestAnimationFrame(animate);

                    // 각 도형들 회전
                    meshes.forEach((mesh, index) => {
                        mesh.rotation.x += 0.005 * (index + 1);
                        mesh.rotation.y += 0.007 * (index + 1);
                    });

                    // 카메라 약간 회전
                    camera.position.x = Math.sin(Date.now() * 0.0005) * 0.5;
                    camera.lookAt(0, 0, 0);

                    renderer.render(scene, camera);
                };
                animate();

                // 창 크기 조정
                window.addEventListener('resize', () => {
                    const newWidth = Math.max(container.clientWidth, 600);
                    camera.aspect = newWidth / height;
                    camera.updateProjectionMatrix();
                    renderer.setSize(newWidth, height);
                });
            }, 100);

        } catch (error) {
            console.error('Error initializing geometry gallery:', error);
            container.innerHTML = '<div style="text-align: center; padding: 20px;">3D 기하학적 도형 갤러리 로딩 중 오류가 발생했습니다.</div>';
        }
    }

    static loadModel(file, loader, scene, defaultCube, callback) {
        const url = URL.createObjectURL(file);

        loader.load(
            url,
            (gltf) => {
                // 기존 모델 제거
                if (defaultCube) {
                    scene.remove(defaultCube);
                }

                // 새로운 모델 추가
                const model = gltf.scene;
                scene.add(model);

                // 모델 크기 조정
                const box = new THREE.Box3().setFromObject(model);
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 2 / maxDim;
                model.scale.setScalar(scale);

                // 모델 중앙 정렬
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center.multiplyScalar(scale));

                callback(model);

                // 임시 URL 해제
                URL.revokeObjectURL(url);
            },
            (progress) => {
                console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
            },
            (error) => {
                console.error('Model loading error:', error);
                alert('모델 로딩 중 오류가 발생했습니다.');
                URL.revokeObjectURL(url);
            }
        );
    }
}
