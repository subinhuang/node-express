var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // locals的用法，可以传 path函数及函数方法给对象view中的title使用，
  // 并且可以统一传给多个view,render只能当前view传递title 值
  // res.locals.title = 'subin';
  // res.render('index');
  res.render('index', { title: 'subin' });
});

/* GET posts page. */
router.get('/posts', function(req, res, next) {
  res.render('posts', { title: 'posts'} );
});

// /posts/create也可以直接router.put 函数来做
router.get('/posts/create', function(req, res, next) {
  res.render('create');
});

module.exports = router;
