import React from 'react'
import './SidebarOptions.css'

function SidebarOptions({text, icon}) {
  return (
    <div className='sidebarOption'>
      <div className='row'>
      <i className='material-icons'>{icon}</i>
      {text}
      </div>
      
    </div>
  )
}

export default SidebarOptions;