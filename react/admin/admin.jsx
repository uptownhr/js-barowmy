"use strict"
const {React,Base} = require('./base')
const { Router, Link } = require('react-router')
const {Navbar, Nav, NavItem} = require('react-bootstrap')

class Admin extends Base{
  constructor(props){
    super(props)

    this.state = {
      loggedIn: props.loggedIn || false
    }
  }

  componentDidMount(){
    $.get('/admin/auth/', this.loggedIn)
  }

  loggedIn(){
    this.setState({loggedIn: true})
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
      }
    ]

    const navKey = navItems.findIndex( n => n.path == this.props.location.pathname )
    
    return (
      <div>
        <Navbar>
          <Nav bsStyle="pills" activeKey={navKey} onSelect={this.props.history.pushState}>
            {navItems.map( (nav,key) =>
                <NavItem eventKey={key} key={key} href={nav.path}>{nav.title}</NavItem>
            )}
          </Nav>
          <Nav right>
            <NavItem href="/admin/logout">Logout</NavItem>
          </Nav>
        </Navbar>
        {this.props.children}
      </div>
    )
  }
}

module.exports = Admin