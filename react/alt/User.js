"use strict"
const _ = require('lodash')
let Alt = require('alt')
let alt = new Alt()

class UserActions{

  fetch(){
    $.get('/admin/users', function(res){
      this.dispatch(res)
    }.bind(this))
  }

  edit(index){
    this.dispatch(index)
  }

  update(user){
    let url = '/admin/users/edit'
    return $.post(url, user)
      .done( res => {
        this.dispatch(user)
      })
  }

  add(user){
    let url = '/admin/users/new'
    $.post(url, user)
      .done( (res) => {
        this.dispatch(res)
      })
  }

  delete(user){
    $.post('/admin/users/delete', {_id: user._id})
      .done(res =>{
        this.dispatch(user)
      })
  }

}

let userActions = alt.createActions(UserActions)

class UserStore{
  constructor(){
    this.users = []
    this.user_action = 'new'
    this.user = {}
    this.error = ''

    this.bindListeners({
      fetch: userActions.FETCH,
      add: userActions.ADD,
      update: userActions.UPDATE,
      delete: userActions.DELETE,
      edit: userActions.EDIT
    })
  }

  fetch(users){
    this.users = users
  }

  edit(index){
    this.user = this.users[index]
    this.user_action = 'edit'
  }

  update(user){
    let old_user = this.users.find( u => u._id == user._id)

    $.extend(old_user, user)
  }

  add(user){
    this.users.unshift(user)
    this.user = {}
    this.user_action = 'new'
  }

  delete(user){
    this.users = this.users.filter( u => u._id != user._id)
    this.user = {}
    this.user_action = 'new'
  }
}

let userStore = alt.createStore(UserStore)

module.exports = {
  userActions,
  userStore
}