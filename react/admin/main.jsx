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

const {authStore} = require('../alt/Auth')

function test(next, replace){
  if(window.localStorage['loggedIn'] != "true"){
    replace(null, '/login')
  }
}

ReactDOM.render(
  <Router>
    <Route path="/" component={Admin} onEnter={test}>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="packages" component={Packages}/>
      <Route path="products" component={Products}/>
      <Route path="vendors" component={Vendors}/>
    </Route>
    <Route path="/login" component={Login}/>
  </Router>
    ,
  $('#main')[0]
)