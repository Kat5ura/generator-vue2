import Vue from 'vue'
import App from 'src/App'

describe('App.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#main h1').textContent)
      .to.equal('登录')
  })
})
