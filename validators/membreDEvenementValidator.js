const { auth } = require('../middlewares/isAllowedUser')
const { isPresident } = require('../middlewares/isAllowedClub')

exports.getAllMembreDEvenement = [
    auth,
    isPresident
]

exports.getUserEvenement = [
    auth
]

exports.addMembreDEvenement = [
    auth,
    isPresident
]

exports.deleteMembreDEvenemnt = [
    auth,
    isPresident
]