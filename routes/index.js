"use strict"

//index controller
module.exports = function(router){
  router
    .get('/', function* (next){
      console.log(this.isAuthenticated(), this.req.user, this.request.user)
      let user = this.req.user
      this.render('index', {user})
    })

  return router
}