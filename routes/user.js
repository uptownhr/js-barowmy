"use strict"

const User = require('../models/User')
const koaBody = require('koa-body')()

//user controller
module.exports = function(router){
  router
    .prefix('/user')
    .get('/', function *(next){
      let users = yield User.find()
      this.render('user/index', {users})
    })
    .get('/new', function *(next){
      this.render('user/new')
    })

  router
    .post('/create', koaBody, function *(next){
      let user = new User(this.request.body)
      try{
        yield user.save()
      }catch(e){
        return this.redirect('/user/new')
      }

      this.redirect('/user')
    })

  return router
}