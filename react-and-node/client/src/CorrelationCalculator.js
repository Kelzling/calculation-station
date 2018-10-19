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
    if (this.validateData(newXArray, newYArray)) {
      // store the data as long as it is valid
      this.xArray = newXArray
      this.yArray = newYArray
      this.itemCount = this.xArray.length
    } else {
      throw new Error('Array lengths did not match')
    }
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
  
  calculateDataComponents() {
    this.xyArray = this.xArray.map((number, index) => {
      return number * this.yArray[index]
    })
    this.xSum = this.sumArrayElements(this.xArray)
    this.ySum = this.sumArrayElements(this.yArray)
    this.xySum = this.sumArrayElements(this.xyArray)
    this.xSqSum = this.sumArrayElements(this.squareArrayElements(this.xArray))
    this.ySqSum = this.sumArrayElements(this.squareArrayElements(this.yArray))
  }
  
  performCalculation() {
    // top line of the equation
    let topLine = (this.itemCount * this.xySum) - (this.xSum * this.ySum)
    
    // bottom line of the calculation
    let bottomLeft = this.itemCount * this.xSqSum - this.squareNumber(this.xSum)
    let bottomRight = this.itemCount * this.ySqSum - this.squareNumber(this.ySum)
    let bottomLine = Math.sqrt(bottomLeft * bottomRight)
    
    // generate and output results
    let result = {}
    result.coefficient = topLine / bottomLine
    result.coefficientSquared = this.squareNumber(result.coefficient)
    return result
  }
  
  runCalculator(newXArray, newYArray) {
    let output = null
    try {
      this.initialiseCalculator(newXArray, newYArray)
      this.calculateDataComponents()
      output = this.performCalculation()
    } catch (error) {
      if (error.message === 'Array lengths did not match') {
        output = error.message
      } else {
        throw error
      }
    }
    console.log(output)
    return output
  }
}

export default CorrelationCalculator