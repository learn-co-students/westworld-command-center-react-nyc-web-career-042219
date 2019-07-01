import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'

export function updateHost(key, value, id, func){
  return fetch(`http://localhost:4000/hosts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      [key]: value
    })
  }).then(r=>r.json())
    .then(change=>{
      func ?
      func(change[key], id)
      :
      null
    })
};

export default class HostInfo extends Component {



  toggle = (e) => {
      let value = !this.props.selectedHost.active
      updateHost("active", value, this.props.selectedHost.id, this.props.setActive)
      console.log("The radio button fired");
  }

  handleChange = (e, {value}) => {
      updateHost("area", value, this.props.selectedHost.id, this.props.setArea)
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
                {this.props.selectedHost.firstName}   {this.props.selectedHost.lastName} | {this.props.selectedHost.gender === "Male" ? <Icon name='man' /> : <Icon name='woman' />}
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={this.toggle}
                  label={this.props.selectedHost.active ?  "Active" : "Decommissioned"}
                  checked={this.props.selectedHost.active}
                  slider
                />
              </Card.Meta>
              <Divider />
              Current Area: {this.props.selectedHost.area.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
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
