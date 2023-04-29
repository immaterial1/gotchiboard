<template>
  <background-layout>
    <div class="w-lg mx-auto py-5">
      <router-link :to="{path: '/leaderboards/alchemica', query: { timePeriod: $route.query.timePeriod, timeFrom: $route.query.timeFrom }}" class="flex mb-2 items-center">
        <img class="mt-1 mr-4" src="../../assets/chevron_left.svg" alt="">
        <span class="text-2xl hover:underline">Back to Alchemica leaderboard</span>
      </router-link>
      <bordered class="text-[40px] leading-none bg-white text-indigo py-2 px-3 inline-block mb-6">
        <a :href="`https://fireball.gg/client/${$route.params.address}/gotchis/owned`" target="_blank" class="hover:text-purple">
          {{ $route.params.address }}
        </a>
      </bordered>
      <div class="flex mb-2">
        <g-heading :level="'1'" :styleLevel="'1'" class="flex-1">
          Alchemica spending
        </g-heading>
        <div class="flex">
          <switcher
            class="mr-6"
            :options="[{label: 'Month', value: 'month'},{label: 'Week', value: 'week'}]"
            :disabled="loading"
            @input="changeTimePeriod"
            :value="timePeriod"/>
          <select
            class="form-select border border-white bg-inherit text-2xl px-6"
            :disabled="loading"
            @input="changeTimeFrom($event.target.value)"
            :value="timeFrom">
            <option
              v-for="option in timeFromOptions(timePeriod)"
              :key="option.value"
              class="text-black"
              :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
      <div v-if="loading" class="py-10 text-4xl text-center">
        Loading...
      </div>
      <template v-else>
        <g-heading :level="'4'" :styleLevel="'4'" class="text-white/50 leading-8 mb-4">
          Total stats
        </g-heading>
        <AlchemicaStats
          class="mb-7"
          :stats="spendingStats" />
        <AlchemicaAddressTable
          class="mb-6"
          :data="data.slice(0, shownPlaces + 1)" />
        <div v-if="shownPlaces < data.length" class="text-center">
          <g-button
            class="px-2.5 pt-1.5 pb-3"
            :theme="'primary'"
            @click.native="shownPlaces += 50">
            Load more
          </g-button>
        </div>
      </template>
    </div>
  </background-layout>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { DateTime } from 'luxon'
import { mapGetters } from 'vuex'

import AlchemicaStats from '@/components/leaderboards/alchemica/AlchemicaStats.vue'
import AlchemicaAddressTable from '@/components/leaderboards/alchemica/AlchemicaAddressTable.vue'

export default {
  components: {
    AlchemicaStats,
    AlchemicaAddressTable
  },
  data () {
    return {
      loading: true,
      timePeriod: this.$route.query.timePeriod || 'week',
      timeFrom: this.$route.query.timeFrom || '',
      data: null,
      DateTime,
      shownPlaces: 50
    }
  },
  computed: {
    ...mapGetters([
      'timeFromOptions'
    ]),
    spendingStats () {
      let tilesMinted = 0
      let installationsMinted = 0
      let itemsMinted = 0
      let totalFud = 0
      let totalFomo = 0
      let totalAlpha = 0
      let totalKek = 0
      let totalSpend = 0

      this.data.forEach(item => {
        if (item.type === 'tile') tilesMinted += item.quantity
        if (item.type === 'installation') installationsMinted += item.quantity
        if (item.type === 'item') itemsMinted += item.quantity
        totalFud += item.costFud
        totalFomo += item.costFomo
        totalAlpha += item.costAlpha
        totalKek += item.costKek
        totalSpend += item.totalFud
      })

      return {
        tilesMinted,
        installationsMinted,
        itemsMinted,
        totalFud,
        totalFomo,
        totalAlpha,
        totalKek,
        totalSpend
      }
    }
  },
  methods: {
    async changeTimePeriod (value) {
      if (this.timePeriod === value) return
      this.timePeriod = value
      await this.changeTimeFrom(this.timeFromOptions(this.timePeriod)[0].value)
    },
    async changeTimeFrom (value) {
      this.loading = true
      this.timeFrom = value

      // Sync router params if not already
      if (this.timePeriod !== this.$route.query.timePeriod || this.timeFrom !== this.$route.query.timeFrom) this.$router.push({ query: { timePeriod: this.timePeriod, timeFrom: value } })

      this.data = await this.$store.dispatch('getAddressAlchemicaSpend', {
        timeFrom: value,
        timePeriod: this.timePeriod,
        owner: this.$route.params.address
      })
      this.loading = false
    }
  },
  async mounted () {
    try {
      await this.changeTimeFrom(this.timeFrom || this.timeFromOptions(this.timePeriod)[0].value)
      this.loading = false
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
