"use strict"

const Package = require('../models/Package')
//const Category = require('../models/Category')
const Vendor = require('../models/Vendor')

const flatten = (a, b) => a.concat(b)

//index controller
module.exports = function(router){
  router
    .get('/', function *(next){
      let user = this.req.user

      let vendors = yield Vendor.find()

      let tags = vendors
        .map( vendor => vendor.tags )
        .reduce( flatten, [])
        .reduce( (res,tag) => {
          let l = res.find( a => a.name == tag )

          if(l){
            l.count++
          }else{
            res.push({
              name: tag,
              count: 1
            })
          }

          return res
        }, [])
        .sort( (a,b) => b.count-a.count )

      let locations = vendors
        .map( vendor => vendor.locations )
        .reduce( flatten, [] )
        .reduce( (res,loc) => {
          let l = res.find( a => a.name == loc.name )

          if(l){
            l.count++
          }else{
            res.push({
              name: loc.name,
              count: 1
            })
          }

          return res
        },[])
        .sort( (a,b) => b.count - a.count )

      this.render('index', {vendors, locations, tags, user})
    })
    .get('/tag/:tag', function *(next){
      let tag = this.params.tag
      let vendors = yield Vendor.find({tags: tag})
      let locations = vendors.map( vendor => vendor.locations ).reduce(flatten,[])

      this.render('tag', {tag, vendors, locations})
    })

  return router
}