// import React from 'react'
import React,{useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../App'
import './uerProfile.css'

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
      <div className='userprofile'>

        <div className='pro'>
          <img className='card ph' src={userProfile.user.photo} 
              style={{textAlign:"center",marginLeft:"3px",marginRight:"3px", width:"200px", height:"200px", borderRadius:"50%"}} 
              />
          <div>
          <h4>{userProfile.user.name}</h4>
          <br/>
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
        </div>
        <hr/>
        <div className='self-posts'>
          {
          userProfile.posts.map(item => {
              return(
                <>
                <div className='card item'>
                <img 
                style={{width:"150px", height:"150px", borderRadius:"13px"}} 
                    src={item.photo}
                    />
                    <h6>{item.title}</h6>
                </div>     
                </>    
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