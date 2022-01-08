const User = require('../models/User')
const Club = require('../models/Club')
const Evenement = require('../models/Evenement')

const syncData = async (params) => {
    await User.sync()
    await Club.sync()
    await Evenement.sync()
}

module.exports = syncData