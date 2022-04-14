const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  currentUser,
  
} = require('../controllers/userController')
const { protect, adminCheck} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/signin', loginUser)

// Verify token from Client and POST user data back
router.post('/current-user', protect, currentUser)

router.post("/current-admin", protect,adminCheck, currentUser);

module.exports = router