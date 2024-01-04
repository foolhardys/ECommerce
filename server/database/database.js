const mongoose = require('mongoose')

const connectDB = async (url) => {
  await mongoose.connect(url)
  console.log('database connected');
}

module.exports = connectDB 