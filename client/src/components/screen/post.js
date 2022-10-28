import React, {} from 'react'
import useState from 'react-hook-use-state';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css'

function Issue() {

  const navigate = useNavigate()
  const [title,setTitle] = useState("")
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

    fetch("http://localhost:5000/createpost",{
      method:"post",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        title,
        body,
        photo
      })
    }).then(res => res.json())
    .then(data=>{
      if(data.error){
        console.log(localStorage.getItem("jwt"))
        M.toast({html: data.error})
      }else{
        console.log(photo)
        console.log(title)
        M.toast({html:"Issued Succesfully"})
      }
    })
  }




  return (
    <div className='card Issue'>

      <input type="text" placeholder='Title here'
      value={title}
      onChange = {(e) => setTitle(e.target.value)}
      />

      <input type="text" placeholder='Content here'
      value={body}
      onChange = {(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">

        <div className="btn">
          <span>Upload Image</span>
          <input type="file" 
          onChange={(e)=> setImage(e.target.files[0])}
          />
        </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
      </div>

      <button className='issue'
      onClick={()=>PostDetails()}
      >
      Submit Issue
      </button>

      

    </div>
  )
}

export default Issue