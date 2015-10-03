"use strict"
const {React,Base} = require('./base')
const {Input,Button,ButtonInput} = require('react-bootstrap')
const Sku = require('./sku')

class Product extends Base{
  constructor(props){
    super(props)

    this.state = this.initialState(props)
  }

  initialState(props){
    let data = {
      name: '',
      description: '',
      skus: [],
      images: []
    }

    $.extend(data,props.data)
    return {
      data,
      skuIndex: null,
      skuAction: 'new',
      buttonState: true
    }
  }

  componentDidMount(){
    this.setState( this.initialState(this.props) )
  }

  componentWillReceiveProps(props){
    this.setState( this.initialState(props) )
  }

  render(){
    let skuData = this.state.data.skus[this.state.skuIndex]
    return(
      <div>
        <form onSubmit={this.save}>
          <h1>{this.props.action=='edit'? `Edit Product: ${this.state.data.name}`: `New Product: ${this.state.data.name}`}</h1>
          <Input type="text" label="Name" placeholder="Enter product name"
                 value={this.state.data.name}
                 onChange={this.inputChange.bind(this, 'name')}
            />
          <Input type="textarea" label="Description" placeholder="Enter product description"
                 value={this.state.data.description}
                 onChange={this.inputChange.bind(this, 'description')}
            />
          <Sku action={this.state.skuAction}
                data={skuData}
                save={this.saveSku}
                deleteSku={this.deleteSku}
                vendors={this.props.vendors}
            />
          <ul>Skus
            {this.state.data.skus.map( (sku,index) =>
                <li onClick={this.editSku.bind(this,index)} key={index}>{sku.name} - <span onClick={this.deleteSku.bind(index)}>delete</span></li>
            )}
          </ul>
          <ButtonInput type="submit" bsStyle="primary" bsSize="large" value={this.props.action=='edit'?'Update':'Create'} />
        </form>

      </div>
    )
  }

  save(e){
    e.preventDefault()

    this.props.saveProduct(this.state.data)
  }

  inputChange(field, e ) {
    this.state.data[field] = e.target.value
    this.setState(this.state)
  }

  saveSku(sku){
    if(this.state.skuIndex == null){
      this.state.data.skus.push(sku)
    }else{
      this.state.data.skus[this.state.skuIndex] = sku
    }

    this.setState(this.state.data)
  }

  deleteSku(index){
    this.state.data.skus.splice(index,1)
    this.setState(this.state.data)
  }

  editSku(index){
    this.setState({
      skuAction: 'edit',
      skuIndex: index
    })
  }

  newSku(){
    this.setState({
      skuAction: 'new',
      skuIndex: null
    })
  }
}

module.exports = Product