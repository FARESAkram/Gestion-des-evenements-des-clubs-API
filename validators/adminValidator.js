const { body } = require('express-validator')
const { auth, isAdmin} = require('../middlewares/isAllowedUser')

exports.getAllPresidents = [
    auth,
    isAdmin
]