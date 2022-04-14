const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
  { 
    // user ID เจ้าของ Post
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    desc: String,
    benefit: String,    // สวัสดิการ
    college: String,
    program: String,    // สาขา
    faculty: String,    // คณะ
    jobType: String,    // ประเภทงาน
    position: String,   // ตำแหน่ง
    // salary: [],  
    rate: Number,       // อัตราที่รับ
    province: String,     // จังหวัดที่ทำงาน
    address: String,    // ที่อยู่บริษัท

    post_expire: Date,  // *รอแก้ ระยะเวลาโพส
    boost: {            // boost post
      tpye: Boolean,
      default: false
    },     
    enabled: {          // อนุญาตให้โพส
      type: Boolean,
      default: false
    }
    
    


  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Post', postSchema)
