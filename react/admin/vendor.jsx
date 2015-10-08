"use strict"
const {React,Base} = require('./base')
const {Input,Button,ButtonInput} = require('react-bootstrap')
const ImagePreview = require('./image-preview')
const Tags = require('./tags')


class Vendor extends Base{
  constructor(props){
    super(props)

    this.state = this.initialState(props)
  }

  initialState(props){
    let data = {
      name: '',
      description: '',
      images: [],
      tags: []
    }

    $.extend(data,props.data)
    return {
      data
    }
  }

  componentDidMount(){
    this.setState( this.initialState(this.props) )
  }

  componentWillReceiveProps(props){
    this.setState( this.initialState(props) )
  }

  render(){
    return(
      <div>
        <form onSubmit={this.save}>
          <h1>{this.props.action=='edit'? `Edit Vendor: ${this.state.data.name}`: `New Vendor: ${this.state.data.name}`}</h1>
          <Input type="text" label="Name" placeholder="Enter vendor name"
                 value={this.state.data.name}
                 onChange={this.inputChange.bind(this, 'name')}
            />
          <Input type="textarea" label="Description" placeholder="Enter vendor description"
                 value={this.state.data.description}
                 onChange={this.inputChange.bind(this, 'description')}
            />

          <hr />
          <label>Tags</label>
          <Tags key={this.state.data._id}
                data={this.state.data.tags}
                add={this.addTag}
                delete={this.deleteTag}
            />

          <hr />
          <label>Images</label>
          <ImagePreview key={this.state.data.name}
                        images={this.state.data.images}
                        onChange={this.imageChange}
                        onDelete={this.deleteImage}
                        onUpdate={this.updateImage}
            />

          <ButtonInput type="submit" bsStyle="primary" bsSize="large" value={this.props.action=='edit'?'Update':'Create'} />
        </form>
      </div>
    )
  }

  save(e){
    e.preventDefault()

    this.props.saveVendor(this.state.data)
  }

  inputChange(field, e ) {
    this.state.data[field] = e.target.value
    this.setState(this.state)
  }

  imageChange(images){
    this.state.data.images = images
    this.setState(this.state.data)
  }

  deleteImage(index){
    this.state.data.images.splice(index,1)
    this.setState(this.state.data)
  }
  updateImage(index,newVal){
    this.state.data.images[index].name = newVal
    this.setState(this.state.data)
  }

  addTag(text){
    this.state.data.tags.push(text)
    this.setState(this.state.data)
  }

  deleteTag(index){
    this.state.data.tags.splice(index,1)
    this.setState(this.state.data)
  }
}



module.exports = Vendor