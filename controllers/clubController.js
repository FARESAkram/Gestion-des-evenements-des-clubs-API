const Club = require('../models/Club')
const { validationResult } = require('express-validator')

exports.getClub = async (req,res) =>{
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const id = req.params.id;
        const club = await Club.findByPk(id)
        if(!club){
            return res.status(400).json({msg:"Club introuvable"})
        }

        res.json({msg: club})
    }catch(err){
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.getAllClub = async (req,res) =>{
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const clubs = await Club.findAll();
        res.json({data : clubs})
    }catch(err){
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.addClub = async (req,res) =>{
    console.log(req.body)
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        let club = await Club.findOne({
            where:{
                nom : req.body.nom,
            }
        })

        if(club){
            return res.status(400).json({msg:"Ce club exist déjà."})
        }

        const infos = req.body

        club = Club.build(infos)
        await club.save()

        res.json({
            data : club
        })
    }catch(err){
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}


exports.updateClub = async (req,res) =>{
    console.log("BODY OF UPDATE", req.body)
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const id = req.params.id;
        const infos = req.body

        const club = await Club.findByPk(id)
        if(!club){
            return res.status(400).json({msg :"Ce club n'existe pas."})
        }

        await club.update({...infos})
        
        res.json({data:club})

    }catch(err){
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.deleteClub = async (req,res) => {
    
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
    }catch(err){
        console.log(err)
        res.status(500).send('Server error')
    }

    const id = req.params.id
    Club.destroy({where:{id:id}}).
        then(num => { 
            if(num == 1){
                res.send({
                    msg:"Club supprimé"
                });
            }else{
                res.send({
                    msg:"Club introuvable"
                });
            }
        }).
        catch(err =>{
            console.error(err.message)
            res.status(500).send('Server Error')
        })
}

