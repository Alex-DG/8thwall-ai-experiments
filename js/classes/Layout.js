import ImageAI from './ImageAI'

class _Layout {
  toggleMenu() {
    if (this.menuEnabled) {
      this.inner.style.display = 'none'
      this.toggleBtn.style.background = 'transparent'
    } else {
      this.inner.style.display = 'flex'
      this.toggleBtn.style.background = 'white'
    }

    this.menuEnabled = !this.menuEnabled
  }

  toggleSpinner(show) {
    if (!show) {
      this.loading.style.display = 'none'
    } else {
      this.loading.style.display = 'flex'
    }
  }

  ////////////////////////////////////////////////////////////////////

  async asyncCall() {
    this.toggleMenu()
    this.toggleSpinner(true)

    const text = this.inputText.value
    console.log('text ->', text)
    await ImageAI.source(text)

    this.toggleSpinner(false)
  }

  ////////////////////////////////////////////////////////////////////

  setLayout() {
    document.querySelector('.menu.container').innerHTML = `
      <button id="toggle-btn"></button>

      <div class="menu inner">
        <input id="sentence" name="sentence" value="" placeholder="Type text"/>
        <button id="async-call-btn">Search 🔎</button>
      </div>
    `
    document.querySelector('.loading.container').innerHTML = `
      <div class="spinner"></div>
    `

    this.inner = document.querySelector('.menu.inner')
    this.loading = document.querySelector('.loading')
    this.inputText = document.getElementById('sentence')

    this.toggleBtn = document.getElementById('toggle-btn')
    this.toggleBtn.addEventListener('click', this.toggleMenu)

    this.asyncCallBtn = document.getElementById('async-call-btn')
    this.asyncCallBtn.addEventListener('click', this.asyncCall)
  }

  ////////////////////////////////////////////////////////////////////

  bind() {
    this.toggleSpinner = this.toggleSpinner.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.asyncCall = this.asyncCall.bind(this)
  }

  init() {
    this.menuEnabled = true

    this.bind()
    this.setLayout()
  }
}

const Layout = new _Layout()
export default Layout
