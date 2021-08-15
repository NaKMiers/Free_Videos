require('dotenv').config()

const express = require('express')
const path = require('path')
const port = 3000
const bodyParser = require('body-parser')
const route = require('./routes')
const db = require('./config/db')
const cookieParser = require('cookie-parser')

// express instance
const app = express()

// static files
app.use(express.static(path.join(__dirname, 'public')))

// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser(process.env.SESSION_SECRET))

// template engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'resources', 'views'))

// connect database
db.connect()

// routes
route(app)


// listening
app.listen(port, (req, res) => {
    console.log('listening on port ' + port)
})
