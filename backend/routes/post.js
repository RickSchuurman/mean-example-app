const express = require("express");

const PostController = require("../controllers/post");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, PostController.createPost);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost);

router.put("/:id", checkAuth, PostController.updatePost);

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
