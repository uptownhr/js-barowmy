"use strict"
const React = require('react')
const {Input} = require('react-bootstrap')

class Dashboard extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="jumbotron text-center">
        dashboard
      </div>
    )
  }
}

module.exports = Dashboard