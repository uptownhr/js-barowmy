const mongoose = require('mongoose')
const imageSchema = require('./imageSchema')

const locationSchema = new mongoose.Schema({
  text: {type: String},
  coordinates: {type: String},
  number: {type: Number},
  unit: {type: String},
  street: {type: String},
  regions: {type: [String]},
  city: {type: String},
  state: {type: String},
  postalcode: {type: String},
  created_at: {type: Date, default: Date.now }
})

const vendorSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
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