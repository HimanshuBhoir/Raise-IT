// import React from 'react'
import React,{useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../App'
import './Profile.css'

function Profile() {

    const [userProfile, setProfile] = useState(null)
    const {state} = useContext(UserContext)
    const {userid} = useParams()
    console.log(userid)
    useEffect(() => {
        fetch(`http://localhost:5000/user/${userid}`,{
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
        }).then(res=> res.json())
        .then(result=> {
            console.log(result)
            setProfile(result)
        })
    },[])

  return (
    <>
    {userProfile 
    ? 
      <div className='profile'>

        <div className='prof'>
          <img src="https://images.generated.photos/Q5t7FpzIrfn_NOwU1AG8-eCzw80EgwNTDNB74NToO2Y/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTY5MjAzLmpwZw.jpg" 
            style={{width:"80px", height:"100px", borderRaius:"50px"}} />
            <h4>{userProfile.user.name}</h4>
        </div>

        <div className='desc'>
          <h5>{userProfile.posts.length} posts</h5>
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