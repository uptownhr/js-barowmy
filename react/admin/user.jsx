"use strict"
const {React,Base} = require('./base')
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

  render(){
    return (
      <div>
        <form>
          <Input type="text" label="Username" placeholder="New username"
                 value={this.state.data.username}
            />
          <Input type="text" label="Password" placeholder="Password"
                 value={this.state.data.password}
            />
        </form>
      </div>
    )
  }
}

module.exports = Userprop