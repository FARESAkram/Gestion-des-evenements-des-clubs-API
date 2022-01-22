const Sequelize = require('sequelize')
const connectDB = require('../config/db')
const sequelize = connectDB.getConnexion()
const User = require('./User')
const Evenement = require("./Evenement")
const Club = require('./Club')

const MembreDEvenement = sequelize.define('membredevenement', {
    id: {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
    },
    id_user: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: "id_user"
        }
    },
    id_evenement:{
        type: Sequelize.INTEGER,
        references: {
            model: Evenement,
            key: "id"
        }
    },
    id_club:{
        type: Sequelize.INTEGER,
        references: {
            model: Club,
            key: "id"
        }
    }
},{
    indexes : [
        {
            unique : true,
            fields : ['id_user', 'id_evenement',"id_club"]
        }
    ]
})

module.exports = MembreDEvenement