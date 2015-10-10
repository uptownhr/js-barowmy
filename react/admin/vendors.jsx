"use strict"
const {Base,React} = require('./base')
const Vendor = require('./vendor')
const {vendorActions, vendorStore} = require('../alt/Vendor')
const {Grid,Row,Col,Well}= require('react-bootstrap')

class Vendors extends Base{
  constructor(props){
    super(props)

    this.state = {
      error: '',
      vendors: [],
      vendor: {}
    }
  }

  componentDidMount(){
    vendorStore.listen(this.onChange)
    vendorActions.fetch()
  }

  componentWillUnmount(){
    vendorStore.unlisten(this.onChange)
  }

  onChange(vendors){
    this.setState(vendors)
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
              <ul>Vendors - <a onClick={this.showNew.bind(this)}>Add new </a>
                {this.state.vendors.map( (vendor,index) => {
                  return <li key={index} onClick={vendorActions.edit.bind(this, index)}>{vendor.name}</li>
                })}
              </ul>
            </Col>
            <Col sm={8} md={8}>
              <Well>
                <Vendor action={this.state.vendor_action}
                        data={this.state.vendor}
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

}

module.exports = Vendors