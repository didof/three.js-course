import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import gui, { guify } from './gui'

import doorColorSource from '/static/textures/door/color.jpg'
import doorAlphaSource from '/static/textures/door/alpha.jpg'
import doorHeightSource from '/static/textures/door/height.jpg'
import doorMetalnessSource from '/static/textures/door/metalness.jpg'
import doorNormalSource from '/static/textures/door/normal.jpg'
import doorRoughnessSource from '/static/textures/door/roughness.jpg'
import doorAmbientOcclusionSource from '/static/textures/door/ambientOcclusion.jpg'
// import checkerboard from '/static/textures/checkerboard-8x8.png'
// import checkerboard2 from '/static/textures/checkerboard-1024x1024.png'
import minecraftSource from '/static/textures/minecraft.png'

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
 * Texture
 *
 * ~ Method 1 ~ manually update when image is loaded
 *
 * const image = new Image()
 * const texture = new THREE.Texture(image)
 * image.onload = () => {
 * texture.needsUpdate = true
 * }
 * image.src = imageSource
 *
 *
 *
 * ~ Method 2 ~ TextureLoader
 *
 * const textureLoader = new THREE.TextureLoader()
 * const load = () => console.log('load')
 * const progress = () => console.log('progress')
 * const error = () => console.log('error')
 * const texture = textureLoader.load(imageSource, load, progress, error)
 *
 */

// ~ Method 3 ~ TextureLoader + LoadingManager
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => console.log('onStart')
loadingManager.onProgress = () => console.log('onProgress')
loadingManager.onLoad = () => console.log('onLoad')
loadingManager.onError = () => console.log('onError')
const textureLoader = new THREE.TextureLoader(loadingManager)

const colorTexture = textureLoader.load(minecraftSource)
colorTexture.minFilter = THREE.NearestFilter
colorTexture.generateMipmaps = false
colorTexture.magFilter = THREE.NearestFilter

/**
 * ~ Transformations ~
 *
 * colorTexture.repeat.x = 2
 * colorTexture.repeat.y = 3
 * colorTexture.wrapS = THREE.MirroredRepeatWrapping
 * colorTexture.wrapT = THREE.RepeatWrapping
 * colorTexture.offset.x = 0.5
 * colorTexture.rotation = Math.PI * 0.3
 * colorTexture.center.x = 0.5
 * colorTexture.center.y = 0.5
 *
 *
 *
 * ~ Filtering & Mipmapping ~
 *
 * colorTexture.minFilter = THREE.LinearFilter
 * colorTexture.minFilter = THREE.NearestFilter
 * colorTexture.minFilter = THREE.NearestMipmapLinearFilter
 * colorTexture.minFilter = THREE.NearestMipMapNearestFilter
 * colorTexture.minFilter = THREE.LinearMipMapNearestFilter
 * colorTexture.minFilter = THREE.LinearMipMapLinearFilter // default
 *
 * If using .minFilter = THREE.NearestFilter there is no need for mipmapping;
 * thus, tell THREE to not waste resource in creating those.
 * .generateMipmaps = false
 *
 *
 * colorTexture.magFilter = THREE.LinearFilter // default
 * colorTexture.magFilter = THREE.NearestFilter // better performance
 *
 *
 *
 * ~ Performance ~
 *
 * jpg > png, performance speaking
 * Compress textures: https://tinypng.com/
 * Because of mipMapping (splitting in half the texture until 1x1) it's reccommended to use pow of 2 sizes.
 */

/**
 * Scene
 */
const scene = new THREE.Scene()

const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  // color: parameters.color
  map: colorTexture,
})
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
