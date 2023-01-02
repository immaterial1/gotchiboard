import transforms from '../src/utils/transforms.js'
import { writeFile } from 'fs'

const main = async () => {
  const timePeriods = ['week', 'month']

  for (const timePeriod of timePeriods) {
    // Ignore current week
    const timeFroms = transforms.gotchiverseTimeFroms(timePeriod).slice(1)

    for (const timeFrom of timeFroms) {
      const data = await transforms.alchemicaSpendByAddress({ timePeriod, timeFrom })
      await writeFile(`./public/data/alchemica/${timePeriod}/${timeFrom}.json`, JSON.stringify(data), (err) => {
        if (err) {
          console.log(`Error writing ${timePeriod}/${timeFrom}.json`, err)
        } else {
          console.log(`Successfully wrote ${timePeriod}/${timeFrom}.json`)
        }
      })
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
