const Club = require("../models/Club")
const User = require("../models/User")
const Evenement = require("../models/Evenement")
const Visitor = require('../models/Visitor')
const connectDB = require('../config/db')
const moment = require("moment");
const sequelize = connectDB.getConnexion()
const SERVER_ERROR = "Oops! something went wrong"

exports.basicStats = async (req, res) => {
    let membresPerClub,eventsPerClub,membresPerEvent,visitors
    try
    {
        membresPerEvent = await sequelize.query(`SELECT e.nom AS eventName , count(*) AS totalMembres 
                                          FROM membredevenements me, evenements e 
                                          WHERE me.id_evenement=e.id
                                          GROUP BY me.id_evenement`)
        eventsPerClub = await sequelize.query(`SELECT c.abbreviation, count(*) AS totalEvents
                                        FROM clubs c, evenements e 
                                        WHERE c.id=e.id_club 
                                        GROUP BY id_club`)
        membresPerClub = await sequelize.query(`SELECT c.abbreviation , count(*) AS totalMembres
                                                FROM clubs c, roles r
                                                WHERE c.id=r.id_club
                                                GROUP BY id_club`)
        visitors = await sequelize.query(`SELECT number,jour
                                          FROM visitors
                                          group by jour`)


        let startOfYear = new Date(new Date().getFullYear(),0,20)
        let today = moment(new Date()).format('YYYY-MM-DD');
        let arr = []
        while ( moment(startOfYear).format('YYYY-MM-DD') !== today )
        {
            startOfYear.setDate(startOfYear.getDate()+1)
            let day = moment(startOfYear).format('YYYY-MM-DD');
            let v = checkIfDateExists(visitors[0],day)
            let temp = {}
            if ( v === null )
            {
                temp.number = 0
                temp.jour = day
                arr.push(temp)
            }
            else
            {
                if ( arr.length === 0 )
                    temp.number = v.number
                else
                    temp.number = parseInt(v.number) + parseInt(arr[arr.length-1].number)
                temp.jour = day
                arr.push(temp)
            }
        }
        return res.status(200).json({
            eventsPerClub:eventsPerClub[0],
            membresPerEvent:membresPerEvent[0],
            membresPerClub:membresPerClub[0],
            visitors:arr,
            nbrVisitors:arr[arr.length-1].number
        })
    }
    catch (e)
    {
        console.log(e.message)
        return res.status(500).json({
            msg:SERVER_ERROR+" "+e.message
        })
    }
}
const checkIfDateExists = (arr,date)=>{
    for ( let i = 0 ; i < arr.length ; i ++ )
    {
        let instance = arr[i]
        if ( instance.jour === date )
        {
            return instance
        }
    }
    return null
}