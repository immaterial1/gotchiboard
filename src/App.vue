<template>
  <div id="app">
    <div class="px-8 py-2">
      <HomeNav/>
    </div>
    <div class="container">
      <router-view/>
    </div>
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
