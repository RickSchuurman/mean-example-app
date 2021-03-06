const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added succesfully",
      post: {
        id: createdPost._id,
        title: createdPost.title,
        content: createdPost.content,
      }
    });
  })
    .catch(error => {
      res.status(500).json({
        message: "Creating a post failed!"
      });
    });
};

exports.updatePost = (req, res, next) => {
  if (req.file) {
    const url = req.protocol + '://' + req.get("host");
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });
  Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result => {
    console.log(result);
    if (result.n > 0) {
      res.status(200).json({message: "Update successful!"})
    } else {
      res.status(401).json({message: 'Not authorized!'})
    }
  })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update post"
      })
    })
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({message: "Deletion successful!"});
      } else {
        res.status(401).json({message: 'Not authorized!'});
      }
    }
  ).catch(error => {
    res.status(500).json({
      message: "Fetching post failed!"
    });
  });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found!'})
    }
  })
    .catch(error => {
      res.status(500).json({
        message: "Fetching post failed!"
      });
    });
};


exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched succesfully",
        posts: fetchedPosts,
        maxPosts: count
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching post failed!"
      });
    });
};
