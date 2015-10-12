"use strict"
const {Base,React} = require('./base')
const Vendor = require('./vendor')
const {vendorActions, vendorStore} = require('../alt/Vendor')
const {Grid,Row,Col,Well, Panel, ListGroup, ListGroupItem, Button, Glyphicon}= require('react-bootstrap')

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
    let header
    if(this.state.vendor_action == 'new'){
      header = `New Vendor`
    }else{
      header = `Edit Vendor ${this.state.vendor.name}`
    }

    return(
      <div>
        <p>{this.state.error}</p>
        <Grid fluid>
          <Row>
            <Col sm={4} md={2}>
              <ListGroup>
                <ListGroupItem header="Vendors"><Button bsStyle="info" onClick={this.showNew.bind(this)} bsSize="xsmall"><Glyphicon glyph="plus" />add new</Button></ListGroupItem>
                {this.state.vendors.map( (vendor,index) => {
                  return <ListGroupItem key={index} onClick={vendorActions.edit.bind(this, index)}>{vendor.name}</ListGroupItem>
                })}
              </ListGroup>
            </Col>
            <Col sm={8} md={8}>
              <Panel header={header}>
                <Vendor action={this.state.vendor_action}
                        data={this.state.vendor}
                  />
              </Panel>
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