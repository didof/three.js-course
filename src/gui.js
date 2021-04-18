import * as dat from 'dat.gui'

const gui = new dat.GUI({ closed: false, width: window.innerWidth / 3 })

const meshGuiConfig = {
  position: {
    x: {
      name: 'X axis',
    },
    y: {
      name: 'Y axis',
    },
    z: {
      name: 'Z axis',
    },
  },
  rotation: {
    x: {
      name: 'X axis',
    },
    y: {
      name: 'Y axis',
    },
    z: {
      name: 'Z axis',
    },
  },
}

export const guify = (mesh, config = meshGuiConfig) => {
  const defaultValues = {
    position: {
      min: -3,
      max: 3,
      step: 0.1,
    },
    rotation: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI * 0.1,
    },
  }

  Object.keys(config).forEach(property => {
    switch (property) {
      case 'position':
      case 'rotation':
        const guiFolder = gui.addFolder(property)
        Object.keys(config[property]).forEach(subProperty => {
          const i = guiFolder.add(mesh[property], subProperty)
          const defaultConfig = defaultValues[property]
          const values = config[property][subProperty]
          Object.entries(defaultConfig).forEach(([method, value]) => {
            const v = values[method] ? values[method] : value
            i[method](v)
          })
        })
        break
      default:
        console.warn(`The property ${property} is not recognized`)
    }
  })
}

export default gui
