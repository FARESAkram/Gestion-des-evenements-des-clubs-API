const User = require('../models/User')
const Club = require('../models/Club')
const Evenement = require('../models/Evenement')
const CelluleEvenement = require('../models/CelluleEvenement')
const MembreDeCellule = require('../models/MembreDeCellule')

const syncData = async (params) => {
    await User.sync()
    await Club.sync()
    await Evenement.sync()
    await CelluleEvenement.sync()
    await MembreDeCellule.sync()
}

module.exports = syncData