"use strict"
const {React,Base} = require('./base')
const { Router, Link } = require('react-router')
const {Navbar, Nav, NavItem,NavBrand} = require('react-bootstrap')

class Admin extends Base{
  constructor(props){
    super(props)

    this.state = {
      loggedIn: props.loggedIn || false
    }
  }

  render(){
    const navItems = [
      {
        path: '/dashboard',
        title: 'Dashboard'
      },
      {
        path: '/packages',
        title: 'Packages'
      },
      {
        path: '/products',
        title: 'Products'
      },
      {
        path: '/vendors',
        title: 'Vendors'
      },
      {
        path: '/users',
        title: 'Users'
      }
    ]

    const navKey = navItems.findIndex( n => n.path == this.props.location.pathname )

    return (
      <div>
        <Navbar>
          <NavBrand>Barowmy Admin</NavBrand>
          <Nav bsStyle="pills" activeKey={navKey} onSelect={this.props.history.pushState}>
            {navItems.map( (nav,key) =>
                <NavItem eventKey={key} key={key} href={nav.path}>{nav.title}</NavItem>
            )}
          </Nav>
          <Nav right>
            <NavItem href="/admin/logout" onClick={this.logOut}>Logout</NavItem>
          </Nav>
        </Navbar>
        {this.props.children}
      </div>
    )
  }

  logOut(e){
    e.preventDefault()
    $.get('/admin/logout')
    window.localStorage['loggedIn'] = false
    window.location.reload()
  }
}

module.exports = Admin