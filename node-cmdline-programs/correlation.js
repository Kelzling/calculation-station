const CorrelationCalculator = require('./src/CorrelationCalculator.js')
const parseData = require('./parseData.js')
const { writeFile } = require('fs')

let theCalc = new CorrelationCalculator()

// convert the data files into arrays
let arrayX = parseData(process.argv[2])
let arrayY = parseData(process.argv[3])

// generate the output
let output = theCalc.runCalculator(arrayX, arrayY)
// convert to a string for nicer display purposes
let outputString = ''
for (let key in output) {
  outputString += `${key}: ${output[key]}\r\n`
}

// write data to file
writeFile(process.argv[4], outputString, error => {
  if (error) { console.log('failed to write to file', error) }
  console.log('output written to file')
})
