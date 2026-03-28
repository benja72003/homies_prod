// logo3d.js
const container = document.getElementById('3d-container');

if (container) {
    // 1. Escena y Cámara
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    
    // 2. Renderizador (Fondo transparente)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 3. Controles Interactivos (Permite arrastrar y girar con el mouse)
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Movimiento suave
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Desactiva el scroll para no deformar la página

    // 4. Crear el Objeto Masivo (Un cubo grande con tu logo)
    const geometry = new THREE.BoxGeometry(3.5, 3.5, 3.5); 
    const textureLoader = new THREE.TextureLoader();
    
    textureLoader.load('logo.png', function(texture) {
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 6; // Aleja la cámara para ver el objeto completo

        // 5. Animación en bucle
        function animate() {
            requestAnimationFrame(animate);
            // Rotación automática muy lenta
            cube.rotation.y += 0.003;
            cube.rotation.x += 0.002;
            controls.update(); // Actualiza los controles del mouse
            renderer.render(scene, camera);
        }
        animate();
    });

    // Ajustar si la pantalla cambia de tamaño
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}
