import React, { useContext } from 'react'
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
          <Link to ="/"><SidebarOptions text="Home" /></Link>,
          <Link to ="/trending"><SidebarOptions text="Trending" /></Link>,
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
    <div className='sidebar'>

        <h3> Raise-IT</h3>

        {renderList()}
        

        {/* <button varient = "outlined" className='card issue' fullWidth>Issue</button> */}



    </div>
  )
}

export default Sidebar;