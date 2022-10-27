import React, { useContext, useState } from 'react'
// import useState from 'react-hook-use-state';
import {useNavigate} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

function Signin() {

  const {state, dispatch} = useContext(UserContext)
  const navigate = useNavigate()

  const [name,setName] = useState("")
  const [password,setPassword] = useState("")

  const PostData = () => {
    fetch("http://localhost:5000/signin",{
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
      console.log(data)
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
    <section className="card vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img style={{height:"40%", width:"600px"}}
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                {/* Name input */}
                <div className="form-outline mb-4">
                  <input type="text" id="username" className="form-control form-control-lg" placeholder="Enter Username here" 
                  value = {name}
                  onChange = {(e) => setName(e.target.value)}
                  />
                  <label className="form-label" htmlFor="username">Username</label>
                </div>
                {/* Password input */}
                <div className="form-outline mb-3">
                  <input type="password" id="pass" className="form-control form-control-lg" placeholder="Enter password" 
                  value = {password}
                  onChange = {(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="pass">Password</label>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="button" className="btn btn-primary btn-lg" style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}
                  onClick = {() => PostData()}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Signin