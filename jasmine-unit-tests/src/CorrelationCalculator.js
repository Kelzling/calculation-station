class CorrelationCalculator {
  validateData (xArray, yArray) {
    // arrays must be the same length for the calculation to work correctly
    if (xArray.length !== yArray.length) {
      throw new Error('Array lengths did not match')
    }
  }
  
  initialiseCalculator (newXArray, newYArray) {
    // not a constructor so the same calculator object can be reused for multiple calculations if desired after being initialised with no data
    this.error = ''
    try {
      this.validateData(newXArray, newYArray)
    } catch (error) {
      if (error.message === 'Array lengths did not match') {
        this.error = error.message
      } else {
        throw error
      }
    }
    this.xArray = newXArray
    this.yArray = newYArray
    this.itemCount = this.xArray.length
  }
  
  sumArrayElements(inputArray) {
    // generates the total of all elements in an array
    let result = inputArray.reduce((total, number) => {
      return total + number
    })
    return result
  }
  
/*   squareNumber(number) {
    // this gets done a lot, separate function helps with readability (in theory)
    return number * number
  } */
  
  multiplyArrayElements(arrayOne, arrayTwo) {
    // generates a new array where each element has been squared
    let outputArray = arrayOne.map((number, index) => {
      return number * arrayTwo[index]
    })
    return outputArray
  }
  
  calculateDataComponents() {
    this.xyArray = this.multiplyArrayElements(this.xArray, this.yArray)
    this.xSum = this.sumArrayElements(this.xArray)
    this.ySum = this.sumArrayElements(this.yArray)
    this.xySum = this.sumArrayElements(this.xyArray)
    this.xSqSum = this.sumArrayElements(this.multiplyArrayElements(this.xArray, this.xArray))
    this.ySqSum = this.sumArrayElements(this.multiplyArrayElements(this.yArray, this.yArray))
  }
  
  performCalculation() {
    // top line of the equation
    let topLine = (this.itemCount * this.xySum) - (this.xSum * this.ySum)
    
    // bottom line of the calculation
    let bottomLeft = this.itemCount * this.xSqSum - Math.pow(this.xSum, 2)
    let bottomRight = this.itemCount * this.ySqSum - Math.pow(this.ySum, 2)
    let bottomLine = Math.sqrt(bottomLeft * bottomRight)
    
    // generate and output results
    let result = {}
    result.coefficient = topLine / bottomLine
    result.coefficientSquared = Math.pow(result.coefficient, 2)
    return result
  }
  
  runCalculator(newXArray, newYArray) {
    let output = null
    this.initialiseCalculator(newXArray, newYArray)
    if (this.error) {
      output = { error: this.error }
    } else {
      this.calculateDataComponents()
      output = this.performCalculation()
    }
    console.log(output)
    return output
  }
}