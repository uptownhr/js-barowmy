const mongoose = require('mongoose')
const imageSchema = require('./imageSchema')

const packageSchema = new mongoose.Schema({
  name: {type: String},
  tag_line: {type: String},
  description: {type: String},
  images: [imageSchema]
})

module.exports = mongoose.model("Package", packageSchema)