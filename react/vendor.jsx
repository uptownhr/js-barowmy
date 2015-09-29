"use strict"
const {React,Base} = require('./base')
const {Input,Button,ButtonInput} = require('react-bootstrap')

class Vendor extends Base{
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
    $.get(`/admin/vendors/${id}`)
      .done(res => {
        this.setState({data:res})
      })
      .fail(this.showError)
  }

  handleSubmit(e){
    e.preventDefault()

    this.props.saveVendor(this.state.data)
  }

  inputChange(field, e ) {
    this.state.data[field] = e.target.value
    this.setState(this.state)
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>{this.props.action=='edit'? `Edit Vendor: ${this.state.data.name}`: `New Vendor: ${this.state.data.name}`}</h1>
          <Input type="text" label="Name" placeholder="Enter vendor name"
                 value={this.state.data.name}
                 onChange={this.inputChange.bind(this, 'name')}
            />
          <Input type="textarea" label="Description" placeholder="Enter vendor description"
                 value={this.state.data.description}
                 onChange={this.inputChange.bind(this, 'description')}
            />
          <ButtonInput type="submit" bsStyle="primary" bsSize="large" value={this.props.action=='edit'?'Update':'Create'} />
        </form>
      </div>
    )
  }
}

module.exports = Vendor