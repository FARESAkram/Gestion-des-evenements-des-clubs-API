const express = require('express')
const app = express()
const cors = require("cors");

//Database and socket
const syncData = require('./utils/syncData')
const runSocket = require('./utils/socket')

const visitorMiddleWare = require('./middlewares/visitorMiddleWare')
const userRouter = require('./routes/userRouter')
const evenementRouter = require('./routes/evenementRouter')
const clubRouter = require('./routes/clubRouter')
const roleRouter = require('./routes/RoleRouter')
const adminRouter = require('./routes/adminRouter')
const membreDEvenementRouter = require('./routes/membreDEvenementRouter')
const messageRouter = require('./routes/messagesRouter')
const statisticsRouter = require('./routes/statisticsRouter')

app.use(cors({origin:"http://localhost:3000"}))
app.use(express.json({limit: '5mb'}))
app.use(express.urlencoded({limit: '5mb', extended: false}));


//Socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

syncData()

app.use(visitorMiddleWare)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/clubs',clubRouter)
app.use('/api/v1/roles', roleRouter)
app.use('/api/v1/clubs/:id_club/evenements', evenementRouter)
app.use('/api/v1/membredevenements/:id_club',membreDEvenementRouter)
app.use('/api/v1/clubs/:id_club/evenements/:id_evenement/message',messageRouter)
app.use('/api/v1/Statistics',statisticsRouter)


PORT = process.env.PORT || 5000
server.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})

runSocket(io)