"use strict";
//import della libreria con namespace
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

// render grande quanto la finestra
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
// creo la scena
const scene = new THREE.Scene();

const windowAspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, windowAspectRatio, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);
//*---------add helpers---------------------
const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

camera.position.set(0, 2, 5);
orbit.update();
//*----------------add mesh----------------------------------

//box
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xeecc00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
box.position.y = 2;
function animate(time) {
   box.rotation.x = time / 1000;
   box.rotation.y = time / 1000;
   renderer.render(scene, camera);
}

//plane
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
   color: 0xf1f1f1, //
   side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

//sphere
const sphereGeometry = new THREE.SphereGeometry(0.8, 100, 100);
const spherMaterial = new THREE.MeshBasicMaterial({ color: 0xba57e1, wireframe: false });
const sphere = new THREE.Mesh(sphereGeometry, spherMaterial);
scene.add(sphere);
sphere.position.set(5, 2, -1);
//gui, serve a facilitare il setting dei valori dei mesh tramite un ui interface sul browser ai devs
const gui = new dat.GUI();

const options = {
   sphereColor: "#ba57e1",
};

gui.addColor(options, "sphereColor").onChange((e) => {
   //il parametro e contiene il colore dell'interfaccia
   sphere.material.color.set(e);
});

gui.addColor({ boxColor: "#eecc00" }, "boxColor").onChange((e) => {
   box.material.color.set(e);
});

renderer.setAnimationLoop(animate);
