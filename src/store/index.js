import Vue from 'vue'
import Vuex from 'vuex'
import { utils } from 'ethers'
import { DateTime } from 'luxon'
import subgraph from '../utils/subgraph'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    addressSpendData: []
  },
  getters: {
    leaderboardAlchemica: (state) => {
      return Object.keys(state.addressSpendData).map((address) => {
        return {
          address,
          ...state.addressSpendData[address]
        }
      })
    },
    leaderboardAlchemicaStats: (state, getters) => {
      const numOfAddresses = getters.leaderboardAlchemica.length
      let tilesMinted = 0
      let installationsMinted = 0
      let totalFud = 0
      let totalFomo = 0
      let totalAlpha = 0
      let totalKek = 0

      getters.leaderboardAlchemica.forEach(address => {
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
    timeFromOptions: () => (timePeriod) => {
      const options = []
      const now = DateTime.utc()
      options.push({ label: `This ${timePeriod} so far`, value: now.startOf(timePeriod).toSeconds() })
      Array.from({ length: 10 }).forEach((x, i) => {
        const minusOption = timePeriod === 'week' ? { days: 7 * (i + 1) } : { months: (i + 1) }
        const date = now.minus(minusOption).startOf(timePeriod)
        options.push({
          label: `${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)} starting ${date.toISODate()}`,
          value: date.toSeconds()
        })
      })

      return options
    }
  },
  mutations: {
  },
  actions: {
    async getAddressSpend (context, timeOptions) {
      if (!timeOptions.start) throw new Error('timeOptions.start parameter missing')
      if (!timeOptions.timePeriod) throw new Error('timeOptions.timePeriod parameter missing')

      const timeFrom = Math.round(timeOptions.start)

      // Get timeTo value
      let timeTo = Math.round(DateTime.fromSeconds(timeFrom, { zone: 'utc' }).endOf(timeOptions.timePeriod).toSeconds())

      // If timeTo is in the future set to now
      if (timeTo > DateTime.utc().toSeconds()) timeTo = Math.round(DateTime.now().toSeconds())

      const tiles = await subgraph.mintTileEvents(timeFrom, timeTo)
      const installations = await subgraph.mintInstallationEvents(timeFrom, timeTo)

      const addressData = {}

      // Add alchemica spent on tiles by each address
      tiles.forEach((event) => {
        const fudSpent = Number(utils.formatEther(event.tile.alchemicaCost[0]))
        const fomoSpent = Number(utils.formatEther(event.tile.alchemicaCost[1]))
        const alphaSpent = Number(utils.formatEther(event.tile.alchemicaCost[2]))
        const kekSpent = Number(utils.formatEther(event.tile.alchemicaCost[3]))

        if (!addressData[event.owner]) {
          addressData[event.owner] = {
            tilesSpend: {
              fud: fudSpent * event.quantity,
              fomo: fomoSpent * event.quantity,
              alpha: alphaSpent * event.quantity,
              kek: fudSpent * event.quantity
            },
            tilesMinted: event.quantity,
            installationsSpend: {
              fud: 0,
              fomo: 0,
              alpha: 0,
              kek: 0
            },
            installationsMinted: 0
          }
        } else {
          addressData[event.owner].tilesSpend.fud += fudSpent
          addressData[event.owner].tilesSpend.fomo += fomoSpent
          addressData[event.owner].tilesSpend.alpha += alphaSpent
          addressData[event.owner].tilesSpend.kek += kekSpent
          addressData[event.owner].tilesMinted += event.quantity
        }
      })

      // Add alchemica spent on installations by each address
      installations.forEach((event) => {
        const fudSpent = Number(utils.formatEther(event.installationType.alchemicaCost[0]))
        const fomoSpent = Number(utils.formatEther(event.installationType.alchemicaCost[1]))
        const alphaSpent = Number(utils.formatEther(event.installationType.alchemicaCost[2]))
        const kekSpent = Number(utils.formatEther(event.installationType.alchemicaCost[3]))

        if (!addressData[event.owner]) {
          addressData[event.owner] = {
            tilesSpend: {
              fud: 0,
              fomo: 0,
              alpha: 0,
              kek: 0
            },
            tilesMinted: 0,
            installationsSpend: {
              fud: fudSpent * event.quantity,
              fomo: fomoSpent * event.quantity,
              alpha: alphaSpent * event.quantity,
              kek: fudSpent * event.quantity
            },
            installationsMinted: event.quantity
          }
        } else {
          addressData[event.owner].installationsSpend.fud += fudSpent
          addressData[event.owner].installationsSpend.fomo += fomoSpent
          addressData[event.owner].installationsSpend.alpha += alphaSpent
          addressData[event.owner].installationsSpend.kek += kekSpent
          addressData[event.owner].installationsMinted += event.quantity
        }
      })

      // Calculate FUD standard spent by each address
      for (const address in addressData) {
        addressData[address].totalFud = Math.round(addressData[address].installationsSpend.fud + addressData[address].tilesSpend.fud)
        addressData[address].totalFomo = Math.round(addressData[address].installationsSpend.fomo + addressData[address].tilesSpend.fomo)
        addressData[address].totalAlpha = Math.round(addressData[address].installationsSpend.alpha + addressData[address].tilesSpend.alpha)
        addressData[address].totalKek = Math.round(addressData[address].installationsSpend.kek + addressData[address].tilesSpend.kek)
        addressData[address].fudStandardSpent = Number((addressData[address].totalFud + (addressData[address].totalFomo * 2) + (addressData[address].totalAlpha * 4) + (addressData[address].totalKek * 10)).toFixed(1))
      }

      context.state.addressSpendData = addressData
    },
    async getAddressAlchemicaSpend (context, options) {
      if (!options.start) throw new Error('options.start parameter missing')
      if (!options.timePeriod) throw new Error('options.timePeriod parameter missing')
      if (!options.owner) throw new Error('options.timePeriod parameter missing')

      const timeFrom = Math.round(options.start)

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
