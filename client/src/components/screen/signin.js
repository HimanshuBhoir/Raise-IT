import React, { useContext, useState } from 'react'
// import useState from 'react-hook-use-state';
import {useNavigate} from 'react-router-dom'
import M from 'materialize-css'
import './sign.css'
import {UserContext} from '../../App'

function Signin() {

  const {state, dispatch} = useContext(UserContext)
  const navigate = useNavigate()

  const [name,setName] = useState("")
  const [password,setPassword] = useState("")

  const PostData = () => {
    fetch("https://raise-it-1li7.onrender.com/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name, 
        password
      })
    }).then(res => res.json())
    .then(data=>{
      // console.log(data)
      if(data.error){
        M.toast({html: data.error})
      }else{
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user-details", JSON.stringify(data.user))
        dispatch({type:"USER",payload:data.user})
        // console.log("jwt")
        // console.log(localStorage.getItem("user-details"))
        M.toast({html:"Singedin Succesfully"})
        navigate('/home')
      }
    }).catch(err=>{
      console.log(err)
    })
  }


  return (
    <section className="signin" style={{width:"50vw", height:"fit-content", border:"none"}}>
              
              <div className='logo'>
                <i className='large material-icons' style={{ fontSize: "60px", color: "#1DA1F2" }}>pan_tool</i>
                <br/>
                <text style={{ fontSize: "20px", color: "#1DA1F2" }}>Login to Rais-IT</text>
                <br/>
                <text style={{ fontSize: "12px"}}>We help you to raise your problme</text>
              </div>
              
              <form>
                {/* Name input */}
                <div>
                  <input type="text" className="uname" placeholder="Enter Username here" 
                  value = {name}
                  onChange = {(e) => setName(e.target.value)}
                  />
                  <label className='uname'>Username</label>
                </div>
                {/* Password input */}
                <div>
                  <input type="password" placeholder="Enter password" 
                  value = {password}
                  onChange = {(e) => setPassword(e.target.value)}
                  />
                  <label>Password</label>
                </div>
                <div style={{textAlign:"center"}}>
                  <button type="button" 
                  style={{backgroundColor:"#1DA1F2", color:"white", fontWeight:"700", border:"none",
                padding:"8px", borderRadius:"5px"}}
                  onClick = {() => PostData()}
                  >
                    Login
                  </button>
                  
                  <br/>
                  <br/>

                  <button
                  style={{border:"none", backgroundColor:"white", fontWeight:"500", color:"#1DA1F2"}}
                    onClick={() => navigate("/signup")}
                  >
                      Create Account?
                  </button>
                </div>
                <br/>
              </form>
      </section>
  )
}

export default Signin