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
            const club = await Club.findByPk(event.id_club)
            return {
                ...event.dataValues,
                club
            }
        }))
        return res.json({data:evenements})
    }catch (err) {
        console.log("get all evenements error : " + err.message)
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
        const club = await Club.findByPk(evenement.id_club)
        if(!club)
            return res.status(404).json({msg:"Cet evenement n'a pas de club"})
        evenement = {...evenement.dataValues,club}
        return res.json({data:evenement})
    }catch (err) {
        console.log("get one evenement error message " + err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.addEvenement = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const evenement = await Evenement.create({...req.body,id_club:req.params.id_club})
        res.json({data:evenement})
    }catch(err) {
        const club = Club.findByPk(req.params.id_club)
        if(!club)
            return res.status(404).json({msg:'Club introuvable'})
        console.log("add evenement error message : " + err.message)
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
        if(evenement.id_club !== parseInt(req.params.id_club))
            return res.status(400).json({msg:"cette evenement n'appartient pas à ce club"})
        evenement = await evenement.update({...req.body})
        res.json({data:evenement})
    }catch(err) {
        console.log("update evenement error message : " + err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.deleteEvenement = async (req,res) => {
    try{
        let evenement = await Evenement.findByPk(req.params.id)
        if(!evenement)
            return res.status(404).json({msg:"Evenement introuvable"})
        if(evenement.id_club !== parseInt(req.params.id_club))
            return res.status(400).json({msg:"cette evenement n'appartient pas à ce club"})
        await evenement.destroy()
        res.json({msg:"Evenement supprimer"})
    }catch(err) {
        console.log("delete evnement error" + err.message)
        res.status(500).json({msg:"Server Error"})
    }
}


// added by badr
exports.getAllClubEvenement = async (req,res)=>{
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const evenements = await Evenement.findAll({
            where:{
                id_club:req.params.id_club,
            }
        })

        res.json({data:evenements})
    }catch(err){
        console.log("get all club evenement error: " + err.message)
        res.status(500).json({msg:"Server error"})
    }
}


// changed id_club to id_club, cuz snake case in president and camel case in here?????