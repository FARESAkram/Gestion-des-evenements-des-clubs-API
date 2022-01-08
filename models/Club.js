const Sequelize = require('sequelize')
const connectDB = require('../config/db')
const sequelize = connectDB.getConnexion()
const User = require('./User')

const Club = sequelize.define('club',
{
    id: {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
    },
    nom : {
        type : Sequelize.STRING(50),
        allowNull: false,
    },
    description : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    abbreviation : {
        type : Sequelize.STRING(10),
        allowNull : false,
    }
})

module.exports = Club