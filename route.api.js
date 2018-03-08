var express = require('express');
var router = express.Router();

/* GET users lists. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET posts lists */
router.get('/posts', function(req, res, next) {
  res.json({postsList: ['文章1', '文章2', '文章3']});
});

/* POST posts */
router.post('/posts/create',function(req,res,next){
  var title = req.body.title;
  var content = req.body.content;
  res.send({title, content});
  // {}里面代表是变量？ ‘’里边的话是字符串？
});

module.exports = router;
