// Correlation Calculation

// input: two arrays of the same length containing only numbers. (arrayX, arrayY)
function correlation (arrayX, arrayY) {
  // save arrayX.length as n
  let n = arrayX.length
  
// generate the info for the top line of the equation

  // calculate the sum of all numbers in arrayX (xSum)
  let xSum = arrayX.reduce((sum, num) => { return sum + num })
  // calculate the sum of all numbers in arrayY (ySum)
  let ySum = arrayY.reduce((sum, num) => { return sum + num })
  // generate array of x*y values (arrayXY)
  let arrayXY = arrayX.map((num, index) => { return num * arrayY[index] })
  // calculate the sum of all numbers in arrayXY (xySum)
  let xySum = arrayXY.reduce((sum, num) => { return sum + num })
  
// calculate the top line of the equation

  // 1. n * xySum
  // 2. xSum * ySum
  // step 1 - step 2
  let topLine = (n * xySum) - (xSum * ySum)
  
// generate the info for the bottom line of the equation

  // generate array of all the numbers in arrayX squared (same length) (arrayXSq)
  let arrayXSq = arrayX.map(num => { return num * num })
  // calculate the sum of all the numbers in arrayXSq (xSqSum)
  let xSqSum = arrayXSq.reduce((sum, num) => { return sum + num })
  // generate array of all the numbers in arrayY squared (same length) (arrayYSq)
  let arrayYSq = arrayY.map(num => { return num * num })
  // calculate the sum of all the numbers in arrayYSq (ySqSum)
  let ySqSum = arrayYSq.reduce((sum, num) => { return sum + num })
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
