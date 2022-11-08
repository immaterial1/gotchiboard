import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'

import BackgroundLayout from './components/BackgroundLayout.vue'
import Bordered from './components/Bordered.vue'
import GButton from './components/GButton.vue'
import GHeading from './components/GHeading.vue'
import Switcher from './components/Switcher.vue'

Vue.component('background-layout', BackgroundLayout)
Vue.component('bordered', Bordered)
Vue.component('g-button', GButton)
Vue.component('g-heading', GHeading)
Vue.component('switcher', Switcher)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
