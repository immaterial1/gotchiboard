import Vue from 'vue'
import VueRouter from 'vue-router'
import Leaderboard from '../views/Leaderboard.vue'
import AlchemicaLeaderboard from '../views/leaderboards/Alchemica.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/leaderboards'
  },
  {
    path: '/leaderboards',
    name: 'leaderboards',
    component: Leaderboard,
    children: [
      {
        path: '',
        redirect: '/leaderboards/alchemica'
      },
      {
        path: 'alchemica',
        component: AlchemicaLeaderboard
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
