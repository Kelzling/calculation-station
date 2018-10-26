describe("Correlation Calculator", function() {
  let calculator = new CorrelationCalculator()
  let testData1 = [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601]
  let testData2 = [15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2]
  let testData3 = [1, 2, 3, 4]
  
  describe("Initialising Calculator", function() {
    beforeAll(function() {
      calculator.initialiseCalculator(testData1, testData2)
    })
    
    it("initialiseCalculator method should exist", function () {
      expect(calculator.initialiseCalculator).toBeDefined()
    })
    
    it("xArray should exist as an array", function() {
      expect(Array.isArray(calculator.xArray)).toBeTruthy()
    })
    
    it("xArray should contain the test data set", function() {
      expect(calculator.xArray).toBe(testData1)
    })
    
    it("yArray should exist as an array", function() {
      expect(Array.isArray(calculator.yArray)).toBeTruthy()
    })
    
    it("yArray should contain the test data set", function() {
      expect(calculator.yArray).toBe(testData2)
    })
    
    it("should have stored the length value (itemCount) as a number", function() {
      expect(typeof calculator.itemCount).toBe('number')
    })
    
    it("itemCount should be 10", function() {
      expect(calculator.itemCount).toBe(10)
    })
  })
  
  describe("Validating Data", function() {
    it("validateData should exist as a method", function() {
      expect(calculator.validateData).toBeDefined()
    })
    
    it("Should throw an error if given arrays that don't match in length", function() {
      expect(function() { calculator.validateData(testData1, testData3) }).toThrowError()
    })
    
    it("Should do nothing if passed correct data", function() {
      spyOn(calculator, 'validateData').and.callThrough()
      calculator.validateData(testData1, testData2)
      
      expect(calculator.validateData).toHaveBeenCalled()
    })
  })
  
  describe("sumArrayElements", function() {
    it("should exist as a method", function() {
      expect(calculator.sumArrayElements).toBeDefined()
    })
    
    it("should calculate the sum of an array of numbers", function() {
      let expectedResult = 10
      expect(calculator.sumArrayElements(testData3)).toBe(expectedResult)
    })
  })
  
  describe("squareNumber", function() {
    it("should exist as a method", function() {
      expect(calculator.squareNumber).toBeDefined()
    })
    
    it("should return the square of a number", function() {
      let num = 4
      let expectedResult = 16
      expect(calculator.squareNumber(num)).toBe(expectedResult)
    })
  })
  
  describe("squareArrayElements", function() {
    it("should exist as a method", function() {
      expect(calculator.squareArrayElements).toBeDefined()
    })
    
    it("should generate an array of squared numbers when passed an array", function() {
      let expectedResult = [1, 4, 9, 16]
      expect(calculator.squareArrayElements(testData3)).toEqual(expectedResult)
    })
  })
  
  describe("calculateDataComponents", function() {
    beforeEach(function() {
      calculator.initialiseCalculator(testData1, testData2)
      calculator.calculateDataComponents()
    })
    
    it("should exist as a method", function() {
      expect(calculator.calculateDataComponents).toBeDefined()
    })
    
    it("should generate an array of X * Y values", function() {
      let expectedResult = [2790, 48860.100000000006, 858, 6092.799999999999, 8264.4, 21812.9, 3860.6, 375543, 30574.399999999998, 221258.19999999998]
      expect(calculator.xyArray).toEqual(expectedResult)
    })
    
    it("should generate and store the sum of the xArray", function() {
      let expectedResult = 6389
      expect(calculator.xSum).toEqual(expectedResult)
    })
    
    it("should generate and store the sum of the yArray", function() {
      let expectedResult = 603.2
      expect(calculator.ySum).toEqual(expectedResult)
    })
    
    it("should generate and store the sum of the xyArray", function() {
      let expectedResult = 719914.4
      expect(calculator.xySum).toEqual(expectedResult)
    })
    
    it("should generate and store the sum of the squared values of the xArray", function() {
      let expectedResult = 7604693
      expect(calculator.xSqSum).toEqual(expectedResult)
    })
    
    it("should generate and store the sum of the squared values of the yArray", function() {
      let expectedResult = 71267.12
      expect(calculator.ySqSum).toEqual(expectedResult)
    })
  })
  
  describe("performCalculation", function() {
    calculator.initialiseCalculator(testData1, testData2)
    calculator.calculateDataComponents()
    let result = calculator.performCalculation()
    
    it("should exist as a method", function() {
      expect(calculator.performCalculation).toBeDefined()
    })
    
    it("should return an object", function() { 
      expect(result === Object(result)).toBeTruthy()
    })
    
    it("result object should have a coefficient value", function() {
      expect(result.coefficient).toBeDefined()
    })
    
    it("coefficient should be 0.9543", function() {
      expect(result.coefficient).toBeCloseTo(0.9543, 4)
    })
    
    it("result object should have a coefficientSquared value", function() {
      expect(result.coefficientSquared).toBeDefined()
    })
    
    it("coefficientSquared should be 0.9107", function() {
      expect(result.coefficientSquared).toBeCloseTo(0.9107, 4)
    })
  })
  
  describe("runCalculator", function() {
    let output = calculator.runCalculator(testData1, testData2)
    
    it("should exist as a method", function() {
      expect(calculator.runCalculator).toBeDefined()
    })
    
    it("should return an object if run successfully", function() { 
      expect(output === Object(output)).toBeTruthy()
    })
    
    it("output object should have a coefficient value", function() {
      expect(output.coefficient).toBeDefined()
    })
    
    it("coefficient should be 0.9543", function() {
      expect(output.coefficient).toBeCloseTo(0.9543, 4)
    })
    
    it("output object should have a coefficientSquared value", function() {
      expect(output.coefficientSquared).toBeDefined()
    })
    
    it("coefficientSquared should be 0.9107", function() {
      expect(output.coefficientSquared).toBeCloseTo(0.9107, 4)
    })
    
    it("should return a string if the arrays are not the same length", function() { 
      let errorResult = calculator.runCalculator(testData1, testData3)
      expect(typeof errorResult).toBe('string')
    })
  })
})

