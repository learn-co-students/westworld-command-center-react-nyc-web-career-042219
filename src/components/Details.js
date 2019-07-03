import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import * as Images from '../services/Images'
import HostInfo from './HostInfo'

class Details extends React.Component {
  // We'll render the logo if no host is selected. But if a host does get selected....
  // Watch the video to see how this works in the app.
  
  renderSomething = () => (<Image size='medium' src={Images.westworldLogo} />)
  renderHostInfo = () => (<HostInfo areas={this.props.areas} hosts={this.props.hosts} selectedHost={this.props.selectedHost} updateHost={this.props.updateHost} logs={this.props.logs} updateLogs={this.props.updateLogs}/>)

  render() {
    return(
      <Segment id="details" className="HQComps">
        {(this.props.selectedHost.id !== 0) ? this.renderHostInfo() : this.renderSomething()}
      </Segment>
    )
  }
}

export default Details
