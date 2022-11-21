import Vue from 'vue'
import Vuex from 'vuex'
import { utils } from 'ethers'
import { DateTime } from 'luxon'
import axios from 'axios'
import subgraph from '../utils/subgraph'
import transforms from '../utils/transforms'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gotchiverseLaunchDate: transforms.gotchiverseLaunchDate,
    addressSpendData: [],
    leaderboardData: {
      alchemica: {
        week: {},
        month: {}
      }
    }
  },
  getters: {
    leaderboardAlchemica: (state) => (timePeriod, timeFrom) => {
      if (state.leaderboardData.alchemica[timePeriod][timeFrom]) {
        return Object.keys(state.leaderboardData.alchemica[timePeriod][timeFrom]).map((address) => {
          return {
            address,
            ...state.leaderboardData.alchemica[timePeriod][timeFrom][address]
          }
        })
      }
      return []
    },
    leaderboardAlchemicaStats: (state, getters) => (timePeriod, timeFrom) => {
      const numOfAddresses = getters.leaderboardAlchemica(timePeriod, timeFrom).length
      let tilesMinted = 0
      let installationsMinted = 0
      let totalFud = 0
      let totalFomo = 0
      let totalAlpha = 0
      let totalKek = 0

      getters.leaderboardAlchemica(timePeriod, timeFrom).forEach(address => {
        tilesMinted += address.tilesMinted
        installationsMinted += address.installationsMinted
        totalFud += address.totalFud
        totalFomo += address.totalFomo
        totalAlpha += address.totalAlpha
        totalKek += address.totalKek
      })

      return {
        numOfAddresses,
        tilesMinted,
        installationsMinted,
        totalFud,
        totalFomo,
        totalAlpha,
        totalKek
      }
    },
    timeFromOptions: (state) => (timePeriod) => {
      return transforms.gotchiverseTimeFroms(timePeriod).map((timeFrom) => {
        return {
          label: `${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)} starting ${DateTime.fromSeconds(timeFrom, { zone: 'utc' }).toISODate()}`,
          value: timeFrom
        }
      })
    }
  },
  mutations: {
  },
  actions: {
    async getAddressSpend (context, timeOptions) {
      // Only get data if it's not already in store
      const data = context.getters.leaderboardAlchemica(timeOptions.timePeriod, timeOptions.timeFrom)

      if (!data || !data.length) {
        let result
        try {
          const response = await axios.get(`/data/alchemica/${timeOptions.timePeriod}/${timeOptions.timeFrom}.json`)
          if (response?.data) result = response.data
        } catch (err) {
          // Do nothing
        }

        // If we couldn;t get it locally then get from subgraph
        if (!result) result = await transforms.alchemicaSpendByAddress(timeOptions)

        Vue.set(context.state.leaderboardData.alchemica[timeOptions.timePeriod], timeOptions.timeFrom, result)
      }
    },
    async getAddressAlchemicaSpend (context, options) {
      if (!options.timeFrom) throw new Error('options.timeFrom parameter missing')
      if (!options.timePeriod) throw new Error('options.timePeriod parameter missing')
      if (!options.owner) throw new Error('options.timePeriod parameter missing')

      const timeFrom = Math.round(options.timeFrom)

      // Get timeTo value
      let timeTo = Math.round(DateTime.fromSeconds(timeFrom, { zone: 'utc' }).endOf(options.timePeriod).toSeconds())

      // If timeTo is in the future set to now
      if (timeTo > DateTime.utc().toSeconds()) timeTo = Math.round(DateTime.now().toSeconds())

      const tiles = await subgraph.mintTileEvents(timeFrom, timeTo, options.owner)
      const installations = await subgraph.mintInstallationEvents(timeFrom, timeTo, options.owner)

      return [...tiles, ...installations].map(x => {
        const type = x.tile ? 'tile' : 'installationType'
        const costFud = Number(utils.formatEther(x[type].alchemicaCost[0])) * x.quantity
        const costFomo = Number(utils.formatEther(x[type].alchemicaCost[1])) * x.quantity
        const costAlpha = Number(utils.formatEther(x[type].alchemicaCost[2])) * x.quantity
        const costKek = Number(utils.formatEther(x[type].alchemicaCost[3])) * x.quantity

        return {
          eventId: x.id,
          timestamp: x.timestamp,
          quantity: x.quantity,
          id: x[type].id,
          name: x[type].name,
          type: type === 'tile' ? type : 'installation',
          costFud,
          costFomo,
          costAlpha,
          costKek,
          totalFud: Math.round(costFud + (costFomo * 2) + (costAlpha * 4) + (costKek * 10))
        }
      }).sort((a, b) => b.timestamp - a.timestamp)
    }
  },
  modules: {
  }
})
