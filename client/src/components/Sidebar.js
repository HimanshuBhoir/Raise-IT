import React, { useContext, useState } from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { UserContext } from '../App';
import './Sidebar.css'
import SidebarOptions from './SidebarOptions';

function Sidebar() {

  const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate()
  const renderList = () => {
    if(state){
      return[
          <Link to ="/home"><SidebarOptions text="Home" /></Link>,
          <Link to ="/search"><SidebarOptions text="Search" /></Link>,
          <Link to ="/trending"><SidebarOptions text="Trending" /></Link>,
          <Link to ="/explore"><SidebarOptions text="Explore" /></Link>,
          <Link to ="/notification"><SidebarOptions text="Notification" /></Link>,
          <Link to ="/profile"><SidebarOptions text="Profile" /></Link>,
          <Link to ="/more"><SidebarOptions text="More" /></Link>,
          // <Link to ="/post"><SidebarOptions text="Issue" className="issue" /></Link>,
          <button varient = "outlined" className = 'card issue fullWidth'
          onClick={()=>{
              // localStorage.clear()
              // dispatch({type:"CLEAR"})
              // navigate("/signin")
              navigate("/post")
          }}
          >
            Issue
          </button>,
          <button varient = "outlined" className = 'card issue fullWidth'
          onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              navigate("/signin")
          }}
          >
            Logout
          </button>
        ]
    }else{
      return[
        <Link to ="/signin"><SidebarOptions text="SignIn" /></Link>,
        <Link to ="/signup"><SidebarOptions text="SignUp" /></Link>
      ]
    }
  }

  return (
    <div className='card sidebar'>

      <h4>Raise-IT</h4>
      {renderList()}


        {/* <button varient = "outlined" className='card issue' fullWidth>Issue</button> */}

    </div>
  )
}

export default Sidebar;