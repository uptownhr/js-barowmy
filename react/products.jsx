"use strict"
const {Base,React} = require('./base')
const Product = require('./product')

class Products extends Base{
  constructor(props){
    super(props)

    this.state = {
      action: '',
      error: '',
      vendors: [],
      products: [],
      product_id: null,
      product_action: 'new'
    }
  }

  componentDidMount(){
    this.getData().then( values => {
      this.setState({
        products: values[0],
        vendors: values[1]
      })
    })
  }

  getData(){
    return Promise
      .all([this.getProducts(),this.getVendors()])
  }

  getProducts() {
    return $.get('/admin/products')
  }


  getVendors(){
    return $.get('/admin/vendors')
  }

  showNew(){
    this.setState({
      product_action: 'new',
      product_id: null
    })
  }

  editProduct(id){
    this.setState({
      product_action: 'edit',
      product_id: id
    })
  }

  saveProduct(data){
    let url = this.state.product_action=='edit'? '/admin/products/edit':'/admin/products/new'

    return $.post(url, data)
      .done( res => {
        if(this.state.product_action == 'new'){
          this.state.products.unshift(res)
        }else{
          let product = this.state.products.filter( product => product._id == data._id)[0]
          $.extend(product, data)
        }

        this.setState({
          product_id: res._id,
          product_action: 'edit',
          products: this.state.products
        })
      })
      .fail(this.showError)
  }

  showError(res){
    this.setState({
      error: res.responseText
    })
  }

  render(){
    return(
      <div>
        <p>{this.state.error}</p>
        <a href="#" onClick={this.showNew.bind(this)}>Add new </a>
        <Product action={this.state.product_action} id={this.state.product_id} saveProduct={this.saveProduct} vendors={this.state.vendors} />
        <ul>Products
          {this.state.products.map( product => {
            return <li onClick={this.editProduct.bind(this,product._id)}>{product.name}</li>
          })}
        </ul>
      </div>
    )
  }
}

module.exports = Products