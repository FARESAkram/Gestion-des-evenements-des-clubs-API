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
        let membresDeCellule = await MembreDeCellule.findAll({idCellule: req.params.idCellule})
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
        const membreDeCellule = await MembreDeCellule.create({idCellule:req.params.id,idUser:req.user.id_user})
        res.json({data:membreDeCellule})
    }catch(err) {
        const cellule = CelluleEvenement.findByPk(req.params.id)
        if(!cellule)
            return res.status(404).json({msg:'Cellule introuvable'})
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.udpateEvenement = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        let evenement = await Evenement.findByPk(req.params.id)
        if(!evenement)
            return res.status(404).json({msg:"Evenement introuvable"})
        if(evenement.idClub !== parseInt(req.params.idClub))
            return res.status(400).json({msg:"cette evenement n'appartient pas à ce club"})
        evenement = await evenement.update({...req.body})
        res.json({data:evenement})
    }catch(err) {
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.deleteEvenement = async (req,res) => {
    try{
        let evenement = await Evenement.findByPk(req.params.id)
        if(!evenement)
            return res.status(404).json({msg:"Evenement introuvable"})
        if(evenement.idClub !== parseInt(req.params.idClub))
            return res.status(400).json({msg:"cette evenement n'appartient pas à ce club"})
        await evenement.destroy()
        res.json({msg:"Evenement supprimer"})
    }catch(err) {
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}