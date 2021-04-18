import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import gui, { guify } from './gui'

/**
 * debug
 */
const parameters = {
  color: 0xffffff,
  spin() {
    gsap.to(mesh.rotation, { duration: 2, y: mesh.rotation.y + Math.PI * 2 })
    gsap.to(mesh.position, { duration: 1, y: mesh.position.y + 0.1 })
  },
}

/**
 * constants
 */
const canvas = document.getElementById('canvas')
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  getRatio() {
    return this.width / this.height
  },
}

/**
 * Scene
 */
const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: parameters.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.getRatio(), 0.1, 100)
camera.position.z = 5
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.update()

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Functionalities
 */
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.getRatio()
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)

  // in case application is moved across screens with different pixel ratios
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const toggleFullscreen = () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
}

window.addEventListener('dblclick', toggleFullscreen)

/**
 * Debug
 */
const guiMesh = gui.addFolder('mesh')
guiMesh.add(mesh, 'visible')
guiMesh.add(mesh.material, 'wireframe')
guiMesh.addColor(parameters, 'color').onChange(() => {
  mesh.material.color.set(parameters.color)
})
const guiAnimations = gui.addFolder('animations')
guiAnimations.add(parameters, 'spin')
guify(mesh)

const clock = new THREE.Clock()
const tick = () => {
  controls.update()
  const et = clock.getElapsedTime()

  // mesh.rotation.y = et

  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()
