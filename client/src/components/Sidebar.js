import React, { useRef, useEffect, useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
import './Sidebar.css'
import SidebarOptions from './SidebarOptions';
import M from 'materialize-css'

function Sidebar() {

  const { state, dispatch } = useContext(UserContext)
  const navigate = useNavigate()
  const searchModel = useRef(null)
  const [search, setSearch] = useState('')
  const [userDetails, setUserdetails] = useState([])

  useEffect(() => {
    M.Modal.init(searchModel.current)
  }, [])

  const fetchUsers = (query) => {
    setSearch(query)
    fetch('http://localhost:5000/search-user', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query
      })
    }).then(res => res.json())
      .then(result => {
        // console.log(result)
        setUserdetails(result.user)
      })
  }

  const renderList = () => {
    if (state) {
      return [
        <Link to="/home" className='link'><SidebarOptions icon="home" text="Home" /></Link>,
        <button data-target="modal1" className='modal-trigger srch'><SidebarOptions icon="search" text="Search" /></button>,
        <Link to="/reports" className='link'><SidebarOptions icon="move_to_inbox" text="Reports" /></Link>,
        <Link to="/trending" className='link'><SidebarOptions icon="trending_up" text="Trending" /></Link>,
        <Link to="/explore" className='link'><SidebarOptions icon="open_in_new" text="Explore" /></Link>,
        // <Link to ="/notification"><SidebarOptions text="Notification" /></Link>,
        <Link to="/profile" className='link'><SidebarOptions icon="person_outline" text="Profile" /></Link>,
        <Link to="/more" className='link'><SidebarOptions icon="more_horiz" text="More" /></Link>,
        // <Link to ="/post"><SidebarOptions text="Issue" className="issue" /></Link>,
        <button varient="outlined" className='card issue fullWidth'
          onClick={() => {
            navigate("/post")
          }}
        >
          Issue
        </button>,
        <button varient="outlined" className='card issue fullWidth'
          onClick={() => {
            localStorage.clear()
            dispatch({ type: "CLEAR" })
            navigate("/signin")
          }}
        >
          Logout
        </button>
      ]
    } else {
      return [
        <Link to="/signin"><SidebarOptions text="SignIn" /></Link>,
        <Link to="/signup"><SidebarOptions text="SignUp" /></Link>
      ]
    }
  }

  return (
    <>

      <div className='container sidebar'>
        <div className='logo'>
          <i className='material-icons' style={{ fontSize: "35px", color: "#1DA1F2" }}>pan_tool</i>
          {/* <h4>Raise-IT</h4> */}
        </div>
        {renderList()}
      </div>

      <div id="modal1" className="modal" ref={searchModel}>
        <div className="modal-content">
          <div className='srchline'>
            <i className='material-icons'>search</i>
            <input type="text"
              placeholder='Search User'
              value={search}
              onChange={(e) => fetchUsers(e.target.value)}
            />
            <button className="clear" onClick={() => setSearch('')}>
              <i className='material-icons'>clear</i>
            </button>
          </div>
          <ul class="collection">
            {userDetails.map(item => {
              return (
                <>
                  <button className='sug'
                    onClick={() => {
                      navigate("/profile/" + item._id)
                      M.Modal.getInstance(searchModel.current).close()
                    }}>{item.name}</button>
                  <hr />
                </>
              )
            })}
          </ul>

        </div>
      </div>

    </>

  )
}

export default Sidebar;