"use strict"
const {React,Base} = require('./base')
const {Input,Button,ButtonInput} = require('react-bootstrap')

class Product extends Base{
  constructor(props){
    super(props)

    this.state = this.initialState(props)
  }

  initialState(props){
    return {
      data: {
        name: '',
        description: '',
        skus: [],
        images: []
      },
      error: null
    }
  }

  componentWillReceiveProps(props){
    if(props.id){

      this.loadData(props.id)
    }else{
      this.setState( this.initialState(props) )
    }

  }

  componentDidMount(){
    if(this.props.action == 'edit'){
      this.loadData(this.props.id)
    }
  }

  loadData(id){
    $.get(`/admin/products/${id}`)
      .done(res => {
        this.setState({data:res})
      })
      .fail(this.showError)
  }

  handleSubmit(e){
    e.preventDefault()

    this.props.saveProduct(this.state.data)
  }

  inputChange(field, e ) {
    this.state.data[field] = e.target.value
    this.setState(this.state)
  }

  render(){
    this.state.data.skus.push({product_id:1, vendor_id:1})
    let skus = this.state.data.skus
    let skuList = skus?skus.map( sku => <li>{sku}</li>):''

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>{this.props.action=='edit'? `Edit Product: ${this.state.data.name}`: `New Product: ${this.state.data.name}`}</h1>
          <Input type="text" label="Name" placeholder="Enter product name"
                 value={this.state.data.name}
                 onChange={this.inputChange.bind(this, 'name')}
            />
          <Input type="textarea" label="Description" placeholder="Enter product description"
                 value={this.state.data.description}
                 onChange={this.inputChange.bind(this, 'description')}
            />
          <ButtonInput type="submit" bsStyle="primary" bsSize="large" value={this.props.action=='edit'?'Update':'Create'} />
          <h2>SKUs</h2>
          <ul>
            <Input type="text" label="Name" value={this.state.sku} />
            <Input type="select" label="Vendor">
              <option value="1">Barowmy</option>
            </Input>
            {skuList}
          </ul>
        </form>
      </div>
    )
  }
}

module.exports = Product