"use strict"
const {React,Base} = require('./base')
const {Input,Button,ButtonInput} = require('react-bootstrap')

class Skus extends Base{
  constructor(props){
    super(props)
    this.state = {
      vendor_id: '',
      name: '',
      duration: '',
      price: '',
      qty: ''
    }

    this.durations = ['hourly','daily','weekly','monthly']
  }

  inputChange(field, e ) {
    this.state[field] = e.target.value
    this.setState(this.state)
  }

  handleSubmit(){
    addSku()
  }

  addSku(){
    this.props.addSku(this.state)
  }

  render(){
    return(
      <div>
        <ul>
          <form onSubmit={this.handleSubmit}>
            <Input type="text" label="Name"
                   value={this.state.name}
                   onChange={this.inputChange.bind(this, 'name')} />
            <Input type="select" label="Vendor"
                   onChange={this.inputChange.bind(this, 'vendor_id')} >
              <option>Select a Vendor</option>
              {this.props.vendors.map(vendor => {
                return <option value={vendor._id}>{vendor.name}</option>
              })}
            </Input>

            <Input type="select" label="Duration"
                   onChange={this.inputChange.bind(this, 'duration')} >
              <option>Select duration</option>
              {this.durations.map(duration=> <option value={duration}>{duration}</option>)}
            </Input>
            <Input type="text" label="Price"
                   onChange={this.inputChange.bind(this, 'price')} />
            <Input type="text" label="Qty"
                   onChange={this.inputChange.bind(this, 'qty')} />
            <ButtonInput onClick={this.addSku}>Add SKU</ButtonInput>
          </form>
          <h2>SKUs</h2>
        {this.props.skus.map( sku => {
          return <li>{sku.name}</li>
        })}
        </ul>
      </div>
    )
  }
}

module.exports = Skus