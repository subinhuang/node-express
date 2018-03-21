'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _post = require('./models/post');

var _post2 = _interopRequireDefault(_post);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _auth = require('./middlewares/auth');

var auth = _interopRequireWildcard(_auth);

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET users lists. */
router.get('/users', function (req, res, next) {
  res.send('respond with a resource');
});

/* GET posts lists */
router.get('/posts', function (req, res, next) {
  _post2.default.find({}, {}, function (err, posts) {
    if (err) {
      // err.status = 500;
      next(err);
    } else {
      res.json({ postsList: posts });
    }
  });
});

/* POST create posts */
router.post('/posts/', function (req, res, next) {
  // var title = req.body.title;
  // var content = req.body.content;
  var _req$body = req.body,
      title = _req$body.title,
      content = _req$body.content;


  if (title == '' || content == '') {
    next(err);
    return;
  }
  var post = new _post2.default();
  post.title = title;
  post.content = content;
  post.authorId = res.locals.currentUser._id;
  post.save(function (err, doc) {
    if (err) {
      next(err);
    } else {
      res.json({ post: doc });
    }
  });
});

/* PATCH edit post */
router.patch('/posts/:id', function (req, res, next) {
  var _req$params = req.params,
      id = _req$params.id,
      title = _req$params.title,
      content = _req$params.content;


  _post2.default.findOneAndUpdate({ _id: id }, { title: title, content: content }, function (err) {
    if (err) {
      next(err);
    } else {
      res.end();
    }
  });
});

/* GET one post */
router.get('/posts/:id', function (req, res, next) {
  var id = req.params.id;
  // const {id} =req.params;

  _post2.default.findOne({ _id: id }, function (err, post) {
    if (err) {
      next(err);
    } else {
      res.json({ post: post });
    }
  });
});

/* DEL one post */
router.delete('/posts/:id', function (req, res) {
  var id = req.params.id;
  _post2.default.remove({ _id: id }, function (err, data) {
    if (err) {
      next(err);
    } else {
      res.json({});
    }
  });
});

/* POST signup user */
router.post('/signup', function (req, res, next) {
  var _req$body2 = req.body,
      name = _req$body2.name,
      pass = _req$body2.pass,
      rePass = _req$body2.rePass;


  if (pass !== rePass) {
    return next(new Error('两次密码不对'));
  }

  var user = new _user2.default();
  user.name = name;
  user.pass = _bcrypt2.default.hashSync(pass, 10);
  user.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.end();
    }
  });
});

/* POST signin user */
router.post('/signin', function (req, res, next) {
  var _req$body3 = req.body,
      name = _req$body3.name,
      pass = _req$body3.pass;


  _user2.default.findOne({ name: name }, function (err, user) {
    if (err || !user) {
      return next(new Error('找不到用户'));
    } else {
      var isOk = _bcrypt2.default.compareSync(pass, user.pass);
      if (!isOk) {
        return next(new Error('密码不对'));
      }

      var token = _jwtSimple2.default.encode({
        _id: user._id,
        name: user.name,
        isAdmin: user.name === _config2.default.admin ? true : false,
        exp: (0, _moment2.default)().add('days', 30).valueOf()
      }, _config2.default.jwtSecret);

      var opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30, // cookie 有效期30天
        signed: true,
        httpOnly: true
      };

      res.cookie(_config2.default.cookieName, token, opts);
      res.json({ token: token });
    }
  });
});

exports.default = router;
//# sourceMappingURL=route.api.js.map