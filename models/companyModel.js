const mongoose = require('mongoose')

const companySchema = mongoose.Schema(
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
    BusinessType: String,    // ประเภทธุรกิจ
    desc: String,
    benefit: String,
    address: String,    
    
    
  },
  {
    timestamps: true,  
  }
)

module.exports = mongoose.model('Company', companySchema)
