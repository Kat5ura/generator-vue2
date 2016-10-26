<template>
  <div id="<%= vuexName%>">

  </div>
</template>
<script>
  //  import Vue from 'vue'
  // 可以使用已下几个 Helper: mapGetters、mapState、 mapMutations、 mapActions
  import {mapState, mapGetters} from 'vuex'
  // 在此引入UI库
  import {Field} from 'mint-ui'
  import * as types from './types'

  export default {
    name: '<%= vuexName%>',
    components: {
      // 使用这种方式声明应用的UI组件
      [Field.name]: Field
    },
    data () {
      return {
        // Data
      }
    },
    computed: {
      // 计算属性
      ...mapState([
        'defaultState'
      ]),

      defaultState () {
        return this.$store.state.<%= vuexName%>.<%= vuexName%>State
      },
      ...mapGetters({
        defaultState: types.GETTER_STATE
      })
    },
    methods: {
      // 方法
    }
  }
</script>
<style>
  #<%= vuexName%> {

  }
</style>
