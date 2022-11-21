<template>
  <nav class="py-3 bg-indigo">
    <div class="w-xl mx-auto flex items-center">
      <div class="flex-none">
        <img src="../assets/logo.svg" width="202" height="16" alt="Gotchiboard logo">
      </div>
      <div class="flex-1 h-12 block flex justify-center items-center">
        <div v-for="link of links" :key="link.value" class="h-10 px-3">
          <router-link
            class="items-center h-full block text-2xl text-white/50 hover:text-white"
            :active-class="'border-b-2 border-white !text-white'"
            :to="link.value">
            {{ link.label }}
          </router-link>
        </div>
      </div>
      <div class="flex-none relative">
        <div class="absolute h-full w-full l-0 t-0 z-10"></div>
        <g-button theme="primary" disabled class="px-2.5 pt-1.5 pb-3">
          <div class="flex items-center">
              <img class="mr-2" src="../assets/wallet.svg" alt="Wallet icon"/>
              <span class="text-2xl leading-none">Connect Wallet</span>
          </div>
        </g-button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      links: [
        { label: 'Leaderboards', value: '/leaderboards' },
        { label: 'Competitions', value: '/competitions' },
        { label: 'About us', value: '/about' }
      ]
    }
  }
}
</script>
