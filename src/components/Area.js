import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList'

export default class Area extends React.Component {




render(){

  return (
  <div className='area' id={this.props.name}>
    <h3 className='labels'>{this.props.name.split('_').join(' ')}</h3>
      <HostList hosts={this.props.hosts} selectHost={this.props.selectHost}/>

  </div>

  )
}

// Area.propTypes = {
//   hosts: function(props, propName, componentName){
//     if(props.hosts.length > props.limit){
//       throw Error(
//         `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
//           )
//         }
//       }
//     }
  }
