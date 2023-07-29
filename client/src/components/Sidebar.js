import React, { useRef, useEffect, useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
import './Sidebar.css'
import SidebarOptions from './SidebarOptions';
import M from 'materialize-css'

function Sidebar() {

  const { state, dispatch } = useContext(UserContext)
  const width = window.innerWidth
  const navigate = useNavigate()
  const searchModel = useRef(null)
  const [search, setSearch] = useState('')
  const [userDetails, setUserdetails] = useState([])

  useEffect(() => {
    M.Modal.init(searchModel.current)
  }, [])

  const fetchUsers = (query) => {
    setSearch(query)
    fetch('https://raise-it-1li7.onrender.com/search-user', {
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
        <Link to="/home" className='link'><SidebarOptions icon="home" text= {width < 450 ? "" : "Home"} /></Link>,
        <button data-target="modal1" className='modal-trigger srch'><SidebarOptions icon="search" text={width < 450 ? "" : "Search"} /></button>,
        <Link to="/reports" className='link'><SidebarOptions icon="move_to_inbox" text={width < 450 ? "" : "Reports"} /></Link>,
        <Link to="/trending" className='link'><SidebarOptions icon="trending_up" text={width < 450 ? "" : "Trending"} /></Link>,
        <Link to="/explore" className='link'><SidebarOptions icon="open_in_new" text={width < 450 ? "" : "Explore"} /></Link>,
        // <Link to ="/notification"><SidebarOptions text={width < 400 ? "" : "Notification" /></Link>,
        <Link to="/profile" className='link'><SidebarOptions icon="person_outline" text={width < 450 ? "" : "Profile"} /></Link>,
        <Link to="/more" className='link'><SidebarOptions icon="more_horiz" text={width < 450 ? "" : "More"} /></Link>,
        // <Link to ="/post"><SidebarOptions text="Issue" className="issue" /></Link>,
        <button className="issue"
        style={{float:(width < 450 ? "left" : "center")}}
          onClick={() => {
            navigate("/post")
          }}
        >
          {width < 450
          ? <i className='material-icons'>create</i>
          : "Issue"
          }
        
        </button>
        // <button varient="outlined" className='logout fullwidth'
        //   onClick={() => {
        //     localStorage.clear()
        //     dispatch({ type: "CLEAR" })
        //     navigate("/signin")
        //   }}
        // >
        //   {width > 450 ? "Logout" : ""}
        //   <i className="tiny material-icons">exit_to_app</i>
        // </button>
      ]
    } else {
      return [
        // <Link to="/signin"><SidebarOptions text="SignIn" /></Link>,
        // <Link to="/signup"><SidebarOptions text="SignUp" /></Link>
      ]
    }
  }

  return (
    <>

      <div className='sidebar'>
        {state ?
        <div className='logo'>
          <i className='material-icons' style={{ fontSize: "35px", color: "#1DA1F2" }}>pan_tool</i>
        </div>
        : ""
        }

        {renderList()}
      </div>

      <div id="modal1" className="modal" ref={searchModel}>
        <div className="modal-content">
          <div className='srchline' 
          style={{backgroundColor:"whitesmoke"}}
          >
            <i className='material-icons'>search</i>
            <input 
            style={{fontWeight:"600"}}
            type="text"
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