// Correlation Calculation

// input: two arrays of the same length containing only numbers. (arrayX, arrayY)

  // save arrayX.length as n

// generate the info for the top line of the equation

  // calculate the sum of all numbers in arrayX (xSum)
    // use array.reduce
  // calculate the sum of all numbers in arrayY (ySum)
  // generate array of x*y values (arrayXY)
    // use array.map
  // calculate the sum of all numbers in arrayXY (xySum)
  
// calculate the top line of the equation

  // 1. n * xySum
  // 2. xSum * ySum
  // step 1 - step 2
  
// generate the info for the bottom line of the equation

  // generate array of all the numbers in arrayX squared (same length) (arrayXSq)
    // use array.map
  // calculate the sum of all the numbers in arrayXSq (xSqSum)
    // use array.reduce
  // generate array of all the numbers in arrayY squared (same length) (arrayYSq)
  // calculate the sum of all the numbers in arrayYSq (ySqSum)

// calculate the bottom line of the equation

  // 1. n * xSqSum
  // 2. step 1 - xSum * xSum (the single value xSum squared)
  // 3. n * ySqSum
  // 4. step 2 - ySum * ySum (the single value ySum squared)
  // 5. step 2 * step 4
  // 6. square root of step 5
  
// generate the final results

  // Rxy = top line divided by the bottom line
  // RSquared = Rxy * Rxy