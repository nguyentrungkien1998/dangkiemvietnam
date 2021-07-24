import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6786b013 = () => interopDefault(import('../client/pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _74a59c56 = () => interopDefault(import('../client/pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _aa304b48 = () => interopDefault(import('../client/pages/dashboard/dang-ki/index.vue' /* webpackChunkName: "pages/dashboard/dang-ki/index" */))
const _e9ddfdbe = () => interopDefault(import('../client/pages/dashboard/nap-bks/index.vue' /* webpackChunkName: "pages/dashboard/nap-bks/index" */))
const _4a5b87da = () => interopDefault(import('../client/pages/dashboard/phan-loai/index.vue' /* webpackChunkName: "pages/dashboard/phan-loai/index" */))
const _ff400120 = () => interopDefault(import('../client/pages/dashboard/profile/index.vue' /* webpackChunkName: "pages/dashboard/profile/index" */))
const _3dabaa5e = () => interopDefault(import('../client/pages/index.vue' /* webpackChunkName: "pages/index" */))
const _39b4ded8 = () => interopDefault(import('../client/pages/index/index.vue' /* webpackChunkName: "pages/index/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/dashboard",
    component: _6786b013,
    children: [{
      path: "",
      component: _74a59c56,
      name: "dashboard"
    }, {
      path: "dang-ki",
      component: _aa304b48,
      name: "dashboard-dang-ki"
    }, {
      path: "nap-bks",
      component: _e9ddfdbe,
      name: "dashboard-nap-bks"
    }, {
      path: "phan-loai",
      component: _4a5b87da,
      name: "dashboard-phan-loai"
    }, {
      path: "profile",
      component: _ff400120,
      name: "dashboard-profile"
    }]
  }, {
    path: "/",
    component: _3dabaa5e,
    children: [{
      path: "",
      component: _39b4ded8,
      name: "index"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
