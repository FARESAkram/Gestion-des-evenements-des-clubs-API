const User = require('../models/User')
const Role = require("../models/Role");


exports.isPresident = async (req, res, next) =>{
    try{
        const id = req.user.id_user;
        const id_club = req.params.id_club;

        const role = await Role.findOne({
            where : {
                id_user : id,
                id_club : id_club,
                role : "president"
            }
        });

        if(!role)
            return res.status(404).json({ msg : "vous n'etes pas le president du club"});
        next();
    }
    catch(err){
        console.log("President error",err.message);
        res.status(500).json({msg : "Server Error"});
    }
}
