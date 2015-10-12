"use strict"
const {Base,React} = require('./base')
const Package = require('./package')
const {Well,Grid,Row,Col, Panel, ListGroup, ListGroupItem, Button, Glyphicon} = require('react-bootstrap')

class Packages extends Base{
  constructor(props){
    super(props)

    this.state = {
      action: '',
      error: '',
      packages: [],
      products: [],
      package_action: 'new',
      package: {}
    }
  }

  componentDidMount(){
    this.getData().then( res => {
      this.setState({
        packages: res[0],
        products: res[1]
      })
    })
  }

  getData(){
    return Promise.all([$.get('/admin/packages'), $.get('/admin/products')])
  }

  showNew(){
    this.setState({
      package_action: 'new',
      package: {}
    })
  }

  editPackage(index){
    this.setState({
      package_action: 'edit',
      package: this.state.packages[index]
    })
  }

  savePackage(data){
    let url = this.state.package_action =='edit'? '/admin/packages/edit':'/admin/packages/new'

    return $.post(url, data)
      .done( res => {
        if(this.state.package_action == 'new'){
          this.state.packages.unshift(res)
        }else{
          let pack = this.state.packages.filter( pack => pack._id == data._id)[0]
          $.extend(pack, data)
        }

        this.setState({
          package: res,
          package_action: 'edit',
          packages: this.state.packages
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
    let header
    if(this.state.package_action == 'new'){
      header = `New Package`
    }else{
      header = `Edit Package ${this.state.package.name}`
    }

    return(
      <div>
        <p>{this.state.error}</p>
        <Grid fluid>
          <Row>
            <Col sm={4} md={2}>
              <ListGroup>
                <ListGroupItem header="Packages"><Button bsStyle="info" onClick={this.showNew.bind(this)} bsSize="xsmall"><Glyphicon glyph="plus" />add new</Button></ListGroupItem>
                {this.state.packages.map( (pack,index)=> {
                  let prodNav
                  if(pack.products.length > 0){
                    prodNav = <ul>{pack.products.map( (prod,index) => <li key={index}>{prod.name}</li> )}</ul>
                  }
                  return <ListGroupItem key={index} onClick={this.editPackage.bind(this, index)}>{pack.name} {prodNav}</ListGroupItem>
                })}
              </ListGroup>
            </Col>
            <Col sm={8} md={8}>
              <Panel header={header}>
              <Package action={this.state.package_action}
                       data={this.state.package}
                       products={this.state.products}
                       save={this.savePackage}
                />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

module.exports = Packages