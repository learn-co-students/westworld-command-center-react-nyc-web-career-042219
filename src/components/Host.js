import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

export default class Host extends React.Component {



 highlight = () =>{
  return this.props.selectedHost != null ?
   this.props.id === this.props.selectedHost.id ? "host selected" : "host"
   :
  "host"
}


render(){
  return(
    <Card
      className={this.highlight()}
      onClick={()=>this.props.selectHost(this.props)}
      image={this.props.imageUrl}
      raised
    />
  )
 }
}
