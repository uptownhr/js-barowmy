"use strict"
const React = require('react')

class Products extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="jumbotron text-center">
        Products
      </div>
    )
  }
}

module.exports = Products