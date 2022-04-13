const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      // unique: true,
    },
    password: {
      type: String,
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
