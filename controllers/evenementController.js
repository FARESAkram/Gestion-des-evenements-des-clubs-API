const Evenement = require('../models/Evenement')
const Club = require('../models/Club')
const { validationResult } = require('express-validator')

exports.getAllEvenement = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const evenements = await Evenement.findAll()
        return res.json({date:evenements})
    }catch (e) {
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}