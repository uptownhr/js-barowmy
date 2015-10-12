"use strict"

var app = require('./app'),
  mongoose = require('./db')

app.listen( process.env.PORT || 3000, console.log)