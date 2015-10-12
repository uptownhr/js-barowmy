const mongoose = require('mongoose')
const imageSchema = require('./imageSchema')

const locationSchema = new mongoose.Schema({
  text: {type: String, lowercase: true},
  coordinates: {type: String},
  number: {type: Number},
  unit: {type: String},
  street: {type: String, lowercase: true},
  regions: {type: [String]},
  city: {type: String, lowercase: true},
  state: {type: String, lowercase: true},
  postalcode: {type: String},
  created_at: {type: Date, default: Date.now }
})

const vendorSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  description: {type: String},
  phone: {type: String},
  email: {type: String, lowercase: true},
  website: {type: String, lowercase: true},
  locations: [locationSchema],
  images: [imageSchema],
  tags: {type: [String], lowercase: true, trim: true},
  created_at: {type: Date, default: Date.now }
})

module.exports = mongoose.model("Vendor", vendorSchema)