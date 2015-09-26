const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  name: {type: String},
  url: {type: String},
  created_at: {type: Date, default: Date.now }
})

module.exports = imageSchema