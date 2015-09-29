"use strict"
const {React,Base} = require('./base')
const {Input,Button,ButtonInput} = require('react-bootstrap')

class Skus extends Base{
  constructor(props){
    super(props)
    this.state = this.initialState()

    this.durations = ['hourly','daily','weekly','monthly']
  }

  initialState() {
    return {
      action: 'new',
      data: {
        vendor_id: '',
        name: '',
        duration: '',
        price: '',
        qty: ''
      }
    }
  }

  componentWillReceiveProps(props){
    this.setState( this.initialState() )
  }

  inputChange(field, e ) {
    this.state.data[field] = e.target.value

    this.setState({data: this.state.data})
  }

  saveSku(){
    this.props.saveSku(this.state.data)
  }

  selectSku(index){
    this.setState( {
      data: this.props.skus[index],
      action: 'edit'
    } )
  }

  delete(){
    this.props.deleteSku(this.state.data)
    this.setState(this.initialState())
  }

  showNew(e){
    e.preventDefault()
    this.setState( this.initialState() )
  }

  render(){
    return(
      <div>
        <ul>SKUS - <a href="#" onClick={this.showNew.bind(this)}>Add new </a>
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
          {this.state.action=="new"? <Button onClick={this.saveSku}>Create SKU</Button>:<Button onClick={this.delete}>Delete</Button>}
          {this.props.skus.map( (sku,index) => {
            return <li key={index} onClick={this.selectSku.bind(this,index)}>{sku.name} - {sku.price} - {sku.duration} - {sku.qty}</li>
          })}
        </ul>
      </div>
    )
  }
}

module.exports = Skus