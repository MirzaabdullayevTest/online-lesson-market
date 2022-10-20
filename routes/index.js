var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const admin = req.session.admin
  res.render('index',
    {
      title: 'Udemy',
      name: admin.name
    }
  );

});

module.exports = router;
