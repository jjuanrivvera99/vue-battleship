import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes = [
  {
    path: '/',
    redirect: 'game',
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('@/views/Game.vue'),
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('@/views/History.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/Settings.vue'),
  },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})