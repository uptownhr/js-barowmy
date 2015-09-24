"use static"

var router = require('koa-router')

var fs = require('fs')
var path = require('path')

var relPath = "./routes"
var normalizedPath = path.join(__dirname, relPath)

var routes = {}

//auto-loading route files in routes directory
fs.readdirSync(normalizedPath).forEach(function(file) {
  var fileName = file.replace('.js','')
  var route = require(relPath + "/" + file)(router());

  routes[fileName] = route
});


//test router to show you can tack on routes here
var testRouter = router().get('/testing', function *(next){
  this.body = 'testing'
})

routes.testRouter = testRouter

module.exports = routes