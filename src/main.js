// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//入口文件
import Vue from 'vue'

// 导入App根组件
import App from './App'

//导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入路由模块
import router from './router'

// 按需导入 Mint-UI 中的组件
import { Header } from 'mint-ui'

// 导入Mint-ui样式组件
import 'mint-ui/lib/style.min.css'
Vue.component(Header.name, Header)

// 导入Mui样式组件
import './assets/mui/css/mui.min.css'

// 导入扩展图标样式
import './assets/mui/css/icons-extra.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
