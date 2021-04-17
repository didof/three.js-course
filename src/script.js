import './style.css'

import * as THREE from 'three'

const canvas = document.getElementById('canvas')

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xfffff })
const mesh = new THREE.Mesh(geometry, material)
mesh.rotation.x = 2
mesh.rotation.z = 2

scene.add(mesh)

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)
