const mongoose = require('mongoose')
const imageSchema = require('./imageSchema')

const locationSchema = new mongoose.Schema({
  text: {type: String, lowercase: true, trim: true},
  coordinates: {type: String},
  number: {type: Number},
  unit: {type: String},
  street: {type: String, lowercase: true, trim: true},
  regions: {type: [String]},
  city: {type: String, lowercase: true, trim: true},
  state: {type: String, lowercase: true, trim: true},
  postalcode: {type: String, trim: true},
  created_at: {type: Date, default: Date.now }
})

const vendorSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true, trim: true},
  description: {type: String},
  phone: {type: String, trim: true},
  email: {type: String, lowercase: true, trim:true},
  website: {type: String, lowercase: true, trim:true},
  locations: [locationSchema],
  images: [imageSchema],
  tags: {type: [String], lowercase: true, trim: true},
  created_at: {type: Date, default: Date.now }
})

module.exports = mongoose.model("Vendor", vendorSchema)