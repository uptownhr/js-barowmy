"use strict"

//index controller
module.exports = function(router, passport){
  //set admin root
  router.prefix('/admin')



  router
    .get('/', function *(next){
      this.render('index', {
        user: this.req.user
      })
    })
    .post('/auth', passport.authenticate('local',{
      successRedirect: '/admin',
      failureRedirect: '/admin/login'
    }))
    .get('/login', function *(next){
      this.render('admin/login')
    })
    .get('/logout', function *(next){
      this.req.logOut()
      this.redirect('.')
    })

  //check for authentication and redirect to /login
  router.use( function *(next){
    var public_urls = ['/admin/login','/admin/auth']

    if( public_urls.indexOf(this.request.url) == -1 ){
      if(!this.req.user){
        this.redirect('login')
      }
    }
    yield next
  })

  return router
}