class RegressionCalculator extends CorrelationCalculator {
  performCalculation () {
    // calculate top line of the equation
    let xySum = this.sumArrayElements(this.xyArray)
    let xAvg = this.sumArrayElements(this.xArray) / this.itemCount
    let yAvg = this.sumArrayElements(this.yArray) / this.itemCount
    
    let topLine = xySum - this.itemCount * xAvg * yAvg
    
    // calculate bottom line of the equation
    let xSqSum = this.sumArrayElements(this.squareArrayElements(this.xArray))
    
    let bottomLine = xSqSum - this.itemCount * this.squareNumber(xAvg)
    
    // generate and output results
    let result = {}
    result.beta1 = topLine / bottomLine
    result.beta0 = yAvg - result.beta1 * xAvg
    return result
  }
}