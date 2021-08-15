const express = require('express')
const path = require('path')
const port = 3000

// express instance
const app = express()

// listening
app.listen(port, (req, res) => {
    console.log('listening on port' + port)
})