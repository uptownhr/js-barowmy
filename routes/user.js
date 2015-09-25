"use strict"

const passport = require('koa-passport')

const User = require('../models/User')
const koaBody = require('koa-body')()

//user controller
module.exports = function(router){
  //set root path
  router.prefix('/user')

  //list users
  router
    .get('/', function *(next){
      let users = yield User.find()
      this.render('user/index', {users})
    })

  //registration
  router
    .get('/new', function *(next){
      this.render('user/new')
    })
    .post('/create', koaBody, function *(next){
      let user = new User(this.request.body)
      try{
        yield user.save()
      }catch(e){
        return this.redirect('/user/new')
      }

      this.redirect('/user')
    })


  //login
  router
    .get('/login', function *(next){

    })
    .post('/auth', koaBody, function *(next){
      var ctx = this
      yield passport.authenticate('local', function *(err, user, info){
        console.log(err,user,info,this)

        if(err){
          ctx.redirect( ctx.request.query.redir )
        }else{
          ctx.req.logIn(user, function(){
            ctx.redirect('/')
          })
        }
      }).call(this, next)
    })
    /*.post('/auth', passport.authenticate('local'), function *(next){
      console.log(this.request.body)
      let user = yield User.findOne(this.request.body)

      if(user){
        this.body = 'you should be logged in -- implement session'
      }else{
        this.redirect( this.request.query.redir )
      }
    })*/


  return router
}