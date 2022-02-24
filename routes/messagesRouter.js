const express = require('express')
const router = express.Router({mergeParams:true})
const messageValidator = require('../validators/messageValidator')
const messageContoller = require('../controllers/messageController')

router.route('/')
    .get(messageValidator.getAllMessages,messageContoller.getAllMessages)


module.exports = router;