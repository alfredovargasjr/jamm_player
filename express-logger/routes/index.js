var express = require('express');
let fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/log', (req, res, next) => {
  fs.writeFile('logs', `${req.query.message} - ` + (new Date()))

  res.status(200).send("ok");
})

module.exports = router;
