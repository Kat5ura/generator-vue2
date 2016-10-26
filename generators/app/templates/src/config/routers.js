/**
 * Created by liuqi453 on 10/12/16.
 */
export default [
  // 登录页面
  {
    path: '/',
    name: '<%= vuexName%>',
    component: function (resolve) {
      require(['../views/<%= componentName%>/<%= componentName%>.vue'], resolve)
    }
  },

  /* inject start */

  /* inject end */
]
