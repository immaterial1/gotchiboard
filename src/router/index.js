import Vue from 'vue'
import VueRouter from 'vue-router'
import Leaderboard from '../views/Leaderboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Leaderboard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
