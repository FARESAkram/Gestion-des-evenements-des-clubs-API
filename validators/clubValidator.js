const { body } = require('express-validator')
const { auth } = require('../middlewares/isAllowedUser')
const { isAdmin } = require('../middlewares/isAllowedClub')

exports.addClub = [
    auth,
    isAdmin,
    body('nom','Nom est obligatoire').notEmpty(),
    body('description','Description est obligatoire').notEmpty(),
    body('abbreviation','Abbreviation est obligatoire').notEmpty(),
]

exports.updateClub = [
    auth,
    isAdmin,
    body('nom','Nom est obligatoire').notEmpty(),
    body('description','Description est obligatoire').notEmpty(),
    body('abbreviation','Abbreviation est obligatoire').notEmpty(),
]

exports.deleteClub = [
    auth,
    isAdmin,
]

exports.getAllClub = [
    auth,
    isAdmin,
]

exports.getClub = [
    auth,
    isAdmin,
]
