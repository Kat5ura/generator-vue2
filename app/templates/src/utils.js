import Mock from 'mockjs'
import mocks from './mock'
import urls from './config/url'

export const initMock = process.env.NODE_ENV === 'development' ? () => {
  // 设置请求市场
  Mock.setup({
    timeout: '50-300'
  })

  Object.keys(mocks).forEach((key) => {
    let url = urls[key]
    let item = mocks[key]

    url = url.replace(/\.|\//g, (word) => {
      return '\\' + word
    })

    let urlReg = new RegExp(url)

    Mock.mock(urlReg, item.type || 'post', item.data)
  })
} : () => {
}

// import
// TODO
export const initResource = function (Vue) {
  Vue.http.options.root = '/'
}

export const interceptRouter = function (router) {
  router.beforeEach((to, from, next) => {
    next()
  })

  router.afterEach(() => {

  })
}
