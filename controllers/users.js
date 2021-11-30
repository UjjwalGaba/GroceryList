// use express
var express = require('express');

// instantiate an express router to pass the direct url request
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
