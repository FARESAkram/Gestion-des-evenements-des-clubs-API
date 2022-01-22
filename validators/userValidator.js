const { body } = require('express-validator')
const { auth, isAccountOwner} = require('../middlewares/isAllowedUser')

exports.getProfile = [
    auth
]

exports.getAllUsers = [
    auth
]

exports.registerUser = [
    body('cin','cin is required').notEmpty(),
    body('prenom','First Name is required').notEmpty(),
    body('nom','Last Name is required').notEmpty(),
    body('username','Username is required').notEmpty(),
    body('email','Email is required').isEmail(),
    body('motdepasse','Password must have a minimum lenght of 8').isLength({min:8,max:25}),
    body('telephone','Phone number is required').notEmpty()
]

exports.loginUser = [
    body('credentials','Username or email is required').notEmpty(),
    body('motdepasse','Password must have a minimum lenght of 8').isLength({min:8,max:25})
]

exports.updateUser = [
    auth,
    isAccountOwner,
    body('cin','cin is required').notEmpty(),
    body('prenom','First Name is required').notEmpty(),
    body('nom','Last Name is required').notEmpty(),
    body('username','Username is required').notEmpty(),
    body('email','Email is required').isEmail(),
    body('motdepasse','Password must have a minimum lenght of 8').isLength({min:8,max:25}),
    body('telephone','Phone number is required').notEmpty(),
]

exports.deleteUser = [
    auth,
    isAccountOwner
]