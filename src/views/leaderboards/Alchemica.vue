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
        <bordered class="mb-7">
          <div>
            <div class="flex justify-between px-12 py-6 bg-purple">
              <div class="text-center">
                <div class="mb-2">
                  <img class="inline-block w-8 h-8" src="../../assets/wallet.svg" alt="wallet icon">
                </div>
                <div class="text-2xl leading-6">
                  Unique addresses
                </div>
                <div class="text-3xl leading-8 -mt-0.5">
                  {{ leaderboardAlchemicaStats.numOfAddresses.toLocaleString() }}
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
                  {{ leaderboardAlchemicaStats.tilesMinted.toLocaleString() }}
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
                  {{ leaderboardAlchemicaStats.installationsMinted.toLocaleString() }}
                </div>
              </div>
            </div>
            <div class="flex justify-between p-7 bg-purpleDark">
              <div class="flex">
                <img class="h-10 w-10 mr-3" src="../../assets/fud.png" alt="Fud token">
                <div>
                  <div class="text-white/50 text-lg tracking-wide leading-4 -mt-px">FUD</div>
                  <div class="text-3xl tracking-wide leading-7 -mt-0.5">{{ leaderboardAlchemicaStats.totalFud.toLocaleString() }}</div>
                </div>
              </div>
              <div class="flex">
                <img class="h-10 w-10 mr-3" src="../../assets/fomo.png" alt="Fomo token">
                <div>
                  <div class="text-white/50 text-lg tracking-wide leading-4 -mt-px">FOMO</div>
                  <div class="text-3xl tracking-wide leading-7 -mt-0.5">{{ leaderboardAlchemicaStats.totalFomo.toLocaleString() }}</div>
                </div>
              </div>
              <div class="flex">
                <img class="h-10 w-10 mr-3" src="../../assets/alpha.png" alt="Alpha token">
                <div>
                  <div class="text-white/50 text-lg tracking-wide leading-4 -mt-px">ALPHA</div>
                  <div class="text-3xl tracking-wide leading-7 -mt-0.5">{{ leaderboardAlchemicaStats.totalAlpha.toLocaleString() }}</div>
                </div>
              </div>
              <div class="flex">
                <img class="h-10 w-10 mr-3" src="../../assets/kek.png" alt="Kek token">
                <div>
                  <div class="text-white/50 text-lg tracking-wide leading-4 -mt-px">KEK</div>
                  <div class="text-3xl tracking-wide leading-7 -mt-0.5">{{ leaderboardAlchemicaStats.totalKek.toLocaleString() }}</div>
                </div>
              </div>
            </div>
          </div>
        </bordered>
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
        <table class="w-full border-spacing-0 border-collapse mb-6">
          <thead class="text-left text-lg text-white/50">
            <tr>
              <th class="font-normal">Rank</th>
              <th class="font-normal">Address</th>
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
                Total spend (in FUD)
              </th>
            </tr>
          </thead>
          <tbody class="bg-dark border-4 border-neutral-800 text-lg">
            <tr
              v-for="(rank, i) in leaderboardAlchemicaOrdered.slice(4, shownPlaces + 1)"
              :key="rank.address"
              class="hover:bg-dark-highlight cursor"
              @click="viewAddress(rank.address)">
              <td class="p-0">
                <div class="inline-block h-6 pl-0.5 pr-2 text-center text-lg leading-6 bg-purple relative">
                  <div class="absolute top-0 -left-1 h-full w-1 bg-purple"></div>
                  #{{ i + 4 }}
                </div>
              </td>
              <td class="py-4 pr-6">{{ rank.address }}</td>
              <td class="py-4 pr-6 text-xl">{{ rank.totalFud.toLocaleString() }}</td>
              <td class="py-4 pr-6 text-xl">{{ rank.totalFomo.toLocaleString() }}</td>
              <td class="py-4 pr-6 text-xl">{{ rank.totalAlpha.toLocaleString() }}</td>
              <td class="py-4 pr-6 text-xl">{{ rank.totalKek.toLocaleString() }}</td>
              <td class="w-36 py-4 text-3xl">{{ rank.fudStandardSpent.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
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

export default {
  name: 'AlchemicaLeaderboardView',
  components: {
    AlchemicaPlacing
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
      return [...this.leaderboardAlchemica].sort((a, b) => b.fudStandardSpent - a.fudStandardSpent)
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

      await this.$store.dispatch('getAddressSpend', {
        start: value,
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
