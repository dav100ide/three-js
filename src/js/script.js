'use strict';
//import della libreria con namespace
import * as THREE from 'three';
// render grande quanto la finestra
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
// creo la scena
const scene = new THREE.Scene();

const windowAspectRatio = window.innerWidth / window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, windowAspectRatio, 0.1, 1000);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

camera.position.z = 5;
camera.position.y = 2;
renderer.render(scene, camera);
