const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
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
