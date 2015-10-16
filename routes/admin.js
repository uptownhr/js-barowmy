"use strict"
var bodyParser = require('koa-body')()
var async = require('async')
var Package = require('../models/Package')
var Product = require('../models/Product')
var User = require('../models/User')
var Vendor = require('../models/Vendor')
var User = require('../models/User')
var Promise = require('bluebird')
var moment = require('moment')
var _ = require('lodash')


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
        this.body = {
          state: "logged in",
          role: (this.req.user.role) ? this.req.user.role : null
        }
      }else{
        this.status = 400
        this.body = 'not logged in'
      }
    })
    .post('/auth', passport.authenticate('local'), function *(next){
      this.body = {
        state: "logged in",
        role: (this.req.user.role) ? this.req.user.role : null
      }

    })
    .get('/logout', function *(next){
      this.req.logOut()
      this.body = 'logged out'
      this.redirect('/admin')
    })

  /*router.use( function *(next){
    if( this.req.user ){
      yield next
    }else{
      this.status = 400
      this.body = 'not logged in'
    }
  })*/

  //api
  router
  .get('/dashboard', function *(next){
      //get counts of all models
      yield Promise.all([
        Package.find(),
        Product.find(),
        User.find(),
        Vendor.find()
      ]).spread( (Packages, Products, Users, Vendors) => {

        let userDates = Users.map( user => moment(user.created_at).format("YYYYMMDD") )
        let packageDates = Packages.map( pack => moment(pack.created_at).format("YYYYMMDD") )
        let productDates = Products.map( product => moment(product.created_at).format("YYYYMMDD") )
        let vendorDates = Vendors.map( vendor => moment(vendor.created_at).format("YYYYMMDD") )

        let combinedDates = _.uniq( userDates.concat(packageDates,productDates,vendorDates) )

        let userData = combinedDates.map( date => {
          let count = userDates.reduce( (final, d) => {
            return final = (d == date)? final+1: final
          }, 0 )
          return count
        } )

        let packageData = combinedDates.map( date => {
          let count = packageDates.reduce( (final, d) => {
            return final = (d == date)? final+1: final
          }, 0 )
          return count
        } )

        let productData = combinedDates.map( date => {
          let count = productDates.reduce( (final, d) => {
            return final = (d == date)? final+1: final
          }, 0 )
          return count
        } )

        let vendorData = combinedDates.map( date => {
          let count = vendorDates.reduce( (final, d) => {
            return final = (d == date)? final+1: final
          }, 0 )
          return count
        } )

        let datasets = [
          {
            label: 'User',
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: userData
          },
          {
            label: 'Package',
            fillColor: "rgba(0,220,220,0.2)",
            strokeColor: "rgba(0,220,220,1)",
            pointColor: "rgba(0,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(0,220,220,1)",
            data: packageData
          },
          {
            label: 'Product',
            fillColor: "rgba(220,0,220,0.2)",
            strokeColor: "rgba(220,0,220,1)",
            pointColor: "rgba(220,0,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,0,220,1)",
            data: productData
          },
          {
            label: 'Vendor',
            fillColor: "rgba(220,220,0,0.2)",
            strokeColor: "rgba(220,220,0,1)",
            pointColor: "rgba(220,220,0,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,0,1)",
            data: vendorData
          }
        ]

        this.body = {
          package: Packages.length,
          product: Products.length,
          user: Users.length,
          vendor: Vendors.length,
          chart:{
            labels: combinedDates,
            datasets: datasets
          }
        }
      })
    })
    .get('/products', function *(next){
      this.body = yield Product.find().sort({created_at: -1})
    })
    .get('/products/:id', function *(next){
      this.body = yield Product.findOne({_id: this.params.id})
    })
    .post('/products/new', function *(next){
      let params = this.request.body
      let product = new Product(params)
      let response = '';

      try{
        response = yield product.save()
      }catch(e){
        response = e.message
        this.status = 500
      }

      this.body = response
    })
    .post('/products/edit', function *(next){
      let params = this.request.body
      let res = yield Product.update({_id: params._id}, params)

      this.body = yield Product.findOne({_id: params._id})
    })
    .get('/vendors', function *(next){
      this.body = yield Vendor.find().sort({created_at: -1})
    })
    .post('/vendors/new', function *(next){
      let params = this.request.body
      let vendor = new Vendor(params)
      let response = ''
      try{
        response = yield vendor.save()
      }catch(e){
        response = e.message
        this.status = 500
      }

      this.body = response
    })
    .post('/vendors/edit', function *(next){
      let params = this.request.body
      let res = yield Vendor.update({_id: params._id}, params)

      this.body = res
    })
    .post('/vendors/delete', function *(next){
      let params = this.request.body
      let res = yield Vendor.remove({_id: params._id}).exec()
      this.body = res
      /*let res = yield Vendor.find({_id: this.params._id}).remove().exec()
      this.body = res*/
    })
    .get('/vendors/:id', function *(next){
      this.body = yield Vendor.findOne({_id: this.params.id})
    })
    .get('/packages', function *(next){
      this.body = yield Package.find().populate('products').sort({created_at: -1})
    })
    .post('/packages/new', function *(next){
      let params = this.request.body
      let pack = new Package(params)
      let response = ''

      try{
        response = yield pack.save()
      }catch(e){
        response = e.message
        this.status = 500
      }

      console.log( yield response.populate('products').execPopulate() )
      this.body = response
    })
    .post('/packages/edit', function *(next){
      let params = this.request.body
      yield Package.update({_id: params._id}, params)

      let res = yield Package.findOne({_id: params._id}).populate('products')
      this.body = res
    })
    .get('/users', function *(next){
      this.body = yield User.find().sort({created_at: -1})
    })

  //check for authentication and redirect to /login
  router.use( function *(next){
    var public_urls = ['/admin/login','/admin/auth', '/admin']

    if( public_urls.indexOf(this.request.url) == -1 ){
      if(this.req.user.role !='administrator'){
        this.status = 403
        return this.body = 'Not authorized'
      }
      else if(!this.req.user){
        this.status = 400
        return this.body = "not logged in"
      }
    }
    yield next
  })

  return router
}