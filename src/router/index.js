import Vue from 'vue'
import VueRouter from 'vue-router'
import Competitions from '../views/Competitions.vue'
import Leaderboard from '../views/Leaderboard.vue'
import About from '../views/About.vue'
import AlchemicaLeaderboard from '../views/leaderboards/Alchemica.vue'
import AlchemicaLeaderboardAddress from '../views/leaderboards/AlchemicaAddress.vue'
import BaazaarLeaderboard from '../views/leaderboards/Baazaar.vue'
import ParcelLeaderboard from '../views/leaderboards/Parcel.vue'
import GltrLeaderboard from '../views/leaderboards/Gltr.vue'
import AlchemicaSpendingSeason1 from '../views/competitions/AlchemicaSpendingSeason1'
import AlchemicaSpendingSeason1Address from '../views/competitions/AlchemicaSpendingSeason1Address'

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
      },
      {
        path: 'baazaar',
        component: BaazaarLeaderboard
      },
      {
        path: 'parcel',
        component: ParcelLeaderboard
      },
      {
        path: 'gltr',
        component: GltrLeaderboard
      }
    ]
  },
  {
    path: '/leaderboards/alchemica/:address',
    name: 'AlchemicaLeaderboardAddress',
    component: AlchemicaLeaderboardAddress
  },
  {
    path: '/competitions',
    name: 'Competitions',
    component: Competitions
  },
  {
    path: '/competitions/alch-spending-season-1',
    name: 'AlchemicaSpendingSeason1',
    component: AlchemicaSpendingSeason1
  },
  {
    path: '/competitions/alch-spending-season-1/:address',
    name: 'AlchemicaSpendingSeason1Address',
    component: AlchemicaSpendingSeason1Address
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
