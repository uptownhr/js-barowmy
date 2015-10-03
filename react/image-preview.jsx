"use strict"
const {React,Base} = require('./base')
const {Input,Button,ButtonInput,ButtonToolbar} = require('react-bootstrap')
const _ = require('lodash')

class Package extends Base{
  constructor(props){
    super(props)
    this.images = []
  }

  imageChange(e){
    const files = e.target.files

    _.values(files).map( (file) => {
      const reader = new FileReader()

      reader.onloadend = (upload)=>{
        this.images.push({
          name: file.name.split('.')[0],
          url: upload.target.result
        })
        this.props.onChange(this.images)
      }

      reader.readAsDataURL(file)
    })
  }

  render(){
    return(
      <div>
        <Input type="file" multiple onChange={this.imageChange} />
        <ul>Images
          {this.props.images.map( (image,index) => {
            return (<li key={index}>
              <img style={{width: '200px'}} src={image.url}/> - <span onClick={this.delete.bind(this,index)}>Delete</span>
              <input type="text" value={image.name} /> // TODO make name changeable
            </li>)
          })}
        </ul>
      </div>
    )
  }

  delete(index){
    this.props.onDelete(index)
  }
}

module.exports = Package