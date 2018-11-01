var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express()
const port = process.env.PORT || 5000

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '../client/public')))

// static file get routes present in indexRouter file (./routes/index.js)
app.use('/', indexRouter)
app.use('/users', usersRouter)

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`))

// functions etc for RESTful server functionality
//
const CorrelationCalculator = require('./public/javascripts/CorrelationCalculator.js')
const RegressionCalculator = require('./public/javascripts/RegressionCalculator.js')
const corrCalc = new CorrelationCalculator()
const regrCalc = new RegressionCalculator()

// grabs the data from the get request url and splits it into it's portions
function getData (req) {
  let dataStart = req.url.indexOf('?') + 1
  let dataString = req.url.slice(dataStart)
  let dataArray = dataString.split('&')
  return dataArray
}

// parses the numbers from a comma separated string
function parseInput (dataString) {
  let stringArray = dataString.split(',')
  let intArray = stringArray.map(item => Number(item))
  return intArray
}

app.get('/calc-corr', (req, res) => {
  // set response header
  res.type('application/json')
  // sort out data
  let dataArray = getData(req)
  let arrayX = parseInput(dataArray[0])
  console.log(arrayX)
  let arrayY = parseInput(dataArray[1])
  console.log(arrayY)

  // run calculation
  let result = corrCalc.runCalculator(arrayX, arrayY)
  // turn the result into JSON data
  // could just res.send the result object and express would automatically convert it to JSON for me, but I wanted to be explicit about it
  let output = JSON.stringify(result)
  console.log(output)
  res.status(200).send(output)
})

app.get('/calc-regr', (req, res) => {
  // set response header
  res.type('application/json')
  // sort out data
  let dataArray = getData(req)
  let arrayX = parseInput(dataArray[0])
  console.log(arrayX)
  let arrayY = parseInput(dataArray[1])
  console.log(arrayY)
  let xK
  if (dataArray[2]) {
    xK = Number(dataArray[2])
    console.log(xK)
  }

  // run calculation
  let result = regrCalc.runCalculator(arrayX, arrayY, xK)
  // turn the result into JSON data
  let output = JSON.stringify(result)
  console.log(output)
  // sends the data with an explicit status code of 200 to inform the requester that the get was successful
  res.status(200).send(output)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
