import asyncHandler from "../middleware/asyncHandler.js";
import Post from "../models/postModel.js";

const addPost = asyncHandler(async (req, res) => {
  const { name, age, number, mainText } = req.body;

  const post = new Post({
    name,
    age,
    number,
    mainText,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

export { addPost };
