const CelluleEvenement = require('../models/CelluleEvenement')
const MembreDeCellule = require('../models/MembreDeCellule')
const User = require('../models/User')
const { validationResult } = require('express-validator')

exports.getAllMembreDeCellule = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        let membresDeCellule = await MembreDeCellule.findAll({
            where:{
            idCellule: req.params.idCellule
        }
        })
        const membres = []
        await Promise.all(membresDeCellule.map(async e=>{
            const user = await User.findByPk(e.idUser)
            if(user)
                membres.push(user)
        }))
        return res.json({data:membres})
    }catch (err) {
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.addMembreDeCellule = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const isMembre = await MembreDeCellule.findOne({where: {
                idCellule: req.params.idCellule,
                idUser: req.user.id_user
            }})
        if(isMembre)
            return res.status(400).json({msg:'Ce membre appartient deja a cette cellule'})
        const membreDeCellule = await MembreDeCellule.create({idCellule:req.params.idCellule,idUser:req.user.id_user})
        res.json({data:membreDeCellule})
    }catch(err) {
        const cellule = CelluleEvenement.findByPk(req.params.id)
        if(!cellule)
            return res.status(404).json({msg:'Cellule introuvable'})
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.deleteMembreDeCellule = async (req,res) => {
    try{
        let membreDeCellule = await MembreDeCellule.findByPk(req.params.id)
        if(!membreDeCellule || membreDeCellule.idCellule !== parseInt(req.params.idCellule))
            return res.status(400).json({msg:"ce membre n'appartient pas à cette cellule"})
        await membreDeCellule.destroy()
        res.json({msg:"Evenement supprimer"})
    }catch(err) {
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}