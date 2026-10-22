const mongoose = require('mongoose')

// з Mongoose 6+ старі опції (useNewUrlParser тощо) прибрані — достатньо url
const connectDB = (url) => {
  return mongoose.connect(url)
}

module.exports = connectDB
