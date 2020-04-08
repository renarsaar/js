// Import package
const express = require("express");
const router = express.Router();

// Import Post module
const Post = require("../models/Post");

// @route GET /posts
// @desc Get All posts
// @access Public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

// @route POST /posts
// @desc Create a post
// @access Public
router.post("/", async (req, res) => {
  // Data
  // console.log(req.body);
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });

  // Save data to DB & Output to page
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.json({ message: error });
  }
});

// @route Get /posts
// @desc Get specific post
// @access Public
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (error) {
    res.json({ message: error });
  }
});

// @route Delete /posts
// @desc Delete a post
// @access Public
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (error) {
    res.json({ message: error });
  }
});

// @route Update /posts
// @desc Update a post
// @access Public
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (error) {
    res.json({ message: error });
  }
});

/**
 * fetch("http://localhost:3000/posts")
 * .then(result => {
 * return result.json();
 * })
 * .then(data => {
 * console.log(data);
 * })
 */

module.exports = router;
