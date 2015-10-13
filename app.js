"use strict"
const koa = require('koa'),
  Jade = require('koa-jade'),
  compress = require('koa-compress'),
  serve = require('koa-static'),
  config = require('./config'),
  session = require('koa-session'),
  //passport = require('koa-passport'),
  passport = require('./passport'),
  routes = require('./routes'),
  _ = require('lodash'),
  koaBody = require('koa-body')({
    jsonLimit: '10mb',
    formLimit: '10mb'
  })


const jade = new Jade({
  viewPath: config.viewPath,
  debug: true,
  noCache: true,
  pretty: true,
  compileDebug: true,
  basedir: config.viewPath,
  helperPath: [
    {
      toTitleCase: function(str){
        console.log(str)
        return (str||"").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      }
    }
  ]
})

var app = koa()

app
  .use(jade.middleware)
  .use(compress())
  .use(serve(
    config.staticPath, {
      maxage: 365 * 24 * 60 * 60
    }
  ))
  .use(koaBody)

//session/passport
app.keys = ['testing1234']
app.use(session(app))
app.use(passport.initialize())
app.use(passport.session())

_.forIn(routes, function(route){
  app.use( route.routes() )
})


module.exports = app