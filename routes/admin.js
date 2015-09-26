"use strict"
var bodyParser = require('koa-body')()

//index controller
module.exports = function(router, passport){
  //set admin root
  router.prefix('/admin')

  router
    .get('/', function *(next){
      this.render('admin/index', {
        user: this.req.user
      })
    })

  //login
  router
    .get('/auth', function *(next){
      if( this.req.user ){
        this.body = 'logged in'
      }else{
        this.status = 400
        this.body = 'not logged in'
      }
    })
    .post('/auth', function *(next) {
      var ctx = this
      var test = yield passport.authenticate('local', function *(err, user, info){
        if(user){
          ctx.body = 'success'
        }else{
          ctx.status = 401
          ctx.body = info.message
        }
      }).call(this, next)
    })
    .get('/logout', function *(next){
      this.req.logOut()
      this.body = 'logged out'
    })

  //check for authentication and redirect to /login
  /*router.use( function *(next){
    var public_urls = ['/admin/login','/admin/auth']

    if( public_urls.indexOf(this.request.url) == -1 ){
      if(!this.req.user){
        this.status = 400
        return this.body = "not logged in"
        //this.redirect('login')
      }
    }
    yield next
  })*/



  return router
}