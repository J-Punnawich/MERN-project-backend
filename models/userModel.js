const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    role: {                 // role as student, company, admin
      type: String,
      default: 'student'
    },
    phone: Number,
    address: String,    
    college: String,
    faculty: String,
    program: String,
    
    
  },
  {
    timestamps: true,  
  }
)

module.exports = mongoose.model('User', userSchema)
