import React, { useEffect, useContext, useRef} from 'react'
import useState from 'react-hook-use-state';
import "./Home.css"
import "./Explore.css"
import { UserContext } from '../../App'
import {Link} from 'react-router-dom'
import Issue from './post';
import {useNavigate} from 'react-router-dom'
import M from 'materialize-css'


function Explore() {

  const [data, setData] = useState([])
  const [cmnt, showCmnt] = useState(false)
  const {state, dispatch} = useContext(UserContext) 
  const width = window.innerWidth
  const searchModel = useRef(null)
  const [search, setSearch] = useState('')
  const [userDetails, setUserdetails] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    M.Modal.init(searchModel.current)
  },[])

  const fetchUsers = (query) => {
    setSearch(query)
    fetch('https://raise-it-1li7.onrender.com/search-user',{
      method: "post",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        query
      })
    }).then(res=>res.json())
    .then(result => {
      // console.log(result)
      setUserdetails(result.user)
    })
  }

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
    <div className='home' style={{width:(width < 450 ? "80vw" : "50vw")}}>

      <h5 style={{paddingLeft:"5px", alignItems:"flex-end"}}>Explore
      <button data-target="modal1" class="issue modal-trigger" style={{marginRight:"10px",float:"right"}}>Search</button>
      </h5>

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
              <text className='cmtlen' style={{float: "right"}}>{item.comments.length} comments</text>
              </div>  
                          
              <form onSubmit={(e) => {
                e.preventDefault()
                makeComment(e.target[0].value, item._id)
                showCmnt(true)
            }}>  
            <input type="text" placeholder="Add Comment"/>
            </form>
            <div>
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
          </div>
          )
        })
      }

    </div>
  </>
  )
}

export default Explore