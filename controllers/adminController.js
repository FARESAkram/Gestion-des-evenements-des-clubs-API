const Club = require('../models/Club')
const User = require('../models/User')
const Role = require('../models/Role')
const { validationResult } = require('express-validator')

exports.getAllPresidents = async (req,res) =>{
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const roles = await Role.findAll({where:{role:'president'}})
        const presidents = await Promise.all(roles.map(async e=>{
            const user = await User.findByPk(e.id_user,{attributes:{exclude:"motdepasse"}})
            const club = await Club.findByPk(e.id_club)
            return {
                user,
                club
            }
        }))
        res.json({data:presidents})

    }catch(err){
        console.log("get all presidents",err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

