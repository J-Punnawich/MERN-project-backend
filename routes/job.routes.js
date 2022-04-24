const express = require('express')
const router = express.Router()

const {
    savejob,
    getMyjob,    
  } = require('../controllers/job-appController')

const { protect } = require('../middleware/authMiddleware')

router.route('/job').get(protect,getMyjob)             // get post ทั้งหมด ของ company
router.route('/savejob').post(protect,savejob)


module.exports = router