import React from 'react';
import { Segment } from 'semantic-ui-react'
import HostList from './HostList'



export default class ColdStorage extends React.Component {


  deactive = () => {
    const allHosts = this.props.hosts
    let deactiveHost = allHosts.filter(host => host.active === false)
    return deactiveHost
  }

  render(){

  return (
  <Segment.Group className="HQComps">
    <Segment compact>
      <h3 className="labels">ColdStorage</h3>
    </Segment>
    <Segment compact>




      <HostList
      hosts={this.deactive()}
      selectHost={this.props.selectHost}
      selectedHost={this.props.selectedHost}
      />


    </Segment>
  </Segment.Group>
    )
  }
}
