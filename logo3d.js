let scene, camera, renderer, coinDisc;

function init3DLogo() {
    const canvasContainer = document.getElementById('logo-3d-canvas');
    if (!canvasContainer) return; 

    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 2.5; 

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); 
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio); 
    canvasContainer.appendChild(renderer.domElement); 

    const geometry = new THREE.CylinderGeometry(1, 1, 0.1, 32); 
    
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
        'logo.png', // Aquí busca tu logo.png
        function (texture) {
            const material = new THREE.MeshBasicMaterial({ map: texture });
            coinDisc = new THREE.Mesh(geometry, material);
            coinDisc.rotation.x = Math.PI / 2; 
            scene.add(coinDisc);
            animateLogo();
        },
        undefined, 
        function (err) {
            console.error('Error cargando el logo:', err);
            const material = new THREE.MeshBasicMaterial({ color: 0x8a2be2 });
            coinDisc = new THREE.Mesh(geometry, material);
            coinDisc.rotation.x = Math.PI / 2;
            scene.add(coinDisc);
            animateLogo();
        }
    );
}

function animateLogo() {
    requestAnimationFrame(animateLogo);
    if (coinDisc) {
        coinDisc.rotation.y += 0.01; // Velocidad de giro
    }
    renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', init3DLogo);
