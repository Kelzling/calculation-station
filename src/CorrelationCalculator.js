class CorrelationCalculator {
  validateData (xArray, yArray) {
    // arrays must be the same length for the calculation to work correctly
    let isValid = true
    if (xArray.length !== yArray.length) {
      isValid = false
    }
    return isValid
  }
  
  initialiseCalculator (newXArray, newYArray) {
    // not a constructor so the same calculator object can be reused for multiple calculations if desired after being initialised with no data
    let success = true
    if (this.validateData(newXArray, newYArray)) {
      // store the data as long as it is valid
      this.xArray = newXArray
      this.yArray = newYArray
      this.xyArray = this.xArray.map((number, index) => {
        return number * this.yArray[index]
      })
      this.itemCount = this.xArray.length
    } else {
      success = false
    }
    return success
  }
  
  sumArrayElements(inputArray) {
    // generates the total of all elements in an array
    let result = inputArray.reduce((total, number) => {
      return total + number
    })
    return result
  }
  
  squareNumber(number) {
    // this gets done a lot, separate function helps with readability (in theory)
    return number * number
  }
  
  squareArrayElements(inputArray) {
    // generates a new array where each element has been squared
    let outputArray = inputArray.map(number => {
      return this.squareNumber(number)
    })
    return outputArray
  }
  
  performCalculation() {
    // top line of the equation
    let xSum = this.sumArrayElements(this.xArray)
    let ySum = this.sumArrayElements(this.yArray)
    let xySum = this.sumArrayElements(this.xyArray)
    let topLine = (this.itemCount * xySum) - (xSum * ySum)
    
    // bottom line of the calculation
    let xSqSum = this.sumArrayElements(this.squareArrayElements(this.xArray))
    let ySqSum = this.sumArrayElements(this.squareArrayElements(this.yArray))
    let bottomLeft = this.itemCount * xSqSum - this.squareNumber(xSum)
    let bottomRight = this.itemCount * ySqSum - this.squareNumber(ySum)
    let bottomLine = Math.sqrt(bottomLeft * bottomRight)
    
    // generate and output results
    let result = {}
    result.coefficient = topLine / bottomLine
    result.coefficientSquared = this.squareNumber(result.coefficient)
    return result
  }
  
  runCalculator(newXArray, newYArray) {
    let output = null
    if (this.initialiseCalculator(newXArray, newYArray)) {
      output = this.performCalculation()
    }
    console.log(output)
    return output
  }
}