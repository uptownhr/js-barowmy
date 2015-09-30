"use strict"
const {React,Base} = require('./base')
const {Input,Button,ButtonInput,ButtonToolbar} = require('react-bootstrap')
const ImagePreview = require('./image-preview')
const _ = require('lodash')

class Package extends Base{
  constructor(props){
    super(props)

    this.state = this.initialState(props)
  }

  initialState(props){
    let data = {
      name: '',
      tag_line: '',
      description: '',
      products: [],
      images: []
    }

    $.extend(data,props.data)
    return {
      data,
      buttonState: true
    }
  }

  componentWillReceiveProps(props){
    this.setState( this.initialState(props) )
  }

  componentDidMount(){
    this.setState( this.initialState(this.props) )
  }

  handleSubmit(e){
    e.preventDefault()

    this.props.save(this.state.data)
  }

  inputChange(field, e ) {
    this.state.data[field] = e.target.value
    this.setState(this.state)
  }

  imageChange(images){
    this.state.data.images = images
    this.setState(this.state.data)
  }

  addProduct(){
    let index = this.refs.add_product.getValue()
    let product = this.props.products[index]
    this.state.data.products.push(product)
    this.setState(this.state.data)
  }

  activateButton(e){
    let buttonState
    if(e.target.value){
      buttonState = false
    }else{
      buttonState = true
    }

    this.setState({buttonState: buttonState})
  }

  render(){
    let title, buttonText
    if(this.props.action == 'new'){
      title = `New Package ${this.state.data.name}`
      buttonText = 'Create'
    }else{
      title = `Edit Package ${this.state.data.name}`
      buttonText = 'Save'
    }

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>{title}</h1>
          <Input type="text" label="Name" placeholder="Enter package name"
                 value={this.state.data.name}
                 onChange={this.inputChange.bind(this, 'name')}
            />
          <Input type="text" label="Tag-line" placeholder="Enter tag line"
                 value={this.state.data.tag_line}
                 onChange={this.inputChange.bind(this, 'tag_line')}
            />
          <Input type="textarea" labstael="Description" placeholder="Enter package description"
                 value={this.state.data.description}
                 onChange={this.inputChange.bind(this, 'description')}
            />


          <ImagePreview images={this.state.data.images} onChange={this.imageChange} />

          <Input ref="add_product" type="select" label="Add Products" onChange={this.activateButton}>
            <option>Select a product</option>
            {this.props.products.map( (product,index) =>
              <option key={index} value={index}>{product.name}</option>
            )}
          </Input>
          <ul>Products
            {this.state.data.products.map( (product,index) =>
                <li key={index}>{product.name}</li>
            )}
          </ul>

          <ButtonToolbar>
            <Button bsSize="large" onClick={this.addProduct} disabled={this.state.buttonState} >Add Product</Button>
            <ButtonInput style={{marginLeft:"5px"}}type="submit" bsStyle="primary" bsSize="large" value={buttonText} />
          </ButtonToolbar>
        </form>
      </div>
    )
  }
}

module.exports = Package