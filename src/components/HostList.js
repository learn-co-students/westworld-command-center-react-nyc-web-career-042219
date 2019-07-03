import React from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host'

class HostList extends React.Component {
  renderHosts = () => this.props.hosts.map(host => <Host key={host.id} {...host} selectedHost={this.props.selectedHost} handleSelect={this.props.handleSelect} />)

  render() {
    return(
      <Card.Group itemsPerRow={6}>
        {this.renderHosts()}
      </Card.Group>
    )
  }
}

export default HostList
