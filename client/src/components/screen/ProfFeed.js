// import React from 'react'
import React,{useEffect, useState, useContext} from 'react'
import { UserContext } from '../../App'
import './Profile.css'

function ProfFeed() {

    const [mypics, setPics] = useState([])
    const {state} = useContext(UserContext)
    useEffect(() => {
        fetch('http://localhost:5000/mypost',{
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
        }).then(res=> res.json())
        .then(result=> {
            setPics(result.mypost)
            console.log(result)
        })
    },[])

  return (
    <div className='card profile'>
      <div className='prof'>
        <img src="https://images.generated.photos/Q5t7FpzIrfn_NOwU1AG8-eCzw80EgwNTDNB74NToO2Y/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTY5MjAzLmpwZw.jpg" 
          style={{width:"80px", height:"100px", borderRaius:"50px"}} />
           <h4>{state?state.name:"loading"}</h4>
      </div>

      <div className='desc'>
        <h6>{mypics.length}posts</h6>
        <h6>{state?state.followers.length:"loading"} marchers</h6>
        {/* <h6>{state?state.following.length:"loading"} following</h6> */}
      </div>

      <div className='self-posts'>
        {
        mypics.map(item => {
            return(
                <img className='item' style={{width:"100px", height:"150px", borderRaius:"50px", padding:"20px"}} 
                src={item.photo}
                />
            )    
        })
        }
      </div>

    </div>
  )
}

export default ProfFeed