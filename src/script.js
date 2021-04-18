import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvas = document.getElementById('canvas')
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  getRatio() {
    return this.width / this.height
  },
}

const scene = new THREE.Scene()

// const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2)

// const positionArray = new Float32Array(9)
// positionArray[0] = 0
// positionArray[1] = 0
// positionArray[2] = 0

// positionArray[3] = 0
// positionArray[4] = 1
// positionArray[5] = 0

// positionArray[6] = 1
// positionArray[7] = 0
// positionArray[8] = 0

// triangle
// const geometry = new THREE.BufferGeometry()
// const positionArray = new Float32Array([0, 0, 0, 0, 1, 0, 0, 0, 1])
// const positionAttribute = new THREE.BufferAttribute(positionArray, 3)
// geometry.setAttribute('position', positionAttribute)

const geometry = new THREE.BufferGeometry()
const count = 10
const totalVertices = count * 3
const totalXYZ = totalVertices * 3
const positionsArray = new Float32Array(totalXYZ)
for (let i = 0; i <= totalXYZ; i++) {
  positionsArray[i] = Math.random() - 0.5
}
const positionAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionAttribute)

const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const camera = new THREE.PerspectiveCamera(75, sizes.getRatio(), 0.1, 100)
camera.position.z = 3

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.update()

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.getRatio()
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)

  // in case application is moved across screens with different pixel ratios
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
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
})

const clock = new THREE.Clock()
const tick = () => {
  controls.update()
  const et = clock.getElapsedTime()

  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()
