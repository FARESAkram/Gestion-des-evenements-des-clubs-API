const Sequelize = require('sequelize')
const connectDB = require('../config/db')

const Club = require('../models/Club')

const sequelize = connectDB.getConnexion()

const Evenement = sequelize.define('evenement', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_club: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete: "CASCADE",
        references: {
            model: Club,
            key: "id"
        }
    },
    nom: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    logo:{
        type : Sequelize.TEXT('long'),
    }
})

module.exports = Evenement;
