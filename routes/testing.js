var express = require('express');
var router = express.Router();

router.get('/testing/', function(req, res, next){
  return res.render('testing.html');
})

module.exports = router;