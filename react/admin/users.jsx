"use strict"
const {Base, React} = require('./base')
const Userprop = require('./user')
const {userActions, userStore} = require('../alt/User')
const {Well,Grid,Row,Col,Panel, ListGroup, ListGroupItem, Button, Glyphicon} = require('react-bootstrap')

class Users extends Base {
  constructor(props){
    super(props)

    this.state = {
      users: [],
      user_action: 'new',
      user: {}
    }
  }

  componentDidMount(){
    userStore.listen(this.onChange)
    userActions.fetch()
  }

  componentWillUnmount(){
    userStore.unlisten(this.onChange)
  }

  onChange(users){
    this.setState(users)
  }

  showNew(){
    this.setState({
      user_action: 'new',
      user: {}
    })
  }

  editUser(index){
    this.setState({
      user_action: 'edit',
      user: this.state.users[index]
    })
  }

  render(){
    let header
    if(this.state.user_action == 'new'){
      header = `New User`
    }else{
      header = `Edit User ${this.state.user.username}`
    }

    return (
      <div>
        <Grid fluid>
          <Row>
            <Col sm={4} md={2}>
              <ListGroup header="Users">
                <ListGroupItem header="Users"><Button bsStyle="info" onClick={this.showNew.bind(this)} bsSize="xsmall"><Glyphicon glyph="plus" />add new</Button></ListGroupItem>
                {this.state.users.map( (user, index) => {
                  return <ListGroupItem key={index} onClick={this.editUser.bind(this, index)}>{user.username}</ListGroupItem>
                })}
              </ListGroup>
            </Col>
            <Col sm={8} md={8}>
              <Panel header={header}>
                <Userprop action={this.state.user_action}
                          data={this.state.user}
                  />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

module.exports = Users