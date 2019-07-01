import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'
import { Log } from '../services/Log'

class HostInfo extends Component {
  handleChange = (e, {value}) => {
    // stop limit here
    let targetArea = this.props.areas.find(area => area.name === value)
    let hostsInArea = this.props.hosts.filter(host => host.area === targetArea.name)
    if (hostsInArea.length >= targetArea.limit) {
      this.props.updateLogs(Log.error(`Too many hosts. Cannot add ${this.props.selectedHost.firstName} to ${this.formatName(targetArea.name)}`))
    } else {
      this.props.updateHost('area', value, this.props.selectedHost)
      this.updateLogs(Log.notify(`${this.props.selectedHost.firstName} set in area ${this.formatName(value)}`))
    }
  }

  toggle = () => {
    //do bs patch here
    this.props.updateHost('active', !this.props.selectedHost.active, this.props.selectedHost)
    this.props.updateLogs(this.props.selectedHost.active ? Log.warn(`Activated ${this.props.selectedHost.firstName}`) : Log.notify(`Decommissioned ${this.props.selectedHost.firstName}`))
  }

  areaOptions = () => this.props.areas.map(area => this.createOptionsHash(area))
  formatName = (name) => name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  createOptionsHash = (area) => {
    return {
      key: this.formatName(area.name),
      text: this.formatName(area.name),
      value: area.name
    }
  }

  render(){
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={this.props.selectedHost.imageUrl}
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
               {this.props.selectedHost.firstName} | <Icon name={(this.props.selectedHost.gender === 'male') ? 'man' : 'woman'} />
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={this.toggle}
                  label={(this.props.selectedHost.active) ? 'Active' : 'Decommissioned'}
                  checked={(this.props.selectedHost.active)}
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown 
                onChange={this.handleChange} 
                value={this.props.selectedHost.area} 
                options={this.areaOptions()}
                selection
              />
                
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default HostInfo
