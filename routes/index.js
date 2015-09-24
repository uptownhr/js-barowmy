"use strict"

//index controller
module.exports = function(router){
  router
    .get('/', function* (next){
      this.render('index')
    })

  return router
}