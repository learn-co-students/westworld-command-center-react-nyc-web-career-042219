import React from 'react';
import '../stylesheets/Area.css'
import Host from './Host'

class Area extends React.Component {
  formatAreaName = () => this.props.name.split('_').join(' ')

  renderHosts = () => {
    return this.props.hosts.map(host => {
      if (host.active && (host.area === this.props.name))
        return <Host key={host.id} {...host} selectedHost={this.props.selectedHost} handleSelect={this.props.handleSelect} />
      else
        return ''
    })
  }

  render() {
    return (
    <div className='area' id={this.props.name}>
      <h3 className='labels'>{this.formatAreaName()}</h3>

      {this.renderHosts()}

    </div>)
  }
}

// Area.propTypes = {
//   hosts: function(props, propName, componentName){
//     if(props.hosts.length > props.limit){
//       throw Error(
//         `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
//       )
//     }
//   }
// }

export default Area;
