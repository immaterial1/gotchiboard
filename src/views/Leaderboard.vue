<template>
  <div class="leaderboard">
    <div class="bg-indigo pb-8">
      <div class="max-w-screen-lg mx-auto">
        <g-heading :level="'2'" :styleLevel="'2'" class="text-white text-center mb-8">
          Welcome to the Gotchiboard Leaderboards!
          <br/>
          Are ya winning, son?
        </g-heading>
        <div class="flex justify-between">
          <g-button element="router-link" :to="'/leaderboards/alchemica'" theme="primary" :large="true" class="w-52 h-22 pb-2 px-3">
            <div class="flex items-center h-full">
                <img src="../assets/alchemica.png" alt="Alchemica icon"/>
                <span class="flex-1 text-2xl leading-none text-center">Alchemica</span>
            </div>
          </g-button>
          <g-button element="router-link" :to="'/leaderboards/alchemica'" theme="primary" :large="true" class="w-52 h-22 pb-2 px-3">
            <div class="flex items-center h-full">
                <img src="../assets/baazaar.png" alt="Baazaar icon"/>
                <span class="flex-1 text-2xl leading-none text-center">Baazaar</span>
            </div>
          </g-button>
          <g-button element="router-link" :to="'/leaderboards/alchemica'" theme="primary" :large="true" class="w-52 h-22 pb-2 px-3">
            <div class="flex items-center h-full">
                <img src="../assets/gotchiverse.png" alt="Gotchiverse icon"/>
                <span class="flex-1 text-2xl leading-none text-center">Parcel</span>
            </div>
          </g-button>
          <g-button element="router-link" :to="'/leaderboards/alchemica'" theme="primary" :large="true" class="w-52 h-22 pb-2 px-3">
            <div class="flex items-center h-full">
                <img src="../assets/gltr.png" alt="Gltr icon"/>
                <span class="flex-1 text-2xl leading-none text-center">GLTR</span>
            </div>
          </g-button>
        </div>
      </div>
    </div>
    <router-view />
    <div class="pt-10">
      <g-heading :level="'1'" :styleLevel="'1'" class="text-white">
        Alchemica leaderboard
      </g-heading>
    </div>
    <div class="mb-4">
      <select class="form-select">
        <option>Total address spend</option>
      </select>
    </div>
    <div class="flex justify-between mb-2">
      <select
        class="form-select"
        :disabled="loading"
        @input="changeTimePeriod($event.target.value)"
        :value="timePeriod">
        <option value="week">By week</option>
        <option value="month">By month</option>
      </select>
      <select
        class="form-select"
        :disabled="loading"
        @input="changeTimeFrom($event.target.value)"
        :value="timeFrom">
        <option v-for="option in timeFromOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
    </div>
    <div class="relative">
      <div v-if="loading" class="absolute inset-0 w-full h-full opacity-80 bg-white flex justify-center pt-16 text-4xl">Loading...</div>
      <h3 class="text-center underline text-3xl mb-4">Stats</h3>
      <table class="table-auto border-collapse border-2 w-full leading-none text-xl mb-6">
        <thead>
          <tr>
            <th class="border-2 px-4 py-2">Total Addresses</th>
            <th class="border-2 px-4 py-2">Total Tiles Minted</th>
            <th class="border-2 px-4 py-2">Total Installations Minted</th>
            <th class="border-2 px-4 py-2">Total Fud Spent</th>
            <th class="border-2 px-4 py-2">Total Fomo Spent</th>
            <th class="border-2 px-4 py-2">Total Alpha Spent</th>
            <th class="border-2 px-4 py-2">Total Kek Spent</th>
            <th class="border-2 px-4 py-2">Total Spent (in Fud)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-2 px-4 py-2">{{ tableData.length }}</td>
            <td class="border-2 px-4 py-2">{{ tableDataTotals.tilesMinted.toLocaleString() }}</td>
            <td class="border-2 px-4 py-2">{{ tableDataTotals.installationsMinted.toLocaleString() }}</td>
            <td class="border-2 px-4 py-2">{{ tableDataTotals.totalFud.toLocaleString() }}</td>
            <td class="border-2 px-4 py-2">{{ tableDataTotals.totalFomo.toLocaleString() }}</td>
            <td class="border-2 px-4 py-2">{{ tableDataTotals.totalAlpha.toLocaleString() }}</td>
            <td class="border-2 px-4 py-2">{{ tableDataTotals.totalKek.toLocaleString() }}</td>
            <td class="border-2 px-4 py-2">{{ tableDataTotals.fudStandardSpent.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
      <h3 class="text-center underline text-3xl mb-4">Leaderboard</h3>
      <table class="table-auto border-collapse border-2 w-full leading-none text-xl">
        <thead>
          <tr>
            <th class="border-2 px-4 py-2">#</th>
            <th class="border-2 px-4 py-2">Address</th>
            <th class="border-2 px-4 py-2">Tiles Minted</th>
            <th class="border-2 px-4 py-2">Installations Minted</th>
            <th class="border-2 px-4 py-2">Fud Spent</th>
            <th class="border-2 px-4 py-2">Fomo Spent</th>
            <th class="border-2 px-4 py-2">Alpha Spent</th>
            <th class="border-2 px-4 py-2">Kek Spent</th>
            <th class="border-2 px-4 py-2">Total Spent (in Fud)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(address, i) in tableData" :key="address.address">
            <td class="border-2 px-4 py-2">{{ i + 1 }}</td>
            <td class="border-2 px-4 py-2">
              <a
                class="text-fuchsia-700 underline hover:text-violet-700
                visited:text-violet-700"
                :href="`https://fireball.gg/client/${address.address}/gotchis`"
                target="_blank">
                {{ address.address.slice(0, 4).toUpperCase() + '...' + address.address.slice(-4).toUpperCase() }}</a>
            </td>
            <td class="border-2 px-4 py-2">{{ address.tilesMinted.toLocaleString() }}</td>
            <td class="border-2 px-4 py-2">{{ address.installationsMinted.toLocaleString() }}</td>
            <td class="border-2 px-4 py-2">{{ address.totalFud.toLocaleString() }}</td>
            <td class="border-2 px-4 py-2">{{ address.totalFomo.toLocaleString() }}</td>
            <td class="border-2 px-4 py-2">{{ address.totalAlpha.toLocaleString() }}</td>
            <td class="border-2 px-4 py-2">{{ address.totalKek.toLocaleString() }}</td>
            <td class="border-2 px-4 py-2">{{ address.fudStandardSpent.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'AddressSpendView',
  data () {
    return {
      loading: true,
      timePeriod: 'week',
      timeFrom: ''
    }
  },
  computed: {
    tableData () {
      return Object.keys(this.$store.state.addressSpendData).map((address) => {
        return {
          address,
          ...this.$store.state.addressSpendData[address]
        }
      }).sort((a, b) => b.fudStandardSpent - a.fudStandardSpent)
    },
    tableDataTotals () {
      const totals = {}
      this.tableData.forEach(row => {
        Object.keys(row).forEach(key => {
          if (!isNaN(row[key])) {
            if (totals[key]) {
              totals[key] += row[key]
            } else {
              totals[key] = row[key]
            }
          }
        })
      })
      return totals
    },
    timeFromOptions () {
      const options = []
      const now = DateTime.utc()
      options.push({ label: `This ${this.timePeriod} so far`, value: now.startOf(this.timePeriod).toSeconds() })
      Array.from({ length: 10 }).forEach((x, i) => {
        const minusOption = this.timePeriod === 'week' ? { days: 7 * (i + 1) } : { months: (i + 1) }
        const date = now.minus(minusOption).startOf(this.timePeriod)
        options.push({
          label: `${this.timePeriod.charAt(0).toUpperCase() + this.timePeriod.slice(1)} starting ${date.toISODate()}`,
          value: date.toSeconds()
        })
      })

      return options
    }
  },
  methods: {
    async changeTimePeriod (value) {
      this.timePeriod = value
      await this.changeTimeFrom(this.timeFromOptions[0].value)
    },
    async changeTimeFrom (value) {
      this.loading = true
      this.timeFrom = value
      await this.$store.dispatch('getAddressSpend', {
        start: value,
        timePeriod: this.timePeriod
      })
      this.loading = false
    }
  },
  async mounted () {
    try {
      await this.changeTimeFrom(this.timeFromOptions[0].value)
      this.loading = false
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
