"use strict"
const {React,Base} = require('./base')
const Login = require('./login')
const Dashboard = require('./dashboard')
const {Nav, NavItem} = require('react-bootstrap')

class Admin extends Base{
  constructor(props){
    super(props)

    this.state = {
      loggedIn: props.loggedIn || false,
      navSelectedKey: 1
    }
  }

  componentDidMount(){
    $.get('/admin/auth/', this.loggedIn)
  }

  loggedIn(){
    this.setState({loggedIn: true})
  }

  navSelect(key, path){
    this.setState({
      navSelectedKey: key
    })
  }

  render(){
    if( !this.state.loggedIn ) return <Login loggedIn={this.loggedIn} />

    const navItems = [
      {
        path: '/Dashboard',
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

    const View =
      <div>
        <Nav bsStyle="pills" stacked activeKey={this.state.navSelectedKey} onSelect={this.navSelect}>
          {navItems.map( (nav,key) =>
            <NavItem eventKey={key} key={key} href={nav.path}>{nav.title}</NavItem>
          )}
        </Nav>
        <Dashboard/>
      </div>


    return (
      <div>
        {View}
      </div>
    )
  }
}

module.exports = Admin