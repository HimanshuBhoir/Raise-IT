import React, {} from 'react'
import useState from 'react-hook-use-state';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css'
import './post.css'

function Issue() {

  const navigate = useNavigate()
  const [title,setTitle] = useState("")
  const [sub,setSub] = useState("")
  const [body,setBody] = useState("")
  const [image,setImage] = useState("")
  const [photo, setPhoto] = useState("")

  // for image upload-cloudnary
  const PostDetails = () => {
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
      // setPhoto(data.url)
      setPhoto(data.url)
      console.log("uploaded")
      // navigate("/")
    })
    .catch(err=>{
      console.log(err)
    })

    fetch("https://raise-it-1li7.onrender.com/createpost",{
      method:"post",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        title,
        body,
        sub,
        photo
      })
    }).then(res => res.json())
    .then(data=>{
      if(data.error){
        console.log(localStorage.getItem("jwt"))
        M.toast({html: data.error})
      }else{
        console.log(photo)
        console.log(sub)
        M.toast({html:"Issued Succesfully"})
      }
    })
  }




  return (
    <div className='Issue' style={{width:(window.innerWidth < 450 ? "80vw" : "50vw")}}>
      <h5 style={{paddingLeft:"5px",paddingBottom:"10px",borderBottom:"1px solid silver"}}>Issue your problems here</h5>
      <div className='dess'>
      <input type="text" placeholder='Title here (Eg. Topic Name)'
      value={title}
      onChange = {(e) => setTitle(e.target.value)}
      />

      <input type="text" placeholder='Subjected To (Eg. Authority, Department, Region)'
      value={sub}
      onChange = {(e) => setSub(e.target.value)}
      />

      <textarea className='des' 
      rows= {window.innerWidth < 450 ? "5" : "15"} 
      cols="40"
      placeholder='Content here'
      value={body}
      onChange = {(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">

        <div>
          {/* <span>Upload Image</span> */}
          <input type="file" 
          onChange={(e)=> setImage(e.target.files[0])}
          />
        </div>
          <div className="file-path-wrapper">
            <input placeholder='Upload Image' className="file-path validate" type="text" />
          </div>
      </div>

      <button className='sub'
      style={{backgroundColor:"#1DA1F2", color:"white", fontWeight:"700", border:"none",
      padding:"8px", borderRadius:"5px"}}
      onClick={()=>PostDetails()}
      >
      Issue
      </button>
    </div>
      

    </div>
  )
}

export default Issue