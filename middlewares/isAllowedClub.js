const User = require('../models/User')

exports.isAdmin = async (req,res,next) =>{
    try{
        const id = req.user.id_user
        const user = await User.findOne({
            where:{
                id_user : id,
                isAdmin : true
            }
        })

        if(!user){
            res.status(400).json({msg:"Vous n'êtes pas administrateur"})
        }

        next()
    }catch(err){
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}
