import './style.css'

import * as THREE from 'three'

const canvas = document.getElementById('canvas')

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xfffff })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x = 0.7
mesh.position.y = -0.6
mesh.position.z = -1
scene.add(mesh)

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
)

// # POSITION

// set position - method 1
camera.position.y = 1
camera.position.x = 1
camera.position.z = 3

// set position - method 2
mesh.position.set(0.7, -0.6, 10)

const distanceFromOrigin = mesh.position.length()
const distanceFromVector = mesh.position.distanceTo(new THREE.Vector3(0, 1, 2))
const distanceFromCamera = mesh.position.distanceTo(camera.position)
mesh.position.normalize()
const distanceFromOriginAfterNormalization = mesh.position.length()

console.log('distance from origin', distanceFromOrigin)
console.log('distance from vector', distanceFromVector)
console.log('distance from camera', distanceFromCamera)
console.log('after normalization', distanceFromOriginAfterNormalization)

// # SCALE

// set scale - method 1
mesh.scale.x = 2
mesh.scale.y = 0.3
mesh.scale.z = 0.5

// set scale - method 2
mesh.scale.set(0.1, 0.1, 0.1)

// # ROTATION

// set rotation - method 1 (Euler)
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.75
mesh.rotation.z = Math.PI * 0.5

// changing the order of axis
mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.75
mesh.rotation.z = Math.PI * 0.5

// set rotation - method 2 (lookAt)
camera.lookAt(mesh.position)

// grouping
const g = new THREE.BoxGeometry(1, 1, 1)
const cube1 = new THREE.Mesh(
  g,
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
const cube2 = new THREE.Mesh(
  g,
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
const cube3 = new THREE.Mesh(
  g,
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
cube1.position.set(-1, 0, 0)
cube2.position.set(1, 0, 0)
cube3.position.set(0, 1, 0)

const cubeGroup = new THREE.Group()
cubeGroup.add(cube1)
cubeGroup.add(cube2)
cubeGroup.add(cube3)

cubeGroup.scale.set(0.5, 0.5, 0.5)
scene.add(cubeGroup)

// axes Helper
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.innerWidth / window.innerHeight)
renderer.render(scene, camera)
