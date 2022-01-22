const User = require('../models/User')
const Club = require('../models/Club')
const Evenement = require('../models/Evenement')
const Role = require("../models/Role")
const MembreDEvenement = require('../models/MembreDEvenement')
const Visitor = require('../models/Visitor')
const Message =require('../models/Message')

const syncData = async (params) => {
    await User.sync()
    await Club.sync()
    await Evenement.sync()
    await Visitor.sync()
    await Role.sync()
    await MembreDEvenement.sync()
    await Message.sync({force:true})
}

module.exports = syncData