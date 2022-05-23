const express = require('express');
const path = require('path')
const app = express()
const api=require('./server/routes/api')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/',api)
const port = 8080
app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})

















