// import React from 'react'
import React,{useEffect, useState, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../App'
import './uerProfile.css'

function Profile() {

    const navigate = useNavigate()
    const [userProfile, setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showfollow, setShowfollow] = useState(state?!state.following.includes(userid):true)
    // console.log(userid)
    useEffect(() => {
        fetch(`https://raise-it-1li7.onrender.com/user/${userid}`,{
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
      fetch('https://raise-it-1li7.onrender.com/follow',{
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
      fetch('https://raise-it-1li7.onrender.com/unfollow',{
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
      <div className='userprofile' style={{width:(window.innerWidth < 450 ? "80vw" : "50vw")}} >

        <div className='pro' style={{justifyContent:"center"}}>
          <img className='ph' src={userProfile.user.photo} 
              style={{marginRight:"10px",width:(window.innerWidth<450 ? "150px" : "200px"), height:(window.innerWidth<450 ? "150px" : "200px"), borderRadius:"50%"}} 
              />
          <div style={{paddingTop:"20px"}}>
          <h5>{userProfile.user.name}</h5>
          {/* <br/> */}
          <text className='dss'>{userProfile.posts.length} Posts</text>
          <br/>
          <text className='dss'>{userProfile.user.followers.length} marchers</text>
            {/* <h5>{userProfile.user.following.length} following</h5> */}
          <br/>
          <br/>
            {showfollow
            ?
            <button className='issue'
            onClick={() => followUser()}
            >Follow</button>
            :
            <button className='issue'
            onClick={() => unfollowUser()}>Unfollow</button>
            }
          </div>
        </div>
        <hr/>
        <div className='self-posts'>
          {
          userProfile.posts.map(item => {
              return(
                <>
                <button className='item'
                onClick={() => {navigate("/home")}}
                >
                <img 
                style={{width:(window.innerWidth > 450 ? "150px" : "90px"), height:(window.innerWidth> 450 ? "150px" : "70px"), borderRadius:"13px"}} 
                    src={item.photo}
                    />
                    <h6>{item.title}</h6>
                </button>     
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