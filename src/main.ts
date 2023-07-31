import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//----------------------------------------------------------------

// const cursor: { x: number; y: number } = {
//   x: 0,
//   y: 0,
// };

// window.addEventListener("mousemove", (event: MouseEvent) => {
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = -(event.clientY / sizes.height - 0.5);
// });
const canvas: any = document.querySelector("canvas.webgl");
const sence = new THREE.Scene();

// // Red cube
// const geometry = new THREE.BoxGeometry(1, 1, 1);

// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// const mesh = new THREE.Mesh(geometry, material);

// // mesh.position.x = 0.7;

// // mesh.position.y = 0.6;

// // mesh.position.z = 1;

// // Method set value position
// mesh.position.set(0.7, -0.6, 1)

// // Method set scale
// mesh.scale.set(2, 0.5, 0.5);

// // Rotation
// mesh.rotation.y = Math.PI * 0.25;
// mesh.rotation.x = Math.PI * 0.25

// Groups
const group = new THREE.Group();

group.position.y = 0;
group.scale.y = 1;
group.rotation.y = 0;
sence.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(cube1);

// const cube2 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// );
// cube2.position.x = -2
// group.add(cube2);

// const cube3 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0x0000ff })
// );
// cube3.position.x = 2
// group.add(cube3);

// sence.add(mesh);

// Axes helpers
// const axesHelper = new THREE.AxesHelper();
// sence.add(axesHelper);
// Size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Events
window.addEventListener("resize", () => {
  //Update Sizes
  sizes.width = window.innerWidth;
  sizes.width = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullscreenElement = document.fullscreenElement

  if (!fullscreenElement) {
    if(canvas.requestFullscreen) {
      canvas.requestFullScreen();
    } else if(canvas.webkitRequestFullScreen) {
      canvas.webkitRequestFullScreen();
    }
  } else {
     if(document.exitFullscreen) {
      document.exitFullscreen();
     } else if(document.webkitRequestFullScreen) {
        document.webkitRequestFullScreen();
     }
  }
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;
sence.add(camera);

// camera.lookAt(mesh.position)

//Render

const controls = new OrbitControls(camera, canvas);
// controls.enableZoom
// controls.enableDamping = true
const renderer = new THREE.WebGLRenderer({
  canvas: canvas as HTMLCanvasElement | THREE.OffscreenCanvas | undefined,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// Clock

const clock = new THREE.Clock();

// gsap.to(cube1.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(cube1.position, { duration: 1, delay: 2, x: 0 });

const tick = () => {
  // // Clock
  const elapsedTime = clock.getElapsedTime();

  //Update Object
  cube1.position.y = Math.sin(elapsedTime);
  cube1.position.x = Math.cos(elapsedTime);
  camera.lookAt(cube1.position);

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.y * Math.PI * 2) * 3;
  // camera.position.y = cursor.x * 5
  // camera.lookAt(cube1.position)

  // Render
  renderer.render(sence, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
