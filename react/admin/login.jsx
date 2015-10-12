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
      <div className="container">
        <div className="card card-container">
          <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
          <p id="profile-name" className="profile-name-card"></p>
          <span>{this.state.error}</span>
          <form className="form-signin" onSubmit={this.handleSubmit}>
            <span id="reauth-email" className="reauth-email"></span>
            <Input type="text" id="username" className="form-control" placeholder="username" ref="username" autofocus />
            <Input type="password" id="inputPassword" className="form-control" placeholder="Password" ref="password" />
            <div id="remember" className="checkbox">
              <label>
                <Input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <ButtonInput className="btn btn-lg btn-primary btn-block btn-signin" type="submit" />
          </form>
          <a href="#" className="forgot-password">
            Forgot the password?
          </a>
        </div>
      </div>
    )
  }
}

module.exports = Login