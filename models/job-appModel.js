const mongoose = require('mongoose')

const appSchema = mongoose.Schema(
  { 
    // user ID ที่คนที่สมัครงาน
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // post ID ที่สมัครงาน
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },

    resume:{
      File              // ** ไฟล์ resume
    },
    
    status: {           // สถานนะการยอมรับเข้าทำงาน => accept, wait, denide
      type: String,     
      default: 'wait'
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('jobApp', appSchema)
