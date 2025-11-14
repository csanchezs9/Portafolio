// Scene Setup
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();

// Fog for depth - vintage feel
scene.fog = new THREE.FogExp2(0xf5f5f5, 0.015);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(5, 2, 8);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.outputEncoding = THREE.sRGBEncoding;

// Lights - Classic studio lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// Key Light
const keyLight = new THREE.PointLight(0xffffff, 1.5, 100);
keyLight.position.set(5, 5, 5);
scene.add(keyLight);

// Fill Light
const fillLight = new THREE.PointLight(0xcccccc, 1, 100);
fillLight.position.set(-5, 3, -5);
scene.add(fillLight);

// Rim Light
const rimLight = new THREE.PointLight(0x888888, 1.2, 100);
rimLight.position.set(0, 10, 0);
scene.add(rimLight);

// Directional Light
const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(10, 10, 10);
scene.add(dirLight);

// Particles System
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    color: 0x333333,
    transparent: true,
    opacity: 0.4,
    blending: THREE.NormalBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Grid Floor - Classic style
const gridHelper = new THREE.GridHelper(50, 50, 0x000000, 0x888888);
gridHelper.material.opacity = 0.15;
gridHelper.material.transparent = true;
gridHelper.position.y = -2;
scene.add(gridHelper);

// Load Porsche Model
let porsche = null;
const loader = new THREE.GLTFLoader();

loader.load(
    'free_porsche_911_carrera_4s.glb',
    (gltf) => {
        porsche = gltf.scene;

        // Scale and position
        porsche.scale.set(1.5, 1.5, 1.5);
        porsche.position.set(0, -1, 0);
        porsche.rotation.y = Math.PI / 6;

        // Apply materials - classic look
        porsche.traverse((child) => {
            if (child.isMesh) {
                child.material.metalness = 0.6;
                child.material.roughness = 0.3;
                child.material.envMapIntensity = 1.0;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        scene.add(porsche);
        console.log('Porsche loaded successfully!');
    },
    (progress) => {
        console.log('Loading...', (progress.loaded / progress.total * 100) + '%');
    },
    (error) => {
        console.error('Error loading model:', error);
    }
);

// Mouse Movement Effect
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Lenis Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Update ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update);

// Sync GSAP ticker with Lenis
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Hero Text Animation
gsap.from('.glitch', {
    opacity: 0,
    y: 100,
    duration: 1.5,
    ease: 'power4.out'
});

gsap.from('.subtitle', {
    opacity: 0,
    y: 50,
    duration: 1.5,
    delay: 0.3,
    ease: 'power4.out'
});

gsap.from('.stat', {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1.5,
    delay: 0.6,
    ease: 'power4.out'
});

// Camera Animation on Scroll - Unified smooth animation
const scrollAnimation = {
    cameraX: 5,
    cameraY: 2,
    cameraZ: 8,
    porscheRotation: Math.PI / 6,
    porscheY: -1
};

// Performance Section
gsap.to(scrollAnimation, {
    cameraX: 3,
    porscheRotation: Math.PI / 6 + Math.PI * 0.5,
    scrollTrigger: {
        trigger: '.performance',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
    }
});

// Technology Section
gsap.to(scrollAnimation, {
    cameraZ: 6,
    cameraY: 3,
    porscheRotation: Math.PI / 6 + Math.PI,
    scrollTrigger: {
        trigger: '.technology',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
    }
});

// Design Section
gsap.to(scrollAnimation, {
    cameraX: 5,
    cameraY: 2,
    cameraZ: 8,
    porscheRotation: Math.PI / 6 + Math.PI * 1.5,
    scrollTrigger: {
        trigger: '.design',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
    }
});

// Cards Animation
gsap.utils.toArray('.card').forEach((card) => {
    gsap.from(card, {
        opacity: 0,
        y: 100,
        scale: 0.8,
        duration: 1,
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true
        }
    });
});

// Tech Items Animation
gsap.utils.toArray('.tech-item').forEach((item, index) => {
    gsap.from(item, {
        opacity: 0,
        x: index % 2 === 0 ? -100 : 100,
        rotation: index % 2 === 0 ? -10 : 10,
        duration: 1.2,
        scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true
        }
    });
});

// Features Animation
gsap.from('.feature', {
    opacity: 0,
    scale: 0,
    stagger: 0.1,
    duration: 0.8,
    scrollTrigger: {
        trigger: '.design-features',
        start: 'top 70%'
    }
});

// Subtle light animation for classic feel
gsap.to(keyLight, {
    intensity: 1.8,
    duration: 3,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Rotate particles
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

    // Mouse parallax effect
    targetX = mouseX * 0.3;
    targetY = mouseY * 0.3;

    // Smooth camera movement combining scroll and mouse
    camera.position.x += (scrollAnimation.cameraX + targetX - camera.position.x) * 0.1;
    camera.position.y += (scrollAnimation.cameraY + targetY - camera.position.y) * 0.1;
    camera.position.z += (scrollAnimation.cameraZ - camera.position.z) * 0.1;

    // Camera look at center
    camera.lookAt(0, 0, 0);

    // Update Porsche from scroll animation
    if (porsche) {
        porsche.rotation.y += (scrollAnimation.porscheRotation - porsche.rotation.y) * 0.1;
        porsche.position.y += (scrollAnimation.porscheY + Math.sin(elapsedTime * 2) * 0.05 - porsche.position.y) * 0.1;
    }

    // Grid animation
    gridHelper.position.z = (elapsedTime * 2) % 2;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

console.log('%c🚗 PORSCHE 911 CARRERA 4S - CLASSIC EXPERIENCE 🚗', 'font-size: 20px; color: #000000;');
console.log('%cWeb 3D Experience Loaded!', 'font-size: 14px; color: #333333;');
