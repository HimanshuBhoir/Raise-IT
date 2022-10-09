import React from 'react'
import useState from 'react-hook-use-state';
import M from 'materialize-css'

function Issue() {

  const [title,setTitle] = useState("")
  const [body,setBody] = useState("")
  const [image,setImage] = useState("")
  const [url, setUrl] = useState("")

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
      setUrl(data.url)
      console.log("uploaded")
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
        pic:url
      })
    }).then(res => res.json())
    .then(data=>{
      if(data.error){
        console.log(localStorage.getItem("jwt"))
        M.toast({html: data.error})
      }else{
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