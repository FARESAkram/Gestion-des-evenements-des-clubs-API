const Sequelize = require('sequelize')
const connectDB = require('../config/db')
const sequelize = connectDB.getConnexion()

const User = sequelize.define('user',
{
    id_user: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    prenom:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    nom:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    cin:{
        type:Sequelize.STRING(10),
        allowNull:false,
        unique:true
    },
    telephone:{
        type:Sequelize.STRING(15),
        allowNull:false,
        unique:true
    },
    email:{
        type:Sequelize.STRING(130),
        allowNull:false,
        unique:true
    },
    motdepasse:{
        type:Sequelize.STRING,
        allowNull:false
    },
    username:{
        type:Sequelize.STRING(20),
        allowNull:false,
        unique:true
    },
    profilepic:{
        type:Sequelize.TEXT('long')
    },
    isAdmin:{
        type:Sequelize.BOOLEAN,
        default:false,
        allowNull:true
    },
    locked:{
        type: Sequelize.BOOLEAN,
        allowNull:true,
        default:false
    }
})


module.exports = User