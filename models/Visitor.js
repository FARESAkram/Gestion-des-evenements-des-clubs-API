const Sequelize = require('sequelize');
const connectDB = require('../config/db')
const moment = require("moment");
const sequelize = connectDB.getConnexion()

const Visitor = sequelize.define('visitor',{
    number:{
        type : Sequelize.INTEGER,
        allowNull:false
    },
    jour:{
        type: Sequelize.DATEONLY,
        allowNull: false,
        get(){
            return moment(this.getDataValue('jour')).format('YYYY-MM-DD')
        },
        unique:true
    }
})

module.exports = Visitor