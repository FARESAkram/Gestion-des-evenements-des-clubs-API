const Role = require('../models/Role');
const User = require('../models/User');
const Club = require('../models/Club');
const { validationResult } = require('express-validator');

exports.getAllRole = async (req, res) =>{
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
        }
        const role = await Role.findAll({ where : {
            id_club : req.params.id_club,
        }});
        res.json({ data : role});
    }
    catch(err){
        res.status(500).json({ msg : 'Server Error'});
    }
}

exports.getRole = async (req, res) =>{
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
        }
        const role = await Role.findByPk(req.params.id_role);
        if(!role || (role.id_club != req.params.id_club))
            return res.status(400).json({ msg :'role introuvable'});
        res.json({data : role});
    }
    catch(err){
        res.status(500).json( {msg : 'Server Error'});
    }
}

exports.addRole = async(req, res) =>{
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
        }
        const infos = req.body;
        if(req.params.id_club !== infos.id_club)
            return res.status(404).json({msg : "impossible d'ajouter un role dans un autre club"});
        let user = await User.findByPk(infos.id_user);
        if(!user)
        return res.status(404).json({msg : "utilisateur introuvable"});
        let club = await Club.findByPk(infos.id_club);
        if(!club)
            return res.status(404).json({msg : "club introuvable"});
        let existant_role = await Role.findOne({where : {id_user : infos.id_user, id_club : infos.id_club}});
        if(existant_role)
            return res.status(400).json({msg : " membre a deja un role"});

      
        if(infos.role === "membre"){
            let role = await Role.create({...infos});
            await role.save();
            res.json({data : role});
        }
        else{
            const existant_role = await Role.findOne({where : {id_club : infos.id_club, role : infos.role} });
            if(existant_role)
                return res.status(400).json({ msg : "le role est deja attribuer"});
            let role = await Role.create({...infos});
            console.log("got here")
            await role.save();
            res.json({data : role});
        }
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({msg : "server error"});
    }

}

exports.addPresident = async (req,res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const role = await Role.create({id_user:req.body.id_user,id_club:req.params.id_club,role:'president'})
        res.json({data:role})
    }
    catch(err){
        const user = await User.findByPk(req.body.id_user)
        const club = await Club.findByPk(req.params.id_club)
        if(!user)
            return res.status(404).json({msg:'User not found'})
        if(!club)
            return res.status(404).json({msg:'Club not found'})
        console.log(err.message);
        res.status(500).json({msg : "server error"});
    }
}

exports.addRoleAdmin = async(req, res) =>{
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const infos = req.body;
        let user = await User.findByPk(infos.id_user);
        if(!user)
        return res.status(404).json({msg : "utilisateur introuvable"});
        let club = await Club.findByPk(infos.id_club);
        if(!club)
            return res.status(404).json({msg : "club introuvable"});
        let existant_role = await Role.findOne({where : {id_user : infos.id_user, id_club : infos.id_club}});
        if(existant_role)
            return res.status(400).json({msg : " membre a deja un role"});
        if(infos.role === "membre"){
            let role = await Role.create({...infos});
            await role.save();
            res.json({data : role});
        }
        else{
            let existant = await Role.findOne({where : {id_club : infos.id_club, role : infos.role} });
            if(existant) 
                {return res.status(400).json({ msg : "le role est deja attribuer"});}
            let role = await Role.create({...infos});
            await role.save();
            res.json({data : role});
        }
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({msg : "server error"});
    }
}

exports.updateRole = async(req, res) =>{
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
        }
        
        const infos = req.body;
        const id = req.params.id_role;
        if(req.params.id_club !== infos.id_club)
            return res.status(404).json({msg : "impossible de modifier un role dans un autre club"});
            
        let role = await Role.findByPk(id);
        if(!role)
            return res.status(404).json({msg : "role introuvable"});
        if(infos.role !== "membre"){
            const existant_role = await Role.findOne({where : {id_club : infos.id_club, role : infos.role}});
            if(existant_role)
                return res.status(404).json({msg : "le role que vous souhaite attribue existe deja"});
            await role.update({...infos});
            res.json({data : role});
        }   
        else{
            await role.update({...infos});
            res.json({data : role});
        }
    }
    catch(err){
        res.status(500).json({msg : err.message});
    }
}

exports.deleteRole = async(req, res)=>{
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
        }
        const id = req.params.id_role;
        let role = await Role.findByPk(id);
        if(!role)
            return res.status(404).json({msg : "le role n'existe pas deja"});
        if(parseInt(req.params.id_club) !== parseInt(role.id_club))
            return res.status(404).json({msg : "impossible de supprier un role dans un autre club"});
        await role.destroy();
        res.json({ msg : "role supprimee"});
    }
    catch(err){
        res.status(500).json({msg : "Server Error"});        
    }
}
exports.deleteRoleAdmin = async(req, res) =>{
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const id = req.params.id_role;
        let role = await Role.findByPk(id);
        if(!role)
            return res.status(404).json({msg : "le role n'existe pas deja"});
        await role.destroy();
        res.json({ msg : "role supprimee"});
    }
    catch(err){
        res.status(500).json({msg : "Server Error"});
    }
}

exports.getUserClubs = async (req,res) => {
    try{
        const roles = await Role.findAll({where:{id_user:req.user.id_user}})
        res.json({data:roles})
    }
    catch(err){
        res.status(500).json({msg : "Server Error"});
    }
}

//added by badr
exports.deletePresident = async(req, res) =>{

    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        let user = await User.findByPk(req.params.id_user)
        if(!user){
            return res.status(400).json({msg: "Cet utilisateur n'existe pas "})
        }

        let club = await Club.findByPk(req.params.id_club)
        if(!club){
            return res.status(400).json({msg : "Club introuvable"})
        }

        let role = await Role.findOne({ 
            where : {
                id_user : req.params.id_user,
                id_club : req.params.id_club
            }
        })

        if(!role)
            return res.status(404).json({msg : "le role n'existe pas deja"});

        await role.destroy();
        res.json({ msg : "role supprimee"});
    }
    catch(err){
        res.status(500).json({msg : "Server Error"});
    }
}