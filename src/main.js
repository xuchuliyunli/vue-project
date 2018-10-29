// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//入口文件
import Vue from 'vue'

// 导入App根组件
import App from './App'

// 导入路由模块
import router from './router'

//注册vuex模块
import Vuex from "vuex"
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: {
    car: car
  },
  mutations: {
    addToCar(state,goodsinfo) {
      var flag = false
      state.car.some(item => {
        if(item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      
      if(!flag) {
        state.car.push(goodsinfo)
      }

      localStorage.setItem('car', JSON.stringify(state.car))
    },

    updateGoodsInfo(state, goodsinfo) {
      state.car.some(item => {
        if(item.id == goodsinfo.id){
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFromCar(state,id){
      state.car.some((item, i)=> {
        if(item.id == id) {
          state.car.splice(i,1)
          return true;
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      state.car.some(item=> {
        if(item.id == info.id){
          item.selected = info.selected
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0,
        amount: 0
      }
      state.car.forEach(item=> {
        if(item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})

// 导入Mint-ui样式组件
import 'mint-ui/lib/style.min.css'

// 按需导入 Mint-UI 中的组件
import { Header, Swipe, SwipeItem, Button} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

// 导入Mui样式组件
import './assets/mui/css/mui.min.css'

// 导入扩展图标样式
import './assets/mui/css/icons-extra.css'

//导入vue-resource路由组件
import VueResource from  'vue-resource'
Vue.use(VueResource)

// 导入时间格式化组件库moment
import moment from 'moment'

//定义全局过滤器
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss' ) {
  return moment(dataStr).format(pattern)
})

//导入Vue-preview组件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//全局配置请求的URL根域名
Vue.http.options.root = "http://027xin.com:8899"

//全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
