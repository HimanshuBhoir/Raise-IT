import React,{useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../../App'

function More() {

    const navigate = useNavigate()
    const {state, dispatch} = useContext(UserContext)
  return (
    <div className='more' style={{width:(window.innerWidth < 450 ? "80vw" : "50vw")}}>
        <h5 style={{paddingLeft:"5px",borderBottom:"1px solid silver", paddingBottom:"10px"}}>More</h5>
        <div className='contents'>
        <text
        style={{cursor:"pointer", padding:"5px"}}
          onClick={() => {
            localStorage.clear()
            dispatch({ type: "CLEAR" })
            navigate("/signin")
          }}
        >
            <i className="tiny material-icons">exit_to_app</i>
          Logout
          
        </text>
        </div>
    </div>
  )
}

export default More