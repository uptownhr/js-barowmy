const mongoose = require('mongoose')
const imageSchema = require('./imageSchema')

const locationSchema = new mongoose.Schema({
  name: {type: String},
  coordinates: {type: [Number], index:'2dsphere'},
  created_at: {type: Date, default: Date.now }
})

const vendorSchema = new mongoose.Schema({
  name: {type: String},
  description: {type: String},
  locations: [locationSchema],
  images: [imageSchema],
  tags: [],
  created_at: {type: Date, default: Date.now }
})

module.exports = mongoose.model("Vendor", vendorSchema)