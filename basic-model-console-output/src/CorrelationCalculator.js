class CorrelationCalculator {
  constructor () {
    this.initialiseCalculator()
  }
  
  initialiseCalculator () {
    // (re)initialise all the class attributes
    this.error = ''
    this.xArray = []
    this.yArray = []
    this.xyArray = []
    this.itemCount = 0
    this.xSum = 0
    this.ySum = 0
    this.xySum = 0
    this.xSqSum = 0
    this.ySqSum = 0
    this.result = {}
  }
  
  validateData (xArray, yArray) {
    // arrays must be the same length for the calculation to work correctly
    if (xArray.length !== yArray.length) {
      throw new Error('Array lengths did not match')
    }
  }
  
  addData (newXArray, newYArray) {
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
    this.result.coefficient = topLine / bottomLine
    this.result.coefficientSquared = Math.pow(this.result.coefficient, 2)
    return this.result
  }
  
  runCalculator(newXArray, newYArray) {
    let output = null
    if (this.result) {
      this.initialiseCalculator()
    }
    this.addData(newXArray, newYArray)
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