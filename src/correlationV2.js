function sumArray (inputArray) {
  let result = inputArray.reduce((sum, num) => { 
    return sum + num
  })
  return result
}

function squareElements (inputArray) {
  let outputArray = inputArray.map(num => {
    return num * num
  })
  return outputArray
}

// Correlation Calculation

// input: two arrays of the same length containing only numbers. (arrayX, arrayY)
function correlation (arrayX, arrayY) {
  // save arrayX.length as n
  let n = arrayX.length
  
// generate the info for the top line of the equation

  // calculate the sum of all numbers in both arrays
  let xSum = sumArray(arrayX)
  let ySum = sumArray(arrayY)
  // generate array of x*y values and then it's sum
  let arrayXY = arrayX.map((num, index) => { return num * arrayY[index] })
  let xySum = sumArray(arrayXY)
  
// calculate the top line of the equation

  // 1. n * xySum
  // 2. xSum * ySum
  // step 1 - step 2
  let topLine = (n * xySum) - (xSum * ySum)
  
// generate the info for the bottom line of the equation

  // generate array of all the numbers in arrayX squared (same length) (arrayXSq)
  let arrayXSq = squareElements(arrayX)
  // calculate the sum of all the numbers in arrayXSq (xSqSum)
  let xSqSum = sumArray(arrayXSq)
  // generate array of all the numbers in arrayY squared (same length) (arrayYSq)
  let arrayYSq = squareElements(arrayY)
  // calculate the sum of all the numbers in arrayYSq (ySqSum)
  let ySqSum = sumArray(arrayYSq)
// calculate the bottom line of the equation

  // 1. n * xSqSum
  // 2. step 1 - xSum * xSum (the single value xSum squared)
  // 3. n * ySqSum
  // 4. step 2 - ySum * ySum (the single value ySum squared)
  // 5. step 2 * step 4
  // 6. square root of step 5
  let bottomLeft = (n * xSqSum) - (xSum * xSum) // note - come up with better names for some of these?
  let bottomRight = (n * ySqSum) - (ySum * ySum)
  let bottomLine = Math.sqrt(bottomLeft * bottomRight)
  
// generate the final results

  // Rxy = top line divided by the bottom line
  let rXY = topLine / bottomLine
  // RSquared = Rxy * Rxy
  let rSq = rXY * rXY
  
  let output = {r: rXY, rSquared: rSq}
  console.log(output)
  return output
}
