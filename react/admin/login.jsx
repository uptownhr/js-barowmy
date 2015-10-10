"use strict"
const {React, Base} = require('./base')
const {Input, ButtonInput} = require('react-bootstrap')
const {authActions} = require('../alt/Auth')

class Login extends Base{
  constructor(props){
    super(props)
    this.state = {
      error: ''
    }
  }

  handleSubmit(e){
    e.preventDefault()

    let username = this.refs.username.getValue()
    let password = this.refs.password.getValue()

    $.post('/admin/auth', {username, password})
      .done(this.loggedIn)
      .fail(this.showError)
  }

  loggedIn(){
    window.localStorage['loggedIn'] = true
    this.props.history.pushState(null, '/dashboard')
  }

  showError(res){
    this.setState({error: res.responseText})
  }

  render(){
    return(
      <div className="jumbotron text-center">
        <span>{this.state.error}</span>
        <form onSubmit={this.handleSubmit}>
          <h1>Barowmy</h1>
          <Input type="text" label="Username" placeholder="Enter your username" ref="username" />
          <Input type="password" label="Password" ref="password" />
          <ButtonInput type="submit" bsStyle="primary" bsSize="large" />
        </form>
      </div>
    )
  }
}

module.exports = Login