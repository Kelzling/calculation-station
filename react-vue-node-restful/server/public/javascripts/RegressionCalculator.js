const CorrelationCalculator = require('./CorrelationCalculator.js')

class RegressionCalculator extends CorrelationCalculator {
  initialiseCalculator () {
    super.initialiseCalculator()
    this.warning = ''
  }

  validateData (xArray, yArray) {
    super.validateData(xArray, yArray)
    if (xArray.length < 3) {
      throw new Error('Not enough data points to run calculation')
    } else if (xArray.length < 5) {
      this.warning = 'Not enough data for a statistically significant result'
    }
  }

  addData (newXArray, newYArray) {
    try {
      super.addData(newXArray, newYArray)
    } catch (error) {
      if (error.message === 'Not enough data points to run calculation') {
        this.error = error.message
      } else {
        throw error
      }
    }
  }

  performCalculation () {
    // calculate top line of the equation
    let xAvg = this.xSum / this.itemCount
    let yAvg = this.ySum / this.itemCount

    let topLine = this.xySum - this.itemCount * xAvg * yAvg

    // calculate bottom line of the equation
    let bottomLine = this.xSqSum - this.itemCount * Math.pow(xAvg, 2)

    // generate and output results
    let result = {}
    result.beta1 = topLine / bottomLine
    result.beta0 = yAvg - result.beta1 * xAvg
    return result
  }

  calculateYK (xK, betaValues) {
    return betaValues.beta0 + betaValues.beta1 * xK
  }

  runCalculator (newXArray, newYArray, newXK) {
    let output = super.runCalculator(newXArray, newYArray)
    if (newXK) {
      output.yK = this.calculateYK(newXK, output)
    }
    if (this.warning) {
      output.warning = this.warning
    }
    console.log(output)
    return output
  }
}

module.exports = RegressionCalculator
