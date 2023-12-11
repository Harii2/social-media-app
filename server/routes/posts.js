const express = require("express")
const { getFeedPosts, getUserPosts, likePost,savePost ,addComment, createPost} = require("../controllers/posts.js");
const { verifyToken } = require("../middleware/auth.js")
const {trackRoute} = require("../controllers/track.js")

const postRouter = express.Router();

/* READ */
postRouter.get("/", verifyToken,getFeedPosts);
postRouter.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
postRouter.patch("/:id/like", verifyToken, likePost);
postRouter.patch("/:id/save", verifyToken,savePost);

postRouter.post("/add-comment",verifyToken,addComment)

postRouter.post("/",verifyToken,createPost)

postRouter.post("/track",trackRoute);

module.exports = {postRouter}