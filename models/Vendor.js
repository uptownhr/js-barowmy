const mongoose = require('mongoose')
const imageSchema = require('./imageSchema')

const locationSchema = new mongoose.Schema({
  name: {type: String},
  coordinates: {type: [Number]}
})

const vendorSchema = new mongoose.Schema({
  name: {type: String},
  tag_line: {type: String},
  description: {type: String},
  locations: [locationSchema],
  images: [imageSchema]
})

module.exports = mongoose.model("Vendor", vendorSchema)