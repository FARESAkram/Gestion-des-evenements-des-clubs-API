const express = require('express')
const router = express.Router()
const statisticController = require('../controllers/statisticsController')

router.route('/')
    .get(statisticController.basicStats)

module.exports = router