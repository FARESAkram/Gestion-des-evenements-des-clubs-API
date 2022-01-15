const Evenement = require('../models/Evenement')
const Club = require('../models/Club')
const { validationResult } = require('express-validator')
const {Op} = require("sequelize");

exports.getAllEvenement = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        let evenements = await Evenement.findAll({order:[['date']],where:{date: {[Op.gte]: new Date()}}})
        evenements = await Promise.all(evenements.map(async event => {
            const club = await Club.findByPk(event.idClub)
            return {
                ...event.dataValues,
                club
            }
        }))
        return res.json({data:evenements})
    }catch (err) {
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.getEvenement = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        let evenement = await Evenement.findByPk(req.params.id)
        const club = await Club.findByPk(evenement.idClub)
        if(!club)
            return res.status(404).json({msg:"Cet evenement n'a pas de club"})
        evenement = {...evenement.dataValues,club}
        return res.json({data:evenement})
    }catch (err) {
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.addEvenement = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const evenement = await Evenement.create({...req.body,idClub:req.params.idClub})
        res.json({data:evenement})
    }catch(err) {
        const club = Club.findByPk(req.params.idClub)
        if(!club)
            return res.status(404).json({msg:'Club introuvable'})
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