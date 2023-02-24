import Lights from '../classes/Lights'
import Layout from '../classes/Layout'
import ImageAI from '../classes/ImageAI'

import Box from '../classes/Box'
import ParticlesSystem from '../classes/ParticlesSystem'

export const initWorldPipelineModule = () => {
  const init = () => {
    try {
      ImageAI.init()
    } catch (error) {
      console.log({ error })
    }
    Layout.init()
    Lights.init()
    // Box.init()
    // ParticlesSystem.init()

    console.log('✨', 'World ready')
  }

  const render = () => {
    // ParticlesSystem?.update()
    ImageAI?.update()
  }

  return {
    name: 'world-content',

    onStart: () => init(),

    onRender: () => render(),
  }
}
