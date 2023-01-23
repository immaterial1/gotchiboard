import transforms from '../src/utils/transforms.js'
import { writeFile } from 'fs'

const main = async () => {
  for (const competition of Object.keys(transforms.competitionAlchemicaData)) {
    let roundNumber = 1
    for (const round of transforms.competitionAlchemicaData[competition]) {
      const data = await transforms.alchemicaSpendByAddress(round)

      await writeFile(`./public/data/competitions/alchemica/${competition}/${roundNumber}.json`, JSON.stringify(data), (err) => {
        if (err) {
          console.log(`Error writing ${competition}/${roundNumber}.json`, err)
        } else {
          console.log(`Successfully wrote ${competition}/${roundNumber}.json`)
        }

        roundNumber++
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
