"use strict"
const {React,Base} = require('./base')
const {Input,Button,ButtonInput} = require('react-bootstrap')
var addressit = require('addressit');

class Locations extends Base{
  constructor(props){
    super(props)
    this.state = props
  }

  componentWillReceiveProps(props){
    this.setState( props )
  }

  render(){
    let data = this.state.data


    return(
      <div>
        <Input key={this.props.key}
               type="textarea"
               placeholder="Street"
               onKeyDown={this.handleKeyPress}
               ref="address"
          />
        <Input type="text" label="Number" value={data.number} onChange={this.inputChange.bind(this, 'number')}/>
        <Input type="text" label="Street" value={data.street} onChange={this.inputChange.bind(this, 'street')} />
        <Input type="text" label="Unit" value={data.unit} onChange={this.inputChange.bind(this, 'unit')} />
        <Input type="text" label="City" value={data.city} onChange={this.inputChange.bind(this, 'city')} />
        <Input type="text" label="State" value={data.state} onChange={this.inputChange.bind(this, 'state')} />
        <Input type="text" label="Zip" value={data.postalcode} onChange={this.inputChange.bind(this, 'postalcode')} />

        <ul>
          {this.props.data.map( (loc,index) =>
            <li key={index}>
              <pre>
                  {loc.number} {loc.street} {loc.unit}<br/>
                  {loc.city}, {loc.state} {loc.postalcode}
              </pre>
              <span onClick={this.delete.bind(this,index)}>delete</span>
            </li>
          )}
        </ul>
        <Button onClick={this.addLocation}>Add</Button>
      </div>
    )
  }

  handleKeyPress(e){
    let text = e.target.value
    let address = addressit(text)

    //normalizing for simplicity
    address.city = address.regions[0]
    console.log(address)

    this.setState({
      data: {
        text: address.text,
        number: address.number,
        street: address.street,
        unit: address.unit,
        city: address.regions[0],
        state: address.state,
        postalcode: address.postalcode
      }
    })
  }

  addLocation(){
    this.props.add(this.state.data)
    this.refs.address.getInputDOMNode().value = ''
  }


  delete(index){
    this.props.delete(index)
  }

  inputChange(field, e ) {
    this.state.data[field] = e.target.value
    this.setState(this.state)
  }
}

module.exports = Locations