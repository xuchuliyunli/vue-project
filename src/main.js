// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//入口文件
import Vue from 'vue'

// 导入App根组件
import App from './App'

// 导入路由模块
import router from './router'

// 导入Mint-ui样式组件
import 'mint-ui/lib/style.min.css'

// 按需导入 Mint-UI 中的组件
import { Header, Swipe, SwipeItem} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 导入Mui样式组件
import './assets/mui/css/mui.min.css'

// 导入扩展图标样式
import './assets/mui/css/icons-extra.css'

//导入vue-resource组件
import VueResource from  'vue-resource'
Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
