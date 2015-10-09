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
          />
        <Button onClick={this.addLocation}>Add</Button>
        <p>
          {this.state.number} {this.state.street} {this.state.unit}<br/>
          {this.state.regions[0]}, {this.state.state} {this.state.postalcode}
        </p>
        <ul>
          {this.props.data.map( (loc,index) => <li key={index}><pre>{loc['text']}</pre><span onClick={this.delete.bind(this,index)}>delete</span></li> )}
        </ul>
      </div>
    )
  }

  handleKeyPress(e){
    let text = e.target.value
    let address = addressit(text)
    this.setState(address)

    if( e.keyCode == 13 && text.length > 0 ){
      e.preventDefault()
      this.addLocation()
      e.target.value = ''
    }
  }

  addLocation(){
    this.props.add(this.state)
  }


  delete(index){
    this.props.delete(index)
  }
}

module.exports = Locations