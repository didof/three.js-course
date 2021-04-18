import './style.css'

import * as THREE from 'three'

const canvas = document.getElementById('canvas')
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  getRatio() {
    return this.width / this.height
  },
}

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xfffff })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const camera = new THREE.PerspectiveCamera(75, sizes.getRatio(), 0.1, 100)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio()

const clock = new THREE.Clock()
const tick = () => {
  const et = clock.getElapsedTime()

  mesh.rotation.y = et

  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()
