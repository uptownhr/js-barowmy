"use strict"
const {Base,React} = require('./base')
const Package = require('./package')

class Packages extends Base{
  constructor(props){
    super(props)

    this.state = {
      action: '',
      error: '',
      packages: [],
      package_action: 'new',
      package_id: null,
      package: {}
    }
  }

  componentDidMount(){
    this.getData().then( packages => {
      this.setState({packages})
    })
  }

  getData(){
    return $.get('/admin/packages')
  }

  showNew(){
    this.setState({
      package_action: 'new',
      package_id: null
    })
  }

  editPackage(index){
    this.setState({
      package_action: 'edit',
      package: this.state.packages[index]
    })
  }

  savePackage(data){
    let url = this.state.package_action =='edit'? '/admin/packages/edit':'/admin/packages/new'

    return $.post(url, data)
      .done( res => {
        if(this.state.package_action == 'new'){
          this.state.packages.unshift(res)
        }else{
          let pack = this.state.packages.filter( pack => pack._id == data._id)[0]
          $.extend(pack, data)
        }

        this.setState({
          package_id: res._id,
          package_action: 'edit',
          packages: this.state.packages
        })
      })
      .fail(this.showError)
  }

  showError(res){
    this.setState({
      error: res.responseText
    })
  }

  render(){
    return(
      <div>
        <p>{this.state.error}</p>

        <Package action={this.state.package_action}
                 data={this.state.package}
                 save={this.savePackage}
          />

        <ul>Packages - <a href="#" onClick={this.showNew.bind(this)}>Add new </a>
          {this.state.packages.map( (pack,index)=> {
            return <li key={index} onClick={this.editPackage.bind(this, index)}>{pack.name}</li>
          })}
        </ul>
      </div>
    )
  }
}

module.exports = Packages