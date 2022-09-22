import axios from 'axios'

const mintTileEvents = async (timeFrom, timeTo) => {
  let results = []
  let numOfResults = 0
  let lastId = ''
  do {
    const response = await axios.post('https://api.thegraph.com/subgraphs/name/aavegotchi/gotchiverse-matic', JSON.stringify({
      query: `{
        mintTileEvents(first: 1000, where: {timestamp_gt: ${timeFrom}, timestamp_lt: ${timeTo}, id_gt: "${lastId}"}) {
          id
          block
          timestamp
          owner
          tile {
            id
            tileType
            alchemicaCost
            name
          }
        }
      }`
    }))

    if (response?.data?.data?.mintTileEvents.length) {
      results = [...results, ...response.data.data.mintTileEvents]

      lastId = response.data.data.mintTileEvents[response.data.data.mintTileEvents.length - 1].id

      numOfResults = response.data.data.mintTileEvents.length
    } else {
      numOfResults = 0
    }
  } while (numOfResults)

  return results
}

const mintInstallationEvents = async (timeFrom, timeTo) => {
  let results = []
  let numOfResults = 0
  let lastId = ''
  do {
    const response = await axios.post('https://api.thegraph.com/subgraphs/name/aavegotchi/gotchiverse-matic', JSON.stringify({
      query: `{
        mintInstallationEvents(first: 1000, where: {timestamp_gt: ${timeFrom}, timestamp_lt: ${timeTo}, id_gt: "${lastId}"}) {
          id
          block
          timestamp
          owner
          installationType {
            id
            level
            installationType
            alchemicaCost
            name
          }
        }
      }`
    }))

    if (response?.data?.data?.mintInstallationEvents.length) {
      results = [...results, ...response.data.data.mintInstallationEvents]

      lastId = response.data.data.mintInstallationEvents[response.data.data.mintInstallationEvents.length - 1].id

      numOfResults = response.data.data.mintInstallationEvents.length
    } else {
      numOfResults = 0
    }
  } while (numOfResults)

  return results
}

export default {
  mintTileEvents,
  mintInstallationEvents
}
