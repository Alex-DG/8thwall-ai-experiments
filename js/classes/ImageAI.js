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

  async source(text) {
    try {
      const url = await DeepAiClient.stableDiffusion(text)
      //   const url =
      //     'https://api.deepai.org/job-view-file/d8b72724-5252-4f24-b216-35f8d9758acc/outputs/output.jpg'
      console.log('url -> ', url)

      const texture = await this.loadTexture(url)
      console.log('texture -> ', { texture })

      this.photo.setTexture(texture)
    } catch (error) {
      console.log({ error })
    }
  }

  init() {
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
