var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const port = process.env.PORT || 5000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// functions etc for RESTful server functionality

const CorrelationCalculator = require('./public/javascripts/CorrelationCalculator.js')
const RegressionCalculator = require('./public/javascripts/RegressionCalculator.js')
const corrCalc = new CorrelationCalculator()
const regrCalc = new RegressionCalculator()

function getData (req) {
  let dataStart = req.url.indexOf('?') + 1
  let dataString = req.url.slice(dataStart)
  let dataArray = dataString.split('&')
  return dataArray
}

function parseInput (dataString) {
  let stringArray = dataString.split(',')
  let intArray = stringArray.map(item => Number(item))
  return intArray
}

app.get('/calc-corr', (req, res) => {
  // set response header
  
  // sort out data
  let dataArray = getData(req)
  let arrayX = parseInput(dataArray[0])
  console.log(arrayX)
  let arrayY = parseInput(dataArray[1])
  console.log(arrayY)
  
  // run calculation 
  let result = corrCalc.runCalculator(arrayX, arrayY)
  // turn the result into JSON data
  let output = JSON.stringify(result)
  console.log(output)
  res.send(output)
})

app.get('/calc-regr', (req, res) => {
  // set response header
  
  // sort out data
  let dataArray = getData(req)
  let arrayX = parseInput(dataArray[0])
  let arrayY = parseInput(dataArray[1])
  let xK
  if (dataArray[2]) {
    xK = Number(dataArray[2])
  }
  
  // run calculation
  let result = regrCalc.runCalculator(arrayX, arrayY, xK)
  
  // do something to turn the result into JSON data and return it to the requester
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
