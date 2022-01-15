const { validationResult } = require('express-validator')
const CelluleEvenement = require('../models/CelluleEvenement')
const Evenement = require('../models/Evenement')

exports.getAllCelluleEvenement = async (req,res) => {
    try{
        const cellulesEvenement = await CelluleEvenement.findAll({idEvenement:req.params.idEvenement})
        res.json({data:cellulesEvenement})
    }catch(err) {
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.getCelluleEvenement = async (req,res) => {
    try{
        const celluleEvenement = await CelluleEvenement.findByPk(req.params.id)
        if(!celluleEvenement)
            return res.status(404).json({msg:'Cellule introuvable'})
        if(celluleEvenement.idEvenement !== parseInt(req.params.idEvenement))
            return res.status(400).json({msg:"Cette cellule n'appartient pas a cet evenement"})
        res.json({data:celluleEvenement})
    }catch(err) {
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.addCelluleEvenement = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const celluleEvenement = await CelluleEvenement.create({...req.body,idEvenement:req.params.idEvenement})
        res.json({data:celluleEvenement})
    }catch(err) {
        const evenement = await Evenement.findByPk(req.params.idEvenement)
        if(!evenement)
            return res.status(404).json({msg:'Evenement introuvable'})
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.updateCelluleEvenement = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        let celluleEvenement = await CelluleEvenement.findByPk(req.params.id)
        if(!celluleEvenement)
            return res.status(404).json({msg:'Cellule introuvable'})
        if(celluleEvenement.idEvenement !== parseInt(req.params.idEvenement))
            return res.status(400).json({msg:"Cette cellule n'appartient pas a cet evenement"})
        celluleEvenement = await celluleEvenement.update({...req.body})
        res.json({data:celluleEvenement})
    }catch(err) {
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.deleteCelluleEvenement = async (req,res) => {
    try{
        const celluleEvenement = await CelluleEvenement.findByPk(req.params.id)
        if(!celluleEvenement)
            return res.status(404).json({msg:'Cellule introuvable'})
        if(celluleEvenement.idEvenement !== parseInt(req.params.idEvenement))
            return res.status(400).json({msg:"Cette cellule n'appartient pas a cet evenement"})
        await celluleEvenement.destroy()
        res.json({msg:'cellule Evenement supprimer'})
    }catch(err) {
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}