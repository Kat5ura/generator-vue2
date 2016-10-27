<template>
    <div id="<%= viewVuexName%>">

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
        name: '<%= viewVuexName%>',
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
                return this.$store.state.<%= viewVuexName%>.<%= viewVuexName%>State
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
    #<%= viewVuexName%> {

    }
</style>
