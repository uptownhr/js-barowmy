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
      vendor: {},
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
                {this.state.vendors.map( (vendor,index) => {
                  return <li key={index} onClick={this.editVendor.bind(this, index)}>{vendor.name}</li>
                })}
              </ul>
            </Col>
            <Col sm={8} md={8}>
              <Well>
                <Vendor action={this.state.vendor_action}
                        data={this.state.vendor}
                        saveVendor={this.saveVendor}
                        deleteVendor={this.deleteVendor}
                  />
              </Well>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }

  showNew(){
    this.setState({
      vendor_action: 'new',
      vendor: {}
    })
  }

  editVendor(index){
    this.setState({
      vendor_action: 'edit',
      vendor: this.state.vendors[index]
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
          vendor_action: 'edit',
          vendors: this.state.vendors
        })
      })
      .fail(this.showError)
  }

  deleteVendor(vendor){
    return $.post('/admin/vendors/delete', {_id: vendor._id})
      .done( res => {
        let index = this.state.vendors.findIndex( (v) => v._id == vendor._id )

        vendor = this.state.vendors.splice(index,1)
        this.setState({
          vendors: this.state.vendors,
          vendor_action: 'new',
          vendor: {}
        })
      })
      .fail(this.showError)

  }
}

module.exports = Vendors