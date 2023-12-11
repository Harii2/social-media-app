const express = require("express");
const {
  getUser,
  getUserFriends,
  addRemoveFriend,
} = require("../controllers/users.js");
const { verifyToken } = require("../middleware/auth.js");

const userRouter = express.Router();

/* READ */
userRouter.get("/:id", verifyToken, getUser);
userRouter.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
userRouter.patch("/:id/:friendId", verifyToken, addRemoveFriend);

module.exports = {userRouter}