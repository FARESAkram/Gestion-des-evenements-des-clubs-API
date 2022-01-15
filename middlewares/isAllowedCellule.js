const MembreDeCellule = require('../models/MembreDeCellule')

exports.isMembreCellule= async (req,res,next) =>{
    try{
        const id = req.user.id_user
        const isMembre = await MembreDeCellule.findOne({
            where:{
                idUser : id,
                idCellule : req.params.id
            }
        })

        if(!isMembre){
            return res.status(400).json({msg:"Vous n'appartenait pas a cette cellule"})
        }
        next()
    }catch(err){
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}
