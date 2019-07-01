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

selectHost = (host) => {
  this.state.selectedHost ?
    this.state.selectedHost.id === host.id ? this.setState({ selectedHost: null}) : this.setHost(host)
    :
    this.setHost(host)
}

setHost = (host) => {
  if (host) {
    const selectedHost = this.state.hosts.find(h => h.id === host.id)
    this.setState({
      selectedHost: selectedHost
    })
  }
  console.log("There is no Selected Host")
}



setArea = (area, id) => {
  this.setState({
    hosts: this.state.hosts.map(host => host.id === id ? {...host, area: area} : host)
  }, ()=> this.setHost(this.state.selectedHost))
}


setActive = (status, id) => {
  this.setState({
    hosts: this.state.hosts.map(host => host.id === id ? {...host, active: status} : host)
  },()=> this.setHost(this.state.selectedHost))
}

setAllStatus = (status) => {
  this.setState({
     hosts: this.state.hosts.map(host=> {
      return  {...host, active: status}
    })
  },()=> this.setHost(this.state.selectedHost))
}


// renderFlip = () => this.setState({render: !this.state.render})
// setArea = (id, area) => (this.state.hosts.find(host => host.id === id).area = area), this.renderFlip())
// setActive = (id, status) => (this.state.hosts.find(host => host.id === id).active = status), this.renderFlip())
// setAllStatus = (status) => (this.state.hosts.forEach(host=> host.active = status), this.renderFlip())


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
