const { body } = require('express-validator')
const { auth } = require('../middlewares/isAllowedUser')
const { isAdmin } = require('../middlewares/isAllowedClub')

exports.getAllEvenement = []