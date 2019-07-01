import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import Headquarters from './components/Headquarters'
import WestworldMap from './components/WestworldMap'


class App extends Component {


  state = {
    areas: [],
    hosts: [],
    selectedHost: null,
    loaded: false,
    render: false
  }

  renderFlip = () => this.setState({render: !this.state.render})


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

selectHost = (host) => {
  this.state.selectedHost ?
    this.state.selectedHost.id === host.id ? this.setState({ selectedHost: null}) : this.setHost(host)
    :
    this.setHost(host)
}

setHost = (host) => {
  const selectedHost = this.state.hosts.find(h => h.id === host.id)
  this.setState({
    selectedHost: selectedHost
  })
}

setArea = (area, id) => {
  this.state.hosts.find(host => host.id === id).area = area
  this.renderFlip()
}

setActive = (status, id) => {
  this.state.hosts.find(host => host.id === id).active = status
  this.renderFlip()
}

setAllStatus = (status) =>{
  this.state.hosts.forEach(host=> host.active = status)
  this.renderFlip()
}

// setArea = (id, area) => this.state.hosts.find(host => host.id === id).area = area), this.renderFlip()
// setActive = (id, status) => this.state.hosts.find(host => host.id === id).active = status), this.renderFlip()
// setAllStatus = (status) => this.state.hosts.forEach(host=> host.active = status), this.renderFlip()


  render(){
    return (
      <Segment id='app'>
        <WestworldMap
        areas={this.state.areas}
        hosts={this.state.hosts}
        selectedHost={this.state.selectedHost}
        selectHost={this.selectHost}
        />

        <Headquarters
        areas={this.state.areas}
        hosts={this.state.hosts}
        selectedHost={this.state.selectedHost}
        selectHost={this.selectHost}
        setArea={this.setArea}
        setActive={this.setActive}
        setAllStatus={this.setAllStatus}

        />
      </Segment>
    )
  }
}

export default App;
