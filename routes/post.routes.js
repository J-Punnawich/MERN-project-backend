const express = require('express')
const router = express.Router()
const {
  getPosts,
  getUserPosts,
  currentPost,
  setPost,
  updatePost,
  deletePost,

  changeStatus,
} = require('../controllers/postController')

const { protect, adminCheck } = require('../middleware/authMiddleware')
// @role USER
// get all posts
router.route('/all').get(getPosts)
router.route('/edit-post/:id').get(protect, currentPost)


// ใส่ protect => ยืนยัน token จะได้ user id เพื่อนำมาเช็คกับ post.user.id
router.route('/').get(getUserPosts)
router.route('/').post(protect, setPost)
router.route('/:id').put(protect, updatePost)
router.route('/:id').delete(protect, deletePost)       // ต้องใช้ token และ id post 


// @role ADMIN
// อัพเดท status post (ทำไมถึงใช้ post ไม่ใช้ put วะ กูงง)
router.route('/change-status').post(protect, adminCheck, changeStatus)

module.exports = router
