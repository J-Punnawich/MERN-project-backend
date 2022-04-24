let jwt = require("jsonwebtoken");
    bcrypt = require("bcrypt");
    asyncHandler = require("express-async-handler");
    userSchema = require("../models/userModel");

// @desc        Register new user
// @End point   PointPOST /users
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400)
    throw new Error("Please add all fields");
  }

// Check if user exists
  const userExists = await userSchema.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await userSchema.create({
    // name: req.body.name,
    email,
    password: hashedPassword,
    role: req.body.role,
    // img: req.body.img,

    //@Student
    // phone: req.body.phone,
    // address: req.body.address,
    // college: req.body.college,
    // faculty: req.body.faculty,
    // program: req.body.program,
    //@Company
    // BusinessType: req.body.BusinessType,
    // desc: req.body.desc,
    // benefit: req.body.benefit,

  });

  if (user) {
    res.status(201).json({
      _id: user.id,
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
// @End Point   POST /users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await userSchema.findOne({ email });

  // หรือจะใช้ const user = await User.findOneAndUpdate({ email },{new: true}); จะอัพเดทเวลาการ login ให้

  if (user && (await bcrypt.compare(password, user.password))) {
    // Payload
    const payload = {
      user: {
        id: user.id,
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
    throw new Error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณากรอกข้อมูลใหม่อีกครั้ง");
  }
});

// @desc  update user
// @End Point   Put /users/edit-user
// @access  Private
const updateUser = asyncHandler(async (req, res) => {

  try{
    const user = await userSchema.findById( req.user.id)

    if(!user){
      res.status(400);
      throw new Error("User not exists");
    }
    
    const updatedUser = await userSchema.findByIdAndUpdate(
      req.user.id,
      req.body,
      {
        new: true,
      }
    );
    console.log('Updated',updatedUser)
    res.status(200).json({msg: 'Edited'});
  }catch(err){
    console.log(err)
    res.status(500).send('Server Error!')
  }

})



// @desc   Get current user data
// @End Point   Post /users/current-user
// @access  Private
const currentUser = asyncHandler(async (req, res) => {
  try{
  // const user = await userSchema.findById(req.id)
  console.log('Currentuser',req.user)
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
  updateUser,
  currentUser,

};
