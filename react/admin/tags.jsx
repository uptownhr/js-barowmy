"use strict"
const {React,Base} = require('./base')
const {Input,Button,ButtonInput, ListGroup, ListGroupItem, Glyphicon} = require('react-bootstrap')

class Tags extends Base{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <Input key={this.props.key}
               type="text"
               placeholder="add tags"
               onKeyDown={this.handleEnter}
          />
        <hr />
        <ListGroup><b>Current Tags</b>
          {this.props.data.map( (tag,index) =>
                  <ListGroupItem key={index}>{tag} <Glyphicon glyph="remove" onClick={this.delete.bind(this,index)} /></ListGroupItem>
          )}
        </ListGroup>
      </div>
    )
  }

  delete(index){
    this.props.delete(index)
  }

  handleEnter(e){
    let text = e.target.value
    if( e.keyCode == 13 && text.length > 0 ){
      e.preventDefault()

      if(text.indexOf('|') != -1){
        text
          .split('|')
          .map( (t) => t.trim() )
          .forEach( (tag) => {
            this.props.add(tag)
          })
      }else{
        this.props.add(text)
      }
      e.target.value = ''

    }
  }

}



module.exports = Tags