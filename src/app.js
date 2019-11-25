const express = require('express')
require('./db/mongoose')
const userRouter = require('../src/routers/user')
const shelterRouter = require('../src/routers/shelter')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(shelterRouter)

module.exports = app
