import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList'

const Area = (props) => {
  
  const formatAreaName = () => props.name.split('_').join(' ')

  return (
    <div className='area' id={props.name}>
      <h3 className='labels'>{formatAreaName()}</h3>
      <HostList hosts={props.hosts} selectedHost={props.selectedHost} handleSelect={props.handleSelect} />
    </div>
  )
}

export default Area;
