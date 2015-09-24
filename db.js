"use strict"

const mongoose = require('mongoose'),
  connection = mongoose.connection,
  config = require('./config')

mongoose.connect(config.mongodb)

connection.on('error', console.log)
connection.on('connected', console.log.bind(null, `connected: ${config.mongodb}`))

module.exports = mongoose