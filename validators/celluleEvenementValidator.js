const { body } = require('express-validator')
const { auth } = require('../middlewares/isAllowedUser')
const {isMembreCellule} = require('../middlewares/isAllowedCellule')

exports.getAllCelluleEvenement = [
    auth
]

exports.getCelluleEvenement = [
    auth,
    isMembreCellule
]

exports.addCelluleEvenement = [
    auth,
    body("nom","nom est obligatoire").notEmpty(),
    body("description","description est obligatoire").notEmpty()
]

exports.updateCelluleEvenement = [
    auth,
    body("nom","nom est obligatoire").notEmpty(),
    body("description","description est obligatoire").notEmpty()
]

exports.deleteCelluleEvenement = [
    auth
]