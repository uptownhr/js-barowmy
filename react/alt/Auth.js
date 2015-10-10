"use strict"
let Alt = require('alt')
let alt = new Alt()

class AuthActions{
  login(username, password){
    return $.post('/admin/auth', {username, password})
      .done( (res) => {
        this.dispatch(true)
      })
      .fail( (err) => {
        this.dispatch(false)
      })
  }

  loggedIn(){
    $.get('/admin/auth')
      .done( (res) => {
        this.dispatch(true)
      })
      .fail( (err) => {
        this.dispatch(false)
      })

  }
}

let authActions = alt.createActions(AuthActions)

class AuthStore{
  constructor(){
    this.loggedIn = false;

    this.bindListeners({
      login: authActions.login
    })
  }

  login(loggedIn){
    this.loggedIn = loggedIn
  }

}

let authStore = alt.createStore(AuthStore)

module.exports = {
  authActions,
  authStore
}