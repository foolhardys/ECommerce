const app = require('./app')
const { PORT, MONGO_URI } = require('./config')
require('dotenv').config()
const connectDB = require('./database/database')

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

let server
connectDB(MONGO_URI).then(() => {
  server = app.listen(PORT, () => {
    console.log(`Server is listening on port : ${PORT}...`);
  })
})

// Unhandeled promise rejections

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to unhandeled rejection `);
  server.close(() => {
    process.exit(1)
  })
})
