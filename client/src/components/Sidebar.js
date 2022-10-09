import React from 'react'
import {Link} from 'react-router-dom'
import './Sidebar.css'
import SidebarOptions from './SidebarOptions';

function Sidebar() {
  return (
    <div className='sidebar'>

        <h3> Raise-IT</h3>

        <Link to ="/"><SidebarOptions text="Home" /></Link>
        <Link to ="/trending"><SidebarOptions text="Trending" /></Link>
        <Link to ="/profile"><SidebarOptions text="Profile" /></Link>
        <Link to ="/signin"><SidebarOptions text="SignIn" /></Link>
        <Link to ="/signup"><SidebarOptions text="SignUp" /></Link>
        <Link to ="/more"><SidebarOptions text="More" /></Link>

        <a href="/post" className='issue'>Issue</a>

        {/* <button varient = "outlined" className='card issue' fullWidth>Issue</button> */}



    </div>
  )
}

export default Sidebar;