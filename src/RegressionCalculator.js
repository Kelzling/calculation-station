class RegressionCalculator extends CorrelationCalculator {
  performCalculation () {
    // calculate top line of the equation
    let xAvg = this.xSum / this.itemCount
    let yAvg = this.ySum / this.itemCount
    
    let topLine = this.xySum - this.itemCount * xAvg * yAvg
    
    // calculate bottom line of the equation
    let bottomLine = this.xSqSum - this.itemCount * this.squareNumber(xAvg)
    
    // generate and output results
    let result = {}
    result.beta1 = topLine / bottomLine
    result.beta0 = yAvg - result.beta1 * xAvg
    return result
  }
}