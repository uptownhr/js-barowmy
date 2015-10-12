"use strict"
const {React,Base} = require('./base')
const {Input,Button,ButtonInput, ListGroup, ListGroupItem, Glyphicon} = require('react-bootstrap')
const Sku = require('./sku')
const ImagePreview = require('./image-preview')

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
          <Input type="text" label="Name" placeholder="Enter product name"
                 value={this.state.data.name}
                 onChange={this.inputChange.bind(this, 'name')}
            />
          <Input type="textarea" label="Description" placeholder="Enter product description"
                 value={this.state.data.description}
                 onChange={this.inputChange.bind(this, 'description')}
            />

          <ImagePreview key={this.state.data.name}
                        images={this.state.data.images}
                        onChange={this.imageChange}
                        onDelete={this.deleteImage}
                        onUpdate={this.updateImage}
            />

          <hr />
          <Sku action={this.state.skuAction}
                data={skuData}
                save={this.saveSku}
                deleteSku={this.deleteSku}
                vendors={this.props.vendors}
            />

          <hr />
          <ListGroup><b>Current SKUs</b>
            {this.state.data.skus.map( (sku,index) =>
                <ListGroupItem onClick={this.editSku.bind(this,index)} key={index}>{sku.name} <Glyphicon glyph="remove" onClick={this.deleteSku.bind(index)}/></ListGroupItem>
            )}
          </ListGroup>

          <hr />
          <ButtonInput type="submit" bsStyle="primary" bsSize="small" value={this.props.action=='edit'?'Update':'Create'} />
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

  imageChange(images){
    this.state.data.images = images
    this.setState(this.state.data)
  }

  deleteImage(index){
    this.state.data.images.splice(index,1)
    this.setState(this.state.data)
  }
  updateImage(index,newVal){
    this.state.data.images[index].name = newVal
    this.setState(this.state.data)
  }

}

module.exports = Product