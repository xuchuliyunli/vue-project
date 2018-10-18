import Vue from 'vue'
import Router from 'vue-router'
import HomeContainer from '@/components/tabbar/HomeContainer.vue'
import MemberContainer from '@/components/tabbar/MemberContainer.vue'
import ShopcarContainer from '@/components/tabbar/ShopcarContainer.vue'
import SearchContainer from '@/components/tabbar/SearchContainer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/home', component: HomeContainer},
    {path:'/member', component: MemberContainer},
    {path:'/shopcar', component: ShopcarContainer},
    {path:'/search', component: SearchContainer},
    {path:'*', redirect: '/home'}
  ],
  linkActiveClass: 'mui-active'
})
