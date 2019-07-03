import React from 'react'
import { Segment, Button } from 'semantic-ui-react';
import { Log } from '../services/Log'

const LogPanel = (props) => {

  const handleActivation = () => {
    props.hosts.forEach(host => props.updateHost('active', !props.activated, host))
    props.switchActivation()
    props.updateLogs((props.activated) ? Log.notify('Decommissioning all hosts.') : Log.warn('Activating all hosts!'))
  }

  return(
    <Segment className="HQComps" id="logPanel">
      <pre>
        {props.logs.map((log, i) => <p key={i} className={log.type}>{log.msg}</p>)}
      </pre>
      
      <Button
        fluid
        color={(props.activated) ? "green" : "red"}
        content={(props.activated) ? 'DECOMMISSION ALL' : 'ACTIVATE ALL'}
        onClick={() => handleActivation()}
      />
    </Segment>
  )
}

export default LogPanel
