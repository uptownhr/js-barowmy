const mongoose = require('mongoose')
const imageSchema = require('./imageSchema')

const locationSchema = new mongoose.Schema({
  text: {type: String},
  coordinates: {type: String},
  number: {type: Number},
  street: {type: String},
  regions: {type: [String]},
  state: {type: String},
  postalcode: {type: String},
  created_at: {type: Date, default: Date.now }
})

const vendorSchema = new mongoose.Schema({
  name: {type: String},
  description: {type: String},
  phone: {type: String},
  email: {type: String},
  website: {type: String},
  locations: [locationSchema],
  images: [imageSchema],
  tags: [],
  created_at: {type: Date, default: Date.now }
})

module.exports = mongoose.model("Vendor", vendorSchema)