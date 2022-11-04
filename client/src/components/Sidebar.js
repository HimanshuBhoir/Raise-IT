import React, {useRef, useEffect, useContext, useState } from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { UserContext } from '../App';
import './Sidebar.css'
import SidebarOptions from './SidebarOptions';
import M from 'materialize-css'

function Sidebar() {

  const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate()
  const searchModel = useRef(null)
  const [search, setSearch] = useState('')
  const [userDetails, setUserdetails] = useState([])

  useEffect(() => {
    M.Modal.init(searchModel.current)
  },[])

  const fetchUsers = (query) => {
    setSearch(query)
    fetch('http://localhost:5000/search-user',{
      method: "post",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        query
      })
    }).then(res=>res.json())
    .then(result => {
      // console.log(result)
      setUserdetails(result.user)
    })
  }

  const renderList = () => {
    if(state){
      return[
          <Link to ="/home" className='link'><SidebarOptions text="Home" /></Link>,
          <button data-target="modal1" class="btn modal-trigger">Search</button>,
          <Link to ="/reports" className='link'><SidebarOptions text="Reports" /></Link>,
          <Link to ="/trending" className='link'><SidebarOptions text="Trending" /></Link>,
          <Link to ="/explore" className='link'><SidebarOptions text="Explore" /></Link>,
          // <Link to ="/notification"><SidebarOptions text="Notification" /></Link>,
          <Link to ="/profile" className='link'><SidebarOptions text="Profile" /></Link>,
          <Link to ="/more" className='link'><SidebarOptions text="More" /></Link>,
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
    <>
    
    <div className='container sidebar'>
      <h4>Raise-IT</h4>
      {renderList()}
    </div>

      <div id="modal1" className="card modal" ref={searchModel}>
          <div className="modal-content">
            <input type="text" 
              placeholder='Search User'
              value={search}
              onChange={(e) => fetchUsers(e.target.value)} 
            />

          <ul class="collection">
            {userDetails.map(item => {
              return(
                <>
                  <button onClick={() => navigate("/profile/"+item._id)}>{item.name}</button>
                  <hr/>
                </>
              ) 
            })}
          </ul>

        </div>
        <div className="modal-footer">
        <button> Close </button>          
        </div>
      </div>

    </>
    
  )
}

export default Sidebar;