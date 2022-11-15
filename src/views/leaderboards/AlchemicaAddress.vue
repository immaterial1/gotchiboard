<template>
  <background-layout>
    <div class="max-w-screen-lg mx-auto py-5">
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
        <bordered class="mb-7">
          <div>
            <div class="flex justify-between px-12 py-6 bg-purple">
              <div class="text-center">
                <div class="mb-2">
                  <img class="inline-block w-8 h-8" src="../../assets/wallet.svg" alt="wallet icon">
                </div>
                <div class="text-2xl leading-6">
                  Total spend (in FUD)
                </div>
                <div class="text-3xl leading-8 -mt-0.5">
                  {{ spendingStats.totalSpend.toLocaleString() }}
                </div>
              </div>
              <div class="text-center">
                <div class="mb-2">
                  <img class="inline-block w-8 h-8" src="../../assets/tile.svg" alt="tile icon">
                </div>
                <div class="text-2xl leading-6">
                  Tiles minted
                </div>
                <div class="text-3xl leading-8 -mt-0.5">
                  {{ spendingStats.tilesMinted.toLocaleString() }}
                </div>
              </div>
              <div class="text-center">
                <div class="mb-2">
                  <img class="inline-block w-8 h-8" src="../../assets/home.svg" alt="home icon">
                </div>
                <div class="text-2xl leading-6">
                  Installations minted
                </div>
                <div class="text-3xl leading-8 -mt-0.5">
                  {{ spendingStats.installationsMinted.toLocaleString() }}
                </div>
              </div>
            </div>
            <div class="flex justify-between p-7 bg-purpleDark">
              <div class="flex">
                <img class="h-10 w-10 mr-3" src="../../assets/fud.png" alt="Fud token">
                <div>
                  <div class="text-white/50 text-lg tracking-wide leading-4 -mt-px">FUD</div>
                  <div class="text-3xl tracking-wide leading-7 -mt-0.5">{{ spendingStats.totalFud.toLocaleString() }}</div>
                </div>
              </div>
              <div class="flex">
                <img class="h-10 w-10 mr-3" src="../../assets/fomo.png" alt="Fomo token">
                <div>
                  <div class="text-white/50 text-lg tracking-wide leading-4 -mt-px">FOMO</div>
                  <div class="text-3xl tracking-wide leading-7 -mt-0.5">{{ spendingStats.totalFomo.toLocaleString() }}</div>
                </div>
              </div>
              <div class="flex">
                <img class="h-10 w-10 mr-3" src="../../assets/alpha.png" alt="Alpha token">
                <div>
                  <div class="text-white/50 text-lg tracking-wide leading-4 -mt-px">ALPHA</div>
                  <div class="text-3xl tracking-wide leading-7 -mt-0.5">{{ spendingStats.totalAlpha.toLocaleString() }}</div>
                </div>
              </div>
              <div class="flex">
                <img class="h-10 w-10 mr-3" src="../../assets/kek.png" alt="Kek token">
                <div>
                  <div class="text-white/50 text-lg tracking-wide leading-4 -mt-px">KEK</div>
                  <div class="text-3xl tracking-wide leading-7 -mt-0.5">{{ spendingStats.totalKek.toLocaleString() }}</div>
                </div>
              </div>
            </div>
          </div>
        </bordered>
        <table class="w-full border-spacing-0 border-collapse mb-6">
          <thead class="text-left text-lg text-white/50">
            <tr>
              <th class="font-normal">Image</th>
              <th class="font-normal">Date/Time</th>
              <th class="font-normal pr-6">Quantity</th>
              <th class="font-normal">
                <div class="flex items-center">
                  <img class="h-4 w-4 mr-1" src="../../assets/fud.png" alt="Fud token">
                  <div>
                    <div class="leading-4">FUD</div>
                  </div>
                </div>
              </th>
              <th class="font-normal">
                <div class="flex items-center">
                  <img class="h-4 w-4 mr-1" src="../../assets/fomo.png" alt="Fomo token">
                  <div>
                    <div class="leading-4">FOMO</div>
                  </div>
                </div>
              </th>
              <th class="font-normal">
                <div class="flex items-center">
                  <img class="h-4 w-4 mr-1" src="../../assets/alpha.png" alt="Alpha token">
                  <div>
                    <div class="leading-4">ALPHA</div>
                  </div>
                </div>
              </th>
              <th class="font-normal">
                <div class="flex items-center">
                  <img class="h-4 w-4 mr-1" src="../../assets/kek.png" alt="Kek token">
                  <div>
                    <div class="leading-4">KEK</div>
                  </div>
                </div>
              </th>
              <th class="font-normal w-37">
                Total (in FUD)
              </th>
            </tr>
          </thead>
          <tbody class="bg-dark border-4 border-neutral-800 text-lg">
            <tr
              v-for="item in data.slice(0, shownPlaces + 1)"
              :key="item.eventId">
              <td class="py-4 px-6 w-[80px] text-center">
                <img class="max-w-[80px] max-h-[80px] inline-block" :src="`/installations/${item.type}_${item.id}.png`" :alt="item.name"/>
              </td>
              <td class="py-4 pr-6">
                <div class="text-xl">
                  {{ item.name }}
                </div>
                <span class="text-lg">{{ DateTime.fromSeconds(Number(item.timestamp)).toLocaleString(DateTime.DATETIME_SHORT) }}</span>
              </td>
              <td class="py-4 pr-6 text-xl">{{ item.quantity.toLocaleString() }}</td>
              <td class="py-4 pr-6 text-xl">{{ item.costFud.toLocaleString() }}</td>
              <td class="py-4 pr-6 text-xl">{{ item.costFomo.toLocaleString() }}</td>
              <td class="py-4 pr-6 text-xl">{{ item.costAlpha.toLocaleString() }}</td>
              <td class="py-4 pr-6 text-xl">{{ item.costKek.toLocaleString() }}</td>
              <td class="w-36 py-4 text-3xl">{{ item.totalFud.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
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

export default {
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
      let totalFud = 0
      let totalFomo = 0
      let totalAlpha = 0
      let totalKek = 0
      let totalSpend = 0

      this.data.forEach(item => {
        if (item.type === 'tile') tilesMinted += item.quantity
        if (item.type === 'installation') installationsMinted += item.quantity
        totalFud += item.costFud
        totalFomo += item.costFomo
        totalAlpha += item.costAlpha
        totalKek += item.costKek
        totalSpend += item.totalFud
      })

      return {
        tilesMinted,
        installationsMinted,
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
        start: value,
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
