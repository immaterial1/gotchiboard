<template>
  <div class="leaderboard">
    <div class="mb-4">
      <select class="form-select">
        <option>Total address spend</option>
      </select>
    </div>
    <div class="flex justify-between mb-4">
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
      <div v-if="loading" class="absolute inset-0 w-full h-full opacity-80 bg-white flex justify-center pt-4 text-4xl">Loading...</div>
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
            <th class="border-2 px-4 py-2">Total Spent (in FUD)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(address, i) in tableData" :key="address.address">
            <td class="border-2 px-4 py-2">{{ i + 1 }}</td>
            <td class="border-2 px-4 py-2">{{ address.address.slice(0, 4).toUpperCase() + '...' + address.address.slice(-4).toUpperCase() }}</td>
            <td class="border-2 px-4 py-2">{{ address.tilesMinted }}</td>
            <td class="border-2 px-4 py-2">{{ address.installationsMinted }}</td>
            <td class="border-2 px-4 py-2">{{ address.totalFud }}</td>
            <td class="border-2 px-4 py-2">{{ address.totalFomo }}</td>
            <td class="border-2 px-4 py-2">{{ address.totalAlpha }}</td>
            <td class="border-2 px-4 py-2">{{ address.totalKek }}</td>
            <td class="border-2 px-4 py-2">{{ address.fudStandardSpent }}</td>
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
