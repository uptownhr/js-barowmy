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
          let l = res.find( a => a.city == loc.city )

          if(l){
            l.count++
          }else{
            res.push({
              name: toTitleCase(loc.city),
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
    .get('/vendor/:vendor', function *(next){
      let vendor = yield Vendor.findOne({name: this.params.vendor})

      this.render('vendor', {vendor})
    })
    .get('/city/:city', function *(next){
      let city = this.params.city

      let search = new RegExp(city, 'i')

      let vendors = yield Vendor.find({'locations': {$elemMatch: { city: search } }})
      let tags = vendors.map( vendor => vendor.tags ).reduce(flatten, [])

      this.render('city', {vendors, tags})
    })

  return router
}

function toTitleCase(str)
{
  return (str||"").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}