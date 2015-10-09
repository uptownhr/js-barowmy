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