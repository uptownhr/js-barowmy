"use strict"
const React = require('react')
const {Grid, Row, Col} = require('react-bootstrap')
const {Line} = require('react-chartjs')

function rand(min, max, num) {
  var rtn = [];
  while (rtn.length < num) {
    rtn.push((Math.random() * (max - min)) + min);
  }
  return rtn;
}

class Dashboard extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      user: 0,
      chart: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Packages",
            fillColor: "rgba(0,220,220,0.2)",
            strokeColor: "rgba(0,220,220,1)",
            pointColor: "rgba(0,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(0,220,220,1)",
            data: rand(32, 100, 7)
          },
          {
            label: "Products",
            fillColor: "rgba(100,0,205,0.2)",
            strokeColor: "rgba(100,0,205,1)",
            pointColor: "rgba(100,0,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(100,0,205,1)",
            data: rand(32, 100, 7)
          },
          {
            label: "Vendors",
            fillColor: "rgba(151,200,0,0.2)",
            strokeColor: "rgba(151,200,0,1)",
            pointColor: "rgba(151,200,0,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,200,0,1)",
            data: rand(32, 100, 7)
          },
          {
            label: "Users",
            fillColor: "rgba(251,187,10,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: rand(32, 100, 7)
          }
        ]
      }
    }
  }

  componentDidMount(){
    $.get('/admin/dashboard', res => {
      this.setState(res)
    } )
  }

  render(){
    return(
      <div className="jumbotron text-center">
        <h1>dashboard</h1>

        <Grid>
          <Row>
            <Col>
              <h2>Users</h2>
              <p>Count: {this.state.user}</p>
              <Line data={this.state.chart} style={{width: '100%'}} redraw />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

module.exports = Dashboard