const express =  require('express')
const  dotenv = require('dotenv').config()
const colors = require('colors')

const connectDB = require('./config/db')

const {errorMiddleware} = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 5000
const app = express()

//MongoDB connect
connectDB()


//req - parsers
app.use(express.json())
app.use(express.urlencoded({extended:false}))


//routes
app.use('/api/users' , require('./routes/userRoutes'))


//middlewares
app.use(errorMiddleware)


app.listen(PORT , () =>{
    console.log(`Server is listening in PORT ${PORT}`)
})