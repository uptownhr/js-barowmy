const mongoose = require('mongoose')
const imageSchema = require('./imageSchema')

const packageSchema = new mongoose.Schema({
  name: {type: String},
  tag_line: {type: String},
  description: {type: String},
  images: [imageSchema],
  products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  created_at: {type: Date, default: Date.now }
})

module.exports = mongoose.model("Package", packageSchema)