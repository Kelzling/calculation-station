const { readFileSync } = require('fs')

function parseData (file) {
  let inputString = readFileSync(file, 'utf8', (error, text) => {
    if (error) { throw error }
    return text
  })
  let splitString = inputString.split('\r\n')
  let outputArray = []
  for (let aString of splitString) {
    let aNum = Number(aString.trim())
    if (!isNaN(aNum)) {
      outputArray.push(aNum)
    } else {
      throw Error(`${aString} could not be converted into a number`)
    }
  }
  return outputArray
}

module.exports = parseData
