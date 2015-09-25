"use strict"
const koa = require('koa'),
  Jade = require('koa-jade'),
  serve = require('koa-static'),
  config = require('./config'),
  session = require('koa-session'),
  //passport = require('koa-passport'),
  passport = require('./passport'),
  routes = require('./routes'),
  _ = require('lodash'),
  koaBody = require('koa-body')()

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
app.use(koaBody)

//session/passport
app.keys = ['testing1234']
app.use(session(app))
app.use(passport.initialize())
app.use(passport.session())

_.forIn(routes, function(route){
  app.use( route.routes() )
})


module.exports = app