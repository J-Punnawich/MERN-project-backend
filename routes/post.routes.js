const express = require('express')
const router = express.Router()
const {
  getPosts,
  getUserPosts,
  setPost,
  updatePost,
  deletePost,

  changeStatus,
} = require('../controllers/postController')

const { protect, adminCheck } = require('../middleware/authMiddleware')

// get all posts
router.route('/all').get(protect, getPosts)

// ใส่ protect => เจ้าของ user ID ของโพสเท่านั้นถึงจะโพสได้
router.route('/').get(protect,getUserPosts).post(protect, setPost)
router.route('/:id').put(protect, updatePost)
router.route('/:id').delete(protect, deletePost)

// อัพเดท status post (ทำไมถึงใช้ post ไม่ใช้ put วะ กูงง)
router.route('/change-status').post(protect, adminCheck, changeStatus)


module.exports = router
