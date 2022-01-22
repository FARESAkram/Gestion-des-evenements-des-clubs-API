const { body } = require('express-validator')
const { auth,isAdmin } = require('../middlewares/isAllowedUser')

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
