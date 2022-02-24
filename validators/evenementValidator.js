const { body } = require('express-validator')
const { auth } = require('../middlewares/isAllowedUser')
const { isAdmin,isPresident } = require('../middlewares/isAllowedClub')

exports.getAllEvenement = []

exports.getEvenement = []


exports.addEvenement = [
    auth,
    isPresident,
    body("nom","nom est obligatoire").notEmpty(),
    body("description","description est obligatoire").notEmpty(),
    body("date","date est obligatoire").notEmpty()
]

exports.updateEvenement = [
    auth,
    isPresident,
    body("nom","nom est obligatoire").notEmpty(),
    body("description","description est obligatoire").notEmpty(),
    body("date","date est obligatoire").notEmpty()
]

exports.deleteEvenement = [
    auth,
    isPresident
]