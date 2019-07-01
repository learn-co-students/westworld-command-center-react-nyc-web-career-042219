import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'

class App extends Component {
  state = {
    areas: [],
    hosts: [],
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

  updateHost = (key, value) => {
    let updatedHosts = this.state.hosts
    let targetHost = this.state.hosts.find(host => host.id === this.state.selectedHost.id)
    
    fetch(`http://localhost:4000/hosts/${this.state.selectedHost.id}`, {
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
        selectedHost: { ...this.state.selectedHost, [key]: value}
      })
      
      //update array... WHY DO I HAVE TO DO THIS
      //delete item in array................there must be a better way pls
      updatedHosts[updatedHosts.indexOf(targetHost)] = this.state.selectedHost
      this.setState({
        ...this.state,
        hosts: updatedHosts
      })
    })
  }

  render(){
    if (this.state.loaded) {
      return (
        <Segment id='app'>
          <WestworldMap areas={this.state.areas} hosts={this.state.hosts} selectedHost={this.state.selectedHost} handleSelect={this.handleSelect} />
          <Headquarters areas={this.state.areas} hosts={this.state.hosts} selectedHost={this.state.selectedHost} handleSelect={this.handleSelect} updateHost={this.updateHost}/>
        </Segment>
      )
    } else {
      return null
    }
  }
}

export default App;
