const Sequelize = require('sequelize')
const connectDB = require('../config/db')
const sequelize = connectDB.getConnexion()
const Evenement = require('./Evenement')
const User = require('./User')

const Message = sequelize.define('message',
    {
        id: {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true,
        },
        id_user:{
            type: Sequelize.INTEGER,
            allowNull:false,
            references : {
                model : User,
                key : "id_user"
            }
        },
        id_evenement:{
            type: Sequelize.INTEGER,
            allowNull:false,
            references : {
                model : Evenement,
                key : "id"
            }
        },
        contenue : {
            type : Sequelize.STRING,
            allowNull: false,
        },
        date : {
            type : Sequelize.DATE,
            allowNull : false,
        }
    })

module.exports = Message