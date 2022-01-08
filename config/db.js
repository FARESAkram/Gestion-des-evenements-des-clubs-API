const Sequelize = require('sequelize')
const config = require('config');
const {dataBase,user,password,host,dialect} = config.get('mysqlConfig');

class connectDB{
    static connexion = null

    static connectDB = function(){
        const sequelize = new Sequelize(dataBase,user,password,{
            host,
            dialect,
            logging: false
        })
        return sequelize
    }
	static getConnexion = function (){
        if(this.connexion===null){
            this.connexion = this.connectDB()
            console.log("Successfully connected to DataBase")
        } 
        return this.connexion    
    }
	
}

module.exports = connectDB;