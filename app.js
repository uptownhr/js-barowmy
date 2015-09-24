"use static"
const koa = require('koa'),
  Jade = require('koa-jade'),
  serve = require('koa-static'),
  config = require('./config'),
  routes = require('./routes'),
  _ = require('lodash')

const jade = new Jade({
  viewPath: config.viewPath,
  debug: true,
  noCache: true,
  pretty: true,
  compileDebug: true,
  basedir: config.viewPath
})

var app = koa()

app.use(jade.middleware)
app.use(serve(config.staticPath))

_.forIn(routes, function(route){
  app.use( route.routes() )
})


module.exports = app