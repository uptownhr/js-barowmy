"use strict"
const {React,Base} = require('./base')
const {Input,Button,ButtonInput,Row,Col,Grid} = require('react-bootstrap')

class VendorLocation extends Base {
  constructor(props) {
    super(props)
    this.locations = []
    this.location = {}
  }

  render(){
    return(

          <Col sm={8} md={8}>
            <Input label="Location" wrapperClassName="wrapper">
              <Row>
                <Col xs={12}>
                  <input type="text" className="form-control" placeholder="Location Name"
                         value={this.location.name}
                         onChange={this.inputChange.bind(this,'name')}
                    />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <input type="text" className="form-control" placeholder="Coordinates"
                         value={this.location.coordinates}
                         onChange={this.inputChange.bind(this,'coordinates')}
                    />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <input type="text" className="form-control" placeholder="Address 1"
                    value={this.location.address1}
                    onChange={this.inputChange.bind(this,'address1')}
                    />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <input type="text" className="form-control" placeholder="Address 2"
                    value={this.location.address2}
                    onChange={this.inputChange.bind(this,'address2')}
                    />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <input type="text" className="form-control" placeholder="City"
                    value={this.location.city}
                    onChange={this.inputChange.bind(this,'city')}
                    />
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <input type="text" className="form-control" placeholder="State"
                    value={this.location.state}
                    onChange={this.inputChange.bind(this,'state')}
                    />
                </Col>
                <Col xs={6}>
                  <input type="text" className="form-control" placeholder="Zip Code"
                    value={this.location.zip}
                    onChange={this.inputChange.bind(this,'zip')}
                    />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <input type="text" className="form-control" placeholder="Country"
                    value={this.location.country}
                    onChange={this.inputChange.bind(this,'country')}
                    />
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <ButtonInput type="button" bsStyle="success" bsSize="small" value="Add" onClick={this.addLocation} />
                </Col>
              </Row>
            </Input>
          </Col>
    )
  }

  addLocation(e){
    e.preventDefault()
    this.locations.push(this.location)
    console.log(this.locations)
    this.props.onChange(this.locations)
  }


  updateLocation(index,e){
    e.preventDefault()
    this.props.onUpdate(index,this.location)
  }

  deleteLocation(index,e){
    e.preventDefault()
    this.props.onDelete(index)
  }

  inputChange(field, e){
    this.location[field] = e.target.value
    //if(field != 'coordinates'){
    //  this.location[field] = e.target.value
    //}else{
    //  var coord = e.target.value.split(',')
    //  this.location[field] = {
    //    type: "Point",
    //    coordinates: [parseFloat(coord[0]),parseFloat(coord[1])]
    //  }
    //}

  }
}

module.exports = VendorLocation