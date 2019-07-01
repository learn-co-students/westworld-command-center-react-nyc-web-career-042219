import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'

class Headquarters extends Component {
  state = {
    activated: false
  }

  switchActivation = () => {
    this.setState({
      activated: !this.state.activated
    })
  }

  render() {
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
          <ColdStorage 
            hosts={this.props.hosts} 
            selectedHost={this.props.selectedHost} 
            handleSelect={this.props.handleSelect} 
          />
        </Grid.Column>
        <Grid.Column width={5}>
          <Details 
            areas={this.props.areas} 
            hosts={this.props.hosts} 
            selectedHost={this.props.selectedHost} 
            handleSelect={this.props.handleSelect} 
            updateHost={this.props.updateHost} 
            logs={this.props.logs} 
            updateLogs={this.props.updateLogs}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <LogPanel 
            hosts={this.props.hosts} 
            updateHost={this.props.updateHost} 
            activated={this.state.activated} 
            switchActivation={this.switchActivation} 
            logs={this.props.logs} 
            updateLogs={this.props.updateLogs}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
