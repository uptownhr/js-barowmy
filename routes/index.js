"use strict"

const Package = require('../models/Package')

//index controller
module.exports = function(router){
  router
    .get('/', function* (next){
      let user = this.req.user
      this.render('index', {user})
    })

  return router
}