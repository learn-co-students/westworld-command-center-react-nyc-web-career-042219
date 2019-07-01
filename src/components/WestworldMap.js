import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'

class WestworldMap extends React.Component {
  activeHosts = (area) => {
    let allHosts = this.props.hosts
    let activeHosts = allHosts.filter(host => host.active && (host.area === area.name))
    return activeHosts
  }

  renderAreas = () => {
    return this.props.areas.map(area => <Area key={area.id} {...area} hosts={this.activeHosts(area)} selectedHost={this.props.selectedHost} handleSelect={this.props.handleSelect} />)
  }

  render() {
    return (
      <Segment id="map" >
        {this.renderAreas()}
      </Segment>
    )
  }
}

export default WestworldMap
