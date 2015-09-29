"use strict"
const {React,Base} = require('./base')
const {Input,Button,ButtonInput} = require('react-bootstrap')

class Products extends Base{
  constructor(props){
    super(props)

    this.state = this.initialState(props)
  }

  initialState(props){
    return {
      data: {
        name: '',
        description: ''
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

  setEdit(res){
    this.setState({
      action: 'edit',
      data: res
    })
  }

  showError(res){
    this.setState({
      error: res.responseText
    })
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
        </form>
      </div>
    )
  }
}

module.exports = Products