import deepai from 'deepai'

class _DeepAiClient {
  init() {
    deepai.setApiKey(import.meta.env.VITE_DEEPAI_KEY)
  }

  async textToImage(text) {
    try {
      const response = await deepai.callStandardApi('text2img', {
        text: text,
        grid_size: '1',
      })

      console.log('* textToImage *')
      console.log(response)

      return response.output_url
    } catch (error) {
      console.log('error-textToImage', { error })
    }
  }

  async stableDiffusion(text) {
    try {
      const response = await deepai.callStandardApi('stable-diffusion', {
        text: text,
        grid_size: '1',
      })

      console.log('* stableDiffusion *')
      console.log(response)

      return response.output_url
    } catch (error) {
      console.log('error-stableDiffusion', { error })
    }
  }
}

const DeepAiClient = new _DeepAiClient()
export default DeepAiClient
