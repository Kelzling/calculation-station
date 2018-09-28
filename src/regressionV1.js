// Regression Calculation

// input: two arrays of the same length containing only numbers. (arrayX, arrayY)
function regression (arrayX, arrayY) {
  // save arrayX.length as n
  let n = arrayX.length
// generate the info for the top line of the equation

  // generate array of xy values (arrayXY)
  let arrayXY = arrayX.map((num, index) => { return num * arrayY[index] })
  // calculate sum of arrayXY
  let xySum = sumArray(arrayXY)
  // calculate average of arrayX
  let xAvg = sumArray(arrayX) / n
  // calculate average of arrayY
  let yAvg = sumArray(arrayY) / n
  
// generate the info for the bottom line of the equation

  // generate array of x^2 values (arrayXSq)
  let arrayXSq = squareElements (arrayX)
  // calculate sum of arrayXSq
  let xSqSum = sumArray(arrayXSq)
  
// calculate top line

  // sumXY - n * xAvg * yAvg
  let topLine = xySum - (n * xAvg * yAvg)
  
// calculate bottom line

  // sumXSq - n * xAvg * xAvg
  let bottomLine = xSqSum - (n * xAvg * xAvg)
  
// calculate beta1

  // top line / bottom line
  let beta1 = topLine / bottomLine
  
// calculate beta0

  // yAvg - beta1 * xAvg
  let beta0 = yAvg - (beta1 * xAvg)
  
  let output = {beta1: beta1, beta0: beta0}
  console.log(output)
  return output
}