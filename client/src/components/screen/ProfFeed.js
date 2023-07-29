// import React from 'react'
import React,{useEffect, useState, useContext} from 'react'
import { UserContext } from '../../App'
import './Profile.css'
import { useNavigate } from 'react-router-dom'
import M from 'materialize-css'

function ProfFeed() {

    const [mypics, setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const [image, setImage] = useState("")
    const [photo, setPhoto] = useState(undefined)
    useEffect(() => {
        fetch('https://raise-it-1li7.onrender.com/mypost',{
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
        }).then(res=> res.json())
        .then(result=> {
            setPics(result.mypost)
            // console.log(result)
        })
    },[])

    const updatePhoto = () => {
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
          console.log("uploaded" + data.url)
          localStorage.setItem("user",JSON.stringify({...state,photo:data.url}))
          dispatch({type:"UPDATEPIC",payload:data.url})
          fetch("https://raise-it-1li7.onrender.com/updatepic",{
          method:"put",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          },
          body:JSON.stringify({
            photo:data.url
          })
          }).then(res => res.json())
          .then(result=>{
            console.log(result)
          })
          // window.location.reload()
        })
        .catch(err=>{
          console.log(err)
        })   
    }


  return (
    <div className='profile' style={{width:(window.innerWidth < 450 ? "80vw" : "50vw")}}>
      <h5 style={{marginLeft:"10px"}}>Profile</h5>
      {/* <br/> */}
      <div className='dec'>
      <div className='prof' style={{justifyContent:"center"}}>
      <div>
      <div className="file-field input-field">
            <div>
                  <input type="file" 
                  onChange={(e)=> setImage(e.target.files[0])}
                  />
                  </div>
                    <div className="file-path-wrapper" style={{display:"flex"}}>
                    <img src={state?state.photo:"loading"} 
          style={{textAlign:"center",marginLeft:"3px",marginRight:"3px", width:(window.innerWidth<450 ? "150px" : "200px"), height:(window.innerWidth<450 ? "150px" : "200px"), borderRadius:"50%"}} />
                      {/* <input className="file-path validate" type="text" maxLength={6} /> */}
                      
                
                    </div>
                    
            </div>
            
           </div>
           <div className='desc' style={{paddingTop:"20px"}}>
           <h5>{state?state.name:"loading"}</h5>
            
            {/* <br/> */}
            {/* <br/> */}
            <text className='dss'>{mypics.length}Posts</text>
            <br/>
            <text className='dss'>{state?state.followers.length:"loading"} Marchers</text>
            <br/>
            <button className='edt'
            style={{border:"1px solid silver",borderRadius:"5px",display:"flex", marginTop:'10px',gap:"5px"}}
            onClick={() => updatePhoto()}>
              <i class="tiny material-icons">create</i>
              Edit
            </button>
           </div>
           
      
      </div>
      </div>
      
      
<hr/>
      <div className='self-posts'>
        {
        mypics.map(item => {
            return(
              <button className='item'
              onClick={() => {navigate("/reports")}}
              >
              <img 
              style={{width:(window.innerWidth > 450 ? "150px" : "90px"), height:(window.innerWidth> 450 ? "150px" : "70px"), borderRadius:"13px"}} 
                  src={item.photo}
                  />
                  <h6>{item.title}</h6>
              </button>   
            )    
        })
        }
      </div>

    </div>
  )
}



export default ProfFeed