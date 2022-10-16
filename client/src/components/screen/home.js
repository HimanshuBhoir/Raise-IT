import React, { useEffect, useContext} from 'react'
import useState from 'react-hook-use-state';
import "./home.css"
import { UserContext } from '../../App'

function Home() {

  const [data, setData] = useState([])
  const {state, dispatch} = useContext(UserContext) 
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

  return (
    <div className='home'>
      {
        data.map(item =>{
          return( 
            <div className='card home-card'>
            <h4>{item.postedById.name}</h4>
            
            <div className='card card-img'>
              <img style={{width:"600px", height:"300px"}}
              src={item.photo} />
            
            </div>

            <div className='content'>
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
            
              <h6>{item.likes.length} likes</h6>
              <h6><b>{item.title}</b></h6>
              <p>{item.body}</p>
              {
                item.comments.map(record => {
                  return (
                    <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedById.name }</span> {record.text}</h6>
                  )
                })
              }
            </div>

            <form onSubmit={(e) => {
                e.preventDefault()
                makeComment(e.target[0].value, item._id)
            }}>
              <input type="text" placeholder='Add a comment'/>
            </form>

          </div>
          )
        })
      }

    </div>
  )
}

export default Home