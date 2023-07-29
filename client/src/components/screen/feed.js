import React, { useEffect, useContext} from 'react'
import useState from 'react-hook-use-state';
import "./Home.css"
import { UserContext } from '../../App'
import {Link} from 'react-router-dom'
import Issue from './post';

function Feed() {

  const [data, setData] = useState([])
  const {state, dispatch} = useContext(UserContext) 
  useEffect(()=>{
    fetch('https://raise-it-1li7.onrender.com/allpost',{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result => {
      // console.log(result)
      setData(result.posts)
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
    <div className='card home'>
      {
        data.map(item =>{
          return( 
            <div className='card home-card'>
            <h4 className='username'><Link to ={item.postedById._id === state._id ? "/profile" : "/profile/"+item.postedById._id}>{item.postedById.name} </Link>
            {item.postedById._id == state._id && <i className='material-icons' style={{float: "right"}} 
            
            onClick={()=> {deletePost(item._id)}}
             >delete</i>
            }
            </h4>
            <hr/>
            <div className='card-img'>
              <img 
              style={{width:"800px", height:"350px"}}
              className='images'
              src={item.photo} />
            
            </div>

            <div className='content'>
        
              <h6><b>{item.title}</b></h6>
              <p>{item.body}</p>

              <hr/>

              <div>
              <i className='material-icons' style={{float: "right"}} 
                onClick={()=> {}}
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
              <h6 style={{float: "right"}}>{item.comments.length} comments</h6>
              <h6>{item.likes.length} likes</h6>
              </div>

              
              <h6><b>Comments</b></h6>
              <hr/>
              {
                item.comments.map(record => {
                  return (
                    <h6 key={record._id}><span style={{fontWeight:"500"}}><b><Link to ={item.postedById._id === state._id ? "/profile" : "/profile/"+item.postedById._id}>{record.postedById.name} </Link></b></span> {record.text}</h6>
                  )
                })
              }
              
            </div>

            <form onSubmit={(e) => {
                e.preventDefault()
                makeComment(e.target[0].value, item._id)
            }}>
              
              <input type="text" placeholder="Add Comment"/>
            </form>

          </div>
          )
        })
      }

    </div>
  </>
  )
}

export default Feed