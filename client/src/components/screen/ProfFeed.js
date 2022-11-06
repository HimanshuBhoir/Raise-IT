// import React from 'react'
import React,{useEffect, useState, useContext} from 'react'
import { UserContext } from '../../App'
import './Profile.css'
import M from 'materialize-css'

function ProfFeed() {

    const [mypics, setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image, setImage] = useState("")
    const [photo, setPhoto] = useState(undefined)
    useEffect(() => {
        fetch('http://localhost:5000/mypost',{
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
          fetch("http://localhost:5000/updatepic",{
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
    <div className='profile'>
      <h5 style={{marginLeft:"10px"}}>Profile</h5>
      <br/>
      <div className='dec'>
      <div className='prof'>
        <img src={state?state.photo:"loading"} 
          style={{textAlign:"center",marginLeft:"3px",marginRight:"3px", width:"200px", height:"200px", borderRadius:"50%"}} />
           
           <div className='desc'>
           <h4>{state?state.name:"loading"}</h4>
            <div className="file-field input-field">
            <i className='material-icons' style={{float: "right"}} 
                onClick={()=> {}}
                >create</i> 
            <div>
                  <input type="file" 
                  onChange={(e)=> setImage(e.target.files[0])}
                  />
                  </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text"/>
                    </div>
            </div>
            <button onClick={() => updatePhoto()}> Update</button>
            <h6>{mypics.length}posts</h6>
            <h6>{state?state.followers.length:"loading"} marchers</h6>
           </div>
           
      
      </div>
      </div>
      
      
<hr/>
      <div className='self-posts'>
        {
        mypics.map(item => {
            return(
              <div className='card item'>
              <img 
              style={{width:"150px", height:"150px", borderRadius:"13px"}} 
                  src={item.photo}
                  />
                  <h6>{item.title}</h6>
              </div>   
            )    
        })
        }
      </div>

    </div>
  )
}



export default ProfFeed