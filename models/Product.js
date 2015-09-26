const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  imageSchema = require('./imageSchema')

const skuSchema = new mongoose.Schema({
  product_id: {type: Schema.Types.ObjectId, ref: 'Product'},
  vendor_id: {type: Schema.Types.ObjectId, ref: 'Vendor'},
  duration: {type: String},
  price: {type: Number},
  qty: {type: Number},
  created_at: {type: Date, default: Date.now }
})

const productSchema = new mongoose.Schema({
  name: {type: String},
  description: {type: String},
  images: [imageSchema],
  skus: [skuSchema],
  created_at: {type: Date, default: Date.now }
})

module.exports = mongoose.model("Product", productSchema)