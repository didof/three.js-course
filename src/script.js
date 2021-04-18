import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import './style.css'

const canvas = document.getElementById('canvas')

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  getRatio() {
    return this.width / this.height
  },
}

const scene = new THREE.Scene()

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xfffff })
)
mesh.rotation.reorder('YXZ')
mesh.add(new THREE.AxesHelper(3))
scene.add(mesh)

const camera = new THREE.PerspectiveCamera(45, sizes.getRatio(), 0.1, 100)
camera.position.z = 5

const controls = new OrbitControls(camera, canvas)
// controls.target.y = 2
// controls.update()
controls.enableDamping = true // requires the controls updating in the render

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(sizes.getRatio())

const clock = new THREE.Clock()
const tick = () => {
  controls.update()
  const et = clock.getElapsedTime()

  mesh.rotation.y = et

  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()
