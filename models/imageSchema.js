const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  name: {type: String},
  url: {type: String}
})

module.exports = imageSchema