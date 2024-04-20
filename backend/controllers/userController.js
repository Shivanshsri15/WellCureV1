import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../util/generateToken.js";
import User from "../models/userModel.js";
// @DESC    Auth user and get Token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      surname: user.surname,
      email: user.email,
      profileImage: user.profileImage,
      age: user.age,
      followers: user.followers,
      followings: user.followings,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @DESC    register user and get Token
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, surName, email, password, age } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName,
    surName,
    email,
    password,
    age,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      surName: user.surname,
      email: user.email,
      age: user.age,
      profileImage: user.profileImage,
    });
  } else {
    res.status(404);
    throw new Error("Invalid user data");
  }
});

// @DESC    logout User / clear cookie
// @route   POST /api/users/logout
// @access  private

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged Out successfully" });
});

export { authUser, registerUser, logoutUser };
