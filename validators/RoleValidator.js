const { body } = require('express-validator');
const {auth, isAdmin} = require("../middlewares/isAllowedUser");
const {isPresident} = require('../middlewares/isAllowedClub')

exports.getRole = [
    auth,
]
exports.getAllRole = [
    auth,
    isPresident,
]
exports.addRole = [
    auth,
    isPresident,
    body('id_user', "veuillez saisir l'utilisateur").notEmpty(),
    body("id_club", "veuillez saisir le club").notEmpty(),
    body("role", "veuillez sasir le role").notEmpty(),
]
exports.addRoleAdmin = [
    auth,
    isAdmin
]

exports.addPresident = [
    auth,
    isAdmin
]

exports.updateRole = [
    auth,
    isPresident,
    body('id_user', "veuillez saisir l'utilisateur").notEmpty(),
    body("id_club", "veuillez saisir le club").notEmpty(),
    body("role", "veuillez sasir le role").notEmpty(),
]
exports.deleteRole = [
    auth,
    isPresident
]
exports.deleteRoleAdmin = [
    auth,
    isAdmin
]