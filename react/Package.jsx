"use strict"
const {React,Base} = require('./base')
const {Input,Button,ButtonInput} = require('react-bootstrap')

class Package extends Base{
  constructor(props){
    super(props)

    this.state = this.initialState(props)
  }

  initialState(props){

    let data = {
      name: '',
      tag_line: '',
      description: '',
    }

    $.extend(data,props.data)

    return { data }
  }

  componentWillReceiveProps(props){
    console.log(props)
    this.setState( this.initialState(props) )
  }

  componentDidMount(){
    this.setState( this.initialState(this.props) )
  }

  handleSubmit(e){
    e.preventDefault()

    this.props.save(this.state.data)
  }

  inputChange(field, e ) {
    this.state.data[field] = e.target.value
    this.setState(this.state)
  }

  render(){
    let title, buttonText
    if(this.props.action == 'new'){
      title = `New Package ${this.state.data.name}`
      buttonText = 'Create'
    }else{
      title = `Edit Package ${this.state.data.name}`
      buttonText = 'Save'
    }

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>{title}</h1>
          <Input type="text" label="Name" placeholder="Enter package name"
                 value={this.state.data.name}
                 onChange={this.inputChange.bind(this, 'name')}
            />
          <Input type="text" label="Tag-line" placeholder="Enter tag line"
                 value={this.state.data.tag_line}
                 onChange={this.inputChange.bind(this, 'tag_line')}
            />
          <Input type="textarea" label="Description" placeholder="Enter package description"
                 value={this.state.data.description}
                 onChange={this.inputChange.bind(this, 'description')}
            />
          <ButtonInput type="submit" bsStyle="primary" bsSize="large" value={buttonText} />
        </form>
      </div>
    )
  }
}

module.exports = Package