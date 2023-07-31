import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./style.css";
// Create Camera
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  1,
  1500
);
// Position Camera
camera.position.set(0, 5, 5);
// Góc nhìn of camera
camera.lookAt(0, 0, 0);

// RENDERER 3D
// antialias: true, chống nhoè cho đối tượng 3D
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
  antialias: true,
});

// Thiết lập tỷ lệ điểm ảnh chính xác và sắc nét trên mọi thiết bị có mật độ điểm ảnh khác nhau
renderer.setPixelRatio(window.devicePixelRatio);
// Set size cho object 3D
renderer.setSize(window.innerWidth, window.innerHeight);

// SCENE - Bối cảnh;
const scene: THREE.Scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 12, 0x888888, 0x444444));

// ORBITAL CONTROLS -- Điều khiển camera control
const control = new OrbitControls(camera, renderer.domElement);

const texture = new THREE.TextureLoader().load("hoa.jpg");

// Cube - Khối lập phương
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshLambertMaterial({ map: texture })
);
cube.position.x -= 2;
scene.add(cube);

// Khối lập phương Cone
const cone = new THREE.Mesh(
  new THREE.ConeGeometry(0.5, 1, 32),
  new THREE.MeshLambertMaterial({ color: 0x00ffff })
);
cone.position.z += 2;
scene.add(cone);
// Khối lập phương sphere;
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.75, 32, 32),
  new THREE.MeshPhongMaterial({ color: 0xffff00 })
);
sphere.position.x += 2;
scene.add(sphere);

// Khối lập phương Torus
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.5, 0.1, 16, 32),
  new THREE.MeshPhongMaterial({ color: 0xffa500 })
);
torus.position.z -= 2;
scene.add(torus);

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.z += 5;
const target = new THREE.Object3D();
target.position.x += 3;
light.target = target;

scene.add(target);
scene.add(light);

scene.background = new THREE.Color(0xffa500);

var mixer: THREE.AnimationMixer;
const loader = new GLTFLoader();
loader.loadAsync("CesiumMan.glb").then((gltf) => {
  mixer = new THREE.AnimationMixer(gltf.scene);
  var action = mixer.clipAction(gltf.animations[0]);
  action.play();
  scene.add(gltf.scene);
});

const clock = new THREE.Clock();

// Animation Loop Infinity
const animate = () => {
  requestAnimationFrame(animate);

  cube.rotation.y += 0.01;
  torus.rotation.y += 0.01;

  const detal = clock.getDelta();
  mixer.update(detal);
  renderer.render(scene, camera);
};

// Resize scene chính xác trên mọi thiết bị
const handleWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  //Cập nhật lại ma trận chiếu của camera
  camera.updateProjectionMatrix();
  // Update size new khi handleResize callback
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", handleWindowResize);

const container = document.createElement("div");
document.body.appendChild(container);
container.appendChild(renderer.domElement);

animate();
