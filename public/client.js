import * as THREE from "three";
import { OrbitControls } from "/jsm/controls/OrbitControls.js";
import Stats from "/jsm/libs/stats.module.js";

let scene, camera, renderer;
let stats;
let controls;

init();
animate();

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, vsync: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    4000
  );
  camera.position.x = 1
  camera.position.y = 0
  camera.lookAt(0, 0, 0);

  controls = new OrbitControls(camera, renderer.domElement);

  const cardGeometry = new THREE.BoxGeometry(200, 200, 200);
  const cardMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
  });
  for (let i = 0; i < 20; i++) {
    const card = new THREE.Mesh(cardGeometry, cardMaterial);
    card.position.x = 1000 * Math.cos(THREE.MathUtils.degToRad((360 / 20) * i));
    card.position.z = 1000 * Math.sin(THREE.MathUtils.degToRad((360 / 20) * i));
    card.rotation.y = -THREE.MathUtils.degToRad((i * 360) / 20 + 90);
    card.material.wireframe;
    scene.add(card);
  }

  stats = Stats();
  document.body.appendChild(stats.dom);

  window.addEventListener("resize", onWindowResize);
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  stats.update();
  controls.update();

  renderer.render(scene, camera);
}
