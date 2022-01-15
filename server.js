const express = require('express')
const app = express()
const syncData = require('./utils/syncData')

const userRouter = require('./routes/userRouter')
const clubRouter = require('./routes/clubRouter')
const evenementRouter = require('./routes/evenementRouter')
const celluleEvenementRouter = require('./routes/celluleEvenementRouter')
const membreDeCelluleRouter = require('./routes/membreDeCelluleRouter')

syncData()

app.use(express.json())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/clubs',clubRouter)
app.use('/api/v1/clubs/:idClub/evenements', evenementRouter)
app.use('/api/v1/clubs/:idClub/evenements/:idEvenement/cellule',celluleEvenementRouter)
app.use('/api/v1/clubs/:idClub/evenements/:idEvenement/cellule/:idCellule/membre',membreDeCelluleRouter)

PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})