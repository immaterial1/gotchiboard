import { utils } from 'ethers'
import { DateTime } from 'luxon'
import subgraph from './subgraph.js'

const gotchiverseLaunchDate = 1652832000 // Wed May 18 2022 00:00:00 GMT+0000

export default {
  gotchiverseLaunchDate,
  gotchiverseTimeFroms: (timePeriod) => {
    const timeFroms = []
    const now = DateTime.utc()
    timeFroms.push(now.startOf(timePeriod).toSeconds())
    let i = 0
    do {
      const minusOption = timePeriod === 'week' ? { days: 7 * (i + 1) } : { months: (i + 1) }
      const date = now.minus(minusOption).startOf(timePeriod)
      timeFroms.push(date.toSeconds())
      i++
    } while (timeFroms[timeFroms.length - 1] > gotchiverseLaunchDate)

    return timeFroms
  },
  alchemicaSpendByAddress: async (options) => {
    if (!options.timeFrom) throw new Error('options.timeFrom parameter missing')
    if (!options.timePeriod) throw new Error('options.timePeriod parameter missing')

    const timeFrom = Math.round(options.timeFrom)

    // Get timeTo value
    let timeTo = Math.round(DateTime.fromSeconds(timeFrom, { zone: 'utc' }).endOf(options.timePeriod).toSeconds())

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

      const eventDateTime = DateTime.fromSeconds(Number(event.timestamp), { zone: 'utc' })

      let modifier = 1
      if (options.dayModifiers) {
        modifier = options.dayModifiers[eventDateTime.weekday - 1]
      }

      if (!addressData[event.owner]) {
        addressData[event.owner] = {
          tilesSpend: {
            fud: fudSpent * event.quantity,
            fomo: fomoSpent * event.quantity,
            alpha: alphaSpent * event.quantity,
            kek: fudSpent * event.quantity,
            fudModified: (fudSpent * modifier) * event.quantity,
            fomoModified: (fomoSpent * modifier) * event.quantity,
            alphaModified: (alphaSpent * modifier) * event.quantity,
            kekModified: (fudSpent * modifier) * event.quantity
          },
          tilesMinted: event.quantity,
          installationsSpend: {
            fud: 0,
            fomo: 0,
            alpha: 0,
            kek: 0,
            fudModified: 0,
            fomoModified: 0,
            alphaModified: 0,
            kekModified: 0
          },
          installationsMinted: 0
        }
      } else {
        addressData[event.owner].tilesSpend.fud += fudSpent
        addressData[event.owner].tilesSpend.fomo += fomoSpent
        addressData[event.owner].tilesSpend.alpha += alphaSpent
        addressData[event.owner].tilesSpend.kek += kekSpent
        addressData[event.owner].tilesSpend.fudModified += (fudSpent * modifier)
        addressData[event.owner].tilesSpend.fomoModified += (fomoSpent * modifier)
        addressData[event.owner].tilesSpend.alphaModified += (alphaSpent * modifier)
        addressData[event.owner].tilesSpend.kekModified += (kekSpent * modifier)
        addressData[event.owner].tilesMinted += event.quantity
      }
    })

    // Add alchemica spent on installations by each address
    installations.forEach((event) => {
      const fudSpent = Number(utils.formatEther(event.installationType.alchemicaCost[0]))
      const fomoSpent = Number(utils.formatEther(event.installationType.alchemicaCost[1]))
      const alphaSpent = Number(utils.formatEther(event.installationType.alchemicaCost[2]))
      const kekSpent = Number(utils.formatEther(event.installationType.alchemicaCost[3]))

      const eventDateTime = DateTime.fromSeconds(Number(event.timestamp), { zone: 'utc' })

      let modifier = 1
      if (options.dayModifiers) {
        modifier = options.dayModifiers[eventDateTime.weekday - 1]
      }

      if (!addressData[event.owner]) {
        addressData[event.owner] = {
          tilesSpend: {
            fud: 0,
            fomo: 0,
            alpha: 0,
            kek: 0,
            fudModified: 0,
            fomoModified: 0,
            alphaModified: 0,
            kekModified: 0
          },
          tilesMinted: 0,
          installationsSpend: {
            fud: fudSpent * event.quantity,
            fomo: fomoSpent * event.quantity,
            alpha: alphaSpent * event.quantity,
            kek: fudSpent * event.quantity,
            fudModified: (fudSpent * modifier) * event.quantity,
            fomoModified: (fomoSpent * modifier) * event.quantity,
            alphaModified: (alphaSpent * modifier) * event.quantity,
            kekModified: (fudSpent * modifier) * event.quantity
          },
          installationsMinted: event.quantity
        }
      } else {
        addressData[event.owner].installationsSpend.fud += fudSpent
        addressData[event.owner].installationsSpend.fomo += fomoSpent
        addressData[event.owner].installationsSpend.alpha += alphaSpent
        addressData[event.owner].installationsSpend.kek += kekSpent
        addressData[event.owner].installationsSpend.fudModified += (fudSpent * modifier)
        addressData[event.owner].installationsSpend.fomoModified += (fomoSpent * modifier)
        addressData[event.owner].installationsSpend.alphaModified += (alphaSpent * modifier)
        addressData[event.owner].installationsSpend.kekModified += (kekSpent * modifier)
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

      // Modified values
      addressData[address].totalFudModified = Math.round(addressData[address].installationsSpend.fudModified + addressData[address].tilesSpend.fudModified)
      addressData[address].totalFomoModified = Math.round(addressData[address].installationsSpend.fomoModified + addressData[address].tilesSpend.fomoModified)
      addressData[address].totalAlphaModified = Math.round(addressData[address].installationsSpend.alphaModified + addressData[address].tilesSpend.alphaModified)
      addressData[address].totalKekModified = Math.round(addressData[address].installationsSpend.kekModified + addressData[address].tilesSpend.kekModified)
      addressData[address].fudStandardSpentModified = Number((addressData[address].totalFudModified + (addressData[address].totalFomoModified * 2) + (addressData[address].totalAlphaModified * 4) + (addressData[address].totalKekModified * 10)).toFixed(1))
    }

    return addressData
  }
}
