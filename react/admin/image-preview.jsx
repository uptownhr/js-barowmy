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
        <Input key={this.props.key} type="file" multiple onChange={this.imageChange} value={this.reset} />
        <ul>
          {this.props.images.map( (image,index) => {
            return (<li key={index}>
              <img style={{width: '200px'}} src={image.url}/>
              <br/>
              <input type="text" value={image.name} onChange={this.update.bind(this,index)} />
              <br/>
              <span onClick={this.delete.bind(this,index)}>Delete</span>

            </li>)
          })}
        </ul>
      </div>
    )
  }

  delete(index){
    this.props.onDelete(index)
  }

  update(index,e){
    this.props.onUpdate(index, e.target.value)
  }
}

module.exports = Package