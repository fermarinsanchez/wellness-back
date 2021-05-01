require('dotenv').config()
require('../config/db.config')
const Details = require('../models/details.model')

const fs = require('fs')
const path = require('path')
const fastcsv = require('fast-csv')

const fileNames = path.join(__dirname, './csv-data')

const getData = async () => {
  await fs.readdirSync(fileNames).forEach((file) => {
    const filePath = `${fileNames}/${file}`
    const stream = fs.createReadStream(filePath)

    const csvData = []
    const csvStream = fastcsv
      .parse({ discardUnmappedColumns: true })
      .on('data', (data) => {
        data[0] !== undefined &&
          csvData.push({
            date: new Date(data[0]),
            hours: Number(data[1]),
            consume: Number(data[2]),
            price: Number(data[3]),
            costPerHour: Number(data[4]),
          })
      })
      .on('end', async () => {
        csvData.shift()
        console.log(csvData.length)
        await setData(csvData)
      })
    stream.pipe(csvStream)
  })
}

const setData = async (dataFromCsv) => {
  dataFromCsv.map((newDetails) => {
    const data = new Details(newDetails)
    data
      .save()
      .then(() => { console.log('seed the database')})
      .catch()
  })
}

const restoreDatabase = () => {
  return Promise.all([Details.deleteMany()])
}
const seeds = async () => {
  await restoreDatabase()
    .then(async () => {
      await getData()
        .then(() => {})
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}

seeds()