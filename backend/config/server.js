const dotenv = require('dotenv')
const express = require('express')
const app = express()
const {routes} = require('../routes')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')

dotenv.config()
const { HOST,PORT } = require('./config')
require('../db').connection

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
    secret :'keyboard cat',
    resave : false,
    saveUninitialized: true,
    cookie: {secure : true}
}))
app.use(passport.initialize())
app.use(passport.session())


app.use('/api',routes())

app.listen(PORT,HOST,(err)=>{
    if(err) console.log(err)
    else console.log(`Running on ${HOST}:${PORT}`)
})
