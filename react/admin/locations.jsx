"use strict"
const {React,Base} = require('./base')
const {Input,Button,ButtonInput} = require('react-bootstrap')
var addressit = require('addressit');

class Locations extends Base{
  constructor(props){
    super(props)
    this.state = {
      number: '',
      street: '',
      regions: [],
      state: '',
      postalcode: ''
    }
  }

  render(){
    return(
      <div>
        <Input key={this.props.key}
               type="textarea"
               placeholder="Street"
               onKeyDown={this.handleKeyPress}
               ref="address"
          />
        <p>
          {this.state.number} {this.state.street} {this.state.unit}<br/>
          {this.state.regions[0]}, {this.state.state} {this.state.postalcode}
        </p>
        <ul>
          {this.props.data.map( (loc,index) =>
            <li key={index}><pre>{loc['text']}</pre><span onClick={this.delete.bind(this,index)}>delete</span></li>
          )}
        </ul>
        <Button onClick={this.addLocation}>Add</Button>
      </div>
    )
  }

  handleKeyPress(e){
    let text = e.target.value
    let address = addressit(text)
    this.setState(address)
  }

  addLocation(){
    this.props.add(this.state)
    this.refs.address.getInputDOMNode().value = ''
  }


  delete(index){
    this.props.delete(index)
  }
}

module.exports = Locations