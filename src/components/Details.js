import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import * as Images from '../services/Images'
import HostInfo from './HostInfo'


const Details = (props) => {


const renderHostDetails = ()=>  <HostInfo
                                selectedHost={props.selectedHost}
                                areas={props.areas}
                                setArea={props.setArea}
                                setActive={props.setActive}
                                />

const renderSomething = () => <Image size='medium' src={Images.westworldLogo}/>



  return(
    <Segment id="details" className="HQComps">
    {
      props.selectedHost != null ?
      renderHostDetails()
      :
      renderSomething()
    }
    </Segment>
  )
}

export default Details
