"use strict"
const {React,Base} = require('./base')
const {Input,Button,ButtonInput} = require('react-bootstrap')

class Tags extends Base{
  constructor(props){
    super(props)
  }

  render(){
    console.log(this.props.data)
    return(
      <div>
        <Input key={this.props.key}
               type="text"
               placeholder="add tags"
               onKeyDown={this.handleEnter}
          />
        <ul>Tags
          {this.props.data.map( (tag,index) => <li key={index}>{tag}</li> )}
        </ul>
      </div>
    )
  }

  handleEnter(e){
    let text = e.target.value
    if( e.keyCode == 13 && text.length > 0 ){
      e.preventDefault()
      this.props.add(text)
    }
  }

}



module.exports = Tags