"use strict"
let Alt = require('alt')
let alt = new Alt()

class VendorActions{
  add(vendor){
    let url = '/admin/vendors/new'
    $.post(url, vendor, function(res){
      this.dispatch(res)
    }.bind(this))
  }

  fetch(){
    $.get('/admin/vendors', function(res){
      this.dispatch(res)
    }.bind(this))
  }

  save(vendor){
    let url = '/admin/vendors/edit'

    return $.post(url, vendor)
      .done( res => {
        this.dispatch(vendor)
      })
  }

  delete(vendor){
    $.post('/admin/vendors/delete', {_id: vendor._id})
      .done(res =>{
        this.dispatch(vendor)
      })
  }

  edit(index){
    this.dispatch(index)
  }
}

let vendorActions = alt.createActions(VendorActions)

class VendorStore{
  constructor(){
    this.vendors = []

    this.vendor_action = 'new'
    this.vendor = {}
    this.error = ''

    this.bindListeners({
      add: vendorActions.ADD,
      fetch: vendorActions.FETCH,
      save: vendorActions.SAVE,
      delete: vendorActions.DELETE,
      edit: vendorActions.EDIT
    })
  }

  fetch(vendors){
    this.vendors = vendors
  }

  add(vendor){
    this.vendors.unshift(vendor)
    this.vendor = {}
    this.vendor_action = 'new'
  }

  edit(index){
    this.vendor = this.vendors[index]
    this.vendor_action = 'edit'
  }

  save(vendor){
    let old_vendor = this.vendors.find( v => v._id == vendor._id )

    $.extend(old_vendor, vendor)
  }

  delete(vendor){
    this.vendors = this.vendors.filter( v => v._id != vendor._id )
    this.vendor = {}
    this.vendor_action = 'new'
  }
}

let vendorStore = alt.createStore(VendorStore)

module.exports = {
  vendorActions,
  vendorStore
}