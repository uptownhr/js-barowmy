"use strict"
const {React,Base} = require('./base')
const Login = require('./login')
const Dashboard = require('./dashboard')
const Packages = require('./packages')
const Products = require('./products')
const Vendors = require('./vendors')

const {Navbar, Nav, NavItem} = require('react-bootstrap')

class Admin extends Base{
  constructor(props){
    super(props)

    this.state = {
      loggedIn: props.loggedIn || false,
      navSelectedKey: 0
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

    const currentPage = navItems[this.state.navSelectedKey].title
    let pageComponent
    switch( currentPage ){
      case 'Dashboard': pageComponent = <Dashboard />; break;
      case 'Packages': pageComponent = <Packages />; break;
      case 'Products': pageComponent = <Products />; break;
      case 'Vendors': pageComponent = <Vendors />; break;
    }

    const View =
      <div>
        <Navbar>
          <Nav bsStyle="pills" activeKey={this.state.navSelectedKey} onSelect={this.navSelect}>
            {navItems.map( (nav,key) =>
                <NavItem eventKey={key} key={key} href={nav.path}>{nav.title}</NavItem>
            )}
          </Nav>
          <Nav right>
            <NavItem href="/admin/logout">Logout</NavItem>
          </Nav>
        </Navbar>
        {pageComponent}
      </div>


    return (
      <div>
        {View}
      </div>
    )
  }
}

module.exports = Admin