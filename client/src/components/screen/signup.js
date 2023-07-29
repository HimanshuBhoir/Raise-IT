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
    fetch("https://raise-it-1li7.onrender.com/signup",{
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

    fetch("https://raise-it-1li7.onrender.com/signup",{
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
    <section className="signup" style={{height:"fit-content", border:"none"}}>
        
        <div className='logo'>
                <i className='large material-icons' style={{ fontSize: "60px", color: "#1DA1F2" }}>pan_tool</i>
                <br/>
                <text style={{ fontSize: "20px", color: "#1DA1F2" }}>Register to Rais-IT</text>
                <br/>
                <text style={{ fontSize: "12px"}}>We help you to raise your problme</text>
              </div>
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

                  <div className="btn"
                  style={{backgroundColor:"#1DA1F2", color:"white", fontWeight:"100", border:"none",
                  padding:"4px", borderRadius:"5px"}}
                  >
                    <span>Upload Profile</span>
                    <input type="file" 
                    onChange={(e)=> setImage(e.target.files[0])}
                    />
                  </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" />
                    </div>
                </div>
                <br/>
                <div style={{textAlign:"center"}}>
                  <button type="button"
                  style={{backgroundColor:"#1DA1F2", color:"white", fontWeight:"700", border:"none",
                  padding:"8px", borderRadius:"5px"}}
                  onClick = {() => PostData()}
                  >
                    Register
                  </button>
                  <br/>
                  <br/>
                  <button 
                  style={{border:"none", backgroundColor:"white", fontWeight:"500", color:"#1DA1F2"}}
                  onClick={() => navigate("/signin")}
                  >
                    Already hava account?
                  </button>
                </div>
                <br/>
              </form>
      </section>
  )
}

export default Signup