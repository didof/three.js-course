import './style.css'

import * as THREE from 'three'
import gsap from 'gsap'

const canvas = document.getElementById('canvas')

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xfffff })
const mesh = new THREE.Mesh(geometry, material)
mesh.rotation.x = 2
mesh.rotation.z = 2

const axesHelper = new THREE.AxesHelper(3)
mesh.add(axesHelper)

scene.add(mesh)

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
)
camera.position.z = 3

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)

let time = Date.now()

// # ANIMATIONS

// // method 1 - using native Date
// const tick = () => {
//   const currentTime = Date.now()
//   const deltaTime = currentTime - time
//   time = currentTime

//   // Update objects
//   mesh.rotation.z += 0.001 * deltaTime

//   // render
//   renderer.render(scene, camera)
//   requestAnimationFrame(tick)
// }
// tick()

// // method 2 - using THREE.Clock
// const clock = new THREE.Clock()
// const tick = () => {
//   const elapsedTime = clock.getElapsedTime()

//   mesh.rotation.z = elapsedTime * Math.PI * 2 // a full round per second
//   mesh.position.x = Math.sin(elapsedTime)
//   mesh.position.y = Math.cos(elapsedTime)

//   renderer.render(scene, camera)
//   requestAnimationFrame(tick)
// }
// tick()

// method 3 - using THREE.Clocl and gsap
const clock = new THREE.Clock()
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { duration: 1, delay: 2, x: -2 })

const tick = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()
