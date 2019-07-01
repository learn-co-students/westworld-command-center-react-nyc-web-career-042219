import React from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host'

const HostList = (props) => {

  return(
    <Card.Group itemsPerRow={6}>
    {
    props.hosts.map(h => { return <Host selectedHost={props.selectedHost} selectHost={props.selectHost} key={h.id} {...h}/> })
    }
    </Card.Group>
  )
}

export default HostList
