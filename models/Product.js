const mongoose = require('mongoose')
const imageSchema = require('./imageSchema')

const skuSchema = new mongoose.Schema({
  product_id: {type: Schema.Types.ObjectId, ref: 'Product'},
  vendor_id: {type: Schema.Types.ObjectId, ref: 'Vendor'},
  duration: {type: String},
  price: {type: Number},
  qty: {type: Number}
})

const productSchema = new mongoose.Schema({
  name: {type: String},
  description: {type: String},
  image_url: imageSchema,
  images: [imageSchema],
  skus: [skuSchema]
})

module.exports = mongoose.model("Product", productSchema)