import React from 'react';
import { Segment } from 'semantic-ui-react'
import HostList from './HostList'

class ColdStorage extends React.Component {
  //pass only non active hosts
  nonActiveHosts = (area) => {
    let allHosts = this.props.hosts
    let activeHosts = allHosts.filter(host => !host.active)
    return activeHosts
  }

  render() {
    return (
      <Segment.Group className="HQComps">
        <Segment compact>
          <h3 className="labels">ColdStorage</h3>
        </Segment>
        <Segment compact>
          <HostList hosts={this.nonActiveHosts()} selectedHost={this.props.selectedHost} handleSelect={this.props.handleSelect} />
        </Segment>
      </Segment.Group>
    )
  }
}

export default ColdStorage
