import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

export default class Host extends React.Component {
  render() {
    return(
      <Card
        className={(this.props.selectedHost.id === this.props.id) ? 'host selected' : 'host'}
        onClick={() => this.props.handleSelect(this.props)}
        image={this.props.imageUrl}
        raised />
    )
  }
}