const { readFileSync } = require('fs')

// separated out into a separate file for reuse purposes
function parseData (file) {
  // read the file in and store the text in a variable
  let inputString = readFileSync(file, 'utf8', (error, text) => {
    if (error) { throw error }
    return text
  })
  // split the string on newline
  let splitString = inputString.split('\r\n')
  let outputArray = []
  // convert all of the elements returned by splitting the string into numbers, removing any whitespace on either side
  for (let aString of splitString) {
    let aNum = Number(aString.trim())
    if (!isNaN(aNum)) {
      // push it to the output array as long as it correctly parses to a number
      outputArray.push(aNum)
    } else {
      // otherwise, if NaN is returned, throw an error as we can't continue with the calculation with mismatched data.
      throw Error(`${aString} could not be converted into a number`)
    }
  }
  return outputArray
}

module.exports = parseData
