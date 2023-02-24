import * as THREE from 'three'

import DeepAiClient from './AI/DeepAiClient'

import Photo from './Photo'

class _ImageAI {
  setPhoto() {
    const { scene } = XR8.Threejs.xrScene()
    this.photo = new Photo()
    scene.add(this.photo)
  }

  async loadTexture(url) {
    try {
      const textureLoader = new THREE.TextureLoader()
      textureLoader.setCrossOrigin('anonymous')
      const texture = await textureLoader.loadAsync(url)

      return texture
    } catch (error) {
      console.log({ error })
    }
  }

  async source(text, type) {
    try {
      const currentType = type || this.typeAI[0]

      let url
      switch (currentType) {
        case this.typeAI[0]:
          url = await DeepAiClient.stableDiffusion(text)
          break
      }

      console.log('url -> ', url)

      const texture = await this.loadTexture(url)
      console.log('texture -> ', { texture })

      this.photo.setTexture(texture)
    } catch (error) {
      console.log({ error })
    }
  }

  init() {
    this.typeAI = ['deepai', 'replicate']

    DeepAiClient.init()

    this.setPhoto()
  }

  update() {
    this.photo?.update()
  }

  render() {}
}

const ImageAI = new _ImageAI()
export default ImageAI
