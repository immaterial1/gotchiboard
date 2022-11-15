<template>
  <div id="app">
    <HomeNav/>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeNav from '@/components/HomeNav.vue'

export default {
  name: 'HomeView',
  components: {
    HomeNav
  }
}
</script>