describe("Regression Calculator", function() {
  let calculator = new RegressionCalculator()
  let testData1 = [130, 650, 99, 150, 128, 302, 95, 945, 368, 961]
  let testData2 = [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601]
  let testData3 = [1, 2, 3, 4]
  let testData4 = [42, 19]
  
  describe("Initialising Calculator", function() {
    it("initialiseCalculator method should exist", function() {
      expect(calculator.initialiseCalculator).toBeDefined()
    })
    
    it("should store an error message if not enough data is passed", function() {
      calculator.initialiseCalculator(testData4, testData4)
      expect(calculator.error).toBe('Not enough data points to run calculation')
    })
  })
  
  describe("validateData", function() {
    it("should exist as a method", function() {
      expect(calculator.validateData).toBeDefined()
    })
    
    it("should throw an error if arrays contain less than 3 items", function() {
      expect(function () { calculator.validateData(testData4, testData4) }).toThrowError()
    })
    
    it("should generate a warning if arrays contain less than 5 items", function () {
      calculator.validateData(testData3, testData3)
      expect(calculator.warning).toBe('Not enough data for a statistically significant result')
    })
  })
  
  describe("performCalculation", function() {
    calculator.initialiseCalculator(testData1, testData2)
    calculator.calculateDataComponents()
    let result = calculator.performCalculation()
    
    it("should exist as a method", function() {
      expect(calculator.performCalculation).toBeDefined()
    })
    
    it("should return an object", function() {
      expect(result === Object(result)).toBeTruthy()
    })
    
    it("result object should have a beta0 value", function() {
      expect(result.beta0).toBeDefined()
    })
    
    it("beta0 value should be -22.55", function() {
      expect(result.beta0).toBeCloseTo(-22.55, 2)
    })
    
    it("result object should have a beta1 value", function() {
      expect(result.beta1).toBeDefined()
    })
    
    it("beta1 value should be 1.7279", function() {
      expect(result.beta1).toBeCloseTo(1.7279, 4)
    })
  })
  
  describe("calculateYK", function() {
    calculator.initialiseCalculator(testData1, testData2)
    calculator.calculateDataComponents()
    let result = calculator.performCalculation()
    
    it("should exist as a method", function() {
      expect(calculator.calculateYK).toBeDefined()
    })
    
    it("should return 50.0206 for an xK value of 42", function() {
      let yK = calculator.calculateYK(42, result)
      expect(yK).toBeCloseTo(50.0206, 4)
    })
    
/*     it("should return 644 for an xK value of 389", function() {
      let yK = calculator.calculateYK(389, result)
      expect(yK).toBe(644)
    }) */
  })
  
  describe("runCalculator", function() {
    let output = calculator.runCalculator(testData1, testData2, 42)
    let warningOutput = calculator.runCalculator(testData3, testData3)
    
    it("should exist as a method", function() {
      expect(calculator.runCalculator).toBeDefined()
    })
    
    it("should return an object if run successfully", function() {
      expect(output === Object(output)).toBeTruthy()
    })
    
    it("output object should have a beta0 value", function() {
      expect(output.beta0).toBeDefined()
    })
    
    it("beta0 value should be -22.55", function() {
      expect(output.beta0).toBeCloseTo(-22.55, 2)
    })
    
    it("output object should have a beta1 value", function() {
      expect(output.beta1).toBeDefined()
    })
    
    it("beta1 value should be 1.7279", function() {
      expect(output.beta1).toBeCloseTo(1.7279, 4)
    })
    
    it("output object should have a yK value if method was passed an xK value", function() {
      expect(output.yK).toBeDefined()
    })
    
    it("yK value should be 50.0206", function() {
      expect(output.yK).toBeCloseTo(50.0206, 4)
    })
    
    it("output object should not have a yK value if no xK value was passed", function() {
      let output = calculator.runCalculator(testData1, testData2)
      expect(output.xK).toBeFalsy()
    })
    
    it("output object should have a warning value if the data had between 3 and 5 items", function() {
      expect(warningOutput.warning).toBe('Not enough data for a statistically significant result')
    })
  })
})
