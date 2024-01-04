const express = require('express')
const product = require('../server/routes/productRoute')
const errorMiddleware = require('./middleware/error')

const app = express()

app.use(express.json())

// Routes
app.use('/api/v1', product)

// Error middlewares
app.use(errorMiddleware)

module.exports =  app