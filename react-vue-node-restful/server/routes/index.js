var express = require('express')
var router = express.Router()
var path = require('path')
// setting the details for the relative path to the files using path.join
var options = {
  root: path.join(__dirname, '../..')
}

/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
 */

// serving up static files for the Vue UI

/* Depreciated due to creation of Single Page App containing both UIs
router.get('/vue-index', (req, res) => {
  res.sendFile('client/public/VueIndex.html', options)
}) 

router.get('/src/stylesheet.css', (req, res) => {
  res.sendFile('client/src/stylesheet.css', options)
}) */

// files for Vue UI

router.get('/src/VueController.js', (req, res) => {
  res.sendFile('client/src/VueController.js', options)
})

router.get('/src/CorrelationCalculator.js', (req, res) => {
  res.sendFile('client/src/CorrelationCalculator.js', options)
})

router.get('/src/RegressionCalculator.js', (req, res) => {
  res.sendFile('client/src/RegressionCalculator.js', options)
})

// from the tutorial I used to learn about express.
router.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED' })
})

module.exports = router
