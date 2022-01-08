const express = require('express')
const router = express.Router()
const userValidator = require('../validators/userValidator')
const userContoller = require('../controllers/userController')

router.route('/profile')
    .get(userValidator.getProfile,userContoller.getConnectedUser)

router.route('/register')
    .post(userValidator.registerUser,userContoller.registerUser)

router.route('/login')
    .post(userValidator.loginUser,userContoller.loginUser)

router.route('/:id')
    .put(userValidator.updateUser,userContoller.updateUser)
    .delete(userValidator.deleteUser,userContoller.deleteUser)

module.exports = router