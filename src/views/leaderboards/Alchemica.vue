<template>
  <background-layout>
    <div class="w-lg mx-auto py-10">
      <div class="flex mb-2">
        <g-heading :level="'1'" :styleLevel="'1'" class="flex-1">
          Alchemica leaderboard
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
        <alchemica-stats
          class="mb-7"
          :stats="leaderboardAlchemicaStats(timePeriod, timeFrom)" />
        <div class="flex mb-1 text-lg text-white/50">
          <div class="mr-4">Rank</div>
          <div class="flex-1">Address</div>
          <div class="w-37">Total spend (in FUD)</div>
        </div>
        <alchemica-placing
          v-if="leaderboardAlchemicaOrdered[0]"
          class="mb-5"
          :rank="1"
          :data="leaderboardAlchemicaOrdered[0]"
          @click.native="viewAddress(leaderboardAlchemicaOrdered[0].address)"/>
        <alchemica-placing
          v-if="leaderboardAlchemicaOrdered[1]"
          class="mb-5"
          :rank="2"
          :data="leaderboardAlchemicaOrdered[1]"
          @click.native="viewAddress(leaderboardAlchemicaOrdered[1].address)"/>
        <alchemica-placing
          v-if="leaderboardAlchemicaOrdered[2]"
          class="mb-5"
          :rank="3"
          :data="leaderboardAlchemicaOrdered[2]"
          @click.native="viewAddress(leaderboardAlchemicaOrdered[2].address)"/>
        <alchemica-table
          class="mb-6"
          :addresses="leaderboardAlchemicaOrdered.slice(3, shownPlaces)"
          @click="viewAddress"/>
        <div v-if="shownPlaces < leaderboardAlchemicaOrdered.length" class="text-center">
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
import { mapGetters } from 'vuex'

import AlchemicaPlacing from '@/components/leaderboards/alchemica/AlchemicaPlacing.vue'
import AlchemicaStats from '@/components/leaderboards/alchemica/AlchemicaStats.vue'
import AlchemicaTable from '@/components/leaderboards/alchemica/AlchemicaTable.vue'

export default {
  name: 'AlchemicaLeaderboardView',
  components: {
    AlchemicaPlacing,
    AlchemicaStats,
    AlchemicaTable
  },
  data () {
    return {
      loading: true,
      timePeriod: this.$route.query.timePeriod || 'week',
      timeFrom: this.$route.query.timeFrom || '',
      shownPlaces: 50
    }
  },
  computed: {
    ...mapGetters([
      'leaderboardAlchemica',
      'leaderboardAlchemicaStats',
      'timeFromOptions'
    ]),
    leaderboardAlchemicaOrdered () {
      return [...this.leaderboardAlchemica(this.timePeriod, this.timeFrom)].sort((a, b) => b.fudStandardSpent - a.fudStandardSpent)
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

      await this.$store.dispatch('getLeaderboardAddressSpend', {
        timeFrom: value,
        timePeriod: this.timePeriod
      })
      this.loading = false
    },
    viewAddress (address) {
      if (address) {
        this.$router.push({
          path: `/leaderboards/alchemica/${address}`,
          query: {
            timePeriod: this.timePeriod,
            timeFrom: this.timeFrom
          }
        })
      }
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
