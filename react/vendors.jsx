"use strict"
const {Base,React} = require('./base')
const Vendor = require('./vendor')
const {Grid,Row,Col,Well}= require('react-bootstrap')

class Vendors extends Base{
  constructor(props){
    super(props)

    this.state = {
      action: '',
      error: '',
      vendors: [],
      vendor_id: null,
      vendor_action: 'new'
    }
  }

  componentDidMount(){
    $.get('/admin/vendors', res => {
      this.setState({
        vendors: res
      })
    })
  }

  showNew(){
    this.setState({
      vendor_action: 'new',
      vendor_id: null
    })
  }

  editVendor(id){
    this.setState({
      vendor_action: 'edit',
      vendor_id: id
    })
  }

  saveVendor(data){
    let url = this.state.vendor_action=='edit'? '/admin/vendors/edit':'/admin/vendors/new'

    return $.post(url, data)
      .done( res => {
        if(this.state.vendor_action == 'new'){
          this.state.vendors.unshift(res)
        }else{
          let vendor = this.state.vendors.filter( vendor => vendor._id == data._id)[0]
          $.extend(vendor, data)
        }

        this.setState({
          vendor_id: res._id,
          vendor_action: 'edit',
          vendors: this.state.vendors
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
        <Grid fluid>
          <Row>
            <Col sm={4} md={2}>
              <ul>Vendors - <a href="#" onClick={this.showNew.bind(this)}>Add new </a>
                {this.state.vendors.map( vendor => {
                  return <li onClick={this.editVendor.bind(this,vendor._id)}>{vendor.name}</li>
                })}
              </ul>
            </Col>
            <Col sm={8} md={8}>
              <Well>
                <Vendor action={this.state.vendor_action} id={this.state.vendor_id} saveVendor={this.saveVendor} />
              </Well>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

module.exports = Vendors