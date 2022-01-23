const { body } = require('express-validator');
const {auth} = require("../middlewares/isAllowedUser")


exports.getAllMessages = [
    auth
]
