const User = require('../models/User')
const Role = require('../models/Role')
const Club = require('../models/Club')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

// exports.getConnectedUser = async (req,res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() })
//     }
//     try {
//       const user = await User.findByPk(req.user.id_user,{attributes: { exclude: ['motdepasse'] }})
//       res.json({data:user})
//     } catch (err) {
//       console.error(err.message)
//       res.status(500).json({msg:'Server Error'})
//     }
// }

exports.getConnectedUser = async (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    let user = await User.findByPk(req.user.id_user,{attributes: { exclude: ['motdepasse'] }})
    user = {...user.dataValues,club:null,isPresident:false}

    const isPresident = await Role.findOne({where:{role:'president',id_user:req.user.id_user}})
    console.log(isPresident)
    if(isPresident)
        user = {...user,club:await Club.findByPk(isPresident.id_club),isPresident:true}

    res.json({data:user})
  } catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'Server Error'})
  }
}

exports.getAllUsers = async (req,res) => {
    try {
        let users = await User.findAll({attributes: { exclude: ['motdepasse'] }})
        res.json({data:users})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({msg:'Server Error'})
    }
}

exports.registerUser = async (req,res)=>{
    console.log("registering user body", req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array())

      return res.status(400).json({ errors: errors.array() })
    }

    const { cin,prenom,nom,username, email,motdepasse,telephone,status,role } = req.body

    try {
      const user = new User({
        cin,
        prenom,
        nom,
        username,
        email,
        motdepasse,
        telephone,
        isAdmin: false,
        locked:false
      })

      let salt = await bcrypt.genSalt(10)
      user.motdepasse = await bcrypt.hash(motdepasse, salt)
      
      await user.save()

      const payload = {
        user: {
          id_user: user.id_user
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '7 days' },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      );
    } catch (err) {
      let user1 = await User.findOne({where:{ email }})
      let user2 = await User.findOne({where:{ username }})
      let user3 = await User.findOne({where:{ telephone }})
      let user4 = await User.findOne({where:{ cin }})
      const errors = []
      if (user1) 
        errors.push({ message: 'Email est  deja pris' })
      if (user2)
        errors.push({ message: 'Username est  deja pri' })
      if (user3)
        errors.push({ message: 'telephone est  deja pri' })
      if (user4)
        errors.push({ message: 'cin est  deja pri' })
      if(errors.length)
        return res
          .status(400)
          .json({ errors })

      console.error(err.message)
      res.status(500).json({msg:'Server error'})
    }
}

exports.loginUser = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { credentials, motdepasse } = req.body

    try {
      const user = await User.findOne({where:{ email:credentials }}) ||
            await User.findOne({where:{username:credentials}})

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ message: 'Email incorrecte' }] })
      }

      const isMatch = await bcrypt.compare(motdepasse, user.motdepasse)

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ message: 'Email incorrecte' }] })
      }

      const payload = {
        user: {
          id_user: user.id_user
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({msg:'Server error'});
    }
}

exports.updateUser = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      let user = await User.findByPk(req.params.id)
      if(!user)
        return res.status(404).json({message:'User non trouvé'})
      let salt = await bcrypt.genSalt(10)
      await user.update({...req.body,motdepasse:await bcrypt.hash(req.body.motdepasse,salt)})
      res.json({data:user})
    } catch (err) {
      console.error(err.message);
      res.status(500).json({msg:'Server error'});
    }
}

exports.deleteUser = async (req,res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const user = await User.findByPk(req.params.id)
    if(!user)
      return res.status(404).json({message:'User non trouvé'})
    await user.destroy()
    res.json({msg:'User a été bien supprimer'})
  } catch (err) {
    console.error(err.message);
      res.status(500).json({msg:'Server error'});
  }
}