const Message = require('../models/Message')
const User = require('../models/User')

exports.getAllMessages = async (req,res) => {
    try{
        const msgs = await Message.findAll({where:{id_evenement:req.params.id_evenement},order:[['date','ASC']]})
        const messages = await Promise.all(msgs.map(async e=>{
            const user = await User.findByPk(e.id_user,{attributes:{exclude:['motdepasse']}})
            return {
                ...e.dataValues,
                user
            }
        }))
        res.json({data:messages})
    }catch (err) {
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

