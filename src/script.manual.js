import './style.css'

import * as THREE from 'three'

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  getRatio() {
    return this.width / this.height
  },
}

/**
 * Cursor
 */
const cursor = {
  x: 0,
  y: 0,
}

window.addEventListener('mousemove', event => {
  const { clientX, clientY } = event

  cursor.x = clientX / sizes.width - 0.5
  cursor.y = -(clientY / sizes.height - 0.5)
})

const canvas = document.getElementById('canvas')

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
const mesh = new THREE.Mesh(geometry, material)
mesh.rotation.reorder('YXZ')
scene.add(mesh)

const axesHelper = new THREE.AxesHelper(3)
mesh.add(axesHelper)

// PerspectiveCamera
const camera = new THREE.PerspectiveCamera(50, sizes.getRatio())
camera.position.z = 5
camera.lookAt(mesh.position)

// // OrthographicCamera
// const aspectRatio = window.innerWidth / window.innerHeight
// const camera = new THREE.OrthographicCamera(
//   -aspectRatio,
//   aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// )
// camera.position.z = 5

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(sizes.getRatio())

const clock = new THREE.Clock()
const tick = () => {
  const et = clock.getElapsedTime()

  // Update Camera
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  camera.position.y = cursor.y * 5
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  camera.lookAt(mesh.position)

  // Update Object
  // mesh.position.y = Math.sin(et)
  // mesh.position.x = Math.cos(et)
  // mesh.position.z = Math.sin(et)
  // mesh.rotation.y = et
  // mesh.rotation.x = et
  // mesh.rotation.z = et

  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()
