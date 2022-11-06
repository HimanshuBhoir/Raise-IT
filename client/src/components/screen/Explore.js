import React, { useEffect, useContext, useRef} from 'react'
import useState from 'react-hook-use-state';
import "./Home.css"
import "./Home"
import { UserContext } from '../../App'
import {Link} from 'react-router-dom'
import Issue from './post';
import {useNavigate} from 'react-router-dom'
import M from 'materialize-css'


function Explore() {

  const [data, setData] = useState([])
  const [cmnt, showCmnt] = useState(false)
  const {state, dispatch} = useContext(UserContext) 
  const searchModel = useRef(null)
  const [search, setSearch] = useState('')
  const [userDetails, setUserdetails] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    M.Modal.init(searchModel.current)
  },[])

  const fetchUsers = (query) => {
    setSearch(query)
    fetch('http://localhost:5000/search-user',{
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
    fetch('http://localhost:5000/allpost',{
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
    fetch('http://localhost:5000/like',{
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
    fetch('http://localhost:5000/unlike',{
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
    fetch('http://localhost:5000/comment',{
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
    fetch(`http://localhost:5000/deletepost/${postid}`,{
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
    <div className='home'>
      <h5>Explore</h5>

      <button data-target="modal1" class="btn modal-trigger">Search</button>
      {/* <div id="modal1" className="modal" ref={searchModel}>
          <div className="modal-content">
            <input type="text" 
              placeholder='Search User'
              value={search}
              onChange={(e) => fetchUsers(e.target.value)} 
            />

            <ul class="collection">
              {userDetails.map(item => {
                return(
                  <>
                    <button onClick={() => navigate("/profile/"+item._id)}>{item.name}</button>
                    <hr/>
                  </>
                ) 
              })}
            </ul> */}

          {/* </div>
          <div className="modal-footer">
          <button> Close </button>          
          </div>
        </div> */}
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
              style={{width:"700px", height:"350px"}}
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
              <h6 className='cmtlen' style={{float: "right"}}>{item.comments.length} comments</h6>
              <h6>{item.likes.length} likes</h6>
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