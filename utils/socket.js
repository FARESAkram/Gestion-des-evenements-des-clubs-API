const User = require('../models/User')
const Message = require('../models/Message')

const runSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("Connected To Socket")
        socket.on('join',async ({id_evenement})=>{
            socket.join(`evenement${id_evenement}`)
        })
        socket.on('sendMessage',async (data)=>{
            const {id_user,id_evenement,contenue} = data
            if(id_user){
                try{
                    const user = await User.findByPk(id_user,{attributes: { exclude: ['motdepasse'] }})
                    const message = await Message.create({...data,id_evenement,date:new Date()})
                    socket.to(`evenement${id_evenement}`).emit('sendMessage',{
                        id:message.id,
                        id_evenement,
                        contenue,
                        date:new Date(),
                        user
                    })
                }catch(err){
                    console.error(err.message)
                }
            }

        })
    });
}

module.exports = runSocket