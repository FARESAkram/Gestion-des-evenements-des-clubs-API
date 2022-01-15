const Sequelize = require('sequelize')
const connectDB = require('../config/db')

const CelluleEvenement = require('../models/CelluleEvenement')
const User = require('../models/User')

const sequelize = connectDB.getConnexion()

const MembreDeCellule = sequelize.define('membreDeCellule', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idCellule: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: CelluleEvenement,
            key: "id"
        }
    },
    idUser: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: User,
            key: "id_user"
        }
    }
})

module.exports = MembreDeCellule
