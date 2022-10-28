// import React from 'react'
import React,{useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../App'
import './Profile.css'

function Profile() {


    
    const [userProfile, setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showfollow, setShowfollow] = useState(state?!state.following.includes(userid):true)
    // console.log(userid)
    useEffect(() => {
        fetch(`http://localhost:5000/user/${userid}`,{
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
        }).then(res=> res.json())
        .then(result=> {
            // console.log(result)
            setProfile(result)
        })
    },[])

    const followUser = (id) =>{
      fetch('http://localhost:5000/follow',{
        method: "put",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer " + localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          followId:userid
        })
      }).then(res=>res.json())
      .then(data => {
        dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
        // console.log(data)
        localStorage.setItem("user",JSON.stringify(data))
        setProfile((prevState) => {
          return{
            ...prevState,
            user:{
              ...prevState.user,
            followers:[...prevState.user.followers,data._id]
            }
          }
        })
        setShowfollow(false)
      })
    }


    const unfollowUser = (id) =>{
      fetch('http://localhost:5000/unfollow',{
        method: "put",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer " + localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          unfollowId:userid
        })
      }).then(res=>res.json())
      .then(data => {
        dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
        // console.log(data)
        localStorage.setItem("user",JSON.stringify(data))
        setProfile((prevState) => {
        const newFollower = prevState.user.followers.filter(item => item !== data._id)
          return{
            ...prevState,
            user:{
              ...prevState.user,
              followers:newFollower
            }
          }
        })
        setShowfollow(true)
      })
    }

  return (
    <>
    {userProfile 
    ? 
      <div className='profile'>

        <div className='prof'>
          <img src={userProfile.user.photo} 
            style={{width:"80px", height:"100px", borderRaius:"50px"}} />
            <h4>{userProfile.user.name}</h4>
        </div>

        <div className='desc'>
            <h5>{userProfile.posts.length} posts</h5>
            <h5>{userProfile.user.followers.length} marchers</h5>
            {/* <h5>{userProfile.user.following.length} following</h5> */}
            
            {showfollow
            ?
            <button 
            onClick={() => followUser()}
            >Follow</button>
            :
            <button onClick={() => unfollowUser()}>Unfollow</button>
            }
            
  
        </div>

        <div className='self-posts'>
          {
          userProfile.posts.map(item => {
              return(
                  <img className='item' style={{width:"100px", height:"150px", borderRaius:"50px", padding:"20px"}} 
                  src={item.photo}
                  />
              )    
          })
          }
        </div>

      </div>
    :
      <h2>Loading..</h2>
    }
    
    </>
  )
}

export default Profile