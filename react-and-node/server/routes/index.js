var express = require('express');
var router = express.Router();
var path = require('path');
var options = {
  root: path.join(__dirname, '../..')
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/vue-index', (req, res) => {
  res.sendFile('client/public/VueIndex.html', options)
})

/* router.get('/react-index', (req, res) => {
  req.get({url: 'localhost:3000/', headers: req.headers})
  res.
})
 */
router.get('/src/stylesheet.css', (req, res) => {
  res.sendFile('client/src/stylesheet.css', options)
})

router.get('/src/VueController.js', (req, res) => {
  res.sendFile('client/src/VueController.js', options)
})

router.get('/src/CorrelationCalculator.js', (req, res) => {
  res.sendFile('client/src/CorrelationCalculator.js', options)
})

router.get('/src/RegressionCalculator.js', (req, res) => {
  res.sendFile('client/src/RegressionCalculator.js', options)
})

router.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

module.exports = router;
