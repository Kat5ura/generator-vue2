// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Router from 'vue-router'
import Resource from 'vue-resource'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import filters from './filters'
import routerMap from './config/routers'
import {initMock, initResource, interceptRouter} from './utils'
import App from './App'

Vue.config.productionTip = false

// 实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

initMock()

Vue.use(Resource)
initResource(Vue)

Vue.use(Router)

Vue.use(MintUI)

const router = new Router({
  routes: routerMap,
  history: false,
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || {x: 0, y: 0}
  }
})

interceptRouter(router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
