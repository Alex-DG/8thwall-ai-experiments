import * as THREE from 'three'

const params = {
  width: 8,
  height: 6,
  segments: 32,
}

class Photo extends THREE.Mesh {
  constructor() {
    const { width, height, segments } = params
    const geometry = new THREE.PlaneGeometry(width, height, segments, segments)
    const material = new THREE.MeshStandardMaterial({
      wireframe: true,
    })
    // const material = new ImageMaterial(texture)

    super(geometry, material)

    this.width = width
    this.height = height
    this.segments = segments
    this.ready = true
  }

  ////////////////////////////////////////////////////////

  setTexture(texture) {
    this.material.map = texture
    this.material.wireframe = false
    this.material.needsUpdate = true
    console.log('material -> ', { material: this.material })
  }

  ////////////////////////////////////////////////////////

  dispose() {
    this.ready = false

    this.material.dispose()
    this.geometry.dispose()

    XR8.Threejs.xrScene().scene.remove(this)

    this.dispose()
  }

  ////////////////////////////////////////////////////////

  updateLookAt() {
    const { camera } = XR8.Threejs.xrScene()

    this.rotation.y = Math.atan2(
      camera.position.x - this.position.x,
      camera.position.z - this.position.z
    )
  }

  updateMaterial(time, baseTexture) {
    if (!this.material) return

    this.material.uniforms.uTime.value = time

    if (baseTexture) {
      this.material.uniforms.uDisplacement.value = baseTexture.texture
    }
  }

  update(time, baseTexture) {
    if (!this.ready) return

    // this.updateMaterial(time, baseTexture)
    this.updateLookAt()
  }
}

export default Photo
