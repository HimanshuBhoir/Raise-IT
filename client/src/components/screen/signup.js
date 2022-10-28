import { json, stripBasename } from '@remix-run/router'
import React from 'react'
import useState from 'react-hook-use-state';
import {useNavigate} from 'react-router-dom'
import M from 'materialize-css'

function Signup() {

  const navigate = useNavigate()

  const [name,setName] = useState("")
  const [password,setPassword] = useState("")
  const [image,setImage] = useState("")
  const [photo, setPhoto] = useState(undefined)

  const PostData = () => {
    if(image){
      uploadPic()
    }else{
      uploadFields()
    }

    
  }

  const uploadFields = () => {
    fetch("http://localhost:5000/signup",{
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
      if(data.error){
        M.toast({html: data.error})
      }else{
        M.toast({html:"Registerd Succesfully"})
        navigate('/signin')
      }
    })
  }

  const uploadPic = () => {
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","raise=it")
    data.append("cloud_name","di7asyam5")
    fetch("https://api.cloudinary.com/v1_1/di7asyam5/image/upload",{
      method:"post",
      body:data
    })
    .then(res => res.json())
    .then(data=>{
      setPhoto(data.url)
      // console.log("uploaded")
    })
    .catch(err=>{
      console.log(err)
    })

    fetch("http://localhost:5000/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        name,
        password,
        photo
      })
    }).then(res => res.json())
    .then(data=>{
      if(data.error){
        M.toast({html: data.error})
      }else{
        M.toast({html:"Registerd Succesfully"})
        console.log(photo)
        navigate('/signin')
      }
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
                  <input type="text" placeholder="Enter Username here" 
                  value = {name}
                  onChange = {(e) => setName(e.target.value)}
                  />
                  <label className="form-label" htmlFor="username">Username</label>
                </div>
                {/* Password input */}
                <div className="form-outline mb-3">
                  <input type="password" placeholder="Enter password" 
                  value = {password}
                  onChange = {(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="pass">Password</label>
                </div>
                <div className="file-field input-field">

                  <div className="btn">
                    <span>Upload Profile</span>
                    <input type="file" 
                    onChange={(e)=> setImage(e.target.files[0])}
                    />
                  </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" />
                    </div>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="button" className="btn btn-primary btn-lg" style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}
                  onClick = {() => PostData()}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Signup