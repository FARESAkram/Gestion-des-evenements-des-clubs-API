const Sequelize = require('sequelize')
const connectDB = require('../config/db')

const Club = require('../models/Club')

const sequelize = connectDB.getConnexion()

const Evenement = sequelize.define('evenement',
{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idClub: {
            type: Sequelize.INTEGER,
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
         datedebut: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },

})

module.exports = Evenement;
