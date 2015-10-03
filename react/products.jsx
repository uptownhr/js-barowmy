"use strict"
const {Base,React} = require('./base')
const Product = require('./product')
const {Grid,Row,Col,Well} = require('react-bootstrap')

class Products extends Base{
  constructor(props){
    super(props)

    this.state = {
      action: '',
      error: '',
      vendors: [],
      products: [],
      product: {},
      product_action: 'new',
      skuIndex: null
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
      product: {}
    })
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
        <Grid fluid>
          <Row>
            <Col sm={4} md={2}>
              <ul>Products - <a href="#" onClick={this.showNew.bind(this)}>Add new </a>
                {this.state.products.map( (product,index)=> {
                  let skuNav
                  if(product.skus.length > 0){
                    skuNav = <ul>{product.skus.map( (sku,index) => <li key={sku._id}>{sku.name}</li> )}</ul>
                  }
                  return <li key={product._id} onClick={this.editProduct.bind(this,index)}>{product.name}
                    {skuNav}
                  </li>
                })}
              </ul>
            </Col>
            <Col sm={8} md={8}>
              <Well>
                <Product action={this.state.product_action}
                         data={this.state.product}
                         saveProduct={this.saveProduct}
                         vendors={this.state.vendors}
                  />
              </Well>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }

  editProduct(index){
    this.setState({
      product_action: 'edit',
      product: this.state.products[index]
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
          $.extend(product, res)
        }


        this.setState({
          product_id: res._id,
          product_action: 'edit',
          products: this.state.products
        })
      })
      .fail(this.showError)
  }
}

module.exports = Products