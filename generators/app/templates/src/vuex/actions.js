/**
 * Created by liuqi453 on 10/12/16.
 */
import Vue from 'vue'
import url from '../config/url'

const ASYNC_ACTION = ({commit, state}, payload) => {
  return Vue.http.post(url.test, {})
}

export default {
  ASYNC_ACTION
}
