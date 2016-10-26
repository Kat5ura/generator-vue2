<template>
  <div id="main">
    <mt-header title="登录">
      <div slot="left">
        <a @click="back">
          <mt-button icon="back">返回</mt-button>
        </a>
      </div>
    </mt-header>
    <div id="contents">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import store from './vuex/store'
  import {Header, Button} from 'mint-ui'
  export default {
    components: {
      [Header.name]: Header,
      [Button.name]: Button
    },

    store,

    methods: {
      back () {
        // do something back
      }
    }
  }
</script>

<style>
  html {
    height: 100%;
  }

  body {
  }

  #main {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
  }

  .header {
    width: 100%;
  }
</style>
