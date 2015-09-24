"use static"

var app = require('./app'),
  mongoose = require('./db')

app.use(function *(next){
  this.render('index')
})

app.listen(9999,console.log)