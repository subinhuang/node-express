import PostModel from '../models/post';
import UserModel from '../models/user';
import config from '../config';

export const more = function(req, res, next) {
  PostModel.find({}, {}, function(err, posts) {
    if (err) {
      // err.status = 500;
      next(err);
    } else {
      res.json({postsList: posts });
    }
  });
};

export const one = function(req, res, next) {
  const id = req.params.id;
  // const {id} =req.params;

  PostModel.findOne({ _id: id }, function(err, post) {
    if (err) {
      next(err);
    } else {
      res.json({  post });
    }
  });
};

export const create = function(req, res, next) {
  // var title = req.body.title;
  // var content = req.body.content;
  const { title, content }  = req.body;

  if(title == '' || content ==''){
    next(err);
    return;
  }
  const post = new PostModel();
  post.title = title;
  post.content = content;
  post.authorId = res.locals.currentUser._id;
  post.save(function(err, doc) {
    if (err) {
      next(err);
    } else {
      res.json({post: doc});
        }
  });
};

export const update = function(req,res,next){
  const { id, title, content } = req.params;

  PostModel.findOneAndUpdate({_id: id},{title,content}, function(err){
    if(err){
      next(err);
    }else{
      res.end();
    }
  });
};

export const del = function (req, res) {
  const id = req.params.id;
  PostModel.remove({_id: id}, function (err, data) {
    if(err){
      next(err);
    }else{
      res.end();
    }
  });
};
