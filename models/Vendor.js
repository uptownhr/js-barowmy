const mongoose = require('mongoose')
const imageSchema = require('./imageSchema')

const locationSchema = new mongoose.Schema({
  name: {type: String},
  coordinates: {type: String},
  address1: {type: String},
  address2: {type: String},
  city: {type: String},
  state: {type: String},
  zip: {type: Number},
  country: {type: String},
  created_at: {type: Date, default: Date.now }
})

const vendorSchema = new mongoose.Schema({
  name: {type: String},
  tag_line: {type: String},
  description: {type: String},
  locations: [locationSchema],
  images: [imageSchema],
  created_at: {type: Date, default: Date.now }
})

module.exports = mongoose.model("Vendor", vendorSchema)