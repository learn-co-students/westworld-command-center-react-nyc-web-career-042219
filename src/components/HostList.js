import React from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host'

class HostList extends React.Component {
  renderHosts = () => {
    return this.props.hosts.map(host => {
      if (!host.active)
        return <Host key={host.id} {...host} selectedHost={this.props.selectedHost} handleSelect={this.props.handleSelect} />
      else
        return ""
    })
  }

  render() {
    return(
      <Card.Group itemsPerRow={6}>
        {this.renderHosts()}
      </Card.Group>
    )
  }
}

export default HostList
