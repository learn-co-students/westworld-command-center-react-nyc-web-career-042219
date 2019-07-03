import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'
import { Log } from './services/Log'

class App extends Component {
  state = {
    areas: [],
    hosts: [],
    logs: [],
    selectedHost: {id: 0},
    loaded: false
  }

  componentDidMount() {
    Promise.all([
      fetch('http://localhost:4000/areas').then(r => r.json()), 
      fetch('http://localhost:4000/hosts').then(r => r.json())
    ]).then(allData => {
      this.setState({
        areas: allData[0],
        hosts: allData[1],
        loaded: true
      })
    })
  }

  handleSelect = (host) => this.setState({ selectedHost: (this.state.selectedHost.id === host.id) ? {id: 0} : host})

  updateHost = (key, value, host) => {
    let updatedHosts = this.state.hosts
    
    fetch(`http://localhost:4000/hosts/${host.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Type': 'application/json'
      },
      body: JSON.stringify({[key]: value})
    })
    .then(r => r.json())
    .then(data => {
      this.setState({
        ...this.state,
        selectedHost: { ...host, [key]: value}
      })

      //update array... WHY DO I HAVE TO DO THIS
      //overwrite item in array................there must be a better way pls
      let targetHost = updatedHosts.find(h => h.id === host.id)
      updatedHosts[updatedHosts.indexOf(targetHost)] = this.state.selectedHost
      this.setState({
        ...this.state,
        hosts: updatedHosts
      })
    })
  }

  updateLogs = (log) => {
    this.setState({
      logs: [log, ...this.state.logs]
    })
  }

  render(){
    if (this.state.loaded) {
      return (
        <Segment id='app'>
          <WestworldMap
            areas={this.state.areas} 
            hosts={this.state.hosts} 
            selectedHost={this.state.selectedHost} 
            handleSelect={this.handleSelect} 
            logs={this.state.logs} 
            updateLogs={this.updateLogs}
          />
          <Headquarters
            areas={this.state.areas}
            hosts={this.state.hosts} 
            selectedHost={this.state.selectedHost} 
            handleSelect={this.handleSelect} 
            updateHost={this.updateHost} 
            logs={this.state.logs} 
            updateLogs={this.updateLogs} 
          />
        </Segment>
      )
    } else {
      return null
    }
  }
}

export default App;
