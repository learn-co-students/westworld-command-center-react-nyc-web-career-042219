import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'

class WestworldMap extends React.Component {
  renderAreas = () => {
    return this.props.areas.map(area => <Area key={area.id} {...area} hosts={this.props.hosts} selectedHost={this.props.selectedHost} handleSelect={this.props.handleSelect} />)
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
