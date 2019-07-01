import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'



export default class WestworldMap extends React.Component {



areaHosts = (areaName) => {
  const allHosts = this.props.hosts
  let areaHosts = allHosts.filter(host => host.area === areaName && host.active)
return areaHosts
}


render() {
  return (
    <Segment id="map" >
      {
          this.props.areas.map(a => <Area hosts={this.areaHosts(a.name)} key={a.id} {...a}  selectHost={this.props.selectHost}/>)
      }
    </Segment>
  )
 }
}
