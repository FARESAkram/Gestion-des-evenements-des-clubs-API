const Evenement = require('../models/Evenement');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const MembreDEvenement = require('../models/MembreDEvenement');

exports.getAllMembreDEvenement = async (req,res) =>{
    try{
        const error = validationResult(req);
        if(!error){
            return res.status(400).json({error:error.array()})
        }

        let membreDEvenements = await MembreDEvenement.findAll({where : { id_club : req.params.id_club}})
        const evenements = await Evenement.findAll();
        const users = await User.findAll();

        const data = membreDEvenements.map( (row) =>{
            const id_user = row['id_user']
            const id_evenement = row['id_evenement']
            const user = users.filter((user)=>{
                if(user['id_user'] === id_user)
                    return user
            })
            const evenement = evenements.filter((evenement) =>{
                if(evenement['id'] === id_evenement){
                    return evenement
                }
            })
            const modifiedRow = [{
                id:row['id'],
                // id_user:row['id_user'],
                // id_evenement:row['id_evenement'],
                // id_club:row['id_club'],
                user:user[0]['username'],
                evenement:evenement[0]['nom']}]
            return modifiedRow;
        })

        res.status(200).json({data :data})
        
    }catch(err){
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.getUserEvenement = async (req,res) => {
    try{
        const membreDeEvenement = await MembreDEvenement.findAll({where:{id_user:req.user.id_user}})
        const events = await Promise.all(membreDeEvenement.map( async e=>(
            await Evenement.findByPk(e.id_evenement)
        )))
        res.json({data: events})
    }catch (err) {
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.addMembreDEvenement = async (req,res) => {
    try{
        const error = validationResult(req);
        if(!error){
            console.log(error)
            return res.status(400).json({error:error.array()})
        }

        const user = await User.findByPk(req.params.id_user);
        if(!user){
            return res.status(400).json({msg:"Utilisateur introuvable"})
        }
        const evenement = await Evenement.findByPk(req.params.id_evenement);
        if(!evenement){
            return res.status(400).json({msg:"Evenement introuvable"})
        }

        const data = await MembreDEvenement.create({
            id_user:req.params.id_user,
            id_evenement:req.params.id_evenement,
            id_club:req.params.id_club
        })

        res.status(200).json({data:data});
    }catch(err){
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.deleteMembreDEvenement = async (req,res) =>{
    try{
        const membreDEvenement = await MembreDEvenement.findByPk(req.params.id);
        if(!membreDEvenement){
            return res.status(400).json({msg:"Ce membre ne fait pas partie de la comité de cet évènement"})
        }
        
        await membreDEvenement.destroy();

        res.json({msg:"membre supprimé avec succès de cet évènement"});
    }catch(err){
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}