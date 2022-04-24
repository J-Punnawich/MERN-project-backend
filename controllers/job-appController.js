const asyncHandler = require("express-async-handler");


const jobAppSchema = require('../models/job-appModel')
const postSchema = require('../models/postModel')

// @desc    Set post
// @route   POST /posts
// @access  Private
const savejob = asyncHandler(async (req, res) => {
    const post = await postSchema.findById( req.params.id );   // ใช้งี้ไปก่อน ใช้หาโพสจาก params แล้วเอาไปยัดใส้ jobapp ทีหลัง
  
    const jobApp = await jobAppSchema.create({
      user: req.user.id,
      post: post,
      

    });
  
    console.log("Saved job application");
    res.status(200).json(jobApp);
  });


// @desc    Get Company all posts    
// @route   GET /
// @access  Private
const getMyjob = asyncHandler(async (req, res) => {       
    const jobapps = await jobAppSchema.find({ user: req.user.id }).populate('post'); 
                                                               
    res.status(200).json(jobapps);                                
  });

module.exports = {
    savejob,
    getMyjob,
  };