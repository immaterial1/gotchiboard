<template>
  <div class="bg-violet">
    <div class="max-w-screen-lg mx-auto pt-10">
      <div class="flex">
        <g-heading :level="'1'" :styleLevel="'1'" class="flex-1 text-white">
          Alchemica leaderboard
        </g-heading>
        <div class="flex">
          <switcher
            class="mr-6"
            :options="[{label: 'Month', value: 'month'},{label: 'Week', value: 'week'}]"
            v-model="timePeriod"/>
          <select
            class="form-select border border-white bg-inherit text-white text-2xl px-6"
            :disabled="loading"
            @input="changeTimeFrom($event.target.value)"
            :value="timeFrom">
            <option
              v-for="option in timeFromOptions"
              :key="option.value"
              class="text-black"
              :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { DateTime } from 'luxon'

export default {
  name: 'AlchemicaLeaderboardView',
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
