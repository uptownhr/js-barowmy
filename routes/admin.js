"use strict"

//index controller
module.exports = function(router){
  //set admin root
  router.prefix('/admin')

  //check for authentication and redirect to /login
  router.use( function *(next){
    if(this.request.url != '/admin/login'){
      if(!this.user){
        this.redirect('login')
      }
    }
    yield next
  })

  router
    .get('/', function *(next){
      //check login, and send to login screen
      this.render('index')
    })
    .get('/login', function *(next){
      this.render('admin/login')
    })

  return router
}