"use strict"
const {React,Base} = require('./base')
const {userActions, userStore} = require('../alt/User')
const {Input,Button,ButtonInput,ButtonToolbar, ListGroup, ListGroupItem, Glyphicon, Badge} = require('react-bootstrap')

class Userprop extends Base {
  constructor(props){
    super(props)

    this.state = this.initialState(props)
  }

  initialState(props){
    let data = {
      username: '',
      password: ''
    }

    $.extend(data,props.data)

    return {
      data
    }
  }

  componentDidMount(){
    this.setState( this.initialState(this.props) )
  }

  componentWillReceiveProps(props){
    this.setState( this.initialState(props) )
  }

  save(e){
    e.preventDefault()
    if(this.props.action == 'edit'){
      userActions.update(this.state.data)
    }else{
      userActions.add(this.state.data)
    }
  }

  delete(){
    userActions.delete(this.state.data)
  }

  inputChange(field, e ) {
    this.state.data[field] = e.target.value
    this.setState(this.state)
  }

  render(){
    return (
      <div>
        <form onSubmit={this.save}>
          <Input type="text" label="Username" placeholder="New username"
                 value={this.state.data.username}
                 onChange={this.inputChange.bind(this, 'username')}
            />
          <Input type="text" label="Password" placeholder="Password"
                 value={this.state.data.password}
                 onChange={this.inputChange.bind(this, 'password')}
            />
          <Input type="text" label="Role" placeholder="Role"
                 value={this.state.data.role}
                 onChange={this.inputChange.bind(this, 'role')}
            />
          <hr />
          <ButtonToolbar>
            {this.props.action == 'edit' ? <Button bsStyle="danger" bsSize="small" onClick={this.delete}>Delete</Button> : ''}
            <ButtonInput style={{marginLeft: '5px'}} type="submit" bsStyle="primary" bsSize="small" value={this.props.action=='edit'?'Update':'Create'} />
          </ButtonToolbar>
        </form>
      </div>
    )
  }
}

module.exports = Userprop