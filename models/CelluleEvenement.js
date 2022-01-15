const Sequelize = require('sequelize')
const connectDB = require('../config/db')
const sequelize = connectDB.getConnexion()
const Evenement = require('./Evenement')

const CelluleEvenement = sequelize.define('celluleEvenement',
{
    id: {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
    },
    idEvenement:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references : {
            model : Evenement,
            key : "id"
        }
    },
    nom : {
        type : Sequelize.STRING(50),
        allowNull: false,
    },
    description : {
        type : Sequelize.STRING,
        allowNull : false,
    }
})

module.exports = CelluleEvenement