const React = require('react')
const ReactDOM = require('react-dom')
const { Router, Route } = require('react-router')

const Login = require('./login')
const Admin = require('./admin')

const Dashboard = require('./dashboard')
const Packages = require('./packages')
const Products = require('./products')
const Vendors = require('./vendors')


ReactDOM.render(
  <Router location="history">
    <Route path="/" component={Admin} location="history">
      <Route path="dashboard" component={Dashboard}/>
      <Route path="packages" component={Packages}/>
      <Route path="products" component={Products}/>
      <Route path="vendors" component={Vendors}/>
    </Route>
  </Router>
    ,
  document.getElementsByTagName('body')[0]
)