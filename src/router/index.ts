import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    hidden: true,
    meta: {
      name: '首页',
    },
    component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue'),
  },
  {
    path: '/test',
    name: 'test',
    hidden: true,
    meta: {
      name: '测试页面',
    },
    component: () => import(/* webpackChunkName: "Test" */ '@/views/Test.vue'),
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    meta: {
      name: '登录页面',
    },
    component: () => import(/* webpackChunkName: "LoginPage" */ '@/views/LoginPage.vue'),
  },
]

const createRouter = () =>
  new VueRouter({
    mode: 'hash',
    routes,
  })

const router = createRouter()

export default router
