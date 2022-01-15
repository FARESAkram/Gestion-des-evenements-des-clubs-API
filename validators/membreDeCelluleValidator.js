const { auth } = require('../middlewares/isAllowedUser')

exports.getAllMembreDeCellule = [
    auth
]


exports.addMembreDeCellule = [
    auth
]

exports.deleteMembreDeCellule = [
    auth
]