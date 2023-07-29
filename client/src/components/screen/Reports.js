import React, { useEffect, useContext} from 'react'
import useState from 'react-hook-use-state';
import "./Home.css"
import { UserContext } from '../../App'
import {Link, useNavigate} from 'react-router-dom'
import Issue from './post';
import M from 'materialize-css'

function Reports() {

  const [data, setData] = useState([])
  const [cmnt, showCmnt] = useState(false)
  const {state, dispatch} = useContext(UserContext) 
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
  
  useEffect(()=>{
    fetch('https://raise-it-1li7.onrender.com/mypost',{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result => {
      // console.log(result)
      setData(result.mypost)
    })
  },[])

  const likedPost = (id) =>{
    fetch('https://raise-it-1li7.onrender.com/like',{
      method: "put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postedById:id
      })
    }).then(res=>res.json())
    .then(result => {
      // console.log(result)
      const newData = data.map(item=>{
        if(item._id == result._id){
          return result
        }else{
          return item
        }
      })
      setData(newData)
    })
  }

  const unlikedPost = (id) =>{
    fetch('https://raise-it-1li7.onrender.com/unlike',{
      method: "put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postedById:id
      })
    }).then(res=>res.json())
    .then(result => {
      // console.log(result)
      const newData = data.map(item=>{
        if(item._id == result._id){
          return result
        }else{
          return item
        }
      })
      setData(newData)
    })
  }

  const makeComment =(text, postedById) =>{
    fetch('https://raise-it-1li7.onrender.com/comment',{
      method: "put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postedById,
        text
      })
    }).then(res=>res.json())
    .then(result => {
      console.log(result)
      const newData = data.map(item=>{
        if(item._id == result._id){
          return result
        }else{
          return item
        }
      })
      setData(newData)
    }).catch(err => {
      console.log(err)
    })
  }

  const deletePost = (postid) => {
    fetch(`https://raise-it-1li7.onrender.com/deletepost/${postid}`,{
      method: "delete",
      headers:{
        Authorization:"Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
    .then(result => {
      console.log(result)
      const newData = data.filter(item=>{
        return item._id != result._id
      })
      setData(newData)
    })
  }

  return (
  <>
    <div className='home' style={{width:(window.innerWidth < 450 ? "80vw" : "50vw")}}>
      <h5>Reports</h5>
      <div className='dess' style={{padding:"15px",border:"1px solid silver"}}>
        <text style={{fontSize:"15px"}}>Issue your problems</text>
      <input type="text" placeholder='Title here (Eg. Topic Name)'
      value={title}
      onChange = {(e) => setTitle(e.target.value)}
      />

      <input type="text" placeholder='Subjected To (Eg. Authority, Department, Region)'
      value={sub}
      onChange = {(e) => setSub(e.target.value)}
      />

      <input type="text"
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
      {
        data.map(item =>{
          return( 
            <div className='home-card'>
            <h4 className='username'>
              <Link to ={item.postedById._id === state._id ? "/profile" : "/profile/"+item.postedById._id}>
              <img  classname="card prof-photo" src={item.postedById.photo}
              style={{marginLeft:"3px",marginRight:"3px", width:"20px", height:"20px", borderRadius:"50px"}}
              />
              <text className='usrnm'>{item.postedById.name}</text>
              </Link>
            {item.postedById._id == state._id && <i className='material-icons' style={{float: "right"}} 
            
            onClick={()=> {deletePost(item._id)}}
             >delete</i>
            }
            </h4>
            <hr/>
            <div className='card-img'>
              <img 
              style={{width:(window.innerWidth > 450 ? "700px" : "400px"), height:(window.innerWidth > 450 ? "350px" : "150px")}}
              className='images'
              src={item.photo} />
            
            </div>

            <div className='content'>
        
              <h6 style={{textAlign:"center"}}><b>{item.title}</b></h6>
              <h6><b>{item.sub}</b></h6>
              <p>{item.body}</p>

              <hr/>

              <div>
              <i className='material-icons' style={{float: "right"}} 
                onClick={()=> {(cmnt) ? showCmnt(false) : showCmnt(true)}}
                >comment</i>
                
              {item.likes.includes(state._id)
              ? 
                <i className='material-icons'
                onClick={()=> {unlikedPost(item._id)}}
                >thumb_down</i> 
              :
                <i className='material-icons'
                onClick={()=> {likedPost(item._id)}}
                >thumb_up</i>
              }
              </div>
              <div>
              <text>{item.likes.length} likes</text>
              <text style={{float: "right"}}>{item.comments.length} comments</text>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault()
                makeComment(e.target[0].value, item._id)
                showCmnt(true)
            }}>
              
              <input type="text" placeholder="Add Comment"/>
            </form>
              <h6><b>Comments</b></h6>
              <hr/>
              {
                item.comments.map(record => {
                  if(cmnt){
                    return (
                      <h6 key={record._id}><Link to ={state._id === record.postedById._id ? "/profile" : "/profile/"+record.postedById._id}><b className='cm'>{record.postedById.name}</b></Link> {record.text}</h6>
                    )
                    }
                })
              }
              
            </div>

            

          </div>
          )
        })
      }

    </div>
  </>
  )
}

export default Reports