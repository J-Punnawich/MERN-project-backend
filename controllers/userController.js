let jwt = require("jsonwebtoken");
    bcrypt = require("bcrypt");
    asyncHandler = require("express-async-handler");
    User = require("../models/userModel");

// Register new user
// POST /users
// access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email,role, password } = req.body;

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
    role,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
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
    // Payload
    const payload = {
      user: {
        name: user.name,
        role: user.role,
      },
    };

    res.json({
      payload, token: generateToken(user._id)
    });


    console.log("Login success")

  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});





// @desc   Get current user data
// @route   Post /users/current-user
// @access  Private
const currentUser = asyncHandler(async (req, res) => {
  try{
  
  console.log('middleware',req.user)
  res.status(200).json(req.user);
  
  }catch(err){
    console.log(err)
    res.status(500).send('Server Error!')
  }
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
  currentUser,
};
