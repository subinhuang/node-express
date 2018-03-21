'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _post = require('./models/post');

var _post2 = _interopRequireDefault(_post);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _auth = require('./middlewares/auth');

var auth = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // locals的用法，可以传 path函数及函数方法给对象view中的title使用，
  // 并且可以统一传给多个view,render只能当前view传递title 值
  // res.locals.title = 'subin';
  // res.render('index');
  res.render('index', { title: 'subin' });
});

/* GET signup page. */
router.get('/signup', function (req, res, next) {
  res.render('signup');
});

/* GET signin page. */
router.get('/signin', function (req, res, next) {
  res.render('signin');
});

/* GET signout */
router.get('/signout', function (req, res, next) {
  req.session.user = null;
  res.clearCookie(_config2.default.cookieName, { path: '/' });
  res.redirect('/');
});

/* GET posts page. */
router.get('/posts', function (req, res, next) {
  res.render('posts', { title: 'posts' });
});

// /posts/create
router.get('/posts/create', auth.adminRequired, function (req, res, next) {
  res.render('create');
});

/* GET posts show page. */
router.get('/posts/show', function (req, res, next) {
  var id = req.query.id;


  _post2.default.findOne({ _id: id }, function (err, post) {
    post.mkContent = (0, _marked2.default)(post.content);
    res.render('show', { post: post });
  });
});

/* GET posts edit page. */
router.get('/posts/edit', function (req, res, next) {
  var id = req.query.id;

  res.render('edit', { id: id });
});

module.exports = router;
//# sourceMappingURL=route.page.js.map