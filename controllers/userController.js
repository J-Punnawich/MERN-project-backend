let jwt = require("jsonwebtoken");
    bcrypt = require("bcrypt");
    asyncHandler = require("express-async-handler");
    User = require("../models/userModel");

// Register new user
// POST /users
// access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please add all fields");
  }

// Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
    console.log("Register success")
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  // หรือจะใช้ const user = await User.findOneAndUpdate({ email },{new: true}); จะอัพเดทเวลาการ login ให้

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
    console.log("Login success")

    // Payload
    const payload = {
      user: {
        username: user.username,
        role: user.role,
      },
    };
    // Generate Token
    // jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
    //   if (err) throw err;
    //   res.json({ token, payload });
    // });



  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});


// @desc    Get user data
// @route   GET /users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});



// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
