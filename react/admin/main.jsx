"use strict"
const React = require('react')
const ReactDOM = require('react-dom')
const { Router, Route, History } = require('react-router')

const Login = require('./login')
const Admin = require('./admin')

const Dashboard = require('./dashboard')
const Packages = require('./packages')
const Products = require('./products')
const Vendors = require('./vendors')
const Users = require('./users')

const {authStore} = require('../alt/Auth')

function authCheck(next, replace){
  if(window.localStorage['loggedIn'] != "true"){
    replace(null, '/login')
  }else{
    console.log('wtf' + Math.random())
    checkLogin(replace)
  }
}

function checkLogin(replace){
  $.get('/admin/auth')
  .fail(function(err){
      replace(null, '/login')
      window.localStorage['loggedIn'] = false
    }).success(function(res){
      if(res.role != 'administrator'){
        replace(null, '/login')
        window.localStorage['loggedIn'] = false
      }
    })
}

ReactDOM.render(
  <Router>
    <Route path="/" component={Admin} onEnter={authCheck}>
      <Route path="dashboard" component={Dashboard} onEnter={authCheck}/>
      <Route path="packages" component={Packages} onEnter={authCheck}/>
      <Route path="products" component={Products} onEnter={authCheck}/>
      <Route path="vendors" component={Vendors} onEnter={authCheck}/>
      <Route path="users" component={Users} onEnter={authCheck}/>
    </Route>
    <Route path="/login" component={Login}/>
  </Router>
    ,
  $('#main')[0]
)