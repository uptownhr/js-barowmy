"use strict"
const {React, Base} = require('./base')
const {Input, ButtonInput} = require('react-bootstrap')

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

    let opt = {username, password}
    $.post('/admin/auth', opt)
      .done( this.props.loggedIn )
      .fail( this.showError )
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