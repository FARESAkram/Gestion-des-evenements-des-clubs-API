const express = require('express')
const router = express.Router()
const adminValidator = require('../validators/adminValidator')
const adminContoller = require('../controllers/adminController')

router.route('/allPresidents')
    .get(adminValidator.getAllPresidents,adminContoller.getAllPresidents)


module.exports = router