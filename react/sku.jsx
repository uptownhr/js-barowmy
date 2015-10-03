"use strict"
const {React,Base} = require('./base')
const {Input,Button,ButtonInput} = require('react-bootstrap')

class Sku extends Base{
  constructor(props){
    super(props)
    this.state = this.initialState(props)

    this.durations = ['hourly','daily','weekly','monthly']
  }

  initialState(props = {}) {

    let data = {
      vendor_id: '',
      name: '',
      duration: '',
      price: '',
      qty: ''
    }

    $.extend(data, props.data)

    return {
      data
    }
  }

  componentWillReceiveProps(props){
    this.setState( this.initialState(props) )
  }

  render(){
    return(
      <div>
          <Input type="text" label="Name"
                 value={this.state.data.name}
                 onChange={this.inputChange.bind(this, 'name')} />
          <Input type="select" label="Vendor"
                 value={this.state.data.vendor_id}
                 onChange={this.inputChange.bind(this, 'vendor_id')} >
            <option>Select a Vendor</option>
            {this.props.vendors.map( (vendor,index) => {
              return <option key={index} value={vendor._id}>{vendor.name}</option>
            })}
          </Input>

          <Input type="select" label="Duration"
                 value={this.state.data.duration}
                 onChange={this.inputChange.bind(this, 'duration')} >
            <option>Select duration</option>
            {this.durations.map((duration,index)=> <option key={index} value={duration}>{duration}</option>)}
          </Input>
          <Input type="text" label="Price"
                 value={this.state.data.price}
                 onChange={this.inputChange.bind(this, 'price')} />
          <Input type="text" label="Qty"
                 value={this.state.data.qty}
                 onChange={this.inputChange.bind(this, 'qty')} />
          {this.props.action=="new"? <Button onClick={this.save}>Create SKU</Button>:<Button onClick={this.save}>Save</Button>}
      </div>
    )
  }

  inputChange(field, e ) {
    this.state.data[field] = e.target.value

    this.setState({data: this.state.data})
  }

  save(){
    this.props.save(this.state.data)
  }

}

module.exports = Sku