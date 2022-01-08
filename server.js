const express = require('express')
const app = express()
const syncData = require('./utils/syncData')

const userRouter = require('./routes/userRouter')

syncData()

app.use(express.json())

app.use('/api/v1/users', userRouter)

PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})