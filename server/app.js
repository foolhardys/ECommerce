const express = require('express')
const product = require('../server/routes/productRoute')
const user = require('../server/routes/userRoute')
const errorMiddleware = require('./middleware/error')

const app = express()

app.use(express.json())

// Routes
app.use('/api/v1', product)
app.use('/api/v1', user)

// Error middlewares
app.use(errorMiddleware)

module.exports =  app