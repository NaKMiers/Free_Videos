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

// connect database
db.connect()

// static files
app.use(express.static(path.join(__dirname, 'public')))

// template engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'resources', 'views'))

// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser('lslkjfljlk ldf oijewjeoifjowjsndls f'))

// routes
route(app)


// listening
app.listen(port, (req, res) => {
    console.log('listening on port ' + port)
})
