const express =  require('express')
const  dotenv = require('dotenv').config()
const colors = require('colors')

const connectDB = require('./config/db')

const {errorMiddleware} = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 5000
const app = express()

//MongoDB connect
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:false}))


//middlewares
app.use(errorMiddleware)


app.use('/api/users' , require('./routes/userRoutes'))


app.listen(PORT , () =>{
    console.log(`Server is listening in PORT ${PORT}`)
})